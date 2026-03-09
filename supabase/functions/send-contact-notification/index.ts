const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { full_name, email, subject, message } = await req.json();

    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
    if (!RESEND_API_KEY) throw new Error('RESEND_API_KEY not configured');

    const htmlBody = `
      <div style="font-family:'Segoe UI',Arial,sans-serif;max-width:640px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb;">
        <div style="background:linear-gradient(135deg,#1a6b4a,#2d9d6f);padding:28px 32px;text-align:center;">
          <h1 style="color:#fff;margin:0;font-size:22px;">New Contact Message</h1>
          <p style="color:#d1fae5;margin:6px 0 0;font-size:13px;">World Changers Mental Health Care Org</p>
        </div>
        <div style="padding:28px 32px;">
          <p style="color:#374151;font-size:15px;margin:0 0 20px;">A new message has been received from the contact form:</p>
          <table style="width:100%;border-collapse:collapse;margin-bottom:20px;">
            <tr><td style="padding:10px 16px;color:#6b7280;font-size:13px;border-bottom:1px solid #e5e7eb;width:140px;">Name</td><td style="padding:10px 16px;color:#111827;font-size:14px;font-weight:600;border-bottom:1px solid #e5e7eb;">${full_name}</td></tr>
            <tr><td style="padding:10px 16px;color:#6b7280;font-size:13px;border-bottom:1px solid #e5e7eb;width:140px;">Email</td><td style="padding:10px 16px;color:#111827;font-size:14px;font-weight:600;border-bottom:1px solid #e5e7eb;">${email}</td></tr>
            <tr><td style="padding:10px 16px;color:#6b7280;font-size:13px;border-bottom:1px solid #e5e7eb;width:140px;">Subject</td><td style="padding:10px 16px;color:#111827;font-size:14px;font-weight:600;border-bottom:1px solid #e5e7eb;">${subject}</td></tr>
          </table>
          <h3 style="font-size:14px;color:#1a6b4a;margin:0 0 8px;">Message</h3>
          <p style="color:#374151;font-size:14px;line-height:1.6;background:#f9fafb;padding:12px 16px;border-radius:8px;margin:0 0 24px;">${message}</p>
          <div style="text-align:center;margin:28px 0 8px;">
            <a href="mailto:${email}?subject=${encodeURIComponent(`Re: ${subject}`)}&body=${encodeURIComponent(`Hi ${full_name},\n\nThank you for reaching out to World Changers Mental Health Care. \n\n`)}" style="display:inline-block;background:linear-gradient(135deg,#1a6b4a,#2d9d6f);color:#fff;text-decoration:none;padding:14px 32px;border-radius:8px;font-size:15px;font-weight:600;">Reply to ${full_name}</a>
          </div>
          <p style="text-align:center;color:#9ca3af;font-size:12px;margin:8px 0 0;">Opens your email client to respond directly to ${email}</p>
        </div>
        <div style="background:#f9fafb;padding:16px 32px;text-align:center;border-top:1px solid #e5e7eb;">
          <p style="color:#9ca3af;font-size:12px;margin:0;">© World Changers Mental Health Care Org</p>
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
        from: 'World Changers MHC Contact <onboarding@resend.dev>',
        to: ['info@worldchangersmh.org'],
        subject: `New Contact: ${subject} — ${full_name}`,
        html: htmlBody,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.warn('Resend error (non-blocking):', data);
      return new Response(JSON.stringify({ success: false, warning: 'Email not sent', details: data }), {
        status: 200,
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
