import { escapeHtml as e } from '../_shared/escape.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const apikey = req.headers.get('apikey') || req.headers.get('Authorization');
    if (!apikey) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const body = await req.json();
    const cap = (v: unknown, n: number) => String(v ?? '').slice(0, n);
    const first_name = e(cap(body.first_name, 120));
    const last_name = e(cap(body.last_name, 120));
    const email = String(body.email || '').trim().slice(0, 200);
    const phone = e(cap(body.phone, 40));
    const date_of_birth = e(cap(body.date_of_birth, 40));
    const city = e(cap(body.city, 120));
    const address = e(cap(body.address, 300));
    const area_of_interest = e(cap(body.area_of_interest, 200));
    const availability = e(cap(body.availability, 200));
    const previous_experience = e(cap(body.previous_experience, 3000));
    const motivation = e(cap(body.motivation, 3000)).replace(/\n/g, '<br/>');
    const special_skills = e(cap(body.special_skills, 2000));
    const emergency_contact_name = e(cap(body.emergency_contact_name, 120));
    const emergency_contact_phone = e(cap(body.emergency_contact_phone, 40));

    if (!email || !body.first_name || !body.last_name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response(JSON.stringify({ error: 'Invalid input' }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
    if (!RESEND_API_KEY) throw new Error('RESEND_API_KEY not configured');

    const row = (label: string, value: string) =>
      value ? `<tr><td style="padding:10px 16px;color:#6b7280;font-size:13px;border-bottom:1px solid #e5e7eb;width:180px;">${label}</td><td style="padding:10px 16px;color:#111827;font-size:14px;font-weight:600;border-bottom:1px solid #e5e7eb;">${value}</td></tr>` : '';

    const htmlBody = `
      <div style="font-family:'Segoe UI',Arial,sans-serif;max-width:640px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb;">
        <div style="background:linear-gradient(135deg,#1D55B2,#1746A0);padding:28px 32px;text-align:center;">
          <h1 style="color:#fff;margin:0;font-size:22px;">New Volunteer Application</h1>
          <p style="color:#dbe6ff;margin:6px 0 0;font-size:13px;">World Changers Mental Health Care Org</p>
        </div>
        <div style="padding:28px 32px;">
          <p style="color:#374151;font-size:15px;margin:0 0 20px;">A new volunteer application has been submitted:</p>
          <h3 style="font-size:14px;color:#1D55B2;margin:0 0 8px;">Personal Information</h3>
          <table style="width:100%;border-collapse:collapse;margin-bottom:20px;">
            ${row('Name', `${first_name} ${last_name}`)}
            ${row('Email', e(email))}
            ${row('Phone', phone)}
            ${row('Date of Birth', date_of_birth)}
            ${row('City', city)}
            ${row('Address', address)}
          </table>
          <h3 style="font-size:14px;color:#1D55B2;margin:0 0 8px;">Volunteer Details</h3>
          <table style="width:100%;border-collapse:collapse;margin-bottom:20px;">
            ${row('Area of Interest', area_of_interest)}
            ${row('Availability', availability)}
            ${row('Previous Experience', previous_experience)}
            ${row('Special Skills', special_skills)}
          </table>
          <h3 style="font-size:14px;color:#1D55B2;margin:0 0 8px;">Motivation</h3>
          <p style="color:#374151;font-size:14px;line-height:1.6;background:#f9fafb;padding:12px 16px;border-radius:8px;margin:0 0 20px;">${motivation}</p>
          ${emergency_contact_name ? `
          <h3 style="font-size:14px;color:#1D55B2;margin:0 0 8px;">Emergency Contact</h3>
          <table style="width:100%;border-collapse:collapse;margin-bottom:20px;">
            ${row('Name', emergency_contact_name)}
            ${row('Phone', emergency_contact_phone)}
          </table>` : ''}
        </div>
        <div style="background:#f9fafb;padding:16px 32px;text-align:center;border-top:1px solid #e5e7eb;">
          <p style="color:#9ca3af;font-size:12px;margin:0;">© World Changers Mental Health Care Org</p>
        </div>
      </div>
    `;

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${RESEND_API_KEY}` },
      body: JSON.stringify({
        from: 'World Changers MHC Volunteers <noreply@worldchangersmh.org>',
        to: ['hr@worldchangersmh.org'],
        cc: ['info@worldchangersmh.org'],
        reply_to: email,
        subject: `New Volunteer Application — ${String(body.first_name).slice(0,60)} ${String(body.last_name).slice(0,60)}`,
        html: htmlBody,
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      console.warn('Resend error (non-blocking):', data);
      return new Response(JSON.stringify({ success: false }), {
        status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    return new Response(JSON.stringify({ success: true, id: data.id }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Error:', err);
    return new Response(JSON.stringify({ error: 'Internal error' }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
