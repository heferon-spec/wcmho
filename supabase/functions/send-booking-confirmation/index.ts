import { escapeHtml as e } from '../_shared/escape.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const ORG_INBOX = 'info@worldchangersmh.org';

// Trusted server-side mapping of professional -> work email. Keys MUST match the
// provider names shown in the booking form exactly. The browser only sends the
// provider NAME (a label) — never an address — so a booking can never be rerouted
// to an attacker-chosen inbox. Providers with no address yet fall back to the org
// inbox so no request is ever lost. info@ is always CC'd for administrative oversight.
const PROVIDER_EMAILS: Record<string, string> = {
  'Bongiwe Nomshado Mthembu': '',
  'Masego Mitchell': '',
  'Nicky Vlantis': 'nicky@worldchangersmh.org',
  'Patience Thabede': '',
  'Shelley Roets': '',
  'Takalani Mulaudzi': '',
  'Mimmy Ledwaba': '',
};

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const cap = (v: unknown, n: number) => String(v ?? '').slice(0, n);

const json = (obj: unknown, status: number) =>
  new Response(JSON.stringify(obj), { status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Require a Supabase apikey header (sent automatically by supabase-js) to
    // gate the endpoint against unauthenticated abuse.
    const apikey = req.headers.get('apikey') || req.headers.get('Authorization');
    if (!apikey) return json({ error: 'Unauthorized' }, 401);

    const raw = await req.json();
    const provider_name_raw = String(raw.provider_name || '').trim().slice(0, 120);
    const client_email = String(raw.client_email || raw.email || '').trim().slice(0, 200);

    const full_name = e(cap(raw.full_name, 120));
    const phone = e(cap(raw.phone, 40));
    const provider_name = e(provider_name_raw);
    const session_type = e(cap(raw.session_type, 120));
    const session_date = e(cap(raw.session_date, 40));
    const session_time = e(cap(raw.session_time, 60));
    const session_mode = e(cap(raw.session_mode, 40));
    const reason = e(cap(raw.reason, 2000));

    if (!raw.full_name || !provider_name_raw) {
      return json({ error: 'Invalid input' }, 400);
    }

    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
    if (!RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY not configured');
    }

    // Recipient is resolved here, server-side, from the trusted map above.
    // Use hasOwnProperty so names like "constructor"/"toString" can't return an
    // inherited prototype value.
    const mapped = Object.prototype.hasOwnProperty.call(PROVIDER_EMAILS, provider_name_raw)
      ? PROVIDER_EMAILS[provider_name_raw]
      : '';
    const providerEmail = mapped || ORG_INBOX;
    const to = [providerEmail];
    const cc = providerEmail.toLowerCase() === ORG_INBOX ? undefined : [ORG_INBOX];

    const row = (label: string, value: string) =>
      value
        ? `<tr><td style="padding:12px 16px;background:#f9fafb;border-bottom:1px solid #e5e7eb;color:#6b7280;font-size:13px;width:150px;">${label}</td><td style="padding:12px 16px;background:#f9fafb;border-bottom:1px solid #e5e7eb;color:#111827;font-size:14px;font-weight:600;">${value}</td></tr>`
        : '';

    const htmlBody = `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e5e7eb;">
        <div style="background: linear-gradient(135deg, #1D55B2, #1746A0); padding: 32px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 24px;">New Booking Request</h1>
          <p style="color: #dbe6ff; margin: 8px 0 0; font-size: 14px;">World Changers Mental Health Care Org</p>
        </div>
        <div style="padding: 32px;">
          <p style="color: #374151; font-size: 15px; line-height: 1.6; margin: 0 0 24px;">
            A new virtual counselling session has been requested with <strong>${provider_name}</strong>. Please review the details below and confirm with the client by email or phone.
          </p>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
            ${row('Client', full_name)}
            ${row('Email', isEmail(client_email) ? e(client_email) : '')}
            ${row('Phone', phone)}
            ${row('Provider', provider_name)}
            ${row('Session Type', session_type)}
            ${row('Preference', reason)}
            ${row('Requested', session_date)}
            ${row('Time', session_time)}
            ${row('Mode', session_mode || 'Virtual')}
          </table>
          <p style="color: #6b7280; font-size: 13px; line-height: 1.6; margin: 0;">
            This request was submitted through the World Changers website booking form. A copy has been sent to ${ORG_INBOX} for our records.
          </p>
        </div>
        <div style="background: #f9fafb; padding: 20px 32px; text-align: center; border-top: 1px solid #e5e7eb;">
          <p style="color: #9ca3af; font-size: 12px; margin: 0;">© World Changers Mental Health Care Org. All rights reserved.</p>
        </div>
      </div>
    `;

    const payload: Record<string, unknown> = {
      from: 'World Changers MHC Bookings <noreply@worldchangersmh.org>',
      to,
      subject: `New booking request — ${String(raw.session_type || 'Session').slice(0, 80)} with ${provider_name_raw.slice(0, 80)}`,
      html: htmlBody,
    };
    if (cc) payload.cc = cc;
    if (isEmail(client_email)) payload.reply_to = client_email;

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      console.warn('Resend error (non-blocking):', data);
      // Return 200 with a generic warning so it doesn't break the booking flow
      // and doesn't leak internal/config detail to the browser.
      return json({ success: false, warning: 'Email not sent' }, 200);
    }

    return json({ success: true, id: data.id }, 200);
  } catch (err) {
    console.error('Error:', err);
    return json({ error: 'Internal error' }, 500);
  }
});
