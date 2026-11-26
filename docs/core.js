/* Nabdah core: shared by browser and Node server. No dependencies. */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.NabdahCore = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  var CELL = 0.0025; // ~275 m. Readings are snapped to this grid: exact position is never stored.
  var R = 6371000;
  function rad(d) { return d * Math.PI / 180; }
  function snap(v) { return Math.round(v / CELL) * CELL; }
  function cellKey(lat, lon) { return snap(lat).toFixed(4) + ',' + snap(lon).toFixed(4); }
  function dist(a, b) {
    var dLat = rad(b.lat - a.lat), dLon = rad(b.lon - a.lon);
    var x = Math.sin(dLat / 2) ** 2 + Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLon / 2) ** 2;
    return 2 * R * Math.asin(Math.sqrt(x));
  }
  function bearing(a, b) {
    var y = Math.sin(rad(b.lon - a.lon)) * Math.cos(rad(b.lat));
    var x = Math.cos(rad(a.lat)) * Math.sin(rad(b.lat)) - Math.sin(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.cos(rad(b.lon - a.lon));
    return (Math.atan2(y, x) * 180 / Math.PI + 360) % 360;
  }
  var DIRS = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  function compass(deg) { return DIRS[Math.round(deg / 45) % 8]; }
  var CARRIERS = ['Vodafone', 'Orange', 'Etisalat', 'WE', 'Other'];
  /* Validate and anonymise a report. Returns null if invalid. */
  function cleanReading(r) {
    if (!r || typeof r !== 'object') return null;
    var lat = Number(r.lat), lon = Number(r.lon), bars = Math.round(Number(r.bars));
    if (!isFinite(lat) || !isFinite(lon) || lat < -90 || lat > 90 || lon < -180 || lon > 180) return null;
    if (!(bars >= 0 && bars <= 4)) return null; // 0 = no service, 4 = full
    var carrier = CARRIERS.indexOf(r.carrier) >= 0 ? r.carrier : 'Other';
    var net = ['none', 'sos', '2G', '3G', '4G', '5G'].indexOf(r.net) >= 0 ? r.net : (bars === 0 ? 'none' : '4G');
    var day = new Date(r.t || Date.now());
    if (isNaN(day)) day = new Date();
    return {
      lat: +snap(lat).toFixed(4), lon: +snap(lon).toFixed(4), bars: bars, carrier: carrier, net: net,
      outdoor: r.outdoor !== false, t: new Date(Math.floor(day.getTime() / 86400000) * 86400000).toISOString().slice(0, 10)
    };
  }
  /* Group readings per cell. Newer readings weigh more (half-life 120 days). */
  function aggregate(readings, filter, now) {
    filter = filter || {}; now = now || Date.now();
    var cells = {};
    readings.forEach(function (r) {
      if (filter.carrier && filter.carrier !== 'all' && r.carrier !== filter.carrier) return;
      var k = cellKey(r.lat, r.lon), c = cells[k] || (cells[k] = { lat: snap(r.lat), lon: snap(r.lon), w: 0, s: 0, n: 0, zero: 0, carriers: {} });
      var age = Math.max(0, (now - new Date(r.t).getTime()) / 86400000);
      var w = Math.pow(0.5, age / 120);
      c.w += w; c.s += w * r.bars; c.n++; if (r.bars === 0) c.zero++;
      c.carriers[r.carrier] = (c.carriers[r.carrier] || 0) + 1;
    });
    return Object.keys(cells).map(function (k) {
      var c = cells[k]; c.avg = c.s / c.w;
      c.confidence = c.n >= 5 ? 'high' : c.n >= 2 ? 'medium' : 'low';
      return c;
    });
  }
  /* Nearest cell with usable signal (avg >= min) from a position. */
  function nearestSignal(pos, cells, min) {
    min = min == null ? 2 : min;
    var best = null;
    cells.forEach(function (c) {
      if (c.avg < min) return;
      var d = dist(pos, c);
      if (!best || d < best.d) best = { cell: c, d: d, bearing: bearing(pos, c) };
    });
    return best;
  }
  /* Signal at a point: use the closest cell within 400 m. */
  function signalAt(pos, cells) {
    var best = null;
    cells.forEach(function (c) { var d = dist(pos, c); if (d <= 400 && (!best || d < best.d)) best = { cell: c, d: d }; });
    return best;
  }
  function toGPX(track, name) {
    var esc = function (s) { return String(s).replace(/[<>&"]/g, ''); };
    var pts = track.map(function (p) {
      return '<trkpt lat="' + p.lat + '" lon="' + p.lon + '"><time>' + new Date(p.ts).toISOString() + '</time><desc>bars ' + p.bars + '</desc></trkpt>';
    }).join('');
    return '<?xml version="1.0" encoding="UTF-8"?><gpx version="1.1" creator="Nabdah" xmlns="http://www.topografix.com/GPX/1/1"><trk><name>' + esc(name || 'Nabdah track') + '</name><trkseg>' + pts + '</trkseg></trk></gpx>';
  }
  /* Longest stretch of a track with no signal, in metres. */
  function deadStretch(track) {
    var best = 0, cur = 0;
    for (var i = 1; i < track.length; i++) {
      if (track[i].bars === 0 && track[i - 1].bars === 0) { cur += dist(track[i - 1], track[i]); best = Math.max(best, cur); } else cur = 0;
    }
    return Math.round(best);
  }
  return { CELL: CELL, snap: snap, cellKey: cellKey, dist: dist, bearing: bearing, compass: compass, CARRIERS: CARRIERS,
    cleanReading: cleanReading, aggregate: aggregate, nearestSignal: nearestSignal, signalAt: signalAt, toGPX: toGPX, deadStretch: deadStretch };
});
