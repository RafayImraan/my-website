import nodemailer from "nodemailer";
import type { LeadRecord } from "@/lib/types";

type MailConfig = {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
  to: string;
  from: string;
};

function getMailConfig(): MailConfig | null {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? "0");
  const secure = (process.env.SMTP_SECURE ?? "false").toLowerCase() === "true";
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const to = process.env.LEADS_TO_EMAIL;
  const from = process.env.LEADS_FROM_EMAIL ?? user;

  if (!host || !port || !user || !pass || !to || !from) return null;
  return { host, port, secure, user, pass, to, from };
}

export async function sendLeadNotification(lead: LeadRecord): Promise<boolean> {
  const config = getMailConfig();
  if (!config) return false;

  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: { user: config.user, pass: config.pass }
  });

  await transporter.sendMail({
    from: config.from,
    to: config.to,
    subject: `New Portfolio Lead: ${lead.name}`,
    text: [
      `Name: ${lead.name}`,
      `Email: ${lead.email}`,
      `Company: ${lead.company}`,
      `Interest: ${lead.interest}`,
      `Message: ${lead.message}`,
      `Created: ${lead.createdAt}`
    ].join("\n")
  });

  return true;
}
