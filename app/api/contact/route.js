import { Resend } from 'resend'

const esc = (s = '') =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c])

export async function POST(request) {
  let body
  try {
    body = await request.json()
  } catch {
    return Response.json({ ok: false }, { status: 400 })
  }
  const { name, email, message, company } = body

  // Honeypot — bots fill every field; pretend success and drop it.
  if (company) return Response.json({ ok: true })

  if (!name || !email || !message) {
    return Response.json({ ok: false, error: 'Missing fields' }, { status: 400 })
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: 'lakshyabadjatya@gmail.com',
      replyTo: email,
      subject: `Portfolio transmission from ${name}`,
      html: `
        <h3>New message via sukhma.in</h3>
        <p><strong>Name:</strong> ${esc(name)}</p>
        <p><strong>Email:</strong> ${esc(email)}</p>
        <p>${esc(message).replace(/\n/g, '<br/>')}</p>
      `,
    })
    return Response.json({ ok: true })
  } catch (error) {
    console.error('contact form send failed:', error)
    return Response.json({ ok: false }, { status: 500 })
  }
}
