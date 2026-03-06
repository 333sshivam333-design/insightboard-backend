import { Request, Response } from "express";
import { generateTasksFromTranscript } from "../services/llmService";
import { validateDependencies } from "../services/dependencyService";
import { detectCycles } from "../utils/cycleDetection";
import Transcript from "../models/transcriptModel";

export const processTranscript = async (req: Request, res: Response) => {

    try {

        const { transcript } = req.body;

        // Validate transcript input
        if (!transcript || typeof transcript !== "string" || transcript.trim() === "") {
            return res.status(400).json({ error: "Transcript is required and must be a non-empty string" });
        }

        let tasks = await generateTasksFromTranscript(transcript);

        tasks = validateDependencies(tasks);

        tasks = detectCycles(tasks);

        const saved = await Transcript.create({
            transcriptText: transcript,
            tasks
        });

        res.json(saved);

    } catch (error: any) {

        console.error("Error processing transcript:", error);
        res.status(500).json({ error: "Processing failed", details: error.message });

    }

};
