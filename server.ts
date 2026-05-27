/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;

// Lazy-initialized Gemini client with check
let geminiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!geminiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      console.warn("WARNING: GEMINI_API_KEY is not defined in the environment variables. The tutor fallback mode will copy prompt text only.");
    }
    geminiClient = new GoogleGenAI({
      apiKey: key || "PLACEHOLDER",
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return geminiClient;
}

// REST API endpoint for integrated tutor experience
app.post('/api/tutor', async (req, res) => {
  try {
    const { prompt, systemInstruction } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: "Missing prompt parameter" });
    }

    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      return res.status(503).json({
        error: "NO_API_KEY",
        message: "لم يتم تكوين مفتاح الذكاء الاصطناعي (GEMINI_API_KEY) في إعدادات التطبيق. يرجى تهيئته في Secrets أو نسخ البرومبت يدويًا."
      });
    }

    const ai = getGeminiClient();
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: systemInstruction ? { systemInstruction } : undefined,
    });

    const outputText = response.text;
    res.json({ output: outputText });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: error?.message || "حدث خطأ غير متوقع أثناء الاتصال بالذكاء الاصطناعي." });
  }
});

// App environment status endpoint
app.get('/api/status', (req, res) => {
  res.json({
    hasApiKey: !!process.env.GEMINI_API_KEY,
    currentTime: new Date().toISOString(),
    isProduction: process.env.NODE_ENV === 'production'
  });
});

// Serve ChatGPT standalone tutor guide interactive workbook
app.get('/chatgpt-tutor-guide.html', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'chatgpt-tutor-guide.html'));
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    // Development Mode - Mount dynamic Vite dev server middlewares
    console.log("Starting in DEVELOPMENT mode, mounting Vite middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Production Mode - Serve pre-bundled front-end assets (dist/ folder)
    console.log("Starting in PRODUCTION mode, serving static elements...");
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server successfully booted and listening at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((e) => {
  console.error("Failed to start server:", e);
});
