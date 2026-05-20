const Resource = require("../models/Resource");

/* ── GET all resources for logged-in user ── */
const getResources = async (req, res) => {
  try {
    const resources = await Resource.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(resources);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch resources" });
  }
};

/* ── ADD a resource ── */
const addResource = async (req, res) => {
  const { title, description, url, tags } = req.body;
  if (!title) return res.status(400).json({ error: "Title is required" });

  try {
    const resource = await Resource.create({
      userId: req.user._id,
      title,
      description: description || "",
      url: url || "",
      tags: Array.isArray(tags) ? tags : (tags ? tags.split(",").map(t => t.trim()) : [])
    });
    res.status(201).json(resource);
  } catch (error) {
    res.status(500).json({ error: "Failed to add resource" });
  }
};

/* ── DELETE a resource ── */
const deleteResource = async (req, res) => {
  try {
    const resource = await Resource.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id // Ownership check
    });
    if (!resource) return res.status(404).json({ error: "Resource not found" });
    res.json({ message: "Resource deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete resource" });
  }
};

module.exports = { getResources, addResource, deleteResource };
