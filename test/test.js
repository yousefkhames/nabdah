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
// weighting, trimming, best carrier, dms
(function(){
  const now=Date.now(), t=new Date(now).toISOString();
  const mk=(b,car,out)=>({lat:31.2,lon:29.9,bars:b,carrier:car,t,outdoor:out!==false});
  let c=core.aggregate([mk(4,'WE',true),mk(0,'WE',false)],{},now)[0]; assert.ok(c.avg>2.4&&c.avg<2.6,'indoor weighs 0.6: '+c.avg);
  c=core.aggregate([mk(0,'WE'),mk(3,'WE'),mk(3,'WE'),mk(3,'WE'),mk(4,'WE')],{},now)[0]; assert.strictEqual(c.avg,3,'outliers trimmed');
  c=core.aggregate([mk(1,'WE'),mk(1,'WE'),mk(3,'Orange'),mk(4,'Orange'),mk(4,'Vodafone')],{},now)[0];
  const bc=core.bestCarrier(c); assert.strictEqual(bc.carrier,'Orange','best carrier needs 2+ reports'); 
  assert.strictEqual(core.dms(31.5,-29.25),"31\u00b030'0.0\"N 29\u00b015'0.0\"W"); console.log('weighting tests passed');
})();
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
// route coverage
(function(){
  const gpx='<gpx><trk><trkseg><trkpt lat="31.20" lon="29.90"></trkpt><trkpt lat="31.30" lon="29.90"></trkpt></trkseg></trk></gpx>';
  const pts=core.parseGPX(gpx); assert.strictEqual(pts.length,2);
  const t=new Date().toISOString(); const cs=core.aggregate([{lat:31.2,lon:29.9,bars:3,carrier:'WE',t},{lat:31.25,lon:29.9,bars:0,carrier:'WE',t}],{});
  const r=core.routeCoverage(pts,cs,250); assert.ok(r.total>40&&r.covered>=1&&r.dead>=1&&r.unknown>0);
  assert.strictEqual(core.parseGPX('<x/>').length,0); console.log('route tests passed');
})();
