import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

// Load local environment variables if they exist
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialize Gemini client to avoid crashing on boot if key is missing
let genAI: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!genAI) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is required on the server.");
    }
    genAI = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return genAI;
}

const SYSTEM_PROMPT = `
You are the "Sabir Jan AI Portfolio Assistant". Your role is to represent Sabir Jan professionally.
Profile: BS Computer Engineering (COMSATS). Researcher in AI/ML & Interactive Arts.
Key Projects: 
1. EmotiFi: Wi-Fi CSI based emotion recognition (privacy-first sensing). Uses wireless signals to map gestures and emotions.
2. DanReality: Dance-therapy fusion of culture, body alignment, and AI.
3. Aurora: Web design, reporting, documentation helper.
4. LFR Robot: Gesture control, robotics, embedded navigation.
Tone: Innovative, precise, slightly artistic.
Task: Help users navigate Sabir's portfolio, academic credentials, research goals, and certifications.
Link for certifications: https://github.com/Saber7Jan/Sabir-Jan-portfolio/tree/main/assets; users can access academic certificates under Education/Awards.
`;

// API Routes go FIRST
app.post("/api/chat", async (req, res) => {
  try {
    const { contents } = req.body;

    if (!contents || !Array.isArray(contents)) {
      res.status(400).json({ error: "Invalid request payload. 'contents' array is required." });
      return;
    }

    const ai = getGeminiClient();
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents,
      config: {
        systemInstruction: SYSTEM_PROMPT,
      },
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Gemini Server Error:", error);
    res.status(500).json({ 
      error: error.message || "An internal error occurred in the Gemini proxy service." 
    });
  }
});

// Vite Middleware/Static serving setup
async function setupVite() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting server in development mode with Vite middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting server in production mode serving static dist bundle...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

setupVite().catch((err) => {
  console.error("Failed to initialize server:", err);
  process.exit(1);
});
