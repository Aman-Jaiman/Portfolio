import nodemailer from "nodemailer";

function getMailConfig() {
  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const port = Number(process.env.SMTP_PORT || 587);
  const secure = process.env.SMTP_SECURE === "true" || port === 465;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const to = process.env.CONTACT_NOTIFICATION_EMAIL || user;

  return { host, port, secure, user, pass, to };
}

function buildMessageBody({ name, email, message, createdAt }) {
  const submittedAt = createdAt ? new Date(createdAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) : "Unknown";

  return [
    "You received a new portfolio contact form message.",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    `Submitted: ${submittedAt}`,
    "",
    "Message:",
    message,
  ].join("\n");
}

export async function sendContactNotification(contact) {
  const config = getMailConfig();
  if (!config.user || !config.pass || !config.to) {
    return { status: "not_configured" };
  }

  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: {
      user: config.user,
      pass: config.pass,
    },
  });

  await transporter.sendMail({
    from: `"Portfolio Contact" <${config.user}>`,
    to: config.to,
    replyTo: contact.email,
    subject: `New portfolio message from ${contact.name}`,
    text: buildMessageBody(contact),
  });

  return { status: "sent" };
}
