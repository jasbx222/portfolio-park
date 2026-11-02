import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const C = { grass:0x7FB069, grass2:0x6E9F5B, path:0xF2D7A6, rock:0x8C6A4F, rock2:0x5E4636, terra:0xD9673E, teal:0x2A9D8F, gold:0xF4B942, red:0xE85D5D, blue:0x3D5A80, cream:0xF7E9D3, ink:0x2B2D42, purple:0x8E6CC4, green:0x7DBE5A, wood:0xA9744F, stone:0xE8D9BC, wall:0xB8C4D6, wagon:0xC47A3F };
const mobile = innerWidth < 768 || /Mobi/.test(navigator.userAgent);

const PROJECTS = [
  { n:"Dawwerli", d:"منصة متكاملة: تطبيق Flutter مع API بـ ASP.NET Core 8 وPostgreSQL ولوحات تحكم للبائع والإدارة.", t:["Flutter","ASP.NET Core","PostgreSQL"], r:"dawwerli-app" },
  { n:"Dooja", d:"تطبيق موبايل مبني بـ Dart/Flutter.", t:["Flutter","Dart"], r:"dooja-app" },
  { n:"Molada", d:"تطبيق مبني بـ TypeScript.", t:["TypeScript"], r:"molada-app" },
  { n:"Ain Glasses", d:"ديمو تطبيق للنظارات الذكية بـ Flutter.", t:["Flutter","Dart"], r:"ain-glasses-demo" },
  { n:"Clinic System", d:"نظام إدارة عيادة: باك إند Laravel وواجهة حجز ولوحة تحكم بـ React.", t:["Laravel","React"], r:"Clinic-Management-System-Backend" },
  { n:"Payroll", d:"تطبيق دفع الرواتب مع خدمة باك إند للمدفوعات.", t:["Mobile","Backend"], r:"payroll-backend-payment-service" },
  { n:"Delivery", d:"نظام إدارة التوصيل.", t:["C#","ASP.NET"], r:"Delivery-Management-System" },
  { n:"POS", d:"نظام كاشير ونقاط بيع بـ ASP.NET.", t:["ASP.NET","C#"], r:"Pos-Caher-system-Asp.net" },
];
const SKILLS = [
  { g:"واجهات", s:["React","Next.js","Vue"] },
  { g:"خلفية", s:["Laravel","ASP.NET","NestJS","PostgreSQL"] },
  { g:"موبايل", s:["Flutter","React Native"] },
];
const SEATS = ["React","Next.js","Laravel","ASP.NET","PostgreSQL","React Native","NestJS","Flutter"];
const SEATCOL = [C.red,C.blue,C.green,C.gold,0x4FB3D9,0xE86A9A,C.purple,0xF08A3C];

// ---------- renderer / scene ----------
const canvas = document.getElementById("c");
const renderer = new THREE.WebGLRenderer({ canvas, antialias:true, alpha:true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
renderer.setSize(innerWidth, innerHeight);
renderer.shadowMap.enabled = !mobile;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputColorSpace = THREE.SRGBColorSpace;
const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0xF2C9A8, 60, 140);
const camera = new THREE.PerspectiveCamera(35, innerWidth/innerHeight, 0.5, 400);
const HOME = { p:new THREE.Vector3(40,33,40), t:new THREE.Vector3(0,0,0) };
camera.position.copy(HOME.p);
const controls = new OrbitControls(camera, canvas);
controls.target.copy(HOME.t); controls.enableDamping = true; controls.enablePan = false;
controls.minDistance = 18; controls.maxDistance = 90; controls.maxPolarAngle = 1.25; controls.minPolarAngle = 0.5;
const baseAz = Math.PI/4; controls.minAzimuthAngle = baseAz - 0.7; controls.maxAzimuthAngle = baseAz + 0.7;

scene.add(new THREE.HemisphereLight(0xC9B6D9, 0x7FB069, 0.9));
const sun = new THREE.DirectionalLight(0xFFB877, 2.2);
sun.position.set(-30,25,20); sun.castShadow = true;
sun.shadow.mapSize.set(2048,2048);
Object.assign(sun.shadow.camera, { left:-26, right:26, top:26, bottom:-26, near:1, far:90 });
sun.shadow.bias = -0.0008; scene.add(sun);
scene.add(new THREE.AmbientLight(0xffe6d0, 0.35));

const matCache = {};
const M = (c) => matCache[c] ||= new THREE.MeshStandardMaterial({ color:c, roughness:0.9, flatShading:true });
function mesh(geo, c, parent, x=0,y=0,z=0, cast=true){ const m=new THREE.Mesh(geo, M(c)); m.position.set(x,y,z); m.castShadow=cast; m.receiveShadow=true; parent&&parent.add(m); return m; }
const rnd = (a,b)=>a+Math.random()*(b-a);
function jitter(geo, amt){ const p=geo.attributes.position; for(let i=0;i<p.count;i++){ p.setXYZ(i,p.getX(i)+rnd(-amt,amt),p.getY(i)+rnd(-amt,amt),p.getZ(i)+rnd(-amt,amt)); } geo.computeVertexNormals(); return geo; }

const world = new THREE.Group(); scene.add(world);
const island = new THREE.Group(); world.add(island);

// ---------- island ----------
{
  const top = new THREE.CylinderGeometry(20,19.6,1,28,1);
  const p = top.attributes.position;
  for (let i=0;i<p.count;i++){ const x=p.getX(i), z=p.getZ(i), r=Math.hypot(x,z); if(r>1){ const a=Math.atan2(z,x); const k=1+0.035*Math.sin(a*5)+0.02*Math.sin(a*11); p.setX(i,x*k); p.setZ(i,z*k);} }
  top.computeVertexNormals();
  mesh(top, C.grass, island, 0,-0.5,0, false);
  // cliff band
  const band = jitter(new THREE.CylinderGeometry(19.7,18.5,3,28,2), 0.35);
  mesh(band, C.rock, island, 0,-2.4,0, false);
  // underside cone, two tones
  const cone = jitter(new THREE.ConeGeometry(18.5,18,18,4), 0.9);
  cone.rotateX(Math.PI);
  const cols=[]; const cp=cone.attributes.position; const a=new THREE.Color(C.rock), b=new THREE.Color(C.rock2);
  for(let i=0;i<cp.count;i+=3){ const c=Math.random()<0.5?a:b; for(let k=0;k<3;k++) cols.push(c.r,c.g,c.b); }
  const cone2 = cone.toNonIndexed(); const cc=[]; for(let i=0;i<cone2.attributes.position.count;i+=3){ const c=Math.random()<0.5?a:b; for(let k=0;k<3;k++) cc.push(c.r,c.g,c.b); }
  cone2.setAttribute("color", new THREE.Float32BufferAttribute(cc,3)); cone2.computeVertexNormals();
  const cm = new THREE.Mesh(cone2, new THREE.MeshStandardMaterial({ vertexColors:true, roughness:0.95, flatShading:true }));
  cm.position.y = -12.9; island.add(cm);
  // plaza + paths
  mesh(new THREE.CylinderGeometry(4,4,0.06,24), C.path, island, 0,0.03,0, false);
}
const RIDES = {
  about:   { pos:new THREE.Vector3(-8,0,-8) },
  projects:{ pos:new THREE.Vector3(-9.5,0,5) },
  skills:  { pos:new THREE.Vector3(6.5,0,1.5) },
  contact: { pos:new THREE.Vector3(5,0,-9.5) },
};
function pathTo(v){ const len=v.length(); const g=new THREE.BoxGeometry(2.5,0.05,len); const m=mesh(g,C.path,island,v.x/2,0.025,v.z/2,false); m.rotation.y=Math.atan2(v.x,v.z); }
Object.values(RIDES).forEach(r=>pathTo(r.pos));
pathTo(new THREE.Vector3(10,0,10));

// ---------- canvas label helper ----------
function label(text, w=2, h=0.7, bg="#E9D3A8", fg="#2B2D42", fs=64){
  const cv=document.createElement("canvas"); cv.width=512; cv.height=Math.round(512*h/w);
  const x=cv.getContext("2d"); x.fillStyle="#7a5232"; x.fillRect(0,0,cv.width,cv.height);
  x.fillStyle=bg; x.fillRect(10,10,cv.width-20,cv.height-20);
  x.fillStyle=fg; x.font=`700 ${fs}px Tajawal, Arial`; x.textAlign="center"; x.textBaseline="middle";
  let f=fs; while(x.measureText(text).width>cv.width-40 && f>20){ f-=4; x.font=`700 ${f}px Tajawal, Arial`; }
  x.fillText(text, cv.width/2, cv.height/2+4);
  const t=new THREE.CanvasTexture(cv); t.colorSpace=THREE.SRGBColorSpace; t.anisotropy=4;
  return new THREE.Mesh(new THREE.PlaneGeometry(w,h), new THREE.MeshBasicMaterial({ map:t, side:THREE.DoubleSide }));
}

const pickables = []; // {obj, key}
function rideGroup(key){ const g=new THREE.Group(); g.position.copy(RIDES[key].pos); island.add(g); RIDES[key].g=g; g.userData.key=key; pickables.push(g); return g; }

// ---------- tower (about) ----------
let flag;
{
  const g = rideGroup("about");
  mesh(jitter(new THREE.CylinderGeometry(4.6,5,0.8,10),0.1), C.stone, g, 0,0.4,0);
  const rs=[3.2,2.8,2.4], hs=[4,3.4,2.6]; let y=0.8;
  rs.forEach((r,i)=>{ mesh(new THREE.CylinderGeometry(r,r*1.03,hs[i],12), i%2?0xEFE2C8:C.stone, g, 0,y+hs[i]/2,0);
    mesh(new THREE.CylinderGeometry(r+0.2,r+0.2,0.3,12), 0xD6C3A0, g, 0,y+hs[i],0);
    for(let k=0;k<4;k++){ const a=k/4*Math.PI*2+Math.PI/4+i*0.4; const w=mesh(new THREE.BoxGeometry(0.5,0.9,0.2), C.ink, g, Math.sin(a)*(r+0.01),y+hs[i]*0.55,Math.cos(a)*(r+0.01),false); w.rotation.y=a; }
    y+=hs[i]; });
  // battlement teeth
  for(let k=0;k<12;k++){ const a=k/12*Math.PI*2; mesh(new THREE.BoxGeometry(0.5,0.5,0.5),C.stone,g,Math.sin(a)*2.5,y+0.4,Math.cos(a)*2.5); }
  mesh(new THREE.ConeGeometry(2.9,4,8), C.terra, g, 0,y+0.15+2,0);
  // door + stairs facing camera
  const door=mesh(new THREE.BoxGeometry(1.2,1.8,0.3),0x6B4A33,g,0,1.7,3.1,false); door.rotation.y=0;
  const dd=new THREE.Group(); dd.rotation.y=Math.PI/4; g.add(dd); dd.add(door); door.position.set(0,1.7,3.15);
  for(let s=0;s<3;s++) { const st=mesh(new THREE.BoxGeometry(2,0.25,0.6),C.stone,dd,0,0.12+s*0.25,4.9-s*0.5); }
  mesh(new THREE.CylinderGeometry(0.06,0.06,2.2,6), C.ink, g, 0,y+4.8,0);
  const fg = new THREE.PlaneGeometry(1,0.6,10,1); flag = new THREE.Mesh(fg, new THREE.MeshStandardMaterial({color:C.terra,side:THREE.DoubleSide,roughness:.9}));
  flag.position.set(0.5,y+5.55,0); g.add(flag); flag.userData.base = fg.attributes.position.array.slice();
  // rocks around base
  for(let k=0;k<7;k++){ const a=rnd(0,6.28); mesh(jitter(new THREE.DodecahedronGeometry(rnd(.3,.6),0),.05),C.stone,g,Math.cos(a)*5.2,0.3,Math.sin(a)*5.2); }
}

// ---------- ferris wheel (projects) ----------
const ferris = { gondolas:[] };
{
  const g = rideGroup("projects");
  g.rotation.y = Math.PI/4; // face the camera
  mesh(jitter(new THREE.CylinderGeometry(4.5,5,0.6,10),0.08), C.wood, g, 0,0.3,0);
  const H = 8.2;
  [[-1,1],[1,1],[-1,-1],[1,-1]].forEach(([sx,sz])=>{ const leg=mesh(new THREE.CylinderGeometry(0.22,0.3,9,6),C.teal,g,sx*1.9,4.4,sz*0.9); leg.rotation.z = -sx*0.22; leg.rotation.x = sz*0.1; });
  const wheel = new THREE.Group(); wheel.position.y = H; g.add(wheel); ferris.wheel = wheel;
  [-0.5,0.5].forEach(z=>{ const rim=mesh(new THREE.TorusGeometry(7,0.25,6,32),C.teal,wheel,0,0,z); const r2=mesh(new THREE.TorusGeometry(4.5,0.15,6,24),C.teal,wheel,0,0,z); });
  for(let i=0;i<16;i++){ const a=i/16*Math.PI*2; [-0.5,0.5].forEach(z=>{ const s=mesh(new THREE.BoxGeometry(0.16,7,0.16),C.teal,wheel,Math.cos(a)*3.5,Math.sin(a)*3.5,z); s.rotation.z=a-Math.PI/2; }); }
  const hub=mesh(new THREE.CylinderGeometry(0.9,0.9,1.6,8),C.teal,wheel); hub.rotation.x=Math.PI/2;
  mesh(new THREE.CylinderGeometry(0.5,0.5,1.8,6),0xC97B4A,wheel).rotation.x=Math.PI/2;
  const gcols=[C.gold,0x6FA8DC,C.purple,0xE08A4A,C.red,0x5B86C9,C.purple,C.green];
  PROJECTS.forEach((p,i)=>{
    const a = Math.PI/2 - i/8*Math.PI*2;
    const pivot = new THREE.Group(); pivot.position.set(Math.cos(a)*7, Math.sin(a)*7, 0); wheel.add(pivot);
    const gd = new THREE.Group(); pivot.add(gd);
    mesh(new THREE.BoxGeometry(0.08,0.8,0.08), C.ink, gd, 0,-0.4,0);
    const body=mesh(new THREE.BoxGeometry(1.5,1.2,1.3), gcols[i], gd, 0,-1.3,0);
    mesh(new THREE.BoxGeometry(1.7,0.25,1.5), gcols[i], gd, 0,-0.6,0);
    mesh(new THREE.BoxGeometry(1.2,0.5,1.32), 0x3a3550, gd, 0,-1.1,0,false);
    const sign = label(p.n, 1.9, 0.62); sign.position.set(0,-1.95,0.72); gd.add(sign);
    const back = sign.clone(); back.position.z=-0.72; back.rotation.y=Math.PI; gd.add(back);
    body.userData.project = i;
    ferris.gondolas.push({ pivot, gd, i, body });
  });
  ferris.angle = 0; ferris.targetIdx = null;
}

// ---------- carousel (skills) ----------
const carousel = { seats:[] };
{
  const g = rideGroup("skills");
  mesh(new THREE.CylinderGeometry(5.6,5.8,0.35,24), C.wood, g, 0,0.18,0);
  mesh(new THREE.CylinderGeometry(5,5,0.6,24), 0xC9935F, g, 0,0.6,0);
  const spin = new THREE.Group(); spin.position.y=0.9; g.add(spin); carousel.spin=spin;
  mesh(new THREE.CylinderGeometry(1,1,3.6,12), 0xE86A5A, spin, 0,1.8,0);
  for(let i=0;i<8;i++){ const a=i/8*Math.PI*2; mesh(new THREE.CylinderGeometry(0.12,0.12,3.6,6),C.gold,spin,Math.cos(a)*4.3,1.8,Math.sin(a)*4.3); }
  // striped canopy
  const segs=16; for(let i=0;i<segs;i++){ const geo=new THREE.ConeGeometry(5.4,2.5,1,1,true,i/segs*Math.PI*2,Math.PI*2/segs); const m=new THREE.Mesh(geo,new THREE.MeshStandardMaterial({color:i%2?C.cream:C.red,roughness:.9,flatShading:true,side:THREE.DoubleSide})); m.position.y=4.85; m.castShadow=true; spin.add(m); }
  mesh(new THREE.CylinderGeometry(5.45,5.45,0.5,16,1,true), C.gold, spin, 0,3.55,0);
  for(let i=0;i<16;i++){ const a=(i+0.5)/16*Math.PI*2; const v=mesh(new THREE.ConeGeometry(0.55,0.5,3),C.gold,spin,Math.cos(a)*5.35,3.1,Math.sin(a)*5.35); v.rotation.x=Math.PI; }
  mesh(new THREE.SphereGeometry(0.4,8,6), C.gold, spin, 0,6.4,0);
  mesh(new THREE.CylinderGeometry(0.05,0.05,0.6,4), C.gold, spin, 0,6.1,0);
  SEATS.forEach((s,i)=>{ const a=i/8*Math.PI*2+Math.PI/8; const sg=new THREE.Group(); sg.position.set(Math.cos(a)*3.2,0.9,Math.sin(a)*3.2); sg.rotation.y=-a+Math.PI/2; spin.add(sg);
    mesh(new THREE.CylinderGeometry(0.06,0.06,3,5),C.gold,sg,0,1.2,0);
    const blk=mesh(new THREE.BoxGeometry(1.7,0.9,0.8),SEATCOL[i],sg,0,0,0);
    mesh(new THREE.BoxGeometry(1.7,0.5,0.25),SEATCOL[i],sg,0,0.6,-0.3);
    const lb=label(s,1.5,0.5,"#ffffff00","#ffffff",70); lb.material.transparent=true; lb.position.set(0,0,0.41); sg.add(lb);
    const ctx=lb.material.map.image.getContext("2d"); ctx.clearRect(0,0,512,512); ctx.fillStyle="#"+new THREE.Color(SEATCOL[i]).getHexString(); ctx.fillRect(0,0,512,512); ctx.fillStyle="#fff"; ctx.font="800 78px Tajawal, Arial"; ctx.textAlign="center"; ctx.textBaseline="middle"; let f=78; while(ctx.measureText(s).width>480){f-=4;ctx.font=`800 ${f}px Tajawal, Arial`;} ctx.fillText(s,256,90); lb.material.map.needsUpdate=true;
    carousel.seats.push({ g:sg, name:s, ph:i*0.8 }); });
}

// ---------- post office + balloon (contact) ----------
const balloon = {};
{
  const g = rideGroup("contact");
  g.rotation.y = Math.PI/4;
  mesh(new THREE.BoxGeometry(5,0.4,5), C.stone, g, 0,0.2,0);
  mesh(new THREE.BoxGeometry(4,3,4), C.wall, g, 0,1.9,0);
  const roof=mesh(new THREE.ConeGeometry(3.4,2.4,4), C.blue, g, 0,4.6,0); roof.rotation.y=Math.PI/4;
  mesh(new THREE.BoxGeometry(1.1,1.8,0.2), 0x6B4A33, g, 0,1.3,2.0,false);
  const sign=label("POST",2.2,0.6,"#F7E9D3","#3D5A80",90); sign.position.set(0,3.0,2.02); g.add(sign);
  [-1.4,1.4].forEach(x=>mesh(new THREE.BoxGeometry(0.7,0.7,0.1),0x9fd3e6,g,x,2,2.01,false));
  // mailbox
  const mb=new THREE.Group(); mb.position.set(2.8,0,2.6); g.add(mb); balloon.mailbox=mb;
  mesh(new THREE.CylinderGeometry(0.08,0.08,1,6),C.ink,mb,0,0.5,0); mesh(new THREE.BoxGeometry(0.7,0.6,0.9),C.red,mb,0,1.25,0);
  // balloon
  const b=new THREE.Group(); b.position.set(4.5,7.5,-3.5); g.add(b); balloon.g=b; balloon.base=b.position.y;
  const bc=[0xF08A3C,C.cream,C.blue,0xF08A3C,C.cream,C.blue,0xF08A3C,C.cream,C.blue,0xF08A3C,C.cream,C.blue];
  bc.forEach((c,i)=>{ const geo=new THREE.SphereGeometry(2.2,2,10,i/12*Math.PI*2,Math.PI*2/12); const m=new THREE.Mesh(geo,new THREE.MeshStandardMaterial({color:c,roughness:.9,flatShading:true})); m.scale.y=1.15; m.castShadow=true; b.add(m); });
  mesh(new THREE.BoxGeometry(1,0.8,1),C.wood,b,0,-3.4,0);
  [[-.4,-.4],[.4,-.4],[-.4,.4],[.4,.4]].forEach(([x,z])=>mesh(new THREE.CylinderGeometry(0.03,0.03,1.4,3),C.ink,b,x,-2.5,z,false));
  const rope=new THREE.Mesh(new THREE.CylinderGeometry(0.03,0.03,1,4),M(C.ink)); g.add(rope); balloon.rope=rope;
  balloon.anchor=new THREE.Vector3(3.2,0.3,-2.2); mesh(new THREE.CylinderGeometry(0.15,0.15,0.6,6),C.wood,g,3.2,0.3,-2.2);
}

// ---------- train track ring ----------
const TR = 17;
const trackCurve = new THREE.CatmullRomCurve3(Array.from({length:24},(_,i)=>{ const a=i/24*Math.PI*2; const r=TR+0.6*Math.sin(a*3); return new THREE.Vector3(Math.cos(a)*r,0.15,Math.sin(a)*r); }), true);
{
  const N=110; const sl=new THREE.InstancedMesh(new THREE.BoxGeometry(1.6,0.15,0.35),M(0x6B4A33),N); const d=new THREE.Object3D();
  for(let i=0;i<N;i++){ const t=i/N; const p=trackCurve.getPointAt(t), tg=trackCurve.getTangentAt(t); d.position.copy(p); d.position.y=0.07; d.lookAt(p.clone().add(tg)); d.rotateY(Math.PI/2); d.updateMatrix(); sl.setMatrixAt(i,d.matrix); }
  sl.receiveShadow=true; island.add(sl);
  [-0.55,0.55].forEach(off=>{ const pts=trackCurve.getSpacedPoints(200).map((p,i)=>{ const tg=trackCurve.getTangentAt(i/200); const n=new THREE.Vector3(-tg.z,0,tg.x).normalize(); return p.clone().addScaledVector(n,off).setY(0.22); });
    const rail=new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts,true),200,0.06,4,true),M(0x6b6b78)); island.add(rail); });
}
// stations: neutral "قريباً" signposts (real milestones not provided yet)
const STATIONS=[0.08,0.33,0.58,0.83];
const stationSigns=[];
STATIONS.forEach((t,i)=>{ const p=trackCurve.getPointAt(t); const n=p.clone().setY(0).normalize(); const sp=new THREE.Group(); sp.position.copy(p).addScaledVector(n,-1.9).setY(0); island.add(sp);
  mesh(new THREE.BoxGeometry(0.15,1.6,0.15),C.wood,sp,0,0.8,0); const s=label("قريباً",1.5,0.6,"#F7E9D3","#5E4636",80); s.position.y=1.7; sp.add(s); s.lookAt(new THREE.Vector3(34,s.position.y,34).sub(sp.position).add(sp.position.clone().setY(0)).setY(1.7)); s.rotation.set(0,Math.PI/4,0); stationSigns.push(sp); });
const tl=document.getElementById("tl-line"); STATIONS.forEach((_,i)=>{ const d=document.createElement("div"); d.className="dot"; d.innerHTML="<i></i>قريباً"; tl.appendChild(d); });

// ---------- train ----------
const train={ cars:[], t:0.15, wheels:[] , stop:0 };
{
  const mk=(c,loco)=>{ const g=new THREE.Group(); island.add(g);
    mesh(new THREE.BoxGeometry(loco?3:2.4,0.35,1.5),0x3a3240,g,0,0.55,0);
    if(loco){ mesh(new THREE.CylinderGeometry(0.65,0.65,1.8,10),c,g,0.4,1.25,0).rotation.z=Math.PI/2; mesh(new THREE.BoxGeometry(1.1,1.6,1.5),c,g,-0.9,1.5,0); mesh(new THREE.BoxGeometry(1.3,0.2,1.7),0x8a2f2f,g,-0.9,2.35,0); mesh(new THREE.CylinderGeometry(0.2,0.3,0.7,8),0x3a3240,g,1,2.1,0); mesh(new THREE.CylinderGeometry(0.4,0.4,0.1,10),C.gold,g,1.32,1.25,0).rotation.z=Math.PI/2; }
    else { mesh(new THREE.BoxGeometry(2.3,1.1,1.4),c,g,0,1.25,0); mesh(new THREE.BoxGeometry(2.4,0.15,1.5),0x7a4a2a,g,0,1.85,0); [-0.6,0.6].forEach(x=>mesh(new THREE.BoxGeometry(0.6,0.5,1.42),0x3a3550,g,x,1.4,0,false)); }
    [-0.8,0.8].forEach(x=>[-0.72,0.72].forEach(z=>{ const w=mesh(new THREE.CylinderGeometry(0.32,0.32,0.12,8),0x2b2d42,g,x,0.38,z); w.rotation.x=Math.PI/2; train.wheels.push(w); }));
    return g; };
  train.cars.push(mk(C.red,true), mk(C.wagon), mk(C.wagon));
}

// ---------- fill: trees, lamps, benches, flowers, rocks, clouds ----------
const occupied = [...Object.values(RIDES).map(r=>[r.pos,6.2]), [new THREE.Vector3(),4.5]];
function freeSpot(minR=0,maxR=19, extra=0){ for(let k=0;k<200;k++){ const a=rnd(0,6.28), r=Math.sqrt(rnd(minR*minR,maxR*maxR)); const v=new THREE.Vector3(Math.cos(a)*r,0,Math.sin(a)*r); if(Math.abs(Math.hypot(v.x,v.z)-TR)<1.8) continue; if(occupied.some(([p,rr])=>p.distanceTo(v)<rr+extra)) continue; if(onPath(v)) continue; return v; } return null; }
function onPath(v){ return Object.values(RIDES).concat([{pos:new THREE.Vector3(10,0,10)}]).some(r=>{ const d=r.pos; const t=Math.max(0,Math.min(1,v.dot(d)/d.lengthSq())); return v.distanceTo(d.clone().multiplyScalar(t))<1.6; }); }
{
  const d=new THREE.Object3D(); const N=34;
  const crown=new THREE.InstancedMesh(new THREE.ConeGeometry(1,2.2,7),M(0x5E9A4B),N*2), trunk=new THREE.InstancedMesh(new THREE.CylinderGeometry(0.18,0.22,0.9,5),M(0x6B4A33),N);
  crown.castShadow=trunk.castShadow=true; let i=0;
  for(let k=0;k<N;k++){ const v=freeSpot(k<15?15:9,19.2,0.5); if(!v) continue; occupied.push([v,1.1]); const s=k<15?1.3:rnd(0.8,1.05);
    d.position.set(v.x,0.45*s,v.z); d.scale.setScalar(s); d.rotation.set(0,0,0); d.updateMatrix(); trunk.setMatrixAt(i,d.matrix);
    d.position.set(v.x,(0.9+0.9)*s,v.z); d.rotation.y=rnd(0,3); d.updateMatrix(); crown.setMatrixAt(i*2,d.matrix);
    d.position.set(v.x,(0.9+1.7)*s,v.z); d.scale.setScalar(s*0.72); d.updateMatrix(); crown.setMatrixAt(i*2+1,d.matrix); i++; }
  crown.count=i*2; trunk.count=i; island.add(crown,trunk);
  // lamps
  const lp=new THREE.InstancedMesh(new THREE.CylinderGeometry(0.07,0.09,2.2,5),M(C.ink),10), lh=new THREE.InstancedMesh(new THREE.BoxGeometry(0.35,0.4,0.35),M(0xFBE3A0),10); lp.castShadow=true;
  for(let k=0;k<10;k++){ const a=k/10*Math.PI*2+0.2; const r=k%2?5.2:12.5; d.position.set(Math.cos(a)*r,1.1,Math.sin(a)*r); d.scale.setScalar(1); d.rotation.set(0,0,0); d.updateMatrix(); lp.setMatrixAt(k,d.matrix); d.position.y=2.3; d.updateMatrix(); lh.setMatrixAt(k,d.matrix); }
  island.add(lp,lh);
  // benches
  const benches=[]; const bs=new THREE.InstancedMesh(new THREE.BoxGeometry(1.6,0.12,0.5),M(C.wood),8), bb=new THREE.InstancedMesh(new THREE.BoxGeometry(1.6,0.5,0.1),M(C.wood),8), bl=new THREE.InstancedMesh(new THREE.BoxGeometry(1.5,0.4,0.4),M(0x5a4a3a),8); bs.castShadow=bb.castShadow=true;
  for(let k=0;k<8;k++){ const a=k/8*Math.PI*2+0.4; const r=k<4?5.6:11; const p=new THREE.Vector3(Math.cos(a)*r,0,Math.sin(a)*r); const ry=-a-Math.PI/2; benches.push({p,ry});
    d.rotation.set(0,ry,0); d.scale.setScalar(1); d.position.set(p.x,0.5,p.z); d.updateMatrix(); bs.setMatrixAt(k,d.matrix); d.position.set(p.x,0.2,p.z); d.updateMatrix(); bl.setMatrixAt(k,d.matrix);
    const off=new THREE.Vector3(0,0,-0.25).applyEuler(d.rotation); d.position.set(p.x+off.x,0.8,p.z+off.z); d.updateMatrix(); bb.setMatrixAt(k,d.matrix); }
  island.add(bs,bb,bl); window.__benches=benches;
  // flowers
  const fl=new THREE.InstancedMesh(new THREE.IcosahedronGeometry(0.16,0),new THREE.MeshStandardMaterial({roughness:.9,flatShading:true}),120); const fc=[C.red,C.gold,0xE86A9A,C.cream,C.purple];
  for(let k=0;k<120;k++){ const v=freeSpot(2,19.3,0)||new THREE.Vector3(); d.position.set(v.x,0.15,v.z); d.scale.setScalar(rnd(.7,1.3)); d.updateMatrix(); fl.setMatrixAt(k,d.matrix); fl.setColorAt(k,new THREE.Color(fc[k%5])); }
  island.add(fl);
  // bushes / small rocks
  for(let k=0;k<14;k++){ const v=freeSpot(3,19,0); if(!v) continue; mesh(jitter(new THREE.DodecahedronGeometry(rnd(.25,.5),0),.05),k%2?0x9b8f86:0x6E9F5B,island,v.x,0.2,v.z); }
}
// floating rocks
const floatRocks=[];
for(let k=0;k<6;k++){ const a=k/6*Math.PI*2+0.3; const r=rnd(20,25); const m=mesh(jitter(new THREE.DodecahedronGeometry(rnd(1,2.5)/2+0.4,0),0.15),k%2?C.rock:C.rock2,world,Math.cos(a)*r,rnd(-14,-4),Math.sin(a)*r,false); floatRocks.push({m,y:m.position.y,ph:rnd(0,6),sp:rnd(6,9)}); }
// clouds
const clouds=[];
function cloud(x,y,z,s){ const g=new THREE.Group(); for(let k=0;k<5;k++){ const m=new THREE.Mesh(jitter(new THREE.IcosahedronGeometry(rnd(1.4,2.4),0),0.2),new THREE.MeshStandardMaterial({color:0xFBEFEF,roughness:1,flatShading:true})); m.position.set((k-2)*1.9,rnd(-.3,.8)-Math.abs(k-2)*0.4,rnd(-.8,.8)); g.add(m);} g.position.set(x,y,z); g.scale.setScalar(s); scene.add(g); clouds.push({g,x0:x}); }
cloud(-14,-26,6,2.4); cloud(16,-24,-8,2.2); cloud(4,-30,18,2.8);
cloud(-38,10,-22,1.6); cloud(30,14,-40,1.7); cloud(-46,-6,20,1.8); cloud(-10,20,-50,1.5); cloud(-40,-18,10,2.1);

// ---------- people ----------
const SKIN=[0xF2C6A0,0xD9A07A,0xA8704A,0xE8B68E]; const SHIRT=[C.gold,C.purple,0xF08A3C,C.teal,C.red,0x5B86C9,C.green,0xE86A9A];
function person(i){ const g=new THREE.Group(); const sh=SHIRT[i%8];
  const body=mesh(new THREE.CylinderGeometry(0.28,0.34,0.7,7),sh,g,0,0.75,0); const head=mesh(new THREE.SphereGeometry(0.3,8,6),SKIN[i%4],g,0,1.35,0);
  mesh(new THREE.SphereGeometry(0.31,8,4,0,Math.PI*2,0,Math.PI/2),i%3?0x3b2a20:0x7a4a2a,g,0,1.4,0);
  const legL=mesh(new THREE.BoxGeometry(0.14,0.4,0.14),0x3D5A80,g,-0.12,0.2,0), legR=mesh(new THREE.BoxGeometry(0.14,0.4,0.14),0x3D5A80,g,0.12,0.2,0);
  const armL=new THREE.Group(); armL.position.set(-0.36,1.0,0); g.add(armL); mesh(new THREE.BoxGeometry(0.12,0.5,0.12),sh,armL,0,-0.22,0);
  const armR=new THREE.Group(); armR.position.set(0.36,1.0,0); g.add(armR); mesh(new THREE.BoxGeometry(0.12,0.5,0.12),sh,armR,0,-0.22,0);
  g.userData={body,head,legL,legR,armL,armR}; island.add(g); return g; }
const people=[];
const crowd = mobile?6:12;
for(let i=0;i<crowd;i++){
  const g=person(i); const mode = i<6?"walk": i<8?"wave": i<10?"sit":"ride";
  const o={g,mode,ph:rnd(0,6),i};
  if(mode==="walk"){ const r=[6.5,9,12.5,14.5,7.5,10.5][i%6]; o.r=r; o.a=rnd(0,6.28); o.dir=i%2?1:-1; o.speed=1.2/r; }
  if(mode==="wave"){ const v=[new THREE.Vector3(1.5,0,2.5),new THREE.Vector3(-2,0,-1.5)][i-6]; g.position.copy(v); g.rotation.y=Math.PI/4; }
  if(mode==="sit"){ const b=window.__benches[i-8]; g.position.set(b.p.x,0.15,b.p.z); g.rotation.y=b.ry; g.userData.legL.rotation.x=g.userData.legR.rotation.x=-1.4; g.userData.legL.position.set(-0.12,0.4,0.18); g.userData.legR.position.set(0.12,0.4,0.18); }
  if(mode==="ride"){ const seat=carousel.seats[(i-10)*4+1]; island.remove(g); seat.g.add(g); g.position.set(0,0.2,-0.1); g.scale.setScalar(0.8); }
  people.push(o);
}
// ---------- cats ----------
const CATC=[0xF0A040,0x9a9aa6,0x2b2d42,0xF7E9D3,0xC47A3F,0x8a8a8a];
function cat(i){ const g=new THREE.Group(); const c=CATC[i];
  mesh(new THREE.BoxGeometry(0.75,0.4,0.36),c,g,0,0.4,0); const head=mesh(new THREE.BoxGeometry(0.38,0.34,0.36),c,g,0.45,0.65,0);
  [-0.1,0.1].forEach(z=>{ const e=mesh(new THREE.ConeGeometry(0.08,0.16,4),c,g,0.45,0.88,z); });
  [[-.25,-.12],[-.25,.12],[.25,-.12],[.25,.12]].forEach(([x,z])=>mesh(new THREE.BoxGeometry(0.1,0.25,0.1),c,g,x,0.12,z));
  const tail=new THREE.Group(); tail.position.set(-0.38,0.5,0); g.add(tail); const tm=mesh(new THREE.BoxGeometry(0.08,0.5,0.08),c,tail,0,0.25,0); tail.rotation.z=0.5;
  g.userData={tail,head}; island.add(g); return g; }
const cats=[]; const ball=mesh(new THREE.SphereGeometry(0.18,8,6),C.red,island,0,0.18,0);
for(let i=0;i<(mobile?4:6);i++){ const g=cat(i); const o={g,i,ph:rnd(0,6)};
  if(i===0){ o.mode="chase"; } else if(i===1){ o.mode="chase2"; }
  else if(i===2){ o.mode="sit"; g.position.set(2.5,0,-2.6); g.rotation.y=-0.6; }
  else if(i===3){ o.mode="sleep"; const b=window.__benches[3]; g.position.set(b.p.x,0.55,b.p.z); g.rotation.y=b.ry; g.scale.setScalar(0.85); }
  else if(i===4){ o.mode="mail"; island.remove(g); balloon.mailbox.add(g); g.position.set(0,1.55,0); g.scale.setScalar(0.8); }
  else { o.mode="wander"; o.a=rnd(0,6); o.r=8; }
  cats.push(o); }

// ---------- UI ----------
const tag=document.getElementById("tag"), back=document.getElementById("back");
const NAMES={about:"البرج · عنّي",projects:"الدولاب · المشاريع",skills:"الدوّارة · المهارات",experience:"القطار · الخبرة",contact:"البريد · تواصل"};
const VIEWS={
  about:{p:new THREE.Vector3(6,9,10),t:new THREE.Vector3(-8,5,-8)},
  projects:{p:new THREE.Vector3(11,10,26),t:new THREE.Vector3(-7,7.5,7)},
  skills:{p:new THREE.Vector3(19,9,18),t:new THREE.Vector3(6.5,2.2,1.5)},
  experience:{p:new THREE.Vector3(30,16,30),t:new THREE.Vector3(0,-3,0)},
  contact:{p:new THREE.Vector3(20,11,-1),t:new THREE.Vector3(5,3.5,-9.5)},
};
const panels={about:"p-about",projects:"p-projects",skills:"p-skills",contact:"p-contact",experience:"tl"};
let current=null, fly=null, lastInput=performance.now();
function closeAll(){ Object.values(panels).forEach(id=>document.getElementById(id).classList.remove("open")); document.querySelectorAll("#nav button").forEach(b=>b.classList.remove("on")); }
function flyTo(v,dur=1400,cb){ fly={p0:camera.position.clone(),t0:controls.target.clone(),p1:v.p.clone(),t1:v.t.clone(),s:performance.now(),dur,cb}; }
function open(key){ current=key; closeAll(); controls.enabled=false; back.style.display="block"; tag.style.display="none";
  document.querySelector(`#nav button[data-s="${key}"]`)?.classList.add("on");
  flyTo(VIEWS[key],1400,()=>document.getElementById(panels[key]).classList.add("open")); }
function home(){ current=null; closeAll(); back.style.display="none"; ferris.targetIdx=null; flyTo(HOME,1400,()=>{controls.enabled=true;}); }
document.querySelectorAll("#nav button").forEach(b=>b.onclick=()=>open(b.dataset.s));
document.querySelectorAll(".x").forEach(b=>b.onclick=home); back.onclick=home;
addEventListener("keydown",e=>{ if(e.key==="Escape") home(); });
// projects panel
const pjList=document.getElementById("pj-list");
function showProject(i){ const p=PROJECTS[i]; document.getElementById("pj-name").textContent=p.n; document.getElementById("pj-desc").textContent=p.d;
  document.getElementById("pj-tech").innerHTML=p.t.map(t=>`<span class="chip">${t}</span>`).join(""); const gh=document.getElementById("pj-gh"); gh.href="https://github.com/jasbx222/"+p.r; gh.textContent="GitHub · "+p.r;
  [...pjList.children].forEach((li,k)=>li.classList.toggle("on",k===i)); ferris.targetIdx=i; }
PROJECTS.forEach((p,i)=>{ const li=document.createElement("li"); li.innerHTML=`<b>${p.n}</b><span>${p.t.join(" · ")}</span>`; li.onclick=()=>showProject(i); pjList.appendChild(li); });
showProject(0); ferris.targetIdx=null;
// skills panel
const sk=document.getElementById("sk"); let hoverSkill=null;
SKILLS.forEach(gr=>{ const d=document.createElement("div"); d.className="grp"; d.innerHTML=`<h4>${gr.g}</h4>`+gr.s.map(s=>`<span class="chip" data-k="${s}">${s}</span>`).join(""); sk.appendChild(d); });
sk.querySelectorAll(".chip").forEach(c=>{ c.onmouseenter=()=>hoverSkill=c.dataset.k; c.onmouseleave=()=>hoverSkill=null; });

// picking
const ray=new THREE.Raycaster(), mouse=new THREE.Vector2(); let hovered=null, downAt=null;
const trainPick=train.cars;
function pick(e){ mouse.set(e.clientX/innerWidth*2-1, -(e.clientY/innerHeight)*2+1); ray.setFromCamera(mouse,camera);
  const hits=ray.intersectObjects([...pickables,...trainPick],true); if(!hits.length) return null; let o=hits[0].object; const gi=o.userData.project;
  while(o&&!o.userData.key&&!trainPick.includes(o)) o=o.parent; if(!o) return null; return { key: trainPick.includes(o)?"experience":o.userData.key, project:gi }; }
canvas.addEventListener("pointermove",e=>{ lastInput=performance.now(); if(current||fly) return; const h=pick(e); hovered=h?h.key:null; canvas.style.cursor=hovered?"pointer":"grab";
  if(hovered){ tag.style.display="block"; tag.textContent=NAMES[hovered]; tag.style.left=e.clientX+"px"; tag.style.top=e.clientY+"px"; } else tag.style.display="none"; });
canvas.addEventListener("pointerdown",e=>{ downAt=[e.clientX,e.clientY]; lastInput=performance.now(); });
canvas.addEventListener("pointerup",e=>{ if(!downAt||Math.hypot(e.clientX-downAt[0],e.clientY-downAt[1])>6) return; const h=pick(e); if(!h) return;
  if(h.key==="projects"&&h.project!=null){ if(current!=="projects") open("projects"); showProject(h.project); } else if(h.key!==current) open(h.key); });
addEventListener("resize",()=>{ camera.aspect=innerWidth/innerHeight; camera.updateProjectionMatrix(); renderer.setSize(innerWidth,innerHeight); });

// ---------- loop ----------
const ease=t=>t<0.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;
const clock=new THREE.Clock(); let T=0;
function tick(){
  const dt=Math.min(clock.getDelta(),0.05); T+=dt;
  world.position.y=Math.sin(T/8*Math.PI*2)*0.3;
  // hover raise
  Object.entries(RIDES).forEach(([k,r])=>{ const ty=(hovered===k&&!current)?0.3:0; r.g.position.y+= (ty-r.g.position.y)*0.15; });
  // ferris
  const step=Math.PI*2/40*dt;
  if(ferris.targetIdx!=null){ const want=-(ferris.targetIdx/8*Math.PI*2) - Math.PI; let diff=((want-ferris.angle)%(Math.PI*2)+Math.PI*3)%(Math.PI*2)-Math.PI; ferris.angle+=diff*Math.min(1,dt*2.5); }
  else ferris.angle-=step;
  ferris.wheel.rotation.z=ferris.angle; ferris.gondolas.forEach(gd=>{ gd.pivot.rotation.z=-ferris.angle; gd.gd.rotation.z=Math.sin(T*1.5+gd.i)*0.05; });
  // carousel
  carousel.spin.rotation.y+=Math.PI*2/12*dt;
  carousel.seats.forEach(s=>{ s.g.position.y=0.9+Math.sin(T*Math.PI+s.ph)*0.25; const sc=hoverSkill===s.name?1.1:1; s.g.scale.lerp(new THREE.Vector3(sc,sc,sc),0.2); });
  // balloon
  balloon.g.position.y=balloon.base+Math.sin(T/5*Math.PI*2)*0.4; balloon.g.rotation.z=Math.sin(T*0.9)*0.052; balloon.g.rotation.x=Math.cos(T*0.7)*0.03;
  { const top=balloon.g.position.clone().add(new THREE.Vector3(0,-3.8,0)); const a=balloon.anchor; const mid=top.clone().add(a).multiplyScalar(0.5); const len=top.distanceTo(a); balloon.rope.position.copy(mid); balloon.rope.scale.y=len; balloon.rope.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),top.clone().sub(a).normalize()); }
  // flag
  { const p=flag.geometry.attributes.position, b=flag.userData.base; for(let i=0;i<p.count;i++){ const x=b[i*3]+0.5; p.setZ(i, Math.sin(x*5 - T/1.5*Math.PI*2)*0.12*x); } p.needsUpdate=true; flag.geometry.computeVertexNormals(); }
  // train
  { let speed=1/25; const expMode=current==="experience";
    if(train.stop>0){ train.stop-=dt; speed=0; } else { const prev=train.t; train.t=(train.t+speed*dt)%1; if(expMode) STATIONS.forEach((s,i)=>{ if((prev<s&&train.t>=s)){ train.stop=2; document.querySelectorAll("#tl .dot").forEach((d,k)=>d.classList.toggle("on",k===i)); } }); }
    train.cars.forEach((c,k)=>{ const t=(train.t-k*0.03+1)%1; const p=trackCurve.getPointAt(t), tg=trackCurve.getTangentAt(t); c.position.set(p.x,0,p.z); c.rotation.y=Math.atan2(-tg.z,tg.x); });
    if(speed>0) train.wheels.forEach(w=>w.rotation.y+=dt*8); }
  // rocks / clouds
  floatRocks.forEach(r=>{ r.m.position.y=r.y+Math.sin(T/r.sp*Math.PI*2+r.ph)*0.6; r.m.rotation.y+=dt*0.1; });
  clouds.forEach((c,k)=>{ c.g.position.x=c.x0+Math.sin(T/60*Math.PI*2+k)*4; });
  // people
  people.forEach(o=>{ const u=o.g.userData;
    if(o.mode==="walk"){ o.a+=o.speed*dt*o.dir; o.g.position.set(Math.cos(o.a)*o.r,Math.abs(Math.sin(T*Math.PI*2+o.ph))*0.15,Math.sin(o.a)*o.r); o.g.rotation.y=-o.a+(o.dir>0?Math.PI:0);
      const sw=Math.sin(T*8+o.ph)*0.6; u.legL.rotation.x=sw; u.legR.rotation.x=-sw; u.armL.rotation.x=-sw; u.armR.rotation.x=sw;
      const sq=1+Math.sin(T*Math.PI*4+o.ph)*0.06; u.body.scale.set(1/sq,sq,1/sq); }
    else if(o.mode==="wave"){ u.armR.rotation.z=2.6+Math.sin(T*6+o.ph)*0.4; o.g.position.y=Math.max(0,Math.sin(T*Math.PI*2+o.ph))*0.25; }
    else if(o.mode==="sit"){ u.head.rotation.y=Math.sin(T*0.8+o.ph)*0.5; u.armL.rotation.x=-0.6; u.armR.rotation.x=-0.6; }
    else { u.armL.rotation.z=-2.4; u.armR.rotation.z=2.4+Math.sin(T*4)*0.2; } });
  // cats
  const ba=T*0.5; ball.position.set(Math.cos(ba)*3.5+1,0.18+Math.abs(Math.sin(T*3))*0.4,Math.sin(ba*1.3)*2.5+1);
  cats.forEach(o=>{ const u=o.g.userData; u.tail.rotation.x=Math.sin(T/1.2*Math.PI*2+o.ph)*0.6;
    if(o.mode==="chase"||o.mode==="chase2"){ const lag=o.mode==="chase"?0.45:1.0; const a=(T-lag)*0.5; const tp=new THREE.Vector3(Math.cos(a)*3.5+1,0,Math.sin(a*1.3)*2.5+1); const dir=tp.clone().sub(o.g.position); o.g.position.lerp(tp,0.08); o.g.position.y=Math.abs(Math.sin(T*7+o.ph))*0.12; if(dir.lengthSq()>1e-4) o.g.rotation.y=Math.atan2(-dir.z,dir.x); }
    else if(o.mode==="wander"){ o.a+=dt*0.15; o.g.position.set(Math.cos(o.a)*o.r,Math.abs(Math.sin(T*6))*0.08,Math.sin(o.a)*o.r*0.9); o.g.rotation.y=-o.a-Math.PI/2; }
    else if(o.mode==="sleep"){ o.g.scale.y=0.85+Math.sin(T*1.5)*0.03; }
    else { u.head.rotation.y=Math.sin(T*0.7+o.ph)*0.5; } });
  // camera
  if(fly){ const k=Math.min(1,(performance.now()-fly.s)/fly.dur), e=ease(k); camera.position.lerpVectors(fly.p0,fly.p1,e); controls.target.lerpVectors(fly.t0,fly.t1,e); camera.lookAt(controls.target); if(k>=1){ const cb=fly.cb; fly=null; cb&&cb(); } }
  else { if(!current && performance.now()-lastInput>20000){ controls.autoRotate=true; controls.autoRotateSpeed=0.4; } else controls.autoRotate=false; if(controls.enabled) controls.update(); else camera.lookAt(controls.target); }
  renderer.render(scene,camera);
}
renderer.setAnimationLoop(tick);
document.addEventListener("visibilitychange",()=>renderer.setAnimationLoop(document.hidden?null:tick));
const ld=document.getElementById("load"); ld.style.opacity=0; setTimeout(()=>ld.remove(),700);
window.__open=open; window.__home=home;
