const express = require("express");
const router = express.Router();
const { getResources, addResource, deleteResource } = require("../controllers/resourceController");
const protect = require("../middleware/authMiddleware");

router.get("/", protect, getResources);
router.post("/", protect, addResource);
router.delete("/:id", protect, deleteResource);

module.exports = router;
