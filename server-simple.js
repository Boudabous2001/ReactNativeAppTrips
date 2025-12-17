import fs from 'fs/promises';
import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 4000;
const TRIPS_FILE = path.join(__dirname, 'data', 'trips.json');

// Ensure data directory exists
await fs.mkdir(path.join(__dirname, 'data'), { recursive: true }).catch(() => {});

// Load trips from file
let trips = [];
try {
  const data = await fs.readFile(TRIPS_FILE, 'utf-8');
  trips = JSON.parse(data);
  console.log(`✅ Loaded ${trips.length} trips from file`);
} catch (err) {
  console.log('No trips.json, starting empty');
  trips = [];
}

async function saveTrips() {
  await fs.writeFile(TRIPS_FILE, JSON.stringify(trips, null, 2));
}

const server = http.createServer(async (req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  const url = new URL(req.url, `http://localhost:${PORT}`);

  // Health check
  if (url.pathname === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ ok: true, ts: Date.now() }));
    return;
  }

  // AUTH ROUTES
  if (url.pathname === '/auth/login' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      const { email, password } = JSON.parse(body);
      const user = {
        id: '1',
        name: email.split('@')[0],
        email,
        roles: ['user']
      };
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        user,
        accessToken: 'mock_token_' + Date.now(),
        refreshToken: 'mock_refresh_' + Date.now(),
        expiresIn: 3600
      }));
    });
    return;
  }

  if (url.pathname === '/auth/register' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      const { name, email, password } = JSON.parse(body);
      const user = { id: '1', name, email, roles: ['user'] };
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        user,
        accessToken: 'mock_token_' + Date.now(),
        refreshToken: 'mock_refresh_' + Date.now(),
        expiresIn: 3600
      }));
    });
    return;
  }

  // TRIPS ROUTES
  if (url.pathname === '/trips' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(trips));
    return;
  }

  if (url.pathname === '/trips' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', async () => {
      const newTrip = JSON.parse(body);
      newTrip.id = Date.now().toString();
      newTrip.isFavorite = false;
      trips.push(newTrip);
      await saveTrips();
      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(newTrip));
    });
    return;
  }

  // GET TRIP BY ID
  if (url.pathname.startsWith('/trips/') && req.method === 'GET') {
    const id = url.pathname.split('/')[2];
    const trip = trips.find(t => t.id === id);
    if (trip) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(trip));
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Trip not found' }));
    }
    return;
  }

  // TOGGLE FAVORITE
 // TOGGLE FAVORITE
if (url.pathname.startsWith('/trips/') && url.pathname.endsWith('/favorite') && req.method === 'PATCH') {
  const id = url.pathname.split('/')[2];
  const trip = trips.find(t => t.id === id);
  if (trip) {
    trip.isFavorite = !trip.isFavorite;
    await saveTrips();  // ✅ IMPORTANT : sauvegarder !
    console.log(`✅ Trip ${id} favorite:`, trip.isFavorite);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(trip));
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Trip not found' }));
  }
  return;
}

 
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Not Found' }));
});

server.listen(PORT, () => {
  console.log(`✅ Simple backend running on http://localhost:${PORT}`);
});