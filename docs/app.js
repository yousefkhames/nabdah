(function(){
var C=NabdahCore, API=window.NABDAH_API||'', LS=localStorage;
var T={ar:{sub:'خريطة تغطية الشبكة من الناس، للطوارئ ورحلات الجبل',map:'الخريطة',report:'سجّل',sos:'طوارئ',hike:'رحلة',
 all:'كل الشبكات',here:'مكانك: ',nosig:'مفيش شبكة',locate:'حدد مكاني',leg:['مفيش شبكة','ضعيفة','متوسطة','كويسة','ممتازة'],
 rh:'سجّل الشبكة في مكانك',rb:'قوة الإشارة دلوقتي',rc:'الشبكة',rn:'النوع',rw:'مكانك',out:['برا','جوه مبنى'],nets:['مفيش','طوارئ بس (SOS)','2G','3G','4G','5G'],
 pos:'بنحدد مكانك، اسمح بالموقع لو المتصفح سألك',send:'ابعت التسجيل',priv:'بنحفظ المربع (حوالي ٢٧٥ متر) واليوم بس. مفيش حسابات ولا أرقام تليفونات ولا موقعك بالظبط.',
 sh:'لو انت في خطر',snow:'الإشارة عندك: ',near:'أقرب مكان فيه إشارة',go:'وريني مكانه على الخريطة',mh:'رسالة طوارئ جاهزة',copy:'انسخ الرسالة',sms:'ابعتها SMS',
 note:'الـ SMS ساعات بتوصل حتى لو الإنترنت واقع. و112 بيشتغل على أي شبكة متاحة حتى لو الشريحة مالهاش رصيد.',num:'أرقام الطوارئ في مصر',
 hh:'تسجيل مسار رحلة',hp:'سجّل مسارك وقوة الشبكة على طول الطريق. شغال من غير نت والبيانات بتتخزن على موبايلك.',start:'ابدأ',stop:'وقف',dl:'نزّل GPX',hc:'قوة الإشارة الحالية (اضغط لتسجيلها)',
 hs:function(n,d){return nf(n)+' نقطة | أطول مسافة بدون شبكة: '+dm(d)},hn:'الموقع بيتسجل طول ما الصفحة مفتوحة. المتصفح بيوقف الـ GPS لما الشاشة تتقفل، فسيبها شغالة.',
 tips:'اتفق مع حد على ميعاد رجوع. نزّل خريطة أوفلاين. وفّر البطارية. الشبكة غالباً أحسن على القمم والأماكن المفتوحة.',
 sent:'اتسجل، شكراً ليك!',onbH:'أهلاً في نبضة',onbL:['الخريطة بتوريك فين فيه شبكة وفين لأ، من تسجيلات الناس.','لو انت في مكان وسجّلت قوة الإشارة، بتساعد غيرك في الطوارئ.','لو معاكش شبكة، تبويب الطوارئ بيوريك أقرب إشارة ويجهزلك رسالة.'],onbN:'البيانات المعروضة تجريبية لحد ما الناس تسجّل. نبضة مش بديل لـ 112 ولا لإبلاغ حد برحلتك.',onbOk:'فهمت، يلا نبدأ',dataH:'بياناتك',dataP:'كل حاجة متخزنة على موبايلك بس. تقدر تصدّرها أو تستوردها أو تمسحها كلها.',exp:'صدّر تسجيلاتي',imp:'استورد ملف',wipe:'امسح كل بياناتي',imported:'تسجيل اتضافوا',badJson:'الملف مش صالح',wipeQ:'تمسح كل تسجيلاتك والمسار المحفوظ؟',rtH:'افحص الشبكة على مسار',rtP:'ارفع ملف GPX للمسار اللي ناوي تمشيه (من تطبيق خرائط أو AllTrails) وشوف فين الشبكة هتقطع. الملف بيتفتح على موبايلك ومابيتبعتش لأي مكان.',rtFile:'اختار ملف GPX',rtTrail:'افحص مساري المسجّل',rtCov:'من المسار فيه شبكة',rtDead:'أطول مسافة من غير شبكة',rtUnk:'مفيش بيانات',badGpx:'الملف مش فيه مسار صالح',rtShow:'وريني على الخريطة',zeroR:'تسجيل بدون شبكة',conf:'درجة الثقة',c_high:'عالية',c_medium:'متوسطة',c_low:'ضعيفة (تسجيل واحد)',dead:'المناطق الميتة بس',search:'دوّر على مكان',searchGo:'روح',nf404:'مش لاقي المكان ده',updated:'اتحدّث تسجيلك لنفس المكان النهاردة',pick:'اختار قوة الإشارة الأول',mine:'تسجيلاتي',del:'امسح',nomine:'لسه ما سجلتش حاجة.',deleted:'اتمسح',hasSig:'عندك إشارة. اتصل بـ 112 دلوقتي',noSig:'مفيش إشارة عندك. امشي ناحية أقرب إشارة',walk:'مشي حوالي',min:'دقيقة',nav:'اتجاهات',none:'مفيش مكان معروف فيه شبكة قريب. سجّل لو عندك.',copied:'اتنسخت الرسالة',unk:'مفيش بيانات عن المكان ده. جرّب تتصل بـ 112 على أي حال',nodata:'مفيش تسجيلات هنا',share:'شارك',locFail:'مش قادر أحدد مكانك. فعّل خدمة الموقع وجرّب تاني.',demo:'بيانات تجريبية للعرض فقط',cnt:'تسجيل',avg:'متوسط'},
en:{sub:'Crowdsourced network coverage for emergencies and hiking',map:'Map',report:'Report',sos:'Emergency',hike:'Trail',
 all:'All carriers',here:'You: ',nosig:'No signal',locate:'Locate me',leg:['No service','Weak','Fair','Good','Excellent'],
 rh:'Report signal here',rb:'Signal strength now',rc:'Carrier',rn:'Network',rw:'Where',out:['Outdoors','Inside a building'],nets:['None','Emergency only (SOS)','2G','3G','4G','5G'],
 pos:'Finding your position...',send:'Send report',priv:'We keep only the grid square (about 275 m) and the day. No accounts, no phone numbers, no exact position.',
 sh:'If you are in trouble',snow:'Your signal: ',near:'Nearest place with signal',go:'Show on map',mh:'Ready message',copy:'Copy message',sms:'Send by SMS',
 note:'SMS can get through when data fails. Try 112: it works on any available network.',num:'Egypt emergency numbers',
 hh:'Record a trail',hp:'Log your route and signal along the way. Works offline, stored on your phone.',start:'Start',stop:'Stop',dl:'Download GPX',hc:'Current signal (tap to log it)',
 hs:function(n,d){return n+' points | longest dead stretch: '+dm(d)},hn:'Location logs while the page is open. Browsers pause GPS when the screen locks.',
 tips:'Agree a return time with someone. Download an offline map. Save battery. Signal is usually better on ridges and open lines of sight.',
 sent:'Saved. Thank you!',onbH:'Welcome to Nabdah',onbL:['The map shows where there is signal and where not, from people\'s reports.','Report your signal where you are to help others in an emergency.','With no signal, the Emergency tab points to the nearest signal and prepares a message.'],onbN:'Data shown is demo data until people report. Nabdah does not replace 112 or telling someone your route.',onbOk:'Got it',dataH:'Your data',dataP:'Everything is stored on your phone only. Export, import or erase it all.',exp:'Export my reports',imp:'Import file',wipe:'Erase all my data',imported:'reports added',badJson:'Invalid file',wipeQ:'Erase all your reports and saved trail?',rtH:'Check coverage on a route',rtP:'Load a GPX file of the route you plan to walk (from a maps app or AllTrails) to see where signal will drop. The file is read on your phone and never uploaded.',rtFile:'Choose GPX file',rtTrail:'Check my recorded trail',rtCov:'of the route has signal',rtDead:'Longest stretch without signal',rtUnk:'no data',badGpx:'No valid route in that file',rtShow:'Show on map',zeroR:'reports with no service',conf:'Confidence',c_high:'high',c_medium:'medium',c_low:'low (single report)',dead:'Dead zones only',search:'Search a place',searchGo:'Go',nf404:'Place not found',updated:'Updated your report for this spot today',pick:'Pick a signal strength first',mine:'My reports',del:'Delete',nomine:'No reports yet.',deleted:'Deleted',hasSig:'You have signal. Call 112 now',noSig:'No signal here. Walk toward the nearest signal',walk:'about',min:'min walk',nav:'Directions',none:'No known signal nearby. Report one if you have it.',copied:'Message copied',unk:'No data for this spot. Try calling 112 anyway',nodata:'No reports here',share:'Share',locFail:'Could not get your location. Turn on location.',demo:'Demo data for showcase',cnt:'reports',avg:'avg'}};
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
var AR_D='٠١٢٣٤٥٦٧٨٩';
function nf(x){var s=String(x);return lang==='ar'?s.replace(/\d/g,function(d){return AR_D[d]}).replace(/\./g,'٫'):s}
function dm(m){return m<1000?nf(Math.round(m))+(lang==='ar'?' متر':' m'):nf((m/1000).toFixed(1))+(lang==='ar'?' كم':' km')}
var DIR_AR={N:'شمال',NE:'شمال شرق',E:'شرق',SE:'جنوب شرق',S:'جنوب',SW:'جنوب غرب',W:'غرب',NW:'شمال غرب'};
function cmp(deg){var d=C.compass(deg);return lang==='ar'?DIR_AR[d]:d}
function ltr(s){return '<bdi dir="ltr">'+s+'</bdi>'}
var deadOnly=false;var DEMO=seed(), mine=JSON.parse(LS.nb_mine||'[]'), remote=null, pos=null, cells=[];
function all(){return DEMO.concat(mine,remote||[])}
function refresh(){cells=C.aggregate(all(),{carrier:$('carrier').value});if(deadOnly)cells=cells.filter(function(c){return c.avg<1.5});draw();here();if(window.summ)summ();sos()}
var map=L.map('map',{zoomControl:false,preferCanvas:true}).setView([30.9,29.8],8);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'&copy; OpenStreetMap',maxZoom:18}).addTo(map);
L.control.zoom({position:'bottomright'}).addTo(map);var layer=L.layerGroup().addTo(map),me=null;
function popup(c,b){var l=TT(),cs=Object.keys(c.carriers).map(function(k){return k+' '+nf(c.carriers[k])}).join(' | ');
 return '<div class="pop"><b>'+barsSvg(b)+' '+l.leg[b]+'</b><br>'+nf(c.n)+' '+l.cnt+' | '+l.avg+' '+nf(c.avg.toFixed(1))+'<br><span dir="ltr">'+cs+'</span><br>'+(c.zero?nf(c.zero)+' '+l.zeroR+'<br>':'')+l.conf+': '+l['c_'+c.confidence]+'</div>'}
function draw(){layer.clearLayers();var h=C.CELL/2,z=map.getZoom(),b2=map.getBounds().pad(.2);cells.forEach(function(c){if(!b2.contains([c.lat,c.lon]))return;var b=Math.max(0,Math.min(4,Math.round(c.avg))),o={stroke:false,fillColor:COL[b],fillOpacity:c.confidence==='low'?.4:.7},m;
 m=z>=14?L.rectangle([[c.lat-h,c.lon-h],[c.lat+h,c.lon+h]],o):L.circleMarker([c.lat,c.lon],Object.assign({radius:z<10?3:z<12?5:7},o));
 m.bindPopup(popup(c,b)).addTo(layer)})}
map.on('zoomend moveend',function(){draw();summ()});window.summ=summ;window.checkRoute=function(p){return checkRoute(p)};function summ(){var b=map.getBounds(),n=[0,0,0,0,0],t=0;cells.forEach(function(c){if(b.contains([c.lat,c.lon])){n[Math.max(0,Math.min(4,Math.round(c.avg)))]++;t++}});$('summary').textContent=t?(lang==='ar'?'في الشاشة: ':'In view: ')+nf(t)+' | '+TT().leg[0]+' '+nf(n[0])+' | '+TT().leg[4]+' '+nf(n[4]):''}
var q=location.hash.slice(1).split(',');var at=location.hash.indexOf('@');if(at>0){var pp=location.hash.slice(at+1).split(',');pos={lat:+pp[0],lon:+pp[1]}}if(q.length===3)map.setView([+q[0],+q[1]],+q[2]);
function here(){var el=$('here');if(!pos){el.textContent=TT().locate;return}var s=C.signalAt(pos,cells);el.innerHTML=TT().here+(s?barsSvg(Math.round(s.cell.avg)):TT().nosig);}
$('here').onclick=$('fab').onclick=function(){locate(true)};
function locate(fly){if(!navigator.geolocation){toast(TT().locFail);return}navigator.geolocation.getCurrentPosition(function(p){pos={lat:p.coords.latitude,lon:p.coords.longitude};
 if(me)map.removeLayer(me);me=L.circleMarker([pos.lat,pos.lon],{radius:8,color:'#fff',fillColor:'#2d8cff',fillOpacity:1}).addTo(map);if(fly)map.setView([pos.lat,pos.lon],14);here();sos();upPos()},function(){if(fly)toast(TT().locFail)},{enableHighAccuracy:true,timeout:15000})}
/* UI */
var cur=-1,hcur=-1;
function mkBars(id,cb){var b=$(id);b.innerHTML='';for(var i=0;i<5;i++)(function(i){var x=document.createElement('button');x.setAttribute('role','radio');x.setAttribute('aria-checked','false');x.innerHTML=barsSvg(i)+'<span class="lbl"></span>';x.onclick=function(){cb(i)};b.appendChild(x)})(i)}
function labels(){['bars','h_bars'].forEach(function(id){[].forEach.call($(id).children,function(b,i){b.lastChild.textContent=TT().leg[i]})});[].forEach.call($('bars').children,function(b,i){b.classList.toggle('on',i===cur);b.setAttribute('aria-checked',i===cur)})}
function fillSel(id,arr,keep){var e=$(id),v=e.value;e.innerHTML='';arr.forEach(function(x,i){var o=document.createElement('option');o.value=x[0];o.textContent=x[1];e.appendChild(o)});if(keep&&v)e.value=v}
function text(){var l=TT();$('t_sub').textContent=l.sub;var nb=document.querySelectorAll('#nav .tl');['map','report','sos','hike'].forEach(function(k,i){nb[i].textContent=l[k]});$('dead').textContent=l.dead;$('q').placeholder=l.search;$('q').setAttribute('aria-label',l.search);$('q_go').textContent=l.searchGo;$('rt_h').textContent=l.rtH;$('rt_p').textContent=l.rtP;$('rt_lbl').textContent=l.rtFile;$('rt_trail').textContent=l.rtTrail;$('rt_show').textContent=l.rtShow;$('d_h').textContent=l.dataH;$('d_p').textContent=l.dataP;$('ex_json').textContent=l.exp;$('im_lbl').textContent=l.imp;$('wipe').textContent=l.wipe;$('onb_h').textContent=l.onbH;$('onb_l').innerHTML=l.onbL.map(function(t){return'<li>'+t+'</li>'}).join('');$('onb_n').textContent=l.onbN;$('onb_ok').textContent=l.onbOk;$('skip').textContent=lang==='ar'?'تخطي للمحتوى':'Skip to content';$('fab').setAttribute('aria-label',l.locate);
 fillSel('carrier',[['all',l.all]].concat(C.CARRIERS.map(function(c){return[c,c]})),1);fillSel('r_carrier',C.CARRIERS.map(function(c){return[c,c]}),1);
 fillSel('r_nettype',l.nets.map(function(n,i){return[['none','sos','2G','3G','4G','5G'][i],n]}),1);if(!$('r_nettype').dataset.i){$('r_nettype').value=guessNet()||'4G';$('r_nettype').dataset.i=1}fillSel('r_out',[['1',l.out[0]],['0',l.out[1]]],1);
 $('r_h').textContent=l.rh;$('r_bars').textContent=l.rb;$('r_car').textContent=l.rc;$('r_net').textContent=l.rn;$('r_where').textContent=l.rw;$('send').textContent=l.send;$('r_priv').textContent=l.priv;
 $('s_h').textContent=l.sh;myList();$('s_near').textContent=l.near;$('s_go').textContent=l.go;$('s_msg_h').textContent=l.mh;$('s_copy').textContent=l.copy;$('s_share').textContent=l.share;$('s_sms').textContent=l.sms;$('s_note').textContent=l.note;$('s_num').textContent=l.num;
 $('h_h').textContent=l.hh;$('h_p').textContent=l.hp;$('h_start').textContent=rec?l.stop:l.start;$('h_dl').textContent=l.dl;$('h_cur').textContent=l.hc;$('h_note').textContent=l.hn;$('h_tips').textContent=l.tips.split('.')[0];$('h_tiplist').textContent=l.tips;
 $('legend').innerHTML=l.leg.map(function(t,i){return'<div><i style="background:'+COL[i]+'"></i>'+t+'</div>'}).join('')+'<div class="mut">'+l.demo+'</div>';
 document.documentElement.lang=lang;document.documentElement.dir=lang==='ar'?'rtl':'ltr';$('lang').textContent=lang==='ar'?'EN':'ع';$('t_title').firstChild.textContent=lang==='ar'?'نبضة':'Nabdah';labels();upPos();hs();here();sos()}
function upPos(){$('r_pos').textContent=pos?pos.lat.toFixed(3)+', '+pos.lon.toFixed(3)+' ('+TT().rw+')':TT().pos}
$('lang').onclick=function(){lang=lang==='ar'?'en':'ar';LS.nb_lang=lang;text();draw()};
document.querySelectorAll('#nav button').forEach(function(b){b.onclick=function(){document.querySelectorAll('#nav button').forEach(function(x){x.classList.toggle('on',x===b);x.setAttribute('aria-selected',x===b)});['map','report','sos','hike'].forEach(function(k){$(k+'_s').classList.toggle('on',k===b.dataset.s)});
 if(b.dataset.s==='map')setTimeout(function(){map.invalidateSize()},50);if(b.dataset.s==='report'||b.dataset.s==='sos')locate(false)}});
$('carrier').onchange=function(){LS.nb_car=$('carrier').value;refresh()};$('r_carrier').onchange=function(){LS.nb_rcar=$('r_carrier').value};
$('dead').onclick=function(){deadOnly=!deadOnly;$('dead').setAttribute('aria-pressed',deadOnly);$('dead').classList.toggle('on',deadOnly);refresh()};
$('q_form').onsubmit=function(e){e.preventDefault();var v=$('q').value.trim();if(!v)return;fetch('https://nominatim.openstreetmap.org/search?format=json&limit=1&q='+encodeURIComponent(v)+'&accept-language='+lang).then(function(r){return r.json()}).then(function(j){if(!j.length){toast(TT().nf404);return}map.setView([+j[0].lat,+j[0].lon],13)}).catch(function(){toast(TT().nf404)})};
mkBars('bars',function(i){cur=i;labels()});
$('send').onclick=function(){if(!pos){locate(false);toast(TT().locFail);return}if(cur<0){toast(TT().pick);$('bars').firstChild.focus();return}
 var r=C.cleanReading({lat:pos.lat,lon:pos.lon,bars:cur,carrier:$('r_carrier').value,net:cur===0?($('r_nettype').value==='sos'?'sos':'none'):$('r_nettype').value,outdoor:$('r_out').value==='1'});
 var k=C.cellKey(r.lat,r.lon),dup=mine.findIndex(function(x){return C.cellKey(x.lat,x.lon)===k&&x.carrier===r.carrier&&x.t===r.t});
 if(dup>=0)mine.splice(dup,1);
 mine.push(r);LS.nb_mine=JSON.stringify(mine);queue(r);refresh();toast(dup>=0?TT().updated:TT().sent);cur=-1;labels();myList()};
function myList(){var el=$('my_list'),l=TT();if(!el)return;var m=mine.slice(-5).reverse();$('my_h').textContent=l.mine+' ('+nf(mine.length)+')';
 el.innerHTML=m.length?m.map(function(r){var i=mine.indexOf(r);return '<li><span>'+barsSvg(r.bars)+'</span><span style="flex:1"> '+l.leg[r.bars]+' | '+r.carrier+'<br><span class="mut">'+ltr(r.t)+'</span></span><button class="btn alt sm" data-i="'+i+'" aria-label="'+l.del+'">&#10005;</button></li>'}).join(''):'<li class="mut">'+l.nomine+'</li>';
 [].forEach.call(el.querySelectorAll('button'),function(b){b.onclick=function(){mine.splice(+b.dataset.i,1);LS.nb_mine=JSON.stringify(mine);refresh();myList();toast(TT().deleted)}})}
/* auto-detect network type hint */
var cn=navigator.connection||navigator.mozConnection;function guessNet(){if(!cn||!cn.effectiveType)return null;var m={'slow-2g':'2G','2g':'2G','3g':'3G','4g':'4G'};return m[cn.effectiveType]||null}
function queue(r){if(!API)return;var q=JSON.parse(LS.nb_q||'[]');q.push(r);LS.nb_q=JSON.stringify(q);flush()}
function flush(){if(!API||!navigator.onLine)return;var q=JSON.parse(LS.nb_q||'[]');if(!q.length)return;fetch(API+'/api/readings',{method:'POST',body:JSON.stringify(q)}).then(function(r){if(r.ok)LS.nb_q='[]'}).catch(function(){})}
window.addEventListener('online',flush);
/* emergency */
function sos(){var l=TT();if(!pos){$('s_now').textContent=l.pos;$('s_msg').textContent='';$('s_list').innerHTML='';return}
 var s=C.signalAt(pos,cells),lvl=s?Math.round(s.cell.avg):null,has=lvl!==null&&lvl>=1;
 var st=$('s_status');st.className='status '+(has?'good':s?'bad':'unk');
 st.innerHTML='<b>'+(has?l.hasSig:s?l.noSig:l.unk)+'</b><div style="opacity:.9">'+l.snow+(s?barsSvg(lvl)+' '+l.leg[lvl]:l.nodata)+'</div>';
 var list=nearestN(pos,cells,2,3);
 $('s_list').innerHTML=list.map(function(n,i){var mins=Math.max(1,Math.round(n.d/1000/5*60));return '<li><span class="dirb" style="transform:rotate('+(n.bearing-90)+'deg)" aria-hidden="true">&#10148;</span><span><b>'+dm(n.d)+'</b> '+cmp(n.bearing)+'<br><span class="mut">'+l.walk+' '+nf(mins)+' '+l.min+'</span></span><a class="btn alt sm" target="_blank" rel="noopener" href="https://www.google.com/maps/dir/?api=1&destination='+n.cell.lat.toFixed(5)+','+n.cell.lon.toFixed(5)+'&travelmode=walking">'+l.nav+'</a></li>'}).join('')||'<li class="mut">'+l.none+'</li>';
 var n=list[0];if(n){$('s_dist').textContent=dm(n.d);$('s_dir').textContent=cmp(n.bearing)+' ('+nf(Math.round(n.bearing))+'\u00b0)';$('arrow').style.transform='rotate('+n.bearing+'deg)';$('s_go').onclick=function(){document.querySelector('#nav button').click();setTimeout(function(){map.invalidateSize();map.setView([n.cell.lat,n.cell.lon],15)},120)}}
 var link='https://maps.google.com/?q='+pos.lat.toFixed(5)+','+pos.lon.toFixed(5);
 var bat=battery!=null?(lang==='ar'?' | البطارية '+nf(battery)+'٪':' | battery '+battery+'%'):'';
 $('s_msg').textContent=(lang==='ar'?'محتاج مساعدة. موقعي: ':'I need help. My location: ')+pos.lat.toFixed(5)+', '+pos.lon.toFixed(5)+' '+link+bat;
 $('s_copy').onclick=function(){navigator.clipboard&&navigator.clipboard.writeText($('s_msg').textContent);toast(TT().copied)};
 $('s_share').onclick=function(){var t=$('s_msg').textContent;if(navigator.share)navigator.share({text:t}).catch(function(){});else{navigator.clipboard&&navigator.clipboard.writeText(t);toast(TT().copied)}};
 $('s_sms').href='sms:?body='+encodeURIComponent($('s_msg').textContent)}
var battery=null;if(navigator.getBattery)navigator.getBattery().then(function(b){battery=Math.round(b.level*100)});
function nearestN(p,cs,min,n){return cs.filter(function(c){return c.avg>=min}).map(function(c){return{cell:c,d:C.dist(p,c),bearing:C.bearing(p,c)}}).sort(function(a,b){return a.d-b.d}).slice(0,n)}
/* trail */
var rec=false,track=JSON.parse(LS.nb_track||'[]'),watch=null,hbars=2;
mkBars('h_bars',function(i){hbars=i;if(track.length)track[track.length-1].bars=i;var r=pos&&C.cleanReading({lat:pos.lat,lon:pos.lon,bars:i});if(r){mine.push(r);LS.nb_mine=JSON.stringify(mine);queue(r);refresh()}LS.nb_track=JSON.stringify(track);hs();toast(TT().sent)});
function hs(){$('h_stat').textContent=nf(track.length);$('h_sub').textContent=TT().hs(track.length,C.deadStretch(track))}
$('h_start').onclick=function(){if(rec){navigator.geolocation.clearWatch(watch);rec=false}else{track=[];rec=true;watch=navigator.geolocation.watchPosition(function(p){pos={lat:p.coords.latitude,lon:p.coords.longitude};var last=track[track.length-1];if(!last||C.dist(last,pos)>25){track.push({lat:pos.lat,lon:pos.lon,ts:Date.now(),bars:hbars});LS.nb_track=JSON.stringify(track);hs()}},function(){toast(TT().locFail)},{enableHighAccuracy:true})}$('h_start').textContent=rec?TT().stop:TT().start};
var routeLayer=L.layerGroup().addTo(map);
function checkRoute(pts){var l=TT();if(pts.length<2){toast(l.badGpx);return}var r=C.routeCoverage(pts,cells,250);routeLayer.clearLayers();
 for(var i=1;i<r.samples.length;i++){var s=r.samples[i],p=r.samples[i-1];L.polyline([[p.lat,p.lon],[s.lat,s.lon]],{color:s.lvl===null?'#8b9a96':COL[s.lvl],weight:6,opacity:.95,dashArray:s.lvl===null?'2 8':null}).addTo(routeLayer)}
 var b=L.latLngBounds(pts.map(function(p){return[p.lat,p.lon]}));
 var pct=r.total?Math.round(100*r.covered/r.total):0;
 $('rt_res').innerHTML='<b>'+nf(pct)+'%</b> '+l.rtCov+'<br>'+l.rtDead+': <b>'+dm(r.longestDead)+'</b> | '+l.rtUnk+': '+nf(Math.round(100*r.unknown/r.total))+'%';
 $('rt_show').hidden=false;$('rt_show').onclick=function(){document.querySelector('#nav button').click();setTimeout(function(){map.invalidateSize();map.fitBounds(b.pad(.1))},120)};return r}
$('rt_file').onchange=function(e){var f=e.target.files[0];if(!f)return;var rd=new FileReader();rd.onload=function(){checkRoute(C.parseGPX(String(rd.result)))};rd.readAsText(f)};
$('rt_trail').onclick=function(){checkRoute(track.map(function(p){return{lat:p.lat,lon:p.lon}}))};
$('ex_json').onclick=function(){var a=document.createElement('a');a.href=URL.createObjectURL(new Blob([JSON.stringify({app:'nabdah',v:1,readings:mine},null,1)],{type:'application/json'}));a.download='nabdah-my-reports.json';a.click()};
$('im_file').onchange=function(e){var f=e.target.files[0];if(!f)return;var rd=new FileReader();rd.onload=function(){try{var j=JSON.parse(rd.result),n=0;(j.readings||[]).forEach(function(r){var c=C.cleanReading(r);if(c){mine.push(c);n++}});LS.nb_mine=JSON.stringify(mine);refresh();myList();toast(nf(n)+' '+TT().imported)}catch(x){toast(TT().badJson)}};rd.readAsText(f)};
$('wipe').onclick=function(){if(confirm(TT().wipeQ)){mine=[];LS.removeItem('nb_mine');LS.removeItem('nb_track');LS.removeItem('nb_q');track=[];refresh();myList();hs();toast(TT().deleted)}};
$('h_dl').onclick=function(){if(!track.length)return;var a=document.createElement('a');a.href=URL.createObjectURL(new Blob([C.toGPX(track,'Nabdah trail')],{type:'application/gpx+xml'}));a.download='nabdah-trail.gpx';a.click()};
if(API)fetch(API+'/api/cells').then(function(r){return r.json()}).catch(function(){}); /* aggregated cells only; readings stay server-side */
if('serviceWorker' in navigator&&(location.protocol==='https:'||location.hostname==='localhost'))navigator.serviceWorker.register('sw.js').catch(function(){});
window.addEventListener('resize',function(){map.invalidateSize()});text();if(LS.nb_car)$('carrier').value=LS.nb_car;if(LS.nb_rcar)$('r_carrier').value=LS.nb_rcar;if(!/#.*,.*,/.test(location.hash)&&LS.nb_view){try{var v=JSON.parse(LS.nb_view);map.setView([v.lat,v.lon],v.z)}catch(e){}}map.on('moveend',function(){var c=map.getCenter();LS.nb_view=JSON.stringify({lat:+c.lat.toFixed(4),lon:+c.lng.toFixed(4),z:map.getZoom()})});refresh();$('onb_ok').onclick=function(){LS.nb_onb=1;$('onb').close()};if(!LS.nb_onb&&$('onb').showModal&&location.hash.indexOf('noonb')<0)$('onb').showModal();var tab=location.hash.slice(1).split('@')[0].split(',')[0];if(['report','sos','hike'].indexOf(tab)>=0)document.querySelector('#nav button[data-s="'+tab+'"]').click();
})();
