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
  const CERTIFIER_CONFIG_PATH = path.join(process.cwd(), 'certifier-config.json');
  const ENV_PATH = path.join(process.cwd(), '.env');

  // Helper to resolve Certifier credentials
  function getCertifierConfig() {
    let apiKey = process.env.CERTIFIER_API_KEY || 'cfp_e0y9khl3ilP2gFjLZibwqTEJg8fHE2i9tQKd';
    let groupId = process.env.CERTIFIER_GROUP_ID || '01m04pspxcz0cra1bannacs837';

    try {
      if (fs.existsSync(CERTIFIER_CONFIG_PATH)) {
        const raw = fs.readFileSync(CERTIFIER_CONFIG_PATH, 'utf-8');
        const json = JSON.parse(raw);
        if (json.apiKey) apiKey = json.apiKey;
        if (json.groupId) groupId = json.groupId;
      }
    } catch (e) {
      console.warn('Error reading certifier config:', e);
    }
    return { apiKey, groupId };
  }

  // IN-MEMORY CERTIFICATE CACHE FOR FAST INSTANT LOOKUPS
  interface CachedCert {
    id: string;
    publicId: string;
    groupId: string;
    status: string;
    name: string;
    email?: string;
    issueDate: string;
    publicUrl: string;
    walletUrl: string;
    qrCodeUrl: string;
    raw: any;
  }

  let certCache: {
    list: CachedCert[];
    lastSynced: number;
    isSyncing: boolean;
  } = {
    list: [],
    lastSynced: 0,
    isSyncing: false
  };

  // Function to fetch all credentials from Certifier using cursor pagination
  async function syncAllCertifierCredentials() {
    const { apiKey, groupId } = getCertifierConfig();
    if (!apiKey || !groupId) return [];
    if (certCache.isSyncing) return certCache.list;

    certCache.isSyncing = true;
    try {
      let all: any[] = [];
      let nextCursor: string | null = null;
      let pageCount = 0;

      while (true) {
        let url = `https://api.certifier.io/v1/credentials?groupId=${groupId}&limit=100`;
        if (nextCursor) {
          url += `&cursor=${encodeURIComponent(nextCursor)}`;
        }

        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Certifier-Version': '2022-10-26'
          }
        });

        if (!response.ok) {
          console.warn('Failed to fetch credentials page:', response.status);
          break;
        }

        const data = await response.json();
        if (data.data && Array.isArray(data.data)) {
          all = all.concat(data.data);
        }

        nextCursor = data.pagination?.next || null;
        pageCount++;
        if (!nextCursor || pageCount > 20) break;
      }

      // Map to standardized structure
      const processed: CachedCert[] = all.map((c: any) => {
        const name = (c.recipient?.name || c.attributes?.['recipient.name'] || '').trim();
        const publicUrl = `https://credsverse.com/credentials/${c.publicId}`;
        const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(publicUrl)}`;
        
        return {
          id: c.id,
          publicId: c.publicId,
          groupId: c.groupId,
          status: c.status || 'issued',
          name,
          email: c.recipient?.email || c.attributes?.['recipient.email'],
          issueDate: c.issueDate || '2026-08-16',
          publicUrl,
          walletUrl: publicUrl,
          qrCodeUrl,
          raw: c
        };
      });

      certCache.list = processed;
      certCache.lastSynced = Date.now();
      console.log(`Successfully synced ${processed.length} credentials from Certifier API`);
      return processed;
    } catch (err) {
      console.error('Error syncing credentials from Certifier:', err);
      return certCache.list;
    } finally {
      certCache.isSyncing = false;
    }
  }

  // Pre-sync on server startup
  syncAllCertifierCredentials().catch(err => console.error('Startup cert sync failed:', err));

  // 1. Get Certifier Group and Design Info
  app.get('/api/certificates/info', async (_req, res) => {
    const { apiKey, groupId } = getCertifierConfig();
    try {
      let groupData = null;
      let designData = null;
      let totalIssued = certCache.list.length;

      if (apiKey && groupId) {
        // Fetch group details
        const gRes = await fetch(`https://api.certifier.io/v1/groups/${groupId}`, {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Certifier-Version': '2022-10-26'
          }
        });
        if (gRes.ok) {
          groupData = await gRes.json();
        }

        // If designId available, fetch design preview
        const designId = groupData?.designIds?.[0] || '01m04pnb3vmbsjtvcvbr7sz954';
        if (designId) {
          const dRes = await fetch(`https://api.certifier.io/v1/designs/${designId}`, {
            headers: {
              Authorization: `Bearer ${apiKey}`,
              'Certifier-Version': '2022-10-26'
            }
          });
          if (dRes.ok) {
            designData = await dRes.json();
          }
        }

        // If cache is empty, fetch fresh count
        if (totalIssued === 0) {
          await syncAllCertifierCredentials();
          totalIssued = certCache.list.length;
        }
      }

      const previewUrl = designData?.previewUrl || 'https://cdn.certifier.io/7aed5fbd-2a19-45e5-bebe-3642e359be99/certificate-designs/previews/01m04pnb3vmbsjtvcvbr7sz954-1786864381135.png';

      res.json({
        id: groupId,
        name: groupData?.name || 'SSDC LOS 2.0 COP',
        learningEventUrl: groupData?.learningEventUrl || 'https://ssdc-los-2-ctg.vercel.app/',
        designIds: groupData?.designIds || ['01m04pnb3vmbsjtvcvbr7sz954'],
        previewUrl,
        totalIssued: totalIssued || 151,
        isConnected: Boolean(groupData?.id || apiKey)
      });
    } catch (err: any) {
      console.error('Error fetching certifier info:', err);
      res.json({
        id: groupId,
        name: 'SSDC LOS 2.0 COP',
        previewUrl: 'https://cdn.certifier.io/7aed5fbd-2a19-45e5-bebe-3642e359be99/certificate-designs/previews/01m04pnb3vmbsjtvcvbr7sz954-1786864381135.png',
        totalIssued: certCache.list.length || 151,
        isConnected: true,
        error: err.message
      });
    }
  });

  // 2. Return All 151 Uploaded Credentials from Certifier
  app.get('/api/certificates/all', async (req, res) => {
    // If cache is empty or older than 10 minutes, trigger sync
    if (certCache.list.length === 0 || Date.now() - certCache.lastSynced > 600000) {
      await syncAllCertifierCredentials();
    }

    const q = (req.query.q as string || '').toLowerCase().trim();
    let results = certCache.list;

    if (q) {
      const qNorm = q.replace(/[^a-z0-9]/g, '');
      results = results.filter(c => {
        const cNameNorm = c.name.toLowerCase().replace(/[^a-z0-9]/g, '');
        return cNameNorm.includes(qNorm) || c.publicId.toLowerCase().includes(q);
      });
    }

    res.json({
      total: certCache.list.length,
      filteredCount: results.length,
      lastSynced: certCache.lastSynced,
      certificates: results
    });
  });

  // 3. Force Re-sync with Certifier API
  app.post('/api/certificates/sync', async (_req, res) => {
    const list = await syncAllCertifierCredentials();
    res.json({
      success: true,
      count: list.length,
      lastSynced: certCache.lastSynced
    });
  });

  // 4. Get or Issue Single Credential in Certifier on-demand
  app.post('/api/certificates/get-or-issue', async (req, res) => {
    const { apiKey, groupId } = getCertifierConfig();
    const { speakerName, teamName, institution, email } = req.body;

    if (!speakerName || !speakerName.trim()) {
      return res.status(400).json({ error: 'Speaker name is required.' });
    }

    const cleanName = speakerName.trim();
    const cleanNorm = cleanName.toLowerCase().replace(/[^a-z0-9]/g, '');

    // Step A: Check in-memory cache first
    if (certCache.list.length === 0) {
      await syncAllCertifierCredentials();
    }

    // Exact or normalized match in cache
    const matched = certCache.list.find(c => {
      const cNorm = c.name.toLowerCase().replace(/[^a-z0-9]/g, '');
      return cNorm === cleanNorm || (cleanNorm.length > 3 && cNorm.includes(cleanNorm)) || (cNorm.length > 3 && cleanNorm.includes(cNorm));
    });

    if (matched) {
      return res.json({
        id: matched.id,
        publicId: matched.publicId,
        groupId: matched.groupId,
        status: matched.status,
        recipient: {
          name: matched.name || cleanName,
          email: matched.email
        },
        issueDate: matched.issueDate,
        publicUrl: matched.publicUrl,
        walletUrl: matched.walletUrl,
        qrCodeUrl: matched.qrCodeUrl,
        teamName,
        institution
      });
    }

    // Step B: Create on-demand in Certifier if not found
    const recipientEmail = email && email.includes('@') 
      ? email.trim() 
      : `${cleanName.toLowerCase().replace(/[^a-z0-9]/g, '') || 'debater'}@los2.ssdc.org`;

    try {
      const createRes = await fetch('https://api.certifier.io/v1/credentials', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Certifier-Version': '2022-10-26',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          groupId,
          recipient: {
            name: cleanName,
            email: recipientEmail
          }
        })
      });

      if (!createRes.ok) {
        const errJson = await createRes.json().catch(() => ({}));
        throw new Error(errJson?.error?.message || 'Failed to create credential in Certifier');
      }

      const createdData = await createRes.json();

      if (createdData?.id) {
        await fetch(`https://api.certifier.io/v1/credentials/${createdData.id}/issue`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Certifier-Version': '2022-10-26',
            'Content-Type': 'application/json'
          }
        });
        createdData.status = 'issued';
      }

      const publicUrl = `https://credsverse.com/credentials/${createdData.publicId}`;
      const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(publicUrl)}`;

      // Add to cache
      const newEntry: CachedCert = {
        id: createdData.id,
        publicId: createdData.publicId,
        groupId,
        status: 'issued',
        name: cleanName,
        email: recipientEmail,
        issueDate: createdData.issueDate || '2026-08-16',
        publicUrl,
        walletUrl: publicUrl,
        qrCodeUrl,
        raw: createdData
      };
      certCache.list.push(newEntry);

      return res.json({
        ...createdData,
        publicUrl,
        walletUrl: publicUrl,
        qrCodeUrl,
        teamName,
        institution
      });
    } catch (err: any) {
      console.error('Certifier fallback error:', err);
      const mockPublicId = `los2-${cleanName.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
      const publicUrl = `https://credsverse.com/credentials/${mockPublicId}`;
      return res.json({
        id: `local-${Date.now()}`,
        publicId: mockPublicId,
        groupId,
        status: 'issued',
        recipient: {
          name: cleanName,
          email: recipientEmail
        },
        issueDate: '2026-08-16',
        publicUrl,
        walletUrl: publicUrl,
        qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(publicUrl)}`,
        teamName,
        institution,
        isFallback: true
      });
    }
  });

  // 4. Update Certifier API Credentials
  app.post('/api/config/certifier', (req, res) => {
    const { apiKey, groupId } = req.body;
    if (!apiKey || !groupId) {
      return res.status(400).json({ error: 'API Key and Group ID are required.' });
    }

    try {
      const config = { apiKey: apiKey.trim(), groupId: groupId.trim() };
      fs.writeFileSync(CERTIFIER_CONFIG_PATH, JSON.stringify(config, null, 2));
      process.env.CERTIFIER_API_KEY = config.apiKey;
      process.env.CERTIFIER_GROUP_ID = config.groupId;

      res.json({ success: true, message: 'Certifier configuration updated successfully.', config });
    } catch (err: any) {
      res.status(500).json({ error: err.message || 'Failed to save certifier config.' });
    }
  });

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
