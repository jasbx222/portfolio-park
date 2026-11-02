const GH="https://github.com/jasbx222/";
const PROJECTS=[
 {latin:"Dawwerli",title:"دوّرلي",desc:"«دوّرلي» — تطبيق Flutter مع خلفية ASP.NET Core 8 + PostgreSQL",chips:["Dart","Flutter","C#","ASP.NET Core","PostgreSQL"],repo:"dawwerli-app",extra:"dawwerli-api",img:"h01-dawwerli",box:[711,38,1245,692],hot:[0,130,185,600]},
 {latin:"Dooja",title:"Dooja",desc:"",chips:["Dart","Flutter"],repo:"dooja-app",img:"h02-dooja",box:[726,18,1257,701],hot:[185,180,300,600]},
 {latin:"Molada",title:"مولّدة",desc:"تطبيق React Native لجباية اشتراكات المولدات الأهلية في العراق، يعمل أوفلاين أولاً",chips:["TypeScript","React Native","Expo"],repo:"molada-app",img:"h03-molada",box:[772,45,1231,667],hot:[300,160,460,600]},
 {latin:"Ain Glasses",title:"عين",desc:"ديمو مساعد النظارة الذكية — Flutter demo for HeyCyan/AIMB G1 smart glasses (Arabic)",chips:["Dart","Flutter","Kotlin"],repo:"ain-glasses-demo",img:"h04-ain-glasses",box:[782,116,1230,661],hot:[460,200,600,600]},
 {latin:"Payroll",title:"Payroll",desc:"تطبيق ادارة صرف الرواتب الذكي",chips:["TypeScript","Expo","PHP (Laravel backend)"],repo:"payroll-payment-app-",extra:"payroll-backend-payment-service",img:"h05-payroll",box:[727,60,1254,663],hot:[600,200,800,600]},
 {latin:"Clinic System",title:"نظام العيادة",desc:"Laravel for Backend",chips:["PHP","Laravel","Blade"],repo:"Clinic-Management-System-Backend",extra:"Clinic-LandingPage-Dashboard-Booking",img:"h06-clinic",box:[728,50,1243,677],hot:[800,210,950,600]},
 {latin:"Delivery System",title:"نظام التوصيل",desc:"نظام إدارة توصيل متكامل باستخدام ASP.NET Core Web API وEF Core وSQL Server وRedis",chips:["C#","ASP.NET Core","SQL Server","Redis"],repo:"Delivery-Management-System",img:"h07-delivery",box:[807,50,1253,683],hot:[950,190,1110,600]},
 {latin:"POS",title:"نظام الكاشير POS",desc:"نظام POS للكاشير: إضافة منتجات وشراء وبيع وعرض تفاصيل المبيعات",chips:["C#","ASP.NET"],repo:"Pos-Caher-system-Asp.net",img:"h08-pos",box:[732,141,1250,671],hot:[1110,170,1280,600]},
];
const SKILLS=[{g:"واجهات",s:["React","Next.js","Vue"]},{g:"خلفية",s:["Laravel","ASP.NET Core","NestJS","PostgreSQL"]},{g:"موبايل",s:["Flutter","React Native"]}];
const ORN=`<svg viewBox="0 0 46 46" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M4 42V14C4 8 8 4 14 4h28"/><path d="M9 38V17c0-5 3-8 8-8h21"/><path d="M14 4c2 6 8 8 12 5s1-8-3-6M4 14c6 2 8 8 5 12s-8 1-6-3"/><circle cx="9" cy="9" r="2.2" fill="currentColor"/></svg>`;
const orns=`<i class="orn tl">${ORN}</i><i class="orn tr">${ORN}</i><i class="orn bl">${ORN}</i><i class="orn br">${ORN}</i>`;
const ICON={gh:`<svg viewBox="0 0 24 24"><path fill="#1A1617" d="M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.6 18.3 5 18.3 5c.7 1.7.3 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .5"/></svg>`,
 mail:`<svg viewBox="0 0 24 24" fill="none" stroke="#1A1617" stroke-width="1.7"><rect x="3" y="5" width="18" height="14" rx="1"/><path d="m3 6 9 7 9-7"/></svg>`,
 ph:`<svg viewBox="0 0 24 24" fill="none" stroke="#1A1617" stroke-width="1.7"><rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/></svg>`,
 li:`<svg viewBox="0 0 24 24"><rect width="24" height="24" rx="3" fill="#0A66C2"/><path fill="#fff" d="M5 9h3v10H5zM6.5 4.5a1.7 1.7 0 1 1 0 3.4 1.7 1.7 0 0 1 0-3.4M10 9h2.9v1.4c.4-.8 1.4-1.6 3-1.6 3.1 0 3.6 2 3.6 4.7V19h-3v-4.9c0-1.2 0-2.6-1.6-2.6s-1.9 1.2-1.9 2.5v5H10z"/></svg>`};
const X=`<button class="x" aria-label="إغلاق" data-close>✕</button>`;
const CARDS={
 about:{box:[866,125,1244,640],html:`${X}<h1 style="margin-top:calc(var(--u)*70)">عنّي</h1><h2 style="font-size:calc(var(--u)*34);margin-top:calc(var(--u)*14)">جاسم محمد</h2><p style="direction:rtl">مطوّر Full Stack</p><p style="margin-top:calc(var(--u)*22)">أعمل في تطوير الويب</p><p>أحب البرمجة والتصميم</p>`},
 skills:{box:[864,86,1262,637],html:`<h1 style="font-size:calc(var(--u)*48);margin:calc(var(--u)*4) 0 0">المهارات</h1><div class="rule" style="width:46%"></div>`+SKILLS.map(g=>`<div class="grp">${g.g}</div><div class="chips" style="margin:calc(var(--u)*6) 0;direction:ltr">${g.s.map(s=>`<span class="chip">${s}</span>`).join("")}</div>`).join("")},
 contact:{box:[815,52,1244,672],html:`<h1 style="font-size:calc(var(--u)*70);margin:calc(var(--u)*30) 0 calc(var(--u)*22)">تواصل</h1>
  <a class="row" href="${GH}" target="_blank" rel="noopener">${ICON.gh}<b>GitHub</b><span class="v">jasbx222</span></a>
  <div class="row">${ICON.mail}<b>البريد</b><span class="v">قريباً</span></div>
  <div class="row">${ICON.ph}<b>واتساب</b><span class="v">قريباً</span></div>
  <div class="row">${ICON.li}<b>LinkedIn</b><span class="v">قريباً</span></div>
  <a class="send" href="${GH}" target="_blank" rel="noopener">أرسل رسالة</a>`},
};
function houseCard(p){ return `${X}<h1>${p.title}</h1><div class="rule"></div><div class="lat">${p.latin}</div><div class="rule" style="width:34%"></div>
 ${p.desc?`<p>${p.desc}</p>`:""}<div class="chips">${p.chips.map(c=>`<span class="chip">${c}</span>`).join("")}</div>
 <a class="repo" href="${GH+p.repo}" target="_blank" rel="noopener">github.com/jasbx222/${p.repo}</a>
 <a class="gh" href="${GH+p.repo}" target="_blank" rel="noopener">GitHub</a>
 ${p.extra?`<a class="comp" href="${GH+p.extra}" target="_blank" rel="noopener">+ ${p.extra}</a>`:""}`; }
const padb=b=>[b[0]-8,b[1]-8,Math.min(1278,b[2]+28),Math.min(716,b[3]+12)];
const pct=(b)=>`left:${b[0]/12.8}%;top:${b[1]/7.2}%;width:${(b[2]-b[0])/12.8}%;height:${(b[3]-b[1])/7.2}%`;
const VIEWS={
 home:{img:"d01-main",focus:.5,hots:[
   {to:"about",b:[20,0,345,255],t:"القلعة — عنّي"},{to:"about",b:[600,40,720,330],t:"برج الساعة — عنّي"},
   {to:"projects",b:[120,205,430,385],t:"قاعة المعارض — المشاريع"},{to:"skills",b:[215,375,415,555],t:"الدوّامة — المهارات"},
   {to:"experience",b:[460,395,800,565],t:"القطار — الخبرة"},{to:"experience",b:[730,315,900,420],t:"المحطة — الخبرة"},
   {to:"contact",b:[935,200,1165,375],t:"مكتب البريد — تواصل"},{to:"contact",b:[1015,70,1110,215],t:"المنطاد — تواصل"}],
  extra:`<img class="spr bob" src="img/dragon0.webp" style="${pct([800,32,1100,215])}"><img class="spr bob" src="img/dragon1.webp" style="${pct([1110,95,1278,300])};animation-delay:-2s">
   <div class="glow" style="${pct([150,560,190,600])}"></div><div class="glow" style="${pct([700,560,730,590])};animation-delay:-.7s"></div><div class="glow" style="${pct([1040,520,1070,550])};animation-delay:-1.1s"></div>`,
  smoke:[[490,498]]},
 about:{img:"d02-about",focus:.36,card:"about",extra:`<div class="glow" style="${pct([196,355,246,405])}"></div><div class="glow" style="${pct([416,350,466,400])};animation-delay:-.5s"></div><div class="glow" style="${pct([602,340,652,390])};animation-delay:-1s"></div><div class="glow" style="${pct([670,520,720,570])};animation-delay:-.3s"></div><div class="glow" style="${pct([352,575,408,630])};animation-delay:-1.3s"></div>`, flags:[[279,447,340,650],[470,433,515,600],[355,302,406,398]]},
 skills:{img:"d04-skills",focus:.36,card:"skills",extra:`<div class="board" style="${pct([448,256,562,293])}">Laravel</div><div class="board" style="${pct([596,256,702,293])};font-size:calc(var(--u)*16)">NestJS</div>
   <div class="glow" style="${pct([20,445,60,485])}"></div><div class="glow" style="${pct([750,455,790,495])};animation-delay:-.6s"></div><div class="glow" style="${pct([40,545,90,595])};animation-delay:-1.2s"></div>`},
 experience:{img:"d05-experience",focus:.5,extra:"",smoke:[[552,385]]},
 contact:{img:"d06-contact",focus:.33,card:"contact",extra:`<div class="glow" style="${pct([280,505,340,560])}"></div><div class="glow" style="${pct([365,460,405,500])};animation-delay:-.8s"></div>`},
 projects:{img:"h00-street",focus:.5,hots:PROJECTS.map((p,i)=>({house:i,b:p.hot,t:`${p.title} — ${p.latin}`})),
  extra:`<div class="glow" style="${pct([170,445,220,495])}"></div><div class="glow" style="${pct([12,490,52,530])};animation-delay:-.4s"></div><div class="glow" style="${pct([1225,490,1265,530])};animation-delay:-.9s"></div>`, walkers:true},
};
PROJECTS.forEach((p,i)=>VIEWS["h"+i]={img:p.img,focus:.3,house:i});
const stage=document.getElementById("stage"), vp=document.getElementById("vp");
const WALK=`<svg viewBox="0 0 20 50"><circle cx="10" cy="6" r="4" fill="#1b1210"/><rect x="5" y="1" width="10" height="3" fill="#1b1210"/><path d="M5 12h10l2 22H3z" fill="#2a1a16"/><path d="M6 34l-2 15h4l2-12 2 12h4l-2-15z" fill="#1b1210"/></svg>`;
const LADY=`<svg viewBox="0 0 24 50"><circle cx="12" cy="7" r="4" fill="#1b1210"/><path d="M8 12h8l6 36H2z" fill="#3a1c1c"/><path d="M2 4q10-8 20 0z" fill="#4a2a24"/><path d="M12 4v10" stroke="#1b1210"/></svg>`;
for(const [k,v] of Object.entries(VIEWS)){
  const d=document.createElement("section"); d.className="view"; d.dataset.v=k;
  let h=`<div class="bg"><img src="img/${v.img}.webp" alt="" draggable="false"></div>${v.extra||""}`;
  (v.flags||[]).forEach(f=>h+=`<div class="flag" style="${pct(f)};background-image:url(img/${v.img}.webp);background-position:-${f[0]}px -${f[1]}px;background-size:1280px 720px"></div>`);
  if(v.walkers) [[ 120,640,46,"-420",38,WALK],[880,655,48,"-360",44,LADY],[300,660,40,"500",52,WALK]].forEach(([x,y,hh,dd,dur,svg])=>h+=`<div class="walker" style="left:${x/12.8}%;top:${(y-hh)/7.2}%;width:${hh*.42/12.8}%;height:${hh/7.2}%;--d:calc(var(--u)*${dd});animation-duration:${dur}s;opacity:.85;${+dd>0?"":"transform:scaleX(-1)"}">${svg}</div>`);
  (v.hots||[]).forEach(o=>h+=`<a class="hot" tabindex="0" role="button" style="${pct(o.b)}" data-t="${o.t}" ${o.to?`data-to="${o.to}"`:`data-house="${o.house}"`}></a>`);
  if(v.card) h+=`<div class="card" style="${pct(padb(CARDS[v.card].box))}">${orns}${CARDS[v.card].html}</div>`;
  if(v.house!=null) h+=`<div class="card" style="${pct(padb(PROJECTS[v.house].box))}">${orns}${houseCard(PROJECTS[v.house])}</div>`;
  d.innerHTML=h; stage.appendChild(d); v.el=d;
}
// distant dragons crossing sky on home & street
[["home","M -120 160 C 200 60, 500 120, 800 40 S 1300 90, 1500 60",46],["projects","M 1400 120 C 1100 40, 800 140, 500 60 S 100 100, -200 50",38]].forEach(([k,path,dur])=>{
  const s=document.createElement("img"); s.src="img/dragon1.webp"; s.className="fly"; s.style.cssText=`offset-path:path("${path}");animation-duration:${dur}s;width:calc(var(--u)*54);${k==="projects"?"":"transform:scaleX(-1)"}`;
  const w=document.createElement("div"); w.style.cssText="position:absolute;inset:0;pointer-events:none;overflow:hidden"; s.classList.add("flap"); w.appendChild(s); VIEWS[k].el.appendChild(w); });
// layout
let mobile=false, cur=null, scale=1;
function layout(){ const W=innerWidth,H=innerHeight; mobile=W<=820&&H>W;
  scale=mobile?H/720:Math.max(W/1280,H/720); const sw=1280*scale, sh=720*scale;
  stage.style.transform=`scale(${scale})`; stage.style.setProperty("--u","1px");
  if(mobile){ stage.style.left="0px"; stage.style.top="0px"; stage.parentElement.style.width=""; stage.style.marginRight="0"; vp.firstElementChild; document.getElementById("stage").style.width="1280px"; vp.style.setProperty("--sw",sw+"px"); spacer.style.width=sw+"px"; focusTo(VIEWS[cur||"home"].focus,false); }
  else { spacer.style.width="0px"; stage.style.left=(W-sw)/2+"px"; stage.style.top=(H-sh)/2+"px"; } }
const spacer=document.createElement("div"); spacer.style.cssText="height:1px;position:absolute;top:0;left:0"; vp.appendChild(spacer);
function focusTo(f,smooth=true){ if(!mobile) return; const sw=1280*scale; vp.scrollTo({left:Math.max(0,f*sw-innerWidth/2),behavior:smooth?"smooth":"auto"}); }
addEventListener("resize",layout);
// navigation
const sheet=document.getElementById("sheet"), back=document.getElementById("back"), nav=document.getElementById("nav"), prev=document.getElementById("prev"), next=document.getElementById("next");
function show(k,origin){ if(k===cur) return; const old=cur&&VIEWS[cur].el, nv=VIEWS[k].el;
  if(old){ old.style.transformOrigin=origin||"50% 50%"; old.classList.add(origin?"zoom":""||"x"); old.classList.remove("on"); setTimeout(()=>old.classList.remove("zoom","x"),1000); }
  nv.classList.add("pre"); nv.classList.add("on"); requestAnimationFrame(()=>requestAnimationFrame(()=>nv.classList.remove("pre")));
  cur=k; const v=VIEWS[k];
  nav.querySelectorAll("button").forEach(b=>b.classList.toggle("on",b.dataset.v===k||(v.house!=null&&b.dataset.v==="projects")));
  back.style.display=k==="home"?"none":"block"; back.textContent=v.house!=null?"↩ رجوع للشارع":"↩ رجوع للمدينة";
  prev.style.display=next.style.display=v.house!=null?"block":"none";
  const html=v.card?`<div class="card">${orns}${CARDS[v.card].html}</div>`:v.house!=null?`<div class="card">${orns}${houseCard(PROJECTS[v.house])}</div>`:"";
  sheet.innerHTML=html; sheet.classList.toggle("open",!!html); sheet.querySelectorAll("[data-close]").forEach(b=>b.onclick=goBack);
  nv.querySelectorAll("[data-close]").forEach(b=>b.onclick=goBack);
  layout(); focusTo(v.focus);
  const hash=k==="home"?"":v.house!=null?"#projects/"+PROJECTS[v.house].repo:"#"+k; if(location.hash!==hash) history.replaceState(null,"",hash||location.pathname);
}
function goBack(){ show(VIEWS[cur].house!=null?"projects":"home"); }
const openHouse=i=>show("h"+((i+8)%8));
back.onclick=goBack; prev.onclick=()=>openHouse(VIEWS[cur].house-1); next.onclick=()=>openHouse(VIEWS[cur].house+1);
nav.querySelectorAll("button").forEach(b=>b.onclick=()=>show(b.dataset.v));
const tip=document.getElementById("tip");
stage.addEventListener("click",e=>{ const h=e.target.closest(".hot"); if(!h) return; const r=h.getBoundingClientRect(), s=VIEWS[cur].el.getBoundingClientRect();
  const o=`${(r.left+r.width/2-s.left)/s.width*100}% ${(r.top+r.height/2-s.top)/s.height*100}%`; tip.style.display="none";
  h.dataset.to?show(h.dataset.to,o):show("h"+h.dataset.house,o); });
stage.addEventListener("keydown",e=>{ if(e.key==="Enter"&&e.target.classList.contains("hot")) e.target.click(); });
stage.addEventListener("pointerover",e=>{ const h=e.target.closest(".hot"); if(h&&matchMedia("(hover:hover)").matches){ tip.textContent=h.dataset.t; tip.style.display="block"; } });
stage.addEventListener("pointerout",e=>{ if(e.target.closest(".hot")) tip.style.display="none"; });
addEventListener("keydown",e=>{ if(e.key==="Escape"&&cur!=="home") goBack(); const v=VIEWS[cur]; if(v&&v.house!=null){ if(e.key==="ArrowLeft") openHouse(v.house+1); if(e.key==="ArrowRight") openHouse(v.house-1); } });
// parallax
let mx=0,my=0,tx=0,ty=0;
addEventListener("pointermove",e=>{ mx=e.clientX/innerWidth-.5; my=e.clientY/innerHeight-.5; tip.style.left=e.clientX+"px"; tip.style.top=e.clientY+"px"; });
const reduced=matchMedia("(prefers-reduced-motion: reduce)").matches;
// fx canvas: clouds + smoke
const fx=document.getElementById("fx"), c=fx.getContext("2d"); let puffs=[];
const clouds=Array.from({length:9},(_,i)=>({x:Math.random()*1400-60,y:610+Math.random()*120,r:60+Math.random()*80,s:4+Math.random()*6,a:.10+Math.random()*.1}));
function toScreen(x,y){ const r=stage.getBoundingClientRect(); return [r.left+x*r.width/1280,r.top+y*r.height/720,r.width/1280]; }
let last=performance.now();
function frame(t){ const dt=Math.min(.05,(t-last)/1000); last=t; fx.width=innerWidth*devicePixelRatio; fx.height=innerHeight*devicePixelRatio; c.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);
  if(!reduced){ tx+=(mx-tx)*.06; ty+=(my-ty)*.06; }
  const v=cur&&VIEWS[cur]; if(v){ const img=v.el.querySelector(".bg img"); img.style.transform=`translate(${-tx*14}px,${-ty*10}px) scale(1.01)`;
    v.el.querySelectorAll(".spr,.glow,.flag,.board,.walker").forEach(()=>{});
    // smoke
    (v.smoke||[]).forEach(([x,y])=>{ if(Math.random()<dt*7) puffs.push({x,y,life:1,vx:8+Math.random()*6,vy:-18-Math.random()*8,r:5}); });
    puffs.forEach(p=>{ p.life-=dt*.33; p.x+=p.vx*dt; p.y+=p.vy*dt; p.r+=dt*9; const [sx,sy,k]=toScreen(p.x-tx*14/scale,p.y-ty*10/scale); const g=c.createRadialGradient(sx,sy,0,sx,sy,p.r*k);
      g.addColorStop(0,`rgba(225,215,205,${.45*p.life})`); g.addColorStop(1,"rgba(225,215,205,0)"); c.fillStyle=g; c.beginPath(); c.arc(sx,sy,p.r*k,0,7); c.fill(); });
    puffs=puffs.filter(p=>p.life>0&&v.smoke);
    if(["home","experience","projects"].includes(cur)||!cur) clouds.forEach(cl=>{ cl.x+=cl.s*dt*(reduced?0:1); if(cl.x>1400) cl.x=-150; const [sx,sy,k]=toScreen(cl.x+tx*30/scale,cl.y+ty*16/scale); const rr=cl.r*k;
      const g=c.createRadialGradient(sx,sy,0,sx,sy,rr); g.addColorStop(0,`rgba(255,200,170,${cl.a})`); g.addColorStop(1,"rgba(255,200,170,0)"); c.fillStyle=g; c.beginPath(); c.ellipse(sx,sy,rr*1.8,rr,0,0,7); c.fill(); });
  }
  requestAnimationFrame(frame); }
vp.addEventListener("scroll",()=>{ tx=(vp.scrollLeft/(1280*scale-innerWidth+1)-.5)*.6; });
// boot
layout();
const m=location.hash.match(/^#(\w+)(?:\/(.+))?/); let start="home";
if(m){ if(m[1]==="projects"&&m[2]){ const i=PROJECTS.findIndex(p=>p.repo===decodeURIComponent(m[2])); start=i>=0?"h"+i:"projects"; } else if(VIEWS[m[1]]) start=m[1]; }
const imgs=[...stage.querySelectorAll(".bg img")]; let shown=false; const boot=()=>{ if(shown) return; shown=true; show(start); const L=document.getElementById("load"); L.style.opacity=0; setTimeout(()=>L.remove(),900); requestAnimationFrame(frame); };
imgs[0].decode?imgs[0].decode().then(boot,boot):imgs[0].onload=boot; setTimeout(boot,4000);
window.__open=k=>show(k); window.__house=i=>openHouse(i); window.__home=()=>show("home");
