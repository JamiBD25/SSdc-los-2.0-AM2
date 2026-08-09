import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // GEMINI AI MOTION GENERATION ENDPOINT
  app.post('/api/gemini/generate-motion', async (req, res) => {
    try {
      const { category = 'Geopolitics', difficulty = 'Intermediate' } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;

      if (!apiKey) {
        return res.status(500).json({ error: 'GEMINI_API_KEY not configured' });
      }

      const ai = new GoogleGenAI({ apiKey });
      const prompt = `You are a Chief Adjudicator for an Asian Parliamentary (AP-ISC) debate tournament called SSDC League of Spars Season 2.
Generate 1 realistic, high-quality, balanced debate motion in the category of "${category}" at difficulty level "${difficulty}".
Format your response as a valid JSON object strictly matching this schema:
{
  "motion": "This House Would ...",
  "analysis": {
    "definition": "Clear concise definition and model explanation",
    "govArguments": ["Gov point 1", "Gov point 2", "Gov point 3"],
    "oppArguments": ["Opp point 1", "Opp point 2", "Opp point 3"],
    "keyClashes": ["Clash 1", "Clash 2"]
  }
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json'
        }
      });

      const text = response.text || '';
      const parsed = JSON.parse(text);
      res.json(parsed);
    } catch (err: any) {
      console.error('Gemini motion generation error:', err);
      res.status(500).json({ error: 'Failed to generate motion using Gemini API' });
    }
  });

  // Vite Middleware integration for dev / prod
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`SSDC LoS S2 Server running on http://localhost:${PORT}`);
  });
}

startServer();
