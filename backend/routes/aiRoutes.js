import express from "express";
import { careerAI, smartNotesAI } from "../controllers/aiController.js";

const router = express.Router();

router.post("/career", careerAI);
router.post("/notes", smartNotesAI);

export default router;
