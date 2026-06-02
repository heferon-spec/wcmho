import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { createHmac } from "node:crypto";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-paystack-signature",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.text();
    const paystackSecret = Deno.env.get("PAYSTACK_SECRET_KEY");

    // Fail closed if the webhook secret is not configured — never trust unsigned payloads.
    if (!paystackSecret) {
      console.error("PAYSTACK_SECRET_KEY not configured; rejecting webhook");
      return new Response(JSON.stringify({ error: "Webhook secret not configured" }), {
        status: 500,
        headers: corsHeaders,
      });
    }

    // Verify Paystack signature
    const sig = req.headers.get("x-paystack-signature");
    const hash = createHmac("sha512", paystackSecret).update(body).digest("hex");
    if (sig !== hash) {
      return new Response(JSON.stringify({ error: "Invalid signature" }), {
        status: 401,
        headers: corsHeaders,
      });
    }

    const event = JSON.parse(body);

    if (event.event !== "charge.success") {
      return new Response(JSON.stringify({ ok: true }), { headers: corsHeaders });
    }

    const data = event.data;
    const reference = data.reference as string;
    const amountKobo = data.amount as number;
    const amount = amountKobo / 100; // Convert from kobo/cents to main unit
    const email = data.customer?.email as string | undefined;
    const name =
      (data.customer?.first_name
        ? `${data.customer.first_name} ${data.customer.last_name || ""}`
        : data.customer?.email) || "Anonymous";
    const metadata = data.metadata || {};
    const campaignId = metadata.campaign_id as string | undefined;

    if (!campaignId) {
      console.log("No campaign_id in metadata, skipping");
      return new Response(JSON.stringify({ ok: true, skipped: true }), {
        headers: corsHeaders,
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Check for duplicate reference
    const { data: existing } = await supabase
      .from("campaign_donations")
      .select("id")
      .eq("paystack_reference", reference)
      .maybeSingle();

    if (existing) {
      return new Response(JSON.stringify({ ok: true, duplicate: true }), {
        headers: corsHeaders,
      });
    }

    // Insert donation
    const { error: donationError } = await supabase
      .from("campaign_donations")
      .insert({
        campaign_id: campaignId,
        amount,
        donor_name: name.trim(),
        donor_email: email || null,
        paystack_reference: reference,
      });

    if (donationError) {
      console.error("Donation insert error:", donationError);
      return new Response(JSON.stringify({ error: donationError.message }), {
        status: 500,
        headers: corsHeaders,
      });
    }

    // Update campaign stats
    const { data: campaign } = await supabase
      .from("campaigns")
      .select("raised_amount, donation_count")
      .eq("id", campaignId)
      .single();

    if (campaign) {
      await supabase
        .from("campaigns")
        .update({
          raised_amount: Number(campaign.raised_amount) + amount,
          donation_count: campaign.donation_count + 1,
          updated_at: new Date().toISOString(),
        })
        .eq("id", campaignId);
    }

    return new Response(JSON.stringify({ ok: true }), { headers: corsHeaders });
  } catch (err) {
    console.error("Webhook error:", err);
    return new Response(JSON.stringify({ error: "Internal error" }), {
      status: 500,
      headers: corsHeaders,
    });
  }
});
