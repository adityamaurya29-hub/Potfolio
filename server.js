/**
 * Aditya Kumar 3D Portfolio - Node.js Express Server
 * Handles static asset serving and secure GitHub OAuth token exchange
 */

const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8080;

// Enable CORS and JSON body parser
app.use(cors());
app.use(express.json());

// Serve static assets from project root
app.use(express.static(path.join(__dirname)));

/**
 * Endpoint: POST /api/github/token
 * Safely exchanges the temporary OAuth code for a GitHub access token
 */
app.post('/api/github/token', async (req, res) => {
  const { code, client_id, client_secret } = req.body;

  if (!code) {
    return res.status(400).json({ error: 'Authorization code is required' });
  }

  const clientId = client_id || process.env.GITHUB_CLIENT_ID;
  const clientSecret = client_secret || process.env.GITHUB_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return res.status(400).json({ 
      error: 'GitHub Client ID and Client Secret are required. Provide them in request body or server environment variables.' 
    });
  }

  try {
    const fetch = globalThis.fetch || (await import('node-fetch')).default;
    const response = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code: code
      })
    });

    const data = await response.json();
    return res.json(data);
  } catch (err) {
    console.error('Error exchanging GitHub token:', err);
    return res.status(500).json({ error: 'Failed to exchange token with GitHub', details: err.message });
  }
});

// Fallback to index.html for any unmatched routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`[Cyber Portfolio Server] Active at http://localhost:${PORT}`);
});
