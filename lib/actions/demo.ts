"use server";

import { checkBotId } from "botid/server";
import { Resend } from "resend";
import { demoSchema } from "@/lib/validations/demo";

export async function submitDemoRequest(input: unknown) {
  try {
    // checkBotId() can throw outside Vercel / without an OIDC token — keep it inside the try.
    const verification = await checkBotId();
    if (verification.isBot) return { success: false, error: "Access denied." };

    const parsed = demoSchema.safeParse(input);
    if (!parsed.success) return { success: false, error: "Invalid input." };

    const { name, email, practice, size, phone, message } = parsed.data;
    const apiKey = process.env.RESEND_API_KEY;
    const from = process.env.SMTP_FROM;
    const to = process.env.SMTP_TO;
    if (!apiKey || !from || !to) {
      return { success: false, error: "Email is not configured." };
    }

    const resend = new Resend(apiKey);
    // Resend v6 returns { data, error } instead of throwing — check error explicitly.
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `Demo request — ${practice} (${size})`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Practice: ${practice}`,
        `Size: ${size}`,
        `Phone: ${phone ?? "—"}`,
        "",
        message ?? "(no message)",
      ].join("\n"),
    });
    if (error) return { success: false, error: "Something went wrong. Please try again." };
    return { success: true };
  } catch {
    return { success: false, error: "Something went wrong. Please try again." };
  }
}
