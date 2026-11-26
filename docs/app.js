(function(){
var C=NabdahCore, API=window.NABDAH_API||'', LS=localStorage;
var T={ar:{sub:'خريطة تغطية الشبكة من الناس، للطوارئ والمشي في الجبل',map:'الخريطة',report:'سجّل',sos:'طوارئ',hike:'رحلة',
 all:'كل الشبكات',here:'مكانك: ',nosig:'مفيش شبكة',locate:'حدد مكاني',leg:['مفيش شبكة','ضعيفة','متوسطة','كويسة','ممتازة'],
 rh:'سجّل الشبكة هنا',rb:'قوة الإشارة دلوقتي',rc:'الشبكة',rn:'النوع',rw:'مكانك',out:['برا','جوه مبنى'],nets:['مفيش','طوارئ بس (SOS)','2G','3G','4G','5G'],
 pos:'بنحدد مكانك...',send:'ابعت التسجيل',priv:'بنحفظ المربع (حوالي 275م) واليوم بس. مفيش حسابات ولا أرقام ولا مكانك بالظبط.',
 sh:'لو في خطر',snow:'الإشارة عندك: ',near:'أقرب مكان فيه شبكة',go:'افتحه على الخريطة',mh:'رسالة جاهزة',copy:'انسخ الرسالة',sms:'ابعتها SMS',
 note:'الـ SMS بتوصل أحياناً حتى لو الإنترنت واقع. جرّب 112 لأنه بيشتغل على أي شبكة متاحة.',num:'أرقام الطوارئ في مصر',
 hh:'تسجيل مسار رحلة',hp:'سجّل مسارك وإشارة الشبكة على طول الطريق. شغال أوفلاين وبيتخزن على موبايلك.',start:'ابدأ',stop:'وقف',dl:'نزّل GPX',hc:'قوة الإشارة الحالية (اضغط لتسجيلها)',
 hs:function(n,d){return n+' نقطة | أطول مسافة بدون شبكة: '+d+' م'},hn:'الموقع بيتسجل والصفحة مفتوحة. المتصفحات بتوقف GPS لما الشاشة تتقفل.',
 tips:'اتفق مع حد على ميعاد رجوع. نزّل خريطة أوفلاين. احتفظ ببطارية. الشبكة غالباً أحسن على القمم والخطوط المفتوحة.',
 sent:'اتسجل. شكراً!',locFail:'مش قادر أحدد مكانك. فعّل الموقع.',demo:'بيانات تجريبية للعرض',cnt:'تسجيل',avg:'متوسط'},
en:{sub:'Crowdsourced network coverage for emergencies and hiking',map:'Map',report:'Report',sos:'Emergency',hike:'Trail',
 all:'All carriers',here:'You: ',nosig:'No signal',locate:'Locate me',leg:['No service','Weak','Fair','Good','Excellent'],
 rh:'Report signal here',rb:'Signal strength now',rc:'Carrier',rn:'Network',rw:'Where',out:['Outdoors','Inside a building'],nets:['None','Emergency only (SOS)','2G','3G','4G','5G'],
 pos:'Finding your position...',send:'Send report',priv:'We keep only the grid square (about 275 m) and the day. No accounts, no phone numbers, no exact position.',
 sh:'If you are in trouble',snow:'Your signal: ',near:'Nearest place with signal',go:'Show on map',mh:'Ready message',copy:'Copy message',sms:'Send by SMS',
 note:'SMS can get through when data fails. Try 112: it works on any available network.',num:'Egypt emergency numbers',
 hh:'Record a trail',hp:'Log your route and signal along the way. Works offline, stored on your phone.',start:'Start',stop:'Stop',dl:'Download GPX',hc:'Current signal (tap to log it)',
 hs:function(n,d){return n+' points | longest dead stretch: '+d+' m'},hn:'Location logs while the page is open. Browsers pause GPS when the screen locks.',
 tips:'Agree a return time with someone. Download an offline map. Save battery. Signal is usually better on ridges and open lines of sight.',
 sent:'Saved. Thank you!',locFail:'Could not get your location. Turn on location.',demo:'Demo data for showcase',cnt:'reports',avg:'avg'}};
var lang=LS.nb_lang||'ar', TT=function(){return T[lang]};
var COL=['#ff5d5d','#ff9f43','#f4d35e','#9be564','#2ee6a6'];
function $(i){return document.getElementById(i)}
function toast(m){var t=$('toast');t.textContent=m;t.style.display='block';setTimeout(function(){t.style.display='none'},2500)}
function barsSvg(n){var s='<svg width="34" height="24" viewBox="0 0 34 24">';for(var i=0;i<4;i++)s+='<rect x="'+(i*9)+'" y="'+(22-(i+1)*5)+'" width="6" height="'+((i+1)*5)+'" rx="1" fill="'+(i<n?COL[n]:'#24594f')+'"/>';return s+'</svg>'}
/* demo seed: deterministic pseudo-random along realistic corridors */
function seed(){var s=7,rnd=function(){s=(s*16807)%2147483647;return s/2147483647},out=[],cars=['Vodafone','Orange','Etisalat','WE'];
 function area(lat,lon,rad,n,fn){for(var i=0;i<n;i++){var la=lat+(rnd()-.5)*rad,lo=lon+(rnd()-.5)*rad;var b=Math.max(0,Math.min(4,Math.round(fn(la,lo)+(rnd()-.5)*1.2)));
  out.push({lat:la,lon:lo,bars:b,carrier:cars[Math.floor(rnd()*4)],net:b?'4G':'none',outdoor:true,t:new Date(Date.now()-rnd()*60*86400000).toISOString().slice(0,10)})}}
 [[31.2155,29.9455],[31.2440,29.9900],[31.1855,29.9070],[31.2130,29.9320],[31.2480,29.9800],[31.2230,29.9600],[31.2330,29.9780]].forEach(function(p){area(p[0],p[1],.006,34,function(){return 3.4})});
 for(var i=0;i<140;i++){var f=rnd(),la=31.0-f*.7,lo=29.75-f*.6+(rnd()-.5)*.02,b=(f>.15&&f<.85)?(rnd()<.55?0:1):3;out.push({lat:la,lon:lo,bars:b,carrier:cars[Math.floor(rnd()*4)],net:b?'3G':'none',outdoor:true,t:new Date(Date.now()-rnd()*60*86400000).toISOString().slice(0,10)})}
 area(28.56,33.95,.25,180,function(la,lo){return 1.2+Math.max(0,(0.05-Math.abs(la-28.556))*40)});
 area(29.2,25.52,.16,60,function(){return 2.4});
 return out.map(C.cleanReading)}
var DEMO=seed(), mine=JSON.parse(LS.nb_mine||'[]'), remote=null, pos=null, cells=[];
function all(){return DEMO.concat(mine,remote||[])}
function refresh(){cells=C.aggregate(all(),{carrier:$('carrier').value});draw();here();if(window.summ)summ()}
var map=L.map('map',{zoomControl:false}).setView([30.9,29.8],8);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'&copy; OpenStreetMap',maxZoom:18}).addTo(map);
L.control.zoom({position:'bottomright'}).addTo(map);var layer=L.layerGroup().addTo(map),me=null;
function draw(){layer.clearLayers();var h=C.CELL/2,z=map.getZoom(),b2=map.getBounds().pad(.2);cells.forEach(function(c){if(!b2.contains([c.lat,c.lon]))return;var b=Math.max(0,Math.min(4,Math.round(c.avg))),o={stroke:false,fillColor:COL[b],fillOpacity:c.confidence==='low'?.4:.7},m;
 m=z>=14?L.rectangle([[c.lat-h,c.lon-h],[c.lat+h,c.lon+h]],o):L.circleMarker([c.lat,c.lon],Object.assign({radius:z<10?3:z<12?5:7},o));
 m.bindPopup(barsSvg(b)+'<br>'+TT().leg[b]+'<br>'+c.n+' '+TT().cnt+' | '+TT().avg+' '+c.avg.toFixed(1)).addTo(layer)})}
map.on('zoomend moveend',function(){draw();summ()});window.summ=summ;function summ(){var b=map.getBounds(),n=[0,0,0,0,0],t=0;cells.forEach(function(c){if(b.contains([c.lat,c.lon])){n[Math.max(0,Math.min(4,Math.round(c.avg)))]++;t++}});$('summary').textContent=t?(lang==='ar'?'في الشاشة: ':'In view: ')+t+' | '+TT().leg[0]+' '+n[0]+' | '+TT().leg[4]+' '+n[4]:''}
var q=location.hash.slice(1).split(',');if(q.length===3)map.setView([+q[0],+q[1]],+q[2]);
function here(){var el=$('here');if(!pos){el.textContent=TT().locate;return}var s=C.signalAt(pos,cells);el.innerHTML=TT().here+(s?barsSvg(Math.round(s.cell.avg)):TT().nosig);}
$('here').onclick=$('fab').onclick=function(){locate(true)};
function locate(fly){if(!navigator.geolocation){toast(TT().locFail);return}navigator.geolocation.getCurrentPosition(function(p){pos={lat:p.coords.latitude,lon:p.coords.longitude};
 if(me)map.removeLayer(me);me=L.circleMarker([pos.lat,pos.lon],{radius:8,color:'#fff',fillColor:'#2d8cff',fillOpacity:1}).addTo(map);if(fly)map.setView([pos.lat,pos.lon],14);here();sos();upPos()},function(){toast(TT().locFail)},{enableHighAccuracy:true,timeout:15000})}
/* UI */
var cur=-1,hcur=-1;
function mkBars(id,cb){var b=$(id);b.innerHTML='';for(var i=0;i<5;i++)(function(i){var x=document.createElement('button');x.setAttribute('role','radio');x.setAttribute('aria-checked','false');x.innerHTML=barsSvg(i)+'<span class="lbl"></span>';x.onclick=function(){cb(i)};b.appendChild(x)})(i)}
function labels(){['bars','h_bars'].forEach(function(id){[].forEach.call($(id).children,function(b,i){b.lastChild.textContent=TT().leg[i]})});[].forEach.call($('bars').children,function(b,i){b.classList.toggle('on',i===cur);b.setAttribute('aria-checked',i===cur)})}
function fillSel(id,arr,keep){var e=$(id),v=e.value;e.innerHTML='';arr.forEach(function(x,i){var o=document.createElement('option');o.value=x[0];o.textContent=x[1];e.appendChild(o)});if(keep&&v)e.value=v}
function text(){var l=TT();$('t_sub').textContent=l.sub;var nb=document.querySelectorAll('#nav .tl');['map','report','sos','hike'].forEach(function(k,i){nb[i].textContent=l[k]});$('skip').textContent=lang==='ar'?'تخطي للمحتوى':'Skip to content';$('fab').setAttribute('aria-label',l.locate);
 fillSel('carrier',[['all',l.all]].concat(C.CARRIERS.map(function(c){return[c,c]})),1);fillSel('r_carrier',C.CARRIERS.map(function(c){return[c,c]}),1);
 fillSel('r_nettype',l.nets.map(function(n,i){return[['none','sos','2G','3G','4G','5G'][i],n]}),1);if(!$('r_nettype').dataset.i){$('r_nettype').value='4G';$('r_nettype').dataset.i=1}fillSel('r_out',[['1',l.out[0]],['0',l.out[1]]],1);
 $('r_h').textContent=l.rh;$('r_bars').textContent=l.rb;$('r_car').textContent=l.rc;$('r_net').textContent=l.rn;$('r_where').textContent=l.rw;$('send').textContent=l.send;$('r_priv').textContent=l.priv;
 $('s_h').textContent=l.sh;$('s_near').textContent=l.near;$('s_go').textContent=l.go;$('s_msg_h').textContent=l.mh;$('s_copy').textContent=l.copy;$('s_sms').textContent=l.sms;$('s_note').textContent=l.note;$('s_num').textContent=l.num;
 $('h_h').textContent=l.hh;$('h_p').textContent=l.hp;$('h_start').textContent=rec?l.stop:l.start;$('h_dl').textContent=l.dl;$('h_cur').textContent=l.hc;$('h_note').textContent=l.hn;$('h_tips').textContent=l.tips.split('.')[0];$('h_tiplist').textContent=l.tips;
 $('legend').innerHTML=l.leg.map(function(t,i){return'<div><i style="background:'+COL[i]+'"></i>'+t+'</div>'}).join('')+'<div class="mut">'+l.demo+'</div>';
 document.documentElement.lang=lang;document.documentElement.dir=lang==='ar'?'rtl':'ltr';$('lang').textContent=lang==='ar'?'EN':'ع';$('t_title').firstChild.textContent=lang==='ar'?'نبضة':'Nabdah';labels();upPos();hs();here();sos()}
function upPos(){$('r_pos').textContent=pos?pos.lat.toFixed(3)+', '+pos.lon.toFixed(3)+' ('+TT().rw+')':TT().pos}
$('lang').onclick=function(){lang=lang==='ar'?'en':'ar';LS.nb_lang=lang;text();draw()};
document.querySelectorAll('#nav button').forEach(function(b){b.onclick=function(){document.querySelectorAll('#nav button').forEach(function(x){x.classList.toggle('on',x===b);x.setAttribute('aria-selected',x===b)});['map','report','sos','hike'].forEach(function(k){$(k+'_s').classList.toggle('on',k===b.dataset.s)});
 if(b.dataset.s==='map')setTimeout(function(){map.invalidateSize()},50);if(b.dataset.s==='report'||b.dataset.s==='sos')locate(false)}});
$('carrier').onchange=refresh;
mkBars('bars',function(i){cur=i;labels()});
$('send').onclick=function(){if(!pos){locate(false);toast(TT().locFail);return}if(cur<0)return;var r=C.cleanReading({lat:pos.lat,lon:pos.lon,bars:cur,carrier:$('r_carrier').value,net:cur===0?($('r_nettype').value==='sos'?'sos':'none'):$('r_nettype').value,outdoor:$('r_out').value==='1'});
 mine.push(r);LS.nb_mine=JSON.stringify(mine);queue(r);refresh();toast(TT().sent);cur=-1;labels()};
function queue(r){if(!API)return;var q=JSON.parse(LS.nb_q||'[]');q.push(r);LS.nb_q=JSON.stringify(q);flush()}
function flush(){if(!API||!navigator.onLine)return;var q=JSON.parse(LS.nb_q||'[]');if(!q.length)return;fetch(API+'/api/readings',{method:'POST',body:JSON.stringify(q)}).then(function(r){if(r.ok)LS.nb_q='[]'}).catch(function(){})}
window.addEventListener('online',flush);
/* emergency */
function sos(){var l=TT();if(!pos){$('s_now').textContent=l.pos;$('s_msg').textContent='';return}var s=C.signalAt(pos,cells);
 $('s_now').innerHTML=l.snow+(s?barsSvg(Math.round(s.cell.avg))+' '+l.leg[Math.round(s.cell.avg)]:l.nosig);
 var n=C.nearestSignal(pos,cells,2);if(n){$('s_dist').textContent=n.d<1000?Math.round(n.d)+' m':(n.d/1000).toFixed(1)+' km';$('s_dir').textContent=C.compass(n.bearing)+' ('+Math.round(n.bearing)+'\u00b0)';$('arrow').style.transform='rotate('+n.bearing+'deg)';$('s_go').onclick=function(){document.querySelector('#nav button').click();map.setView([n.cell.lat,n.cell.lon],15)}}
 var link='https://maps.google.com/?q='+pos.lat.toFixed(5)+','+pos.lon.toFixed(5);
 $('s_msg').textContent=(lang==='ar'?'محتاج مساعدة. موقعي: ':'I need help. My location: ')+pos.lat.toFixed(5)+', '+pos.lon.toFixed(5)+' '+link;
 $('s_copy').onclick=function(){navigator.clipboard&&navigator.clipboard.writeText($('s_msg').textContent);toast(TT().sent)};$('s_sms').href='sms:?body='+encodeURIComponent($('s_msg').textContent)}
/* trail */
var rec=false,track=JSON.parse(LS.nb_track||'[]'),watch=null,hbars=2;
mkBars('h_bars',function(i){hbars=i;if(track.length)track[track.length-1].bars=i;var r=pos&&C.cleanReading({lat:pos.lat,lon:pos.lon,bars:i});if(r){mine.push(r);LS.nb_mine=JSON.stringify(mine);queue(r);refresh()}LS.nb_track=JSON.stringify(track);hs();toast(TT().sent)});
function hs(){$('h_stat').textContent=track.length;$('h_sub').textContent=TT().hs(track.length,C.deadStretch(track))}
$('h_start').onclick=function(){if(rec){navigator.geolocation.clearWatch(watch);rec=false}else{track=[];rec=true;watch=navigator.geolocation.watchPosition(function(p){pos={lat:p.coords.latitude,lon:p.coords.longitude};var last=track[track.length-1];if(!last||C.dist(last,pos)>25){track.push({lat:pos.lat,lon:pos.lon,ts:Date.now(),bars:hbars});LS.nb_track=JSON.stringify(track);hs()}},function(){toast(TT().locFail)},{enableHighAccuracy:true})}$('h_start').textContent=rec?TT().stop:TT().start};
$('h_dl').onclick=function(){if(!track.length)return;var a=document.createElement('a');a.href=URL.createObjectURL(new Blob([C.toGPX(track,'Nabdah trail')],{type:'application/gpx+xml'}));a.download='nabdah-trail.gpx';a.click()};
if(API)fetch(API+'/api/cells').then(function(r){return r.json()}).catch(function(){}); /* aggregated cells only; readings stay server-side */
if('serviceWorker' in navigator&&location.protocol==='https:')navigator.serviceWorker.register('sw.js').catch(function(){});
text();refresh();if(['report','sos','hike'].indexOf(q[0])>=0)document.querySelector('#nav button[data-s="'+q[0]+'"]').click();
})();
