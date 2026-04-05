import Message from "../models/Message.js";
import { sendContactNotification } from "../services/contactNotification.js";

export async function createMessage(req, res) {
  try {
    const { name, email, message } = req.body;
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return res.status(400).json({ error: "Name, email, and message are required" });
    }
    const doc = await Message.create({ name: name.trim(), email: email.trim(), message: message.trim() });

    let notificationStatus = "not_configured";
    try {
      const result = await sendContactNotification({
        name: doc.name,
        email: doc.email,
        message: doc.message,
        createdAt: doc.createdAt,
      });
      notificationStatus = result.status;
    } catch (mailError) {
      notificationStatus = "failed";
      console.error("Contact email notification failed:", mailError.message);
    }

    res.status(201).json({ ok: true, id: doc._id, notificationStatus });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}

export async function listMessages(req, res) {
  try {
    const messages = await Message.find().sort({ createdAt: -1 }).lean();
    res.json(messages);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
