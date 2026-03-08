const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { full_name, email, provider_name, session_type, session_date, session_time, session_mode } = await req.json();

    if (!email || !full_name) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
    if (!RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY not configured');
    }

    const htmlBody = `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e5e7eb;">
        <div style="background: linear-gradient(135deg, #1a6b4a, #2d9d6f); padding: 32px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Booking Confirmed ✓</h1>
          <p style="color: #d1fae5; margin: 8px 0 0; font-size: 14px;">Western Cape Mental Health Centre</p>
        </div>
        <div style="padding: 32px;">
          <p style="color: #374151; font-size: 16px; margin: 0 0 24px;">Hi <strong>${full_name}</strong>,</p>
          <p style="color: #374151; font-size: 15px; line-height: 1.6; margin: 0 0 24px;">
            Your therapy session has been successfully booked. Here are your details:
          </p>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
            <tr>
              <td style="padding: 12px 16px; background: #f9fafb; border-bottom: 1px solid #e5e7eb; color: #6b7280; font-size: 13px; width: 140px;">Provider</td>
              <td style="padding: 12px 16px; background: #f9fafb; border-bottom: 1px solid #e5e7eb; color: #111827; font-size: 14px; font-weight: 600;">${provider_name}</td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; border-bottom: 1px solid #e5e7eb; color: #6b7280; font-size: 13px;">Session Type</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid #e5e7eb; color: #111827; font-size: 14px; font-weight: 600;">${session_type}</td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; background: #f9fafb; border-bottom: 1px solid #e5e7eb; color: #6b7280; font-size: 13px;">Date</td>
              <td style="padding: 12px 16px; background: #f9fafb; border-bottom: 1px solid #e5e7eb; color: #111827; font-size: 14px; font-weight: 600;">${session_date}</td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; border-bottom: 1px solid #e5e7eb; color: #6b7280; font-size: 13px;">Time</td>
              <td style="padding: 12px 16px; border-bottom: 1px solid #e5e7eb; color: #111827; font-size: 14px; font-weight: 600;">${session_time}</td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; background: #f9fafb; color: #6b7280; font-size: 13px;">Mode</td>
              <td style="padding: 12px 16px; background: #f9fafb; color: #111827; font-size: 14px; font-weight: 600;">${session_mode || 'Virtual'}</td>
            </tr>
          </table>
          <p style="color: #6b7280; font-size: 13px; line-height: 1.6; margin: 0;">
            If you need to reschedule or cancel, please contact us at least 24 hours before your appointment.
          </p>
        </div>
        <div style="background: #f9fafb; padding: 20px 32px; text-align: center; border-top: 1px solid #e5e7eb;">
          <p style="color: #9ca3af; font-size: 12px; margin: 0;">© Western Cape Mental Health Centre. All rights reserved.</p>
        </div>
      </div>
    `;

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'WCMHC Bookings <onboarding@resend.dev>',
        to: [email],
        subject: `Booking Confirmed — ${session_type} with ${provider_name}`,
        html: htmlBody,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error('Resend error:', data);
      return new Response(JSON.stringify({ error: 'Failed to send email', details: data }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ success: true, id: data.id }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Error:', err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
