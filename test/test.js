const assert = require('assert'), core = require('../docs/core.js');
const r = core.cleanReading({ lat: 31.20012345, lon: 29.91987, bars: 3, carrier: 'Vodafone', t: '2026-05-05T13:44:00Z' });
assert.strictEqual(r.lat, 31.2, 'lat snapped'); assert.strictEqual(r.t, '2026-05-05', 'time reduced to day');
assert.strictEqual(core.cleanReading({ lat: 99, lon: 0, bars: 2 }), null); assert.strictEqual(core.cleanReading({ lat: 1, lon: 1, bars: 9 }), null);
const now = Date.now(), t = new Date(now).toISOString();
const cells = core.aggregate([{ lat: 31.2, lon: 29.9, bars: 4, carrier: 'WE', t }, { lat: 31.2, lon: 29.9, bars: 2, carrier: 'WE', t }, { lat: 31.3, lon: 29.9, bars: 0, carrier: 'WE', t }], {}, now);
assert.strictEqual(cells.length, 2); assert.ok(Math.abs(cells.find(c => c.n === 2).avg - 3) < 1e-9);
const n = core.nearestSignal({ lat: 31.3, lon: 29.9 }, cells, 2); assert.ok(n && Math.round(n.d / 1000) === 11 && core.compass(n.bearing) === 'S');
assert.strictEqual(core.deadStretch([{ lat: 0, lon: 0, bars: 0 }, { lat: 0, lon: 0.001, bars: 0 }, { lat: 0, lon: 0.002, bars: 3 }]), 111);
assert.ok(core.toGPX([{ lat: 1, lon: 2, ts: 0, bars: 1 }]).includes('<trkpt'));
// server
const { createServer } = require('../server/server.js'); process.env.NABDAH_DATA = '/tmp/nabdah-test.json';
const s = createServer().listen(0, async () => {
  const base = 'http://127.0.0.1:' + s.address().port;
  let x = await fetch(base + '/api/readings', { method: 'POST', body: JSON.stringify([{ lat: 30, lon: 31, bars: 1 }, { lat: 'x' }]) });
  assert.strictEqual(x.status, 201); assert.strictEqual((await x.json()).accepted, 1);
  x = await (await fetch(base + '/api/cells')).json(); assert.ok(x.cells.length >= 1);
  x = await fetch(base + '/api/readings', { method: 'POST', body: 'nope' }); assert.strictEqual(x.status, 400);
  console.log('all tests passed'); s.close(); process.exit(0);
});
