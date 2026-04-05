export function requireAdmin(req, res, next) {
  const token = process.env.ADMIN_TOKEN;
  if (!token) {
    return res.status(503).json({ error: "Admin operations disabled (no ADMIN_TOKEN)" });
  }
  const header = req.headers.authorization || "";
  const bearer = header.startsWith("Bearer ") ? header.slice(7) : "";
  if (bearer !== token) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
}
