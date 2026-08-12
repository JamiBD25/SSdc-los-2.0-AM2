import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Health Endpoint
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', app: 'SSDC League of Spars Season 2' });
  });

  // Global Supabase Credentials API Endpoints
  const CONFIG_PATH = path.join(process.cwd(), 'supabase-config.json');
  const ENV_PATH = path.join(process.cwd(), '.env');

  app.get('/api/config/supabase', (_req, res) => {
    try {
      if (fs.existsSync(CONFIG_PATH)) {
        const raw = fs.readFileSync(CONFIG_PATH, 'utf-8');
        const json = JSON.parse(raw);
        if (json.url && json.anonKey) {
          return res.json(json);
        }
      }
      if (fs.existsSync(ENV_PATH)) {
        const envContent = fs.readFileSync(ENV_PATH, 'utf-8');
        const urlMatch = envContent.match(/VITE_SUPABASE_URL=(.*)/);
        const keyMatch = envContent.match(/VITE_SUPABASE_ANON_KEY=(.*)/);
        if (urlMatch && keyMatch && urlMatch[1] && keyMatch[1]) {
          return res.json({
            url: urlMatch[1].trim(),
            anonKey: keyMatch[1].trim()
          });
        }
      }
    } catch (e) {
      console.warn('Error reading server supabase config:', e);
    }

    res.json({
      url: process.env.VITE_SUPABASE_URL || '',
      anonKey: process.env.VITE_SUPABASE_ANON_KEY || ''
    });
  });

  app.post('/api/config/supabase', (req, res) => {
    const { url, anonKey } = req.body;
    if (!url || !anonKey) {
      return res.status(400).json({ error: 'Supabase URL and Anon Key are required.' });
    }

    const config = { url: url.trim(), anonKey: anonKey.trim() };

    try {
      fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2));

      process.env.VITE_SUPABASE_URL = config.url;
      process.env.VITE_SUPABASE_ANON_KEY = config.anonKey;

      const envContent = `VITE_SUPABASE_URL=${config.url}\nVITE_SUPABASE_ANON_KEY=${config.anonKey}\n`;
      fs.writeFileSync(ENV_PATH, envContent);

      res.json({ success: true, message: 'Supabase credentials saved globally for all users & browsers.', config });
    } catch (err: any) {
      console.error('Failed to write supabase config file:', err);
      res.status(500).json({ error: err.message || 'Failed to save config on server.' });
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
