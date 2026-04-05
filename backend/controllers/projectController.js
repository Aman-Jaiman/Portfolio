import Project from "../models/Project.js";

export async function listProjects(req, res) {
  try {
    const projects = await Project.find({ featured: { $ne: false } })
      .sort({ order: 1, createdAt: -1 })
      .lean();
    res.json(projects);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

export async function listAllProjects(req, res) {
  try {
    const projects = await Project.find().sort({ order: 1, createdAt: -1 }).lean();
    res.json(projects);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

export async function createProject(req, res) {
  try {
    const body = req.body;
    const project = await Project.create({
      title: body.title,
      description: body.description,
      techStack: body.techStack || [],
      githubUrl: body.githubUrl || "",
      liveUrl: body.liveUrl || "",
      order: body.order ?? 0,
      featured: body.featured !== false,
    });
    res.status(201).json(project);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}

export async function updateProject(req, res) {
  try {
    const { id } = req.params;
    const project = await Project.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!project) return res.status(404).json({ error: "Not found" });
    res.json(project);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}

export async function deleteProject(req, res) {
  try {
    const { id } = req.params;
    const project = await Project.findByIdAndDelete(id);
    if (!project) return res.status(404).json({ error: "Not found" });
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
