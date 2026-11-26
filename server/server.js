// Zero-dependency API. Stores only snapped, day-level readings. No IPs, no accounts.
const http = require('http'), fs = require('fs'), path = require('path');
const core = require('../docs/core.js');
const FILE = process.env.NABDAH_DATA || path.join(__dirname, 'data.json');
let db = []; try { db = JSON.parse(fs.readFileSync(FILE, 'utf8')); } catch (e) {}
const hits = new Map(); // in-memory rate limit, never persisted
function limited(ip) { const now = Date.now(), h = (hits.get(ip) || []).filter(t => now - t < 60000); h.push(now); hits.set(ip, h); return h.length > 30; }
function send(res, code, obj) { res.writeHead(code, { 'x-content-type-options': 'nosniff', 'cache-control': 'no-store', 'content-type': 'application/json', 'access-control-allow-origin': '*', 'access-control-allow-headers': 'content-type' }); res.end(JSON.stringify(obj)); }
function createServer() {
  return http.createServer((req, res) => {
    if (req.method === 'OPTIONS') return send(res, 204, {});
    const u = new URL(req.url, 'http://x');
    if (req.method === 'GET' && u.pathname === '/api/health') return send(res, 200, { ok: true, readings: db.length });
    if (req.method === 'GET' && u.pathname === '/api/cells') {
      const cells = core.aggregate(db, { carrier: u.searchParams.get('carrier') || 'all' });
      return send(res, 200, { count: db.length, cells });
    }
    if (req.method === 'POST' && u.pathname === '/api/readings') {
      if (limited(req.socket.remoteAddress)) return send(res, 429, { error: 'slow down' });
      let body = ''; req.on('data', c => { body += c; if (body.length > 20000) req.destroy(); });
      req.on('end', () => {
        let j; try { j = JSON.parse(body); } catch (e) { return send(res, 400, { error: 'bad json' }); }
        const list = (Array.isArray(j) ? j : [j]).slice(0, 200).map(core.cleanReading).filter(Boolean);
        if (!list.length) return send(res, 400, { error: 'no valid readings' });
        db.push(...list); if (db.length > 500000) db = db.slice(-500000); fs.writeFileSync(FILE, JSON.stringify(db));
        send(res, 201, { accepted: list.length });
      });
      return;
    }
    send(res, 404, { error: 'not found' });
  });
}
if (require.main === module) createServer().listen(process.env.PORT || 8787, () => console.log('Nabdah API on', process.env.PORT || 8787));
module.exports = { createServer };
