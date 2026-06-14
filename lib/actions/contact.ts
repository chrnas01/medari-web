"use server";

import { checkBotId } from "botid/server";
import { Resend } from "resend";
import { contactSchema } from "@/lib/validations/contact";

export async function submitContactForm(input: unknown) {
  try {
    const verification = await checkBotId();
    if (verification.isBot) {
      return { success: false, error: "Access denied." };
    }

    const parsed = contactSchema.safeParse(input);
    if (!parsed.success) {
      return { success: false, error: parsed.error.issues[0]?.message ?? "Invalid input." };
    }

    const { name, email, organisation, message } = parsed.data;

    const { RESEND_API_KEY, SMTP_FROM, SMTP_TO } = process.env;
    if (!RESEND_API_KEY || !SMTP_FROM || !SMTP_TO) {
      console.error("Email env vars not configured (RESEND_API_KEY, SMTP_FROM, SMTP_TO)");
      return { success: false, error: "Email service is not configured. Please contact us directly." };
    }

    const resend = new Resend(RESEND_API_KEY);

    await resend.emails.send({
      from: SMTP_FROM,
      to: SMTP_TO,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0F172A; border-bottom: 2px solid #0F172A; padding-bottom: 10px;">New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Organisation:</strong> ${organisation ?? "Not provided"}</p>
          <div style="margin: 16px 0; padding: 12px 16px; background: #F8FAFC; border-left: 4px solid #6366F1;">
            <p style="margin: 0;"><strong>Message:</strong></p>
            <p style="margin-top: 8px; white-space: pre-wrap;">${message}</p>
          </div>
          <p style="color: #64748B; font-size: 12px; margin-top: 24px;">Sent from the website contact form.</p>
        </div>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error: "Failed to send message. Please try again later." };
  }
}
