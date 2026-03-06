import express from "express";
import { processTranscript } from "../controllers/taskController";

const router = express.Router();

router.post("/transcript", processTranscript);

export default router;