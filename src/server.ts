import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import taskRoutes from "./routes/taskRoutes";
import connectDB from "./config/db";
import * as fs from "fs";
import * as path from "path";

// Load .env file explicitly with override to ensure our values are used
const envPath = path.resolve(__dirname, "../.env");

if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath, override: true });
} else {
    dotenv.config({ override: true });
}

// Validate required environment variables
const requiredEnvVars = ["MONGO_URI", "GEMINI_KEY"];
const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
    process.exit(1);
}

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://insightboard-frontend-tawny.vercel.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })
);
app.use(express.json());

connectDB();

app.use("/api", taskRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
