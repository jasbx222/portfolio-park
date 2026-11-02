import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const mobile = innerWidth < 768 || /Mobi/.test(navigator.userAgent);
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
const P = { green:0x2F5D50, wine:0x7A2E3A, brass:0xC9A24B, cream:0xF3E6CC, brick:0xA65A3F, slate:0x4A5560, walnut:0x6B4E3A, cobble:0x7E806F, iron:0x2A2A30, water:0x4F7F86, grass:0x5E7A42, blood:0x8E1B1B, black:0x1A1617, basalt:0x3A3234, smoke:0x5A4E4E, stone:0x9C9282 };

const PROJECTS = [
 { latin:"Dawwerli", title:"دوّرلي", desc:"«دوّرلي» — تطبيق Flutter مع خلفية ASP.NET Core 8 + PostgreSQL", chips:["Dart","Flutter","C#","ASP.NET Core","PostgreSQL"], repo:"dawwerli-app", extra:"dawwerli-api" },
 { latin:"Dooja", title:"Dooja", desc:"", chips:["Dart","Flutter"], repo:"dooja-app" },
 { latin:"Molada", title:"مولّدة", desc:"تطبيق React Native لجباية اشتراكات المولدات الأهلية في العراق، يعمل أوفلاين أولاً", chips:["TypeScript","React Native","Expo"], repo:"molada-app" },
 { latin:"Ain Glasses", title:"عين", desc:"ديمو مساعد النظارة الذكية — Flutter demo for HeyCyan/AIMB G1 smart glasses (Arabic)", chips:["Dart","Flutter","Kotlin"], repo:"ain-glasses-demo" },
 { latin:"Payroll", title:"Payroll", desc:"تطبيق ادارة صرف الرواتب الذكي", chips:["TypeScript","Expo","PHP (Laravel backend)"], repo:"payroll-payment-app-", extra:"payroll-backend-payment-service" },
 { latin:"Clinic System", title:"نظام العيادة", desc:"Laravel for Backend", chips:["PHP","Laravel","Blade"], repo:"Clinic-Management-System-Backend", extra:"Clinic-LandingPage-Dashboard-Booking" },
 { latin:"Delivery System", title:"نظام التوصيل", desc:"نظام إدارة توصيل متكامل باستخدام ASP.NET Core Web API وEF Core وSQL Server وRedis", chips:["C#","ASP.NET Core","SQL Server","Redis"], repo:"Delivery-Management-System" },
 { latin:"POS", title:"نظام الكاشير POS", desc:"نظام POS للكاشير: إضافة منتجات وشراء وبيع وعرض تفاصيل المبيعات", chips:["C#","ASP.NET"], repo:"Pos-Caher-system-Asp.net" },
];
const SKILLS = [ { g:"واجهات", s:["React","Next.js","Vue"] }, { g:"خلفية", s:["Laravel","ASP.NET Core","NestJS","PostgreSQL"] }, { g:"موبايل", s:["Flutter","React Native"] } ];
const SKILL_ALL = SKILLS.flatMap(g=>g.s);

const canvas=document.getElementById("c");
const renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:true});
renderer.setPixelRatio(Math.min(devicePixelRatio,1.5)); renderer.setSize(innerWidth,innerHeight);
renderer.shadowMap.enabled=!mobile; renderer.shadowMap.type=THREE.PCFSoftShadowMap; renderer.outputColorSpace=THREE.SRGBColorSpace;
renderer.toneMapping=THREE.ACESFilmicToneMapping; renderer.toneMappingExposure=1.05;
const scene=new THREE.Scene(); scene.fog=new THREE.Fog(0x4A2A28,120,300);
const camera=new THREE.PerspectiveCamera(35,innerWidth/innerHeight,1,900);
const HOME={p:new THREE.Vector3(95,82,95),t:new THREE.Vector3(0,2,0)};
camera.position.copy(HOME.p);
const controls=new OrbitControls(camera,canvas); controls.target.copy(HOME.t); controls.enableDamping=true; controls.enablePan=false;
controls.minDistance=80; controls.maxDistance=190; controls.minPolarAngle=0.55; controls.maxPolarAngle=1.2;
controls.minAzimuthAngle=Math.PI/4-0.78; controls.maxAzimuthAngle=Math.PI/4+0.78;
scene.add(new THREE.HemisphereLight(0x8A5A60,0x3A3A2E,0.9));
const sun=new THREE.DirectionalLight(0xFF9A5A,2.4); sun.position.set(-90,55,30); sun.castShadow=true; sun.shadow.mapSize.set(2048,2048);
Object.assign(sun.shadow.camera,{left:-60,right:60,top:60,bottom:-60,near:10,far:260}); sun.shadow.bias=-0.0006; scene.add(sun);
const fillL=new THREE.DirectionalLight(0xC0607A,0.5); fillL.position.set(60,30,80); scene.add(fillL);
scene.add(new THREE.AmbientLight(0x6a4040,0.5));

const mc={}; const M=(c,r=0.85,m=0)=>mc[c+"_"+r+"_"+m]||=new THREE.MeshStandardMaterial({color:c,roughness:r,metalness:m,flatShading:true});
const BRASS=new THREE.MeshStandardMaterial({color:P.brass,roughness:.45,metalness:.5});
const GLOW=(c)=>mc["g"+c]||=new THREE.MeshBasicMaterial({color:c});
function box(w,h,d,c,par,x=0,y=0,z=0,mat){ const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),mat||M(c)); m.position.set(x,y,z); m.castShadow=m.receiveShadow=true; par&&par.add(m); return m; }
function cyl(rt,rb,h,s,c,par,x=0,y=0,z=0,mat){ const m=new THREE.Mesh(new THREE.CylinderGeometry(rt,rb,h,s),mat||M(c)); m.position.set(x,y,z); m.castShadow=m.receiveShadow=true; par&&par.add(m); return m; }
function cone(r,h,s,c,par,x=0,y=0,z=0,mat){ const m=new THREE.Mesh(new THREE.ConeGeometry(r,h,s),mat||M(c)); m.position.set(x,y,z); m.castShadow=true; par&&par.add(m); return m; }
const rnd=(a,b)=>a+Math.random()*(b-a);
let seed=7; const srnd=(a,b)=>{ seed=(seed*16807)%2147483647; return a+(seed/2147483647)*(b-a); };
function jit(g,a){ g=g.toNonIndexed(); const p=g.attributes.position; for(let i=0;i<p.count;i++) p.setXYZ(i,p.getX(i)+srnd(-a,a),p.getY(i)+srnd(-a,a),p.getZ(i)+srnd(-a,a)); g.computeVertexNormals(); return g; }
function tex(w,h,draw){ const c=document.createElement("canvas"); c.width=w; c.height=h; draw(c.getContext("2d"),w,h); const t=new THREE.CanvasTexture(c); t.colorSpace=THREE.SRGBColorSpace; t.anisotropy=4; return t; }
function plaque(text,w,h,opt={}){ const t=tex(512,Math.round(512*h/w),(x,W,H)=>{ x.fillStyle=opt.frame||"#8a6a2a"; x.fillRect(0,0,W,H); x.fillStyle=opt.bg||"#1f1a16"; x.fillRect(10,10,W-20,H-20); x.strokeStyle="#C9A24B"; x.lineWidth=4; x.strokeRect(18,18,W-36,H-36);
  if(!text) return; let f=opt.fs||Math.round(H*0.5); x.font=`700 ${f}px Amiri, Georgia, serif`; while(x.measureText(text).width>W-60&&f>14){f-=3;x.font=`700 ${f}px Amiri, Georgia, serif`;} x.fillStyle=opt.fg||"#E7C877"; x.textAlign="center"; x.textBaseline="middle"; x.fillText(text,W/2,H/2+3); });
  return new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshStandardMaterial({map:t,roughness:.6})); }

const world=new THREE.Group(); scene.add(world);
const city=new THREE.Group(); world.add(city);
const R=50;
{
  const top=new THREE.CylinderGeometry(R,R*0.97,3,48,1); const p=top.attributes.position;
  for(let i=0;i<p.count;i++){ const x=p.getX(i),z=p.getZ(i),r=Math.hypot(x,z); if(r>1){ const a=Math.atan2(z,x); const k=1+0.04*Math.sin(a*4)+0.025*Math.sin(a*9+1); p.setX(i,x*k); p.setZ(i,z*k);} }
  top.computeVertexNormals(); const t=new THREE.Mesh(top,M(P.cobble,.95)); t.position.y=-1.5; t.receiveShadow=true; city.add(t);
  for(let k=0;k<5;k++){ const r0=R*(0.98-k*0.12), r1=R*(0.86-k*0.12); const g=jit(new THREE.CylinderGeometry(r0,r1,7,26,2),1.1); const m=new THREE.Mesh(g,M(k%2?0x4A3C38:0x5E4C44,.95)); m.position.y=-6.5-k*7; m.receiveShadow=true; city.add(m); }
  const tip=jit(new THREE.ConeGeometry(R*0.3,14,14),1.2); tip.rotateX(Math.PI); const tm=new THREE.Mesh(tip,M(0x3E3230)); tm.position.y=-44; city.add(tm);
  const rim=new THREE.Mesh(new THREE.TorusGeometry(R*0.985,1.1,4,64),M(P.grass)); rim.rotation.x=Math.PI/2; rim.position.y=-0.2; city.add(rim);
}
{ const N=140; const post=new THREE.InstancedMesh(new THREE.BoxGeometry(0.15,1.4,0.15),M(P.iron),N); const d=new THREE.Object3D();
  for(let i=0;i<N;i++){ const a=i/N*Math.PI*2; d.position.set(Math.cos(a)*(R-1.6),0.7,Math.sin(a)*(R-1.6)); d.updateMatrix(); post.setMatrixAt(i,d.matrix); } city.add(post);
  const rail=new THREE.Mesh(new THREE.TorusGeometry(R-1.6,0.06,3,120),M(P.iron)); rail.rotation.x=Math.PI/2; rail.position.y=1.3; city.add(rail); }
const occ=[];
const free=(x,z,r)=>!occ.some(([a,b,rr])=>Math.hypot(a-x,b-z)<rr+r);
const claim=(x,z,r)=>occ.push([x,z,r]);
const corridor=(x,z)=>{  const dx=-0.63,dz=-0.78; const t=x*dx+z*dz; if(t<-30||t>26) return false; return Math.abs(x*dz-z*dx)<9; };
const pick=[];
function landmark(key,x,z,ry=0){ const g=new THREE.Group(); g.position.set(x,0,z); g.rotation.y=ry; g.userData.key=key; city.add(g); pick.push(g); return g; }
function faceCenter(x,z){ return Math.atan2(-x,-z); }
const flames=[]; const flameMat=new THREE.MeshBasicMaterial({color:0xF08A30,side:THREE.DoubleSide,transparent:true,opacity:.95,depthWrite:false});
const flameCore=new THREE.MeshBasicMaterial({color:0xFFD070,side:THREE.DoubleSide,transparent:true,opacity:.95,depthWrite:false});
const flameGeo=(()=>{ const s=new THREE.Shape(); s.moveTo(-0.5,0); s.quadraticCurveTo(-0.55,0.6,0,1.5); s.quadraticCurveTo(0.55,0.6,0.5,0); s.lineTo(-0.5,0); return new THREE.ShapeGeometry(s,6); })();
function flame(par,x,y,z,s=1){ const g=new THREE.Group(); g.position.set(x,y,z); g.scale.setScalar(s); g.userData.s0=s; par.add(g); [0,Math.PI/2].forEach(r=>{ const a=new THREE.Mesh(flameGeo,flameMat); a.rotation.y=r; g.add(a); const b=new THREE.Mesh(flameGeo,flameCore); b.scale.set(.55,.6,.55); b.rotation.y=r; g.add(b); }); flames.push({g,ph:Math.random()*9}); return g; }
function brazier(par,x,z,y=0,s=1){ const g=new THREE.Group(); g.position.set(x,y,z); g.scale.setScalar(s); par.add(g);
  for(let k=0;k<3;k++){ const a=k/3*Math.PI*2; const l=cyl(.05,.05,1.3,4,P.iron,g,Math.cos(a)*.35,.6,Math.sin(a)*.35); l.rotation.z=Math.cos(a)*.25; l.rotation.x=-Math.sin(a)*.25; }
  cyl(.55,.3,.4,8,P.iron,g,0,1.3,0); flame(g,0,1.45,0,.75); return g; }
// ---------- castle keep (about) ----------
const castle=landmark("about",-30,-26,faceCenter(-30,-26));
const banners=[];
{
  const g=castle; const BAS=P.basalt;
  const crag=new THREE.Mesh(jit(new THREE.CylinderGeometry(16,19,10,12,2),1.2),M(0x3A302E)); crag.position.y=3; crag.receiveShadow=crag.castShadow=true; g.add(crag);
  const base=8;
  const wall=(w,h,d,x,z)=>{ const m=box(w,h,d,BAS,g,x,base+h/2,z); const n=Math.floor(Math.max(w,d)/1.6); for(let i=0;i<n;i++){ if(w>d) box(.8,.9,d+.2,BAS,m,-w/2+0.8+i*1.6,h/2+.45,0); else box(w+.2,.9,.8,BAS,m,0,h/2+.45,-d/2+0.8+i*1.6); } return m; };
  wall(26,7,1.5,0,9); wall(26,7,1.5,0,-9); wall(1.5,7,18,-13,0); wall(1.5,7,18,13,0);
  box(11,22,11,0x2E2829,g,0,base+11,-1); for(let i=0;i<6;i++){ box(1,1.2,1,0x2E2829,g,-4.5+i*1.8,base+22.6,4.5); box(1,1.2,1,0x2E2829,g,-4.5+i*1.8,base+22.6,-6.5); }
  for(let r=0;r<4;r++) for(let c=0;c<3;c++) box(.9,1.6,.2,0,g,-3+c*3,base+8+r*4,4.6,GLOW(0xE09040));
  [[-13,9,4.5,15],[13,9,4.5,15],[-13,-9,4,13],[13,-9,4,13],[-4,-4,3,28],[5,-6,2.6,25]].forEach(([x,z,r,h])=>{ cyl(r*.5,r*.55,h,10,BAS,g,x,base+h/2,z); cyl(r*.62,r*.62,1.2,10,BAS,g,x,base+h,z); cone(r*.62,h*.45,10,0x26262c,g,x,base+h+0.6+h*.225,z); cyl(.06,.06,2,4,P.iron,g,x,base+h+h*.45+1.2,z);
    for(let k=0;k<3;k++) box(.5,1,.15,0,g,x+Math.sin(k*2)*r*.5,base+h*.5+k*2.5,z+Math.cos(k*2)*r*.5,GLOW(0xD08038)); });
  box(4,5,.6,0x3a2a20,g,0,base+2.5,9.8);
  for(let s=0;s<5;s++) box(6,.5,1.4,0x4A4042,g,0,base-0.2-s*1.0,11+s*1.4);
  const bpos=[[-8,9.8,3],[-3.2,9.8,3],[3.2,9.8,3],[8,9.8,3],[-2.5,4.6,14],[2.5,4.6,14],[-13.9,4,3],[13.9,4,3],[-13.9,-4,3],[13.9,-4,3]];
  bpos.forEach(([x,z,y],i)=>{ const col=i%3===2?P.black:P.blood; const t=tex(64,160,(c,W,H)=>{ c.fillStyle="#"+new THREE.Color(col).getHexString(); c.fillRect(0,0,W,H); c.fillStyle="#C9A24B"; c.fillRect(0,0,W,6); c.fillRect(0,0,4,H); c.fillRect(W-4,0,4,H); c.fillStyle="#000"; c.globalCompositeOperation="destination-out"; c.beginPath(); c.moveTo(0,H); c.lineTo(W/2,H-16); c.lineTo(W,H); c.fill(); });
    const geo=new THREE.PlaneGeometry(2.2,5.5,1,10); const m=new THREE.Mesh(geo,new THREE.MeshStandardMaterial({map:t,roughness:.9,side:THREE.DoubleSide,transparent:true,alphaTest:.5}));
    const side=Math.abs(x)>13; m.position.set(x+(side?Math.sign(x)*0.8:0),base+(y>8?y+6:y+3),z+(side?0:0.82)); if(side) m.rotation.y=Math.sign(x)*Math.PI/2; g.add(m); m.userData.base=geo.attributes.position.array.slice(); banners.push(m); box(2.6,.15,.15,P.iron,m,0,2.8,0.05); });
  for(let i=0;i<6;i++) brazier(g,-12+i*4.8,9.8,base+7,1);
  [[-4,12],[4,12],[-7,16],[7,16],[-11,10.5],[11,10.5]].forEach(([x,z])=>brazier(g,x,z,base-Math.max(0,(z-11)/1.4)-0.1,1.1));
}
// ---------- clock tower ----------
const clockHands=[];
const clockTower=new THREE.Group(); clockTower.position.set(6,0,-6); city.add(clockTower); claim(6,-6,6);
{ const g=clockTower;
  box(7,2,7,P.stone,g,0,1,0); box(6,28,6,P.brick,g,0,15,0); [8,16,24].forEach(y=>box(6.4,.5,6.4,P.stone,g,0,y,0)); box(6.8,5,6.8,0x8C4A36,g,0,27.5,0);
  for(let s=0;s<4;s++){ const f=new THREE.Group(); f.rotation.y=s*Math.PI/2; g.add(f);
    const face=new THREE.Mesh(new THREE.CircleGeometry(1.5,24),new THREE.MeshStandardMaterial({color:0xF0E2C0,roughness:.6})); face.position.set(0,27.5,3.42); f.add(face);
    const ring=new THREE.Mesh(new THREE.TorusGeometry(1.55,.15,6,24),BRASS); ring.position.copy(face.position); f.add(ring);
    const hg=new THREE.BoxGeometry(.12,.9,.05); hg.translate(0,.4,0); const hh=new THREE.Mesh(hg,M(P.black)); hh.position.set(0,27.5,3.5); f.add(hh);
    const mg=new THREE.BoxGeometry(.08,1.3,.05); mg.translate(0,.6,0); const mh=new THREE.Mesh(mg,M(P.black)); mh.position.set(0,27.5,3.52); f.add(mh); clockHands.push([hh,mh]);
    for(let r=0;r<3;r++) box(1,1.8,.1,0,f,0,6+r*6,3.02,GLOW(0xE6A050)); }
  const sp=cone(4.6,10,4,P.slate,g,0,35,0); sp.rotation.y=Math.PI/4;
  [[-3,-3],[3,-3],[-3,3],[3,3]].forEach(([x,z])=>cone(.6,3.5,4,P.slate,g,x,31.5,z));
  cyl(.08,.08,3,4,P.iron,g,0,41,0);
}
// ---------- ferris wheel ----------
const ferris={};
{ const g=new THREE.Group(); g.position.set(-22,0,6); g.rotation.y=faceCenter(-22,6)+0.6; city.add(g); claim(-22,6,9);
  cyl(5,6,1,10,P.stone,g,0,.5,0);
  [[-1,1],[1,1],[-1,-1],[1,-1]].forEach(([sx,sz])=>{ const l=cyl(.35,.5,17,6,P.iron,g,sx*5,8,sz*1.6); l.rotation.z=-sx*.3; });
  const w=new THREE.Group(); w.position.y=16; g.add(w); ferris.w=w;
  [-1.2,1.2].forEach(z=>{ const r=new THREE.Mesh(new THREE.TorusGeometry(14,.3,6,48),M(P.iron)); r.position.z=z; w.add(r); const r2=new THREE.Mesh(new THREE.TorusGeometry(10,.16,5,40),M(P.iron)); r2.position.z=z; w.add(r2); const r3=new THREE.Mesh(new THREE.TorusGeometry(5,.14,5,30),BRASS); r3.position.z=z; w.add(r3); });
  for(let i=0;i<24;i++){ const a=i/24*Math.PI*2; [-1.2,1.2].forEach(z=>{ const s=box(.14,14,.14,P.iron,w,Math.cos(a)*7,Math.sin(a)*7,z); s.rotation.z=a-Math.PI/2; }); }
  cyl(1.4,1.4,3,10,0,w,0,0,0,BRASS).rotation.x=Math.PI/2;
  ferris.g=[]; for(let i=0;i<16;i++){ const a=i/16*Math.PI*2; const pv=new THREE.Group(); pv.position.set(Math.cos(a)*14,Math.sin(a)*14,0); w.add(pv);
    const b=new THREE.Mesh(new THREE.SphereGeometry(1.1,8,6),BRASS); b.position.y=-1.4; b.scale.y=.9; pv.add(b); box(.1,1,.1,P.iron,pv,0,-.5,0); ferris.g.push(pv); }
}
// ---------- exhibition hall (landmark, overview entry to projects) ----------
const hall=landmark("projects",-38,22,faceCenter(-38,22)+Math.PI/2); claim(-38,22,11);
{ const g=hall; const L=18, Wd=9;
  box(Wd+1,1,L+1,P.stone,g,0,.5,0);
  const glass=new THREE.MeshStandardMaterial({color:0x7FA59A,roughness:.3,metalness:.1,transparent:true,opacity:.55});
  const v2=new THREE.Mesh(new THREE.CylinderGeometry(Wd/2,Wd/2,L,20,1,true,0,Math.PI),glass); v2.rotation.x=Math.PI/2; v2.rotation.z=Math.PI/2; v2.position.y=6; g.add(v2);
  box(Wd,5,L,0,g,0,3.5,0,glass);
  for(let i=0;i<=9;i++){ const z=-L/2+i*L/9; const rib=new THREE.Mesh(new THREE.TorusGeometry(Wd/2,.14,4,16,Math.PI),M(P.green)); rib.position.set(0,6,z); g.add(rib); [-Wd/2,Wd/2].forEach(x=>box(.25,5,.25,P.green,g,x,3.5,z)); }
  for(let i=0;i<8;i++) box(.2,2.2,1,0,g,Wd/2-.3,2.2,-6+i*1.7,GLOW(0xE8B060));
}
// ---------- projects lane: 8 houses ----------
const LANE_R=31, A0=THREE.MathUtils.degToRad(176), STEP=THREE.MathUtils.degToRad(16.2);
const houses=[];
const STREET_C=new THREE.Vector3(-74,0,66), STREET_U=new THREE.Vector3(1,0,-1).normalize(), STREET_F=new THREE.Vector3(1,0,1).normalize();
const islet=new THREE.Group(); islet.position.copy(STREET_C); islet.rotation.y=Math.PI/4; world.add(islet);
{ const top=new THREE.Mesh(new THREE.CylinderGeometry(1,1,1.2,40),M(P.cobble)); top.scale.set(46,1,15); top.position.y=-.6; top.receiveShadow=true; islet.add(top);
  const cl=new THREE.Mesh(jit(new THREE.ConeGeometry(1,1,24,3),.04),M(P.basalt)); cl.scale.set(46,26,15); cl.rotation.x=Math.PI; cl.position.y=-14; islet.add(cl);
  const gr=new THREE.Mesh(new THREE.BoxGeometry(84,.1,6),M(0x6A6656)); gr.position.set(0,.02,7); islet.add(gr);
  for(let k=0;k<40;k++){ const a=k/40*Math.PI*2; cyl(.06,.06,1.3,4,P.iron,islet,Math.cos(a)*44.6,.65,Math.sin(a)*13.6); } }
{ const a=new THREE.Vector3(-46,0,48), b=STREET_C.clone().addScaledVector(STREET_U,40).addScaledVector(STREET_F,-4); const n=14; for(let k=0;k<=n;k++){ const p=a.clone().lerp(b,k/n); p.y=-Math.sin(k/n*Math.PI)*2; const pl=box(3,.2,1.1,P.walnut,world,p.x,p.y,p.z); pl.lookAt(b.x,p.y,b.z); } }
function house(i){
  const hp=STREET_C.clone().addScaledVector(STREET_U,(3.5-i)*10.4); const g=landmark("house",hp.x,hp.z,Math.PI/4); world.add(g); g.userData.idx=i;
  const p=PROJECTS[i]; const S={};
  const W=[8,7,8,7,9,7,9,7][i], D=[9,8,9,8,10,8,10,8][i]*0.8, H=[16,11,13,12,13,12,11,11][i];
  const col=[P.green,0xE9DCC0,P.brick,0x3E4A63,0x8C7A62,0xD9D2C3,0x7A4A35,P.wine][i];
  box(W,H,D,col,g,0,H/2,0);
  const trim=i===1||i===5?0xBDB39E:0xD8CCB0;
  box(W+.3,.35,D+.3,trim,g,0,H*.45,0); box(W+.4,.5,D+.4,trim,g,0,H,0); box(W+.2,.6,D+.2,0x5A5048,g,0,.3,0);
  const rf=new THREE.Shape(); rf.moveTo(-W/2-.4,0); rf.lineTo(0,W*.42); rf.lineTo(W/2+.4,0); rf.lineTo(-W/2-.4,0);
  const rg=new THREE.ExtrudeGeometry(rf,{depth:D+.8,bevelEnabled:false}); rg.translate(0,0,-(D+.8)/2); const rm=new THREE.Mesh(rg,M(P.slate)); rm.position.y=H+.25; rm.castShadow=true; g.add(rm);
  const gab=new THREE.Shape(); gab.moveTo(-W/2,0); gab.lineTo(0,W*.4); gab.lineTo(W/2,0); const gm=new THREE.Mesh(new THREE.ShapeGeometry(gab),M(col)); gm.position.set(0,H+.25,D/2+.42); g.add(gm);
  const gw=box(.9,1.2,.1,0,g,0,H+1.4,D/2+.45,null); S.gw=gw;
  box(.9,2.2,.9,P.brick,g,W*.3,H+W*.3,-D*.2); box(1.1,.3,1.1,P.stone,g,W*.3,H+W*.3+1.1,-D*.2);
  const lit=new THREE.MeshBasicMaterial({color:0xC88A40}); S.lit=lit; gw.material=lit;
  const floors=Math.max(2,Math.floor((H-1)/4.2)); const cols=W>7.5?3:2;
  for(let f=1;f<floors;f++) for(let c=0;c<cols;c++){ const wx=(c-(cols-1)/2)*(W/cols); const wy=2+f*((H-2)/floors)+0.6; if(i===1&&f===floors-1) continue; box(1.1,1.8,.15,0,g,wx,wy,D/2+.02,lit); box(1.4,.2,.3,trim,g,wx,wy-1,D/2+.1); }
  const doorPiv=new THREE.Group(); doorPiv.position.set(W*.28-0.6,0,D/2+.08); g.add(doorPiv); box(1.2,2.6,.15,0x3B2A1E,doorPiv,0.6,1.5,0); S.door=doorPiv;
  box(1.8,3,.1,trim,g,W*.28,1.6,D/2+.01);
  box(W*.42,2.2,.12,0,g,-W*.2,1.9,D/2+.03,lit);
  box(2.2,.5,1.4,P.stone,g,W*.28,.25,D/2+.8);
  const pl=plaque(p.latin,W*.62,1.0); pl.position.set(0,H*.45+0.9,D/2+.1); g.add(pl); S.plaque=pl.material;
  cyl(.08,.1,4,5,P.iron,g,-W/2-1,2,D/2+2); box(.45,.6,.45,0,g,-W/2-1,4.2,D/2+2,GLOW(0xF0B060));
  if(i%2===1) brazier(g,W/2+1,D/2+2.2,0,1);
  if(i===0){ cyl(1.6,1.8,2,8,P.iron,g,-W*.2,H+W*.42+1,0); cyl(1.3,1.3,2.2,8,0,g,-W*.2,H+W*.42+3,0,GLOW(0xE6B060)); cone(1.6,1.4,8,P.green,g,-W*.2,H+W*.42+4.8,0);
     const rp=new THREE.Vector3(W*.55,H*.82,D/2-1); const ring=new THREE.Mesh(new THREE.TorusGeometry(1.2,.15,6,20),BRASS); ring.position.copy(rp); g.add(ring); const gl=new THREE.Mesh(new THREE.CircleGeometry(1.05,20),M(0xEDE3C8)); gl.position.copy(rp); g.add(gl);
     const mg=new THREE.Mesh(new THREE.TorusGeometry(.38,.08,6,14),M(P.black)); mg.position.copy(rp).add(new THREE.Vector3(-.1,.1,.03)); g.add(mg); const hd=box(.1,.5,.06,P.black,g,rp.x+.3,rp.y-.35,rp.z+.03); hd.rotation.z=.7;
     box(1.6,.1,.1,P.iron,g,W*.55-.5,H*.82+1.3,D/2-1); }
  if(i===1){ const rw=new THREE.Mesh(new THREE.CircleGeometry(1.2,20),lit); rw.position.set(0,H*.72,D/2+.03); g.add(rw); const rr=new THREE.Mesh(new THREE.TorusGeometry(1.25,.15,6,20),M(trim)); rr.position.copy(rw.position); g.add(rr);
     const ct=catMesh(0x2b2d42); ct.position.set(0,H*.72-1.1,D/2+.1); ct.rotation.y=Math.PI/2; g.add(ct); S.cat=ct;
     [-1.6,-0.8,1.8].forEach(px=>{ cyl(.35,.25,.5,8,0xA0522D,g,px-W*.1,.25,D/2+1.4); cone(.4,.6,6,0x4E7A3A,g,px-W*.1,.75,D/2+1.4); }); }
  if(i===2){ const gen=new THREE.Group(); gen.position.set(0,H*.68,D/2+.7); g.add(gen); const bo=cyl(.9,.9,2.4,12,0,gen,0,0,0,BRASS); bo.rotation.z=Math.PI/2; cyl(.25,.25,2.2,8,0,gen,.7,1.4,0,BRASS); const wh=new THREE.Mesh(new THREE.TorusGeometry(.7,.12,6,14),M(P.iron)); wh.position.set(-1.4,0,.3); gen.add(wh); S.gen=wh;
     [-1,1].forEach(s=>{ g.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.QuadraticBezierCurve3(new THREE.Vector3(s*W/2,H*.8,D/2),new THREE.Vector3(s*(W/2+2),H*.6,D/2+1),new THREE.Vector3(s*(W/2+4.5),H*.75,D/2)),8,.05,3),M(P.black))); });
     const npc=personMesh(3,"worker"); npc.position.set(-W*.25,0,D/2+2.2); g.add(npc); box(.5,.6,.1,0xEDE3C8,npc,0.35,1.2,.3); S.npc=npc; }
  if(i===3){ const sp=new THREE.Group(); sp.position.set(W*.28,3.7,D/2+.6); g.add(sp); [-0.7,0.7].forEach(x=>{ const t=new THREE.Mesh(new THREE.TorusGeometry(.55,.11,6,18),BRASS); t.position.x=x; sp.add(t); const l=new THREE.Mesh(new THREE.CircleGeometry(.5,18),new THREE.MeshStandardMaterial({color:0xBFD8E0,roughness:.2,metalness:.2})); l.position.x=x; sp.add(l); }); box(.4,.08,.08,0,sp,0,0.05,0,BRASS);
     for(let k=0;k<6;k++){ const t=new THREE.Mesh(new THREE.TorusGeometry(.14,.03,4,10),BRASS); t.position.set(-W*.32+(k%3)*.5-.1,1.5+Math.floor(k/3)*.6,D/2+.12); g.add(t); } }
  if(i===4){ box(W+.6,.6,1.6,P.stone,g,0,.3,D/2+.8); for(let c=0;c<4;c++) cyl(.38,.42,H*.62,10,0xC7B89A,g,-W*.36+c*W*.24,H*.31+.6,D/2+1.2);
     const ped=new THREE.Shape(); ped.moveTo(-W/2-.2,0); ped.lineTo(0,2.4); ped.lineTo(W/2+.2,0); const pe=new THREE.Mesh(new THREE.ExtrudeGeometry(ped,{depth:1.6,bevelEnabled:false}),M(0xC7B89A)); pe.position.set(0,H*.62+.6,D/2+.4); pe.castShadow=true; g.add(pe); S.perchLocal=new THREE.Vector3(0,H*.62+3.4,D/2+1.2);
     for(let k=0;k<5;k++){ const s=new THREE.Mesh(new THREE.SphereGeometry(.4,7,5),M(0xA8875A)); s.scale.y=.85; s.position.set(-W*.4+k*.45,.8,D/2+2.2+(k%2)*.4); g.add(s); } pl.position.set(0,H*.62+.15,D/2+1.75); }
  if(i===5){ const sh=new THREE.Group(); sh.position.set(-W*.25,H*.72,D/2+.9); g.add(sh); box(1.4,.1,.1,P.iron,sh,0,.8,0); cyl(.5,.3,.6,10,0x9C9282,sh,0,0,0); const pe=cyl(.07,.07,1,5,0x9C9282,sh,.2,.4,0); pe.rotation.z=-.5; S.sign=sh;
     for(let k=0;k<8;k++) cyl(.12,.14,.4,6,0,g,-W*.36+k*.32,1.6+(k%2)*.7,D/2+.15,new THREE.MeshStandardMaterial({color:[0x3A7A5A,0x8E3A3A,0x3A5A8E,0xC9A24B][k%4],roughness:.3}));
     const nurse=personMesh(7,"nurse"); nurse.position.set(W*.05,0,D/2+2); g.add(nurse); S.npc=nurse; }
  if(i===6){ box(W*.6,3.4,.12,0x4A3020,g,-W*.15,1.8,D/2+.05); const aw=box(W*.7,.15,1.6,0x2F5D50,g,-W*.15,3.8,D/2+.8); aw.rotation.x=.35;
     for(let k=0;k<10;k++) box(.6,.5,.6,0xB08A5A,g,-W*.4+(k%5)*.7,.8+Math.floor(k/5)*.55,D/2-.6);
     const cr=carriage(); cr.position.set(W*.1,0,D/2+3.8); g.add(cr); S.car=cr; }
  if(i===7){ const stripes=tex(256,64,(c,W2,H2)=>{ for(let k=0;k<8;k++){ c.fillStyle=k%2?"#F3E6CC":"#7A2E3A"; c.fillRect(k*W2/8,0,W2/8,H2);} });
     const aw=new THREE.Mesh(new THREE.BoxGeometry(W*.8,.12,2),new THREE.MeshStandardMaterial({map:stripes,roughness:.9})); aw.position.set(-W*.12,3.9,D/2+1); aw.rotation.x=.4; aw.castShadow=true; g.add(aw);
     box(2,1,.8,P.walnut,g,-W*.2,.5,D/2-.6); box(.8,.6,.6,0,g,-W*.2,1.3,D/2-.6,BRASS); }
  houses.push({g,i,S});
}
// ---------- carousel (skills) ----------
const car={plates:[]}; const carousel=landmark("skills",-10,30,faceCenter(-10,30)); claim(-10,30,9.5);
{ const g=carousel; cyl(8,8.4,.8,24,P.stone,g,0,.4,0); cyl(7.4,7.4,.6,24,P.walnut,g,0,1.1,0);
  const spin=new THREE.Group(); spin.position.y=1.4; g.add(spin); car.spin=spin;
  cyl(1.2,1.2,7,12,P.wine,spin,0,3.5,0); cyl(1.25,1.25,.5,12,0,spin,0,6.5,0,BRASS);
  for(let i=0;i<16;i++){ const geo=new THREE.ConeGeometry(8,4,1,1,true,i/16*Math.PI*2,Math.PI*2/16); const m=new THREE.Mesh(geo,new THREE.MeshStandardMaterial({color:i%2?P.cream:P.wine,roughness:.85,flatShading:true,side:THREE.DoubleSide})); m.position.y=10.4; m.castShadow=true; spin.add(m); }
  const rb=new THREE.Mesh(new THREE.CylinderGeometry(8,8,1.6,8,1,true),new THREE.MeshStandardMaterial({color:P.brass,roughness:.5,metalness:.4,side:THREE.DoubleSide})); rb.position.y=7.7; spin.add(rb);
  for(let i=0;i<8;i++){ const a=i/8*Math.PI*2+Math.PI/8; const pnl=plaque(SKILL_ALL[i],5.2,1.3,{bg:"#E8D7B0",fg:"#3A2A1A",frame:"#C9A24B"}); pnl.position.set(Math.sin(a)*7.5,7.7,Math.cos(a)*7.5); pnl.rotation.y=a; spin.add(pnl); }
  cone(.6,1.6,8,0,spin,0,13.2,0,BRASS); cyl(.05,.05,1.6,4,P.iron,spin,0,14.2,0); box(1,.5,.05,P.blood,spin,.5,14.6,0);
  for(let i=0;i<16;i++){ const a=i/16*Math.PI*2; cyl(.12,.12,7,6,0,spin,Math.sin(a)*7,3.5,Math.cos(a)*7,BRASS); }
  car.horses=[]; for(let i=0;i<8;i++){ const a=i/8*Math.PI*2; const hg=new THREE.Group(); hg.position.set(Math.sin(a)*5.4,1.6,Math.cos(a)*5.4); hg.rotation.y=a+Math.PI/2; spin.add(hg);
    cyl(.07,.07,6,5,0,hg,0,2,0,BRASS); horseMesh(hg); if(i%2===0&&!mobile){ const kid=personMesh(i,"child"); kid.position.set(0,1.05,0); kid.scale.setScalar(.8); hg.add(kid);} car.horses.push({g:hg,ph:i*.8}); }
  SKILL_ALL.forEach((s,i)=>{ const a=i/9*Math.PI*2; const pl=plaque(s,3,0.8,{bg:"#E9D9B4",fg:"#2A1E14",frame:"#A88437"}); pl.position.set(Math.sin(a)*8.45,.5,Math.cos(a)*8.45); pl.rotation.y=a; g.add(pl); pl.userData.skill=s; car.plates.push(pl); });
  [[-9,-3],[9,-3],[-7,7],[7,7]].forEach(([x,z])=>brazier(g,x,z,0,1.2));
}
// ---------- post & telegraph (contact) ----------
const post=landmark("contact",28,-28,faceCenter(28,-28)); claim(28,-28,10);
const balloon={};
{ const g=post; box(14,.6,11,P.stone,g,0,.3,0); box(13,7,9,P.brick,g,0,4,0); box(13.4,.4,9.4,P.stone,g,0,7.6,0); box(13.4,.4,9.4,P.stone,g,0,1,0);
  const mans=new THREE.Mesh(new THREE.CylinderGeometry(4.2,7.4,3.4,4,1),M(P.slate)); mans.rotation.y=Math.PI/4; mans.scale.set(1.3,1,.95); mans.position.y=9.5; mans.castShadow=true; g.add(mans);
  [-3.6,3.6].forEach(x=>{ box(1.6,1.6,1.6,P.slate,g,x,10,3.6); box(1.1,1.1,.1,0,g,x,10,4.42,GLOW(0xE0A050)); });
  box(1.2,3,1.2,P.brick,g,-4.5,11.8,-1.5); box(1.5,.4,1.5,P.stone,g,-4.5,13.4,-1.5);
  const ped=new THREE.Shape(); ped.moveTo(-3,0); ped.lineTo(0,2); ped.lineTo(3,0); const pe=new THREE.Mesh(new THREE.ExtrudeGeometry(ped,{depth:.6,bevelEnabled:false}),M(P.brick)); pe.position.set(0,7.8,4.2); g.add(pe);
  const sign=plaque("POST OFFICE",6,1.1,{bg:"#6A2A22",fg:"#F3E6CC"}); sign.position.set(0,6.9,4.56); g.add(sign);
  box(2.2,3.6,.2,0x3B2A1E,g,0,2.6,4.55); for(let s=0;s<3;s++) box(4,.35,1,P.stone,g,0,.75-s*.25,5.2+s*.7);
  [-4.2,4.2].forEach(x=>{ box(1.8,2.6,.12,0,g,x,4,4.52,GLOW(0xD8903E)); box(2.2,.3,.4,P.stone,g,x,2.6,4.6); });
  const pb=new THREE.Group(); pb.position.set(-6.6,0,6.6); g.add(pb); cyl(.6,.65,2.4,14,0xB0201E,pb,0,1.2,0); cyl(.7,.7,.25,14,0xB0201E,pb,0,2.5,0); box(.6,.12,.05,P.black,pb,0,1.8,.62); balloon.pb=pb;
  brazier(g,-4,7.4,0,1.1);
  [[-9,2],[9,-2],[16,-6]].forEach(([x,z])=>{ cyl(.18,.22,10,6,P.walnut,g,x,5,z); box(3,.18,.18,P.walnut,g,x,9.2,z); });
  const wire=(a,b)=>{ const m=new THREE.Vector3().addVectors(a,b).multiplyScalar(.5); m.y-=1.2; g.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.QuadraticBezierCurve3(a,m,b),10,.03,3),M(P.black))); };
  [-1.2,1.2].forEach(o=>{ wire(new THREE.Vector3(-9+o,9.3,2),new THREE.Vector3(9+o,9.3,-2)); wire(new THREE.Vector3(9+o,9.3,-2),new THREE.Vector3(16+o,9.3,-6)); });
  const lady=personMesh(5,"dress"); lady.position.set(4.4,0,6.6); g.add(lady);
  const b=new THREE.Group(); b.position.set(4,22,-2); g.add(b); balloon.g=b; balloon.y=b.position.y;
  for(let i=0;i<16;i++){ const geo=new THREE.SphereGeometry(4,2,12,i/16*Math.PI*2,Math.PI*2/16); const m=new THREE.Mesh(geo,new THREE.MeshStandardMaterial({color:i%2?0xE3C88A:P.wine,roughness:.85,flatShading:true})); m.scale.y=1.18; m.castShadow=true; b.add(m); }
  cyl(.9,.9,1.4,10,P.walnut,b,0,-6.6,0); for(let k=0;k<4;k++){ const a=k*Math.PI/2+.78; const r=box(.04,2.6,.04,P.black,b,Math.cos(a)*1.1,-5.1,Math.sin(a)*1.1); r.rotation.z=Math.cos(a)*.35; r.rotation.x=-Math.sin(a)*.35; }
  const rope=new THREE.Mesh(new THREE.CylinderGeometry(.04,.04,1,4),M(P.black)); g.add(rope); balloon.rope=rope; balloon.anchor=new THREE.Vector3(6,.5,-3.5); cyl(.2,.2,1,6,P.walnut,g,6,.5,-3.5);
}
// ---------- canal, bridges, bandstand ----------
const boats=[];
const canalCurve=new THREE.CatmullRomCurve3([new THREE.Vector3(46,0,18),new THREE.Vector3(34,0,14),new THREE.Vector3(24,0,16),new THREE.Vector3(16,0,10),new THREE.Vector3(10,0,4)]);
{ const pts=canalCurve.getSpacedPoints(40); pts.forEach(p=>claim(p.x,p.z,3.6));
  const L=[],Rr=[]; pts.forEach((p,i)=>{ const t=canalCurve.getTangentAt(i/40); const n=new THREE.Vector3(-t.z,0,t.x); L.push(p.clone().addScaledVector(n,3)); Rr.push(p.clone().addScaledVector(n,-3)); });
  const pos=[]; for(let i=0;i<40;i++){ const a=L[i],b=Rr[i],c=L[i+1],d=Rr[i+1]; pos.push(a.x,.05,a.z, b.x,.05,b.z, c.x,.05,c.z, b.x,.05,b.z, d.x,.05,d.z, c.x,.05,c.z); }
  const wg=new THREE.BufferGeometry(); wg.setAttribute("position",new THREE.Float32BufferAttribute(pos,3)); wg.computeVertexNormals();
  city.add(new THREE.Mesh(wg,new THREE.MeshStandardMaterial({color:P.water,roughness:.25,metalness:.1,side:THREE.DoubleSide})));
  [L,Rr].forEach(side=>{ for(let i=0;i<40;i++){ const a=side[i],b=side[i+1]; const m=box(a.distanceTo(b)+.1,.8,.6,P.stone,city,(a.x+b.x)/2,.4,(a.z+b.z)/2); m.rotation.y=-Math.atan2(b.z-a.z,b.x-a.x); } });
  [0.3,0.72].forEach(t=>{ const p=canalCurve.getPointAt(t), tg=canalCurve.getTangentAt(t); const br=new THREE.Group(); br.position.copy(p); br.rotation.y=-Math.atan2(tg.z,tg.x); city.add(br);
    const arch=new THREE.Mesh(new THREE.TorusGeometry(3.4,.9,4,12,Math.PI),M(P.stone)); arch.rotation.y=Math.PI/2; arch.scale.set(1,.5,1); br.add(arch); box(2.6,.3,8,P.stone,br,0,1.75,0); [-1.2,1.2].forEach(x=>box(.2,.6,8,P.stone,br,x,2.1,0)); });
  for(let k=0;k<4;k++){ const b=new THREE.Group(); box(2.6,.5,1.1,P.walnut,b,0,.3,0); const pp=personMesh(k+2,"worker"); pp.scale.setScalar(.7); pp.position.set(.6,.4,0); b.add(pp); city.add(b); boats.push({b,t:k/4,sp:1/rnd(30,40),dir:k%2?1:-1}); }
}
const band=new THREE.Group(); band.position.set(30,0,30); city.add(band); claim(30,30,6);
const bandsmen=[];
{ cyl(4.6,4.8,1,8,P.stone,band,0,.5,0); for(let i=0;i<8;i++){ const a=i/8*Math.PI*2; cyl(.15,.15,4,6,P.green,band,Math.cos(a)*4,3,Math.sin(a)*4); }
  const dome=new THREE.Mesh(new THREE.SphereGeometry(4.6,8,6,0,Math.PI*2,0,Math.PI/2),M(P.green)); dome.position.y=5; dome.scale.y=.6; dome.castShadow=true; band.add(dome); cone(.4,1.4,8,0,band,0,8.2,0,BRASS);
  for(let k=0;k<4;k++){ const m=personMesh(k,"tophat"); const a=k/4*Math.PI*2; m.position.set(Math.cos(a)*2,1,Math.sin(a)*2); m.rotation.y=-a-Math.PI/2; band.add(m); bandsmen.push(m); } }
// ---------- railway + station + train ----------
const TR=45.5;
const track=new THREE.CatmullRomCurve3(Array.from({length:36},(_,i)=>{ const a=i/36*Math.PI*2; return new THREE.Vector3(Math.cos(a)*TR,.15,Math.sin(a)*TR); }),true);
{ const N=260; const sl=new THREE.InstancedMesh(new THREE.BoxGeometry(2.2,.18,.45),M(0x3B2A1E),N); const d=new THREE.Object3D();
  for(let i=0;i<N;i++){ const t=i/N, p=track.getPointAt(t), tg=track.getTangentAt(t); d.position.set(p.x,.1,p.z); d.lookAt(p.clone().add(tg).setY(.1)); d.rotateY(Math.PI/2); d.updateMatrix(); sl.setMatrixAt(i,d.matrix); } sl.receiveShadow=true; city.add(sl);
  [-.75,.75].forEach(o=>{ const r=new THREE.Mesh(new THREE.TorusGeometry(TR+o,.08,3,200),M(0x50505a,.4,.6)); r.rotation.x=Math.PI/2; r.position.y=.3; city.add(r); }); }
const STATION_T=0.14;
const station=new THREE.Group(); { const p=track.getPointAt(STATION_T); const n=p.clone().setY(0).normalize(); station.position.copy(p).addScaledVector(n,-4.5).setY(0); station.rotation.y=faceCenter(station.position.x,station.position.z)+Math.PI; city.add(station); claim(station.position.x,station.position.z,9);
  const g=station; box(16,.8,5,P.stone,g,0,.4,-1); for(let i=0;i<6;i++) [-3,1].forEach(z=>cyl(.18,.2,5,6,P.green,g,-7.5+i*3,3,z));
  const glass=new THREE.MeshStandardMaterial({color:0x7FA59A,roughness:.3,transparent:true,opacity:.6,side:THREE.DoubleSide}); const cr=new THREE.Mesh(new THREE.CylinderGeometry(3,3,16.5,12,1,true,-Math.PI/2,Math.PI),glass); cr.rotation.z=Math.PI/2; cr.position.set(0,5.4,-1); g.add(cr);
  for(let i=0;i<7;i++){ const rib=new THREE.Mesh(new THREE.TorusGeometry(3,.12,4,12,Math.PI),M(P.green)); rib.rotation.y=Math.PI/2; rib.position.set(-8+i*16/6,5.4,-1); g.add(rib); }
  for(let k=0;k<4;k++){ const sp=plaque("",2.2,.9,{bg:"#E6D6B2"}); sp.position.set(-6+k*4,2.4,-3.6); sp.rotation.y=Math.PI; g.add(sp); cyl(.06,.06,2,4,P.iron,g,-6+k*4,1,-3.6); } }
const train={cars:[],t:0.3,stop:0,wheels:[],puffs:[]};
{ const mk=(loco)=>{ const g=new THREE.Group(); city.add(g);
    box(loco?6:5.4,.5,2.2,P.iron,g,0,.8,0);
    if(loco){ cyl(1,1,4,12,P.green,g,.6,1.95,0).rotation.z=Math.PI/2; box(2,2.8,2.2,P.green,g,-2,2.4,0); box(2.4,.25,2.5,P.black,g,-2,3.9,0); cyl(.35,.5,1.4,8,P.black,g,2.1,3.4,0); cyl(.5,.5,.1,12,0,g,2.65,1.95,0,BRASS).rotation.z=Math.PI/2; cyl(.3,.3,.6,8,0,g,.5,3.1,0,BRASS); box(1,.7,.1,0,g,-2,2.8,1.11,GLOW(0xE0A050)); }
    else { box(5.2,2.4,2.1,P.wine,g,0,2.25,0); box(5.4,.25,2.3,P.black,g,0,3.55,0); for(let w=0;w<4;w++) box(.8,.8,2.12,0,g,-1.8+w*1.2,2.5,0,GLOW(0xD89850)); box(5.25,.12,2.12,0,g,0,1.5,0,BRASS); }
    [-1.8,0,1.8].forEach(x=>[-1.1,1.1].forEach(z=>{ const w=cyl(.55,.55,.15,10,P.black,g,x,.6,z); w.rotation.x=Math.PI/2; train.wheels.push(w); })); return g; };
  train.cars.push(mk(true)); for(let k=0;k<4;k++) train.cars.push(mk(false));
  for(let k=0;k<16;k++){ const s=new THREE.Mesh(new THREE.IcosahedronGeometry(1,0),new THREE.MeshStandardMaterial({color:0xD8D0CC,roughness:1,transparent:true,opacity:.75,flatShading:true,depthWrite:false})); s.visible=false; scene.add(s); train.puffs.push({m:s,life:0}); } }
PROJECTS.forEach((_,i)=>house(i));
// ---------- townhouses ----------
{ const FAC=[P.brick,0x8C4A36,0x6E3A30,0x9A7A5A,0x5A4A42,P.green]; const d=new THREE.Object3D();
  const spots=[]; for(let k=0;k<1500&&spots.length<70;k++){ const a=srnd(0,Math.PI*2), r=srnd(10,41); const x=Math.cos(a)*r,z=Math.sin(a)*r; if(corridor(x,z)) continue; if(Math.abs(r-TR)<3.5) continue; if(!free(x,z,4.2)) continue; claim(x,z,4.2); spots.push([x,z]); }
  const per={}; spots.forEach(([x,z],i)=>{ const c=FAC[i%FAC.length]; (per[c]=per[c]||[]).push([x,z]); });
  const roofGeo=new THREE.ConeGeometry(4.4,3,4); roofGeo.rotateY(Math.PI/4); const all=[];
  Object.entries(per).forEach(([c,list])=>{ const im=new THREE.InstancedMesh(new THREE.BoxGeometry(6,1,6),M(+c),list.length); im.castShadow=im.receiveShadow=true;
    list.forEach(([x,z],k)=>{ const h=srnd(7,12); const ry=faceCenter(x,z); d.position.set(x,h/2,z); d.rotation.set(0,ry,0); d.scale.set(1,h,1); d.updateMatrix(); im.setMatrixAt(k,d.matrix); all.push([x,z,h,ry]); }); city.add(im); });
  const rim=new THREE.InstancedMesh(roofGeo,M(P.slate),all.length); rim.castShadow=true; const ch=new THREE.InstancedMesh(new THREE.BoxGeometry(.8,2,.8),M(0x7A3A2A),all.length);
  all.forEach(([x,z,h,ry],k)=>{ d.position.set(x,h+1.5,z); d.rotation.set(0,ry,0); d.scale.set(1,1,1); d.updateMatrix(); rim.setMatrixAt(k,d.matrix); d.position.set(x+1.5,h+1.8,z+1); d.updateMatrix(); ch.setMatrixAt(k,d.matrix); }); city.add(rim,ch);
  const wim=new THREE.InstancedMesh(new THREE.PlaneGeometry(.9,1.4),GLOW(0xC88A40),all.length*6); let n=0; const off=new THREE.Vector3(), Y=new THREE.Vector3(0,1,0);
  all.forEach(([x,z,h,ry])=>{ for(let f=0;f<Math.min(3,Math.floor(h/3.2));f++) for(let c=-1;c<=1;c+=2){ off.set(c*1.4,2+f*3,3.02).applyAxisAngle(Y,ry); d.position.set(x+off.x,off.y,z+off.z); d.rotation.set(0,ry,0); d.updateMatrix(); wim.setMatrixAt(n++,d.matrix); } }); wim.count=n; city.add(wim); }
const lampLights=[];
{ const d=new THREE.Object3D(); const N=50; const tr=new THREE.InstancedMesh(new THREE.IcosahedronGeometry(1.8,0),M(0x3F5A2E),N), tk=new THREE.InstancedMesh(new THREE.CylinderGeometry(.25,.3,2,5),M(P.walnut),N); tr.castShadow=true; let n=0;
  for(let k=0;k<800&&n<N;k++){ const a=srnd(0,6.28), r=srnd(14,43); const x=Math.cos(a)*r, z=Math.sin(a)*r; if(Math.abs(r-TR)<2.5||!free(x,z,1.8)||corridor(x,z)) continue; claim(x,z,1.8); const s=srnd(.8,1.4);
    d.position.set(x,1,z); d.scale.setScalar(s); d.updateMatrix(); tk.setMatrixAt(n,d.matrix); d.position.y=2.6*s; d.updateMatrix(); tr.setMatrixAt(n,d.matrix); n++; } tr.count=tk.count=n; city.add(tr,tk);
  const L=80; const lp=new THREE.InstancedMesh(new THREE.CylinderGeometry(.07,.1,3.4,5),M(P.iron),L), lh=new THREE.InstancedMesh(new THREE.BoxGeometry(.4,.55,.4),GLOW(0xF0B060),L); let m=0;
  for(let k=0;k<1200&&m<L;k++){ const a=srnd(0,6.28), r=srnd(6,44); const x=Math.cos(a)*r,z=Math.sin(a)*r; if(Math.abs(r-TR)<2||!free(x,z,.6)||(corridor(x,z)&&r>34)) continue; claim(x,z,.6); d.scale.setScalar(1); d.position.set(x,1.7,z); d.updateMatrix(); lp.setMatrixAt(m,d.matrix); d.position.y=3.6; d.updateMatrix(); lh.setMatrixAt(m,d.matrix); m++; } lp.count=lh.count=m; city.add(lp,lh);
  let b=0; for(let k=0;k<800&&b<16;k++){ const a=srnd(0,6.28), r=srnd(8,42); const x=Math.cos(a)*r,z=Math.sin(a)*r; if(Math.abs(r-TR)<2||!free(x,z,1)) continue; claim(x,z,1); brazier(city,x,z,0,1.2); b++; }
  for(let k=0;k<4;k++){ const l=new THREE.PointLight(0xFF9A50,18,22,2); city.add(l); lampLights.push(l); } }
const rocks=[]; for(let k=0;k<10;k++){ const a=k/10*Math.PI*2+.2, r=rnd(56,72); const m=new THREE.Mesh(jit(new THREE.DodecahedronGeometry(rnd(1.5,4),0),.4),M(k%2?0x4A3C38:0x5E4C44)); m.position.set(Math.cos(a)*r,rnd(-35,-5),Math.sin(a)*r); world.add(m); rocks.push({m,y:m.position.y,ph:rnd(0,6),sp:rnd(7,11)}); }
const clouds=[]; const cmat=new THREE.MeshStandardMaterial({color:0x9A6A6A,roughness:1,flatShading:true});
function cloud(x,y,z,s){ const g=new THREE.Group(); for(let k=0;k<6;k++){ const m=new THREE.Mesh(jit(new THREE.IcosahedronGeometry(rnd(3,5.5),0),.6),cmat); m.position.set((k-2.5)*4.4,rnd(-1,1.5)-Math.abs(k-2.5)*.8,rnd(-2,2)); g.add(m);} g.position.set(x,y,z); g.scale.setScalar(s); scene.add(g); clouds.push({g,x0:x}); }
[[-60,-48,10,2],[50,-52,-30,2.2],[10,-60,60,2.4],[-90,10,-80,1.6],[80,20,-110,1.8],[-120,-10,30,1.7],[30,-40,110,2.2],[110,-30,20,1.8]].forEach(a=>cloud(...a));
const smokes=[]; if(!mobile){ const sm=new THREE.MeshStandardMaterial({color:P.smoke,roughness:1,transparent:true,opacity:.5,flatShading:true,depthWrite:false});
  [[-30,34,-26],[-36,30,-22],[-24,32,-32],[-42,26,-30],[-20,28,-36],[-33,40,-28]].forEach(([x,y,z],k)=>{ for(let j=0;j<5;j++){ const m=new THREE.Mesh(new THREE.IcosahedronGeometry(1.4,0),sm); scene.add(m); smokes.push({m,x,y,z,ph:j/5+k*.13}); } }); }
// ---------- people, cats, horses ----------
function personMesh(i,kind){ const g=new THREE.Group(); const coats=[0x2A2A30,0x3E4A63,0x5A3A2A,0x2F5D50,0x4A2E3A,0x6A5A4A,0x3A3234,0xEDE6DA];
  const c=kind==="nurse"?0xE9E4D8:kind==="worker"?0x5A4A3A:coats[i%coats.length]; const skin=0xD8B494;
  if(kind==="dress"||kind==="nurse"){ cone(.5,1.3,8,c,g,0,.65,0); box(.4,.6,.3,c,g,0,1.5,0); } else { box(.18,.8,.2,0x1E1E22,g,-.12,.4,0); box(.18,.8,.2,0x1E1E22,g,.12,.4,0); box(.5,.75,.32,c,g,0,1.18,0); }
  const h=new THREE.Mesh(new THREE.SphereGeometry(.2,8,6),M(skin)); h.position.y=1.85; g.add(h);
  if(kind==="tophat"){ cyl(.28,.28,.04,10,P.black,g,0,2,0); cyl(.17,.17,.4,10,P.black,g,0,2.2,0); }
  if(kind==="dress"){ const p=new THREE.Mesh(new THREE.ConeGeometry(.7,.35,10,1,true),M(0xE8D7B0)); p.material.side=THREE.DoubleSide; p.position.set(.2,2.6,0); g.add(p); cyl(.02,.02,1.1,4,P.black,g,.2,2.1,0); }
  if(kind==="worker") cyl(.22,.24,.15,8,0x4A3A2A,g,0,2.02,0);
  if(kind==="nurse") box(.36,.12,.3,0xFFFFFF,g,0,2.05,0);
  if(kind==="child") g.scale.setScalar(.7);
  return g; }
function catMesh(c){ const g=new THREE.Group(); box(.55,.28,.25,c,g,0,.3,0); const h=box(.24,.22,.22,c,g,.33,.45,0); cone(.05,.12,3,c,g,.36,.6,.07); cone(.05,.12,3,c,g,.36,.6,-.07); const t=box(.06,.06,.4,c,g,-.33,.45,0); t.rotation.x=.6; t.rotation.y=Math.PI/2; [-.2,.2].forEach(x=>[-.08,.08].forEach(z=>box(.06,.18,.06,c,g,x,.09,z))); return g; }
function horseMesh(par,c=0xE8DCC4){ const g=new THREE.Group(); par.add(g); box(1.5,.6,.5,c,g,0,.6,0); const n=box(.3,.7,.35,c,g,.7,1,0); n.rotation.z=-.4; box(.55,.28,.3,c,g,1,1.3,0); box(.12,.4,.36,0x8E1B1B,g,.55,1.05,0); [-.55,.55].forEach(x=>[-.18,.18].forEach(z=>box(.12,.6,.12,c,g,x,.15,z))); box(.08,.5,.1,c,g,-.8,.6,0).rotation.z=.6; box(.5,.06,.55,0,g,0,.92,0,BRASS); return g; }
function carriage(){ const g=new THREE.Group(); box(3,1.6,1.6,0x2F5D50,g,0,1.4,0); box(3.1,.15,1.7,P.black,g,0,2.25,0); for(let k=0;k<4;k++) box(.7,.6,.6,0xB08A5A,g,-1+k*.6,2.6,(k%2)*.2); [-1,1].forEach(x=>[-.85,.85].forEach(z=>{ const w=cyl(.5,.5,.1,10,P.black,g,x,.5,z); w.rotation.x=Math.PI/2; })); const h=horseMesh(g,0x6B4E3A); h.position.x=3; h.scale.setScalar(1.2); return g; }
const walkers=[]; { const N=mobile?15:40; for(let k=0;k<N;k++){ const kinds=["tophat","dress","tophat","worker","dress"]; const m=personMesh(k,kinds[k%5]); m.scale.multiplyScalar(.9); city.add(m);
  const lane=k<8; const r=rnd(12,40), a=rnd(0,6.28); walkers.push({m,r,a,sp:(rnd(.6,1.2)/r)*(k%2?1:-1),lane}); } }
const cats=[]; for(let k=0;k<10;k++){ const c=catMesh([0x2b2d42,0xC07A3A,0x8a8a8a,0x1A1617][k%4]); const a=rnd(0,6.28), r=rnd(10,40); c.position.set(Math.cos(a)*r,0,Math.sin(a)*r); c.rotation.y=rnd(0,6); city.add(c); cats.push(c); }
// ---------- dragons ----------
function dragon(body,dark,horn,span){ const root=new THREE.Group(); const mb=new THREE.MeshStandardMaterial({color:body,roughness:.55,metalness:.2,flatShading:true}), md=M(dark), mh=M(horn,.5,.2);
  const memb=new THREE.MeshStandardMaterial({color:dark,roughness:.8,side:THREE.DoubleSide,flatShading:true});
  const torso=new THREE.Mesh(new THREE.SphereGeometry(1,10,8),mb); torso.scale.set(2.4,1.1,1.2); root.add(torso);
  const belly=new THREE.Mesh(new THREE.SphereGeometry(1,8,6),M(0xC8A060)); belly.scale.set(2,.7,.9); belly.position.y=-.4; root.add(belly);
  const neck=[]; let par=root, off=new THREE.Vector3(2.1,.5,0); for(let k=0;k<6;k++){ const s=new THREE.Group(); s.position.copy(off); par.add(s); const m=new THREE.Mesh(new THREE.SphereGeometry(.62-k*.05,7,5),mb); m.scale.set(1.3,1,1); s.add(m); cone(.12,.5,4,0,s,0,.6,0,mh); neck.push(s); par=s; off=new THREE.Vector3(.75,.28,0); }
  const head=new THREE.Group(); head.position.set(.8,.1,0); par.add(head); box(1.4,.6,.7,0,head,.4,0,0,mb); box(.9,.25,.5,0,head,1.2,-.15,0,mb); const jaw=new THREE.Group(); jaw.position.set(.4,-.3,0); head.add(jaw); box(1.3,.18,.5,0,jaw,.5,0,0,md);
  [-.25,.25].forEach(z=>{ const h=cone(.12,1.1,5,0,head,-.3,.55,z,mh); h.rotation.z=1.1; box(.14,.08,.05,0,head,.75,.2,z*1.4,GLOW(0xFFC040)); });
  const tail=[]; par=root; off=new THREE.Vector3(-2.2,0,0); for(let k=0;k<10;k++){ const s=new THREE.Group(); s.position.copy(off); par.add(s); const m=new THREE.Mesh(new THREE.SphereGeometry(.5-k*.04,6,5),mb); m.scale.set(1.6,1,1); s.add(m); if(k%2===0) cone(.1,.4,4,0,s,0,.45,0,mh); tail.push(s); par=s; off=new THREE.Vector3(-.75,0,0); }
  const sp=new THREE.Shape(); sp.moveTo(0,0); sp.lineTo(.5,.4); sp.lineTo(0,.8); sp.lineTo(-.5,.4); const spade=new THREE.Mesh(new THREE.ShapeGeometry(sp),memb); spade.rotation.z=Math.PI/2; spade.position.x=-.5; par.add(spade);
  const wings=[]; [-1,1].forEach(side=>{ const sh=new THREE.Group(); sh.position.set(.5,.8,side*.9); root.add(sh); const L=span*.25;
    const ws=new THREE.Shape(); ws.moveTo(0,0); ws.lineTo(L,.3); ws.lineTo(L*.85,-L*.5); ws.lineTo(L*.4,-L*.35); ws.lineTo(0,-L*.55); ws.lineTo(-L*.2,-.4);
    const w1=new THREE.Mesh(new THREE.ShapeGeometry(ws),memb); w1.rotation.x=-Math.PI/2*side; w1.rotation.z=0; const hold=new THREE.Group(); hold.rotation.y=-Math.PI/2*side; hold.add(w1); sh.add(hold); box(L,.12,.12,0,hold,L/2,0,0,md);
    const tip=new THREE.Group(); tip.position.set(L,0,0); hold.add(tip); const w2=new THREE.Mesh(new THREE.ShapeGeometry((()=>{ const s=new THREE.Shape(); s.moveTo(0,0); s.lineTo(L*.9,.1); s.lineTo(0,-L*.6); return s; })()),memb); w2.rotation.x=-Math.PI/2*side; tip.add(w2); box(L*.9,.1,.1,0,tip,L*.45,0,0,md);
    wings.push({sh,tip,side}); });
  [[1.2,.8],[-1.2,.8],[1.2,-.8],[-1.2,-.8]].forEach(([x,z])=>{ const l=box(.3,1,.35,0,root,x,-1,z,mb); l.rotation.z=.4; });
  const s=span/26*1.0; root.scale.setScalar(s); scene.add(root); return {root,neck,head,jaw,tail,wings,mouth:head}; }
const mkPath=(pts)=>new THREE.CatmullRomCurve3(pts.map(p=>new THREE.Vector3(...p)),true);
const dragons=[
 {d:dragon(0x8E1B1B,0x4A0E10,0xC9A24B,26),path:mkPath([[70,40,0],[40,48,-60],[-30,52,-70],[-75,44,-10],[-50,38,55],[10,44,75],[60,50,45]]),dur:38,flap:1.6,mode:"fly"},
 {d:dragon(0xC9A24B,0x7A5A1E,0xF3E6CC,16),path:mkPath([[30,30,30],[-10,34,40],[-40,28,10],[-20,32,-30],[25,30,-35],[45,34,0]]),dur:30,flap:1.1,mode:"fly"},
];
if(!mobile) dragons.push({d:dragon(0x5A5A60,0x2A2A30,0xBDB39E,18),path:mkPath([[-90,60,-40],[-40,66,-90],[40,62,-90],[90,58,-30],[60,64,60],[-60,60,70]]),dur:24,flap:1.3,mode:"glide"});
const perched={d:dragon(0x9A6A3A,0x4A3420,0xC9A24B,12),mode:"perch"}; perched.d.root.position.set(6,41.8,-6); perched.d.root.rotation.y=-.8; dragons.push(perched);
const tmpV=new THREE.Vector3(), tmpV2=new THREE.Vector3();
function animDragon(o,t,dt){ const D=o.d;
  if(o.mode!=="perch"&&!o.override){ const u=((t/o.dur)+(o.off||0))%1; o.path.getPointAt(u,tmpV); o.path.getPointAt((u+.004)%1,tmpV2); D.root.position.copy(tmpV); D.root.lookAt(tmpV2); D.root.rotateY(-Math.PI/2); }
  const fl=o.mode==="perch"||o.override?0:o.mode==="glide"?Math.sin(t*o.flap)*.15:Math.sin(t*Math.PI*2/o.flap);
  D.wings.forEach(w=>{ w.sh.rotation.x=(o.mode==="perch"||o.override?-.9:fl*.7)*w.side; w.tip.rotation.z=(o.mode==="perch"||o.override?1.2:Math.max(0,fl)*.6); });
  D.tail.forEach((s,k)=>{ s.rotation.y=Math.sin(t*2-k*.5)*.12; s.rotation.z=o.mode==="perch"||o.override?-.08:0; });
  D.neck.forEach((s,k)=>{ s.rotation.z=(o.mode==="perch"||o.override?.12:-.02)+Math.sin(t*1.3-k*.4)*.04; });
  D.jaw.rotation.z=-(o.firing>0?.6:.05); }
// ---------- fire ----------
const FN=300; const fire=new THREE.InstancedMesh(new THREE.IcosahedronGeometry(.5,0),new THREE.MeshBasicMaterial({color:0xffffff,transparent:true,opacity:.9,depthWrite:false}),FN); fire.instanceMatrix.setUsage(THREE.DynamicDrawUsage); scene.add(fire);
const fp=Array.from({length:FN},()=>({life:0,p:new THREE.Vector3(),v:new THREE.Vector3()})); let fi=0, shake=0; const fcol=new THREE.Color(); const fd=new THREE.Object3D();
function breathe(o){ if(reduced) return; o.firing=1.4; o.cool=4; if(o===dragons[0]) shake=.6; }
function emitFire(o,dt){ const H=o.d.head; H.updateWorldMatrix(true,false); const p=new THREE.Vector3(1.8,-.1,0).applyMatrix4(H.matrixWorld); const dir=new THREE.Vector3(1,-.25,0).transformDirection(H.matrixWorld);
  for(let k=0;k<6;k++){ const q=fp[fi=(fi+1)%FN]; q.life=1; q.p.copy(p); q.v.copy(dir).multiplyScalar(rnd(14,22)).add(new THREE.Vector3(rnd(-2,2),rnd(-2,2),rnd(-2,2))); } }
function updFire(dt){ for(let k=0;k<FN;k++){ const q=fp[k]; if(q.life>0){ q.life-=dt*1.4; q.p.addScaledVector(q.v,dt); q.v.multiplyScalar(.96); q.v.y+=dt*3; }
  const l=Math.max(0,q.life); fd.position.copy(q.p); fd.scale.setScalar(l>0?(1.6-l)*1.8:0); fd.updateMatrix(); fire.setMatrixAt(k,fd.matrix);
  fcol.setHSL(.02+.12*l,1,.35+.3*l); fire.setColorAt(k,fcol); } fire.instanceMatrix.needsUpdate=true; fire.instanceColor&&(fire.instanceColor.needsUpdate=true); }
// ---------- UI ----------
const $=s=>document.querySelector(s);
$("#sk").innerHTML=SKILLS.map(g=>`<div class="grp"><h4>${g.g}</h4>${g.s.map(s=>`<span class="chip">${s}</span>`).join("")}</div>`).join("");
$("#ms").innerHTML=[0,1,2,3].map(i=>`<div class="c" data-i="${i}"></div><div class="b"></div>`).join("");
const nav=$("#nav"); const pb=document.createElement("button"); pb.dataset.s="projects"; pb.textContent="المشاريع"; nav.insertBefore(pb,nav.children[1]);
const pc=document.createElement("section"); pc.className="card"; pc.id="p-projects"; document.body.appendChild(pc);
const laneBar=document.createElement("div"); laneBar.id="lane"; laneBar.style.cssText="position:fixed;bottom:18px;left:50%;transform:translateX(-50%);display:none;gap:6px;z-index:5;flex-wrap:wrap;justify-content:center;direction:ltr";
PROJECTS.forEach((p,i)=>{ const b=document.createElement("button"); b.textContent=p.latin; b.style.cssText="font:700 14px Amiri,serif;background:#F3E6CC;border:1px solid #C9A24B;border-radius:5px;padding:5px 12px;cursor:pointer"; b.onclick=()=>openHouse(i); laneBar.appendChild(b); }); document.body.appendChild(laneBar);
const GH="https://github.com/jasbx222/";
function fillProject(i){ const p=PROJECTS[i]; pc.innerHTML=`<button class="x" aria-label="إغلاق">✕</button><h2>${p.title}</h2><div style="text-align:center;direction:ltr;color:#6a5d48;font:700 18px Amiri">${p.latin}</div><div class="orn">❧ ✦ ❧</div>
 ${p.desc?`<p style="font:400 19px Amiri;text-align:center;margin:6px 0 12px">${p.desc}</p>`:""}<div style="text-align:center">${p.chips.map(c=>`<span class="chip">${c}</span>`).join("")}</div>
 <a class="row" href="${GH+p.repo}" target="_blank" rel="noopener"><b>المستودع</b><span class="v" style="opacity:.8;direction:ltr">${p.repo}</span></a>
 ${p.extra?`<a class="row" href="${GH+p.extra}" target="_blank" rel="noopener"><b>مستودع مرافق</b><span class="v" style="opacity:.8;direction:ltr">${p.extra}</span></a>`:""}
 <a class="btn" href="${GH+p.repo}" target="_blank" rel="noopener">عرض على GitHub</a>
 <div style="display:flex;justify-content:space-between;margin-top:14px"><button class="btn" style="width:46%;margin:0;border:0;cursor:pointer" data-nav="1">التالي ←</button><button class="btn" style="width:46%;margin:0;border:0;cursor:pointer" data-nav="-1">→ السابق</button></div>`;
 pc.querySelector(".x").onclick=()=>openSection("projects"); pc.querySelectorAll("[data-nav]").forEach(b=>b.onclick=()=>openHouse((i+ +b.dataset.nav+8)%8)); }
const laneMid=()=>{ const a=A0+3.5*STEP; return new THREE.Vector3(Math.cos(a)*LANE_R,0,Math.sin(a)*LANE_R); };
const VIEWS={
 about:{p:new THREE.Vector3(-2,30,4),t:new THREE.Vector3(-30,14,-26)},
 projects:{p:STREET_C.clone().addScaledVector(STREET_F,78).setY(36),t:STREET_C.clone().setY(5)},
 skills:{p:new THREE.Vector3(10,18,52),t:new THREE.Vector3(-10,5,30)},
 experience:{p:new THREE.Vector3(Math.cos(STATION_T*6.283)*22,22,Math.sin(STATION_T*6.283)*22),t:station.position.clone().setY(3)},
 contact:{p:new THREE.Vector3(18,20,2),t:new THREE.Vector3(30,10,-28)},
};
{ const s=station.position.clone().setY(0).normalize(); VIEWS.experience.p=station.position.clone().addScaledVector(s,-26).setY(16); }
function houseView(i){ const h=houses[i].g; const fwd=new THREE.Vector3(0,0,1).applyQuaternion(h.quaternion); const top=[16,11,13,12,13,12,11,11][i];
  return {p:h.position.clone().addScaledVector(fwd,20+top*.5).setY(5.5+top*.3),t:h.position.clone().setY(top*.5)}; }
let fly=null, mode="home", curHouse=-1, lastInput=performance.now();
function limits(free){ if(free){ controls.minDistance=8; controls.maxDistance=190; controls.minPolarAngle=0.2; controls.maxPolarAngle=1.45; controls.minAzimuthAngle=-Infinity; controls.maxAzimuthAngle=Infinity; } else { controls.minDistance=80; controls.maxDistance=190; controls.minPolarAngle=0.55; controls.maxPolarAngle=1.2; controls.minAzimuthAngle=Math.PI/4-0.78; controls.maxAzimuthAngle=Math.PI/4+0.78; } }
function goTo(v,dur=1.8){ limits(v!==HOME); fly={p0:camera.position.clone(),t0:controls.target.clone(),p1:v.p.clone(),t1:v.t.clone(),u:0,dur}; }
function closeAll(){ document.querySelectorAll(".card.open,#tl.open").forEach(e=>e.classList.remove("open")); nav.querySelectorAll("button").forEach(b=>b.classList.remove("on")); laneBar.style.display="none"; }
function openSection(s){ closeAll(); mode=s; curHouse=-1; goTo(VIEWS[s]); nav.querySelector(`[data-s="${s}"]`)?.classList.add("on"); $("#back").style.display="block";
  if(s==="experience") $("#tl").classList.add("open"); else if(s==="projects"){ laneBar.style.display="flex"; history.replaceState(null,"","#projects"); } else $("#p-"+s)?.classList.add("open"); }
function openHouse(i){ closeAll(); mode="house"; curHouse=i; fillProject(i); pc.classList.add("open"); laneBar.style.display="flex"; nav.querySelector('[data-s="projects"]').classList.add("on"); $("#back").style.display="block"; goTo(houseView(i)); history.replaceState(null,"","#projects/"+PROJECTS[i].repo); }
function home(){ closeAll(); mode="home"; curHouse=-1; goTo(HOME); $("#back").style.display="none"; history.replaceState(null,"",location.pathname); }
nav.querySelectorAll("button").forEach(b=>b.onclick=()=>openSection(b.dataset.s));
document.querySelectorAll(".card .x,#tl .x").forEach(b=>b.onclick=home); $("#back").onclick=()=>mode==="house"?openSection("projects"):home();
addEventListener("keydown",e=>{ lastInput=performance.now(); if(e.key==="Escape") (mode==="house"?openSection("projects"):home()); if(mode==="house"&&(e.key==="ArrowLeft"||e.key==="ArrowRight")) openHouse((curHouse+(e.key==="ArrowLeft"?1:7))%8); });
const ray=new THREE.Raycaster(), mouse=new THREE.Vector2(); let hover=null;
const keyOf=o=>{ while(o){ if(o.userData.key) return o; o=o.parent; } return null; };
const LABEL={about:"القلعة — عنّي",projects:"قاعة المعارض — المشاريع",skills:"الدوّامة — المهارات",contact:"البريد — تواصل",experience:"المحطة — الخبرة"};
canvas.addEventListener("pointermove",e=>{ lastInput=performance.now(); mouse.set(e.clientX/innerWidth*2-1,-(e.clientY/innerHeight)*2+1); ray.setFromCamera(mouse,camera); const hit=ray.intersectObjects(pick,true)[0]; const g=hit&&keyOf(hit.object);
  hover=g; const tag=$("#tag"); if(g){ tag.style.display="block"; tag.style.left=e.clientX+"px"; tag.style.top=e.clientY+"px"; tag.textContent=g.userData.key==="house"?PROJECTS[g.userData.idx].title+" — "+PROJECTS[g.userData.idx].latin:LABEL[g.userData.key]; canvas.style.cursor="pointer"; } else { tag.style.display="none"; canvas.style.cursor=""; } });
canvas.addEventListener("click",()=>{ if(!hover) return; const k=hover.userData.key; k==="house"?openHouse(hover.userData.idx):openSection(k); });
canvas.addEventListener("pointerdown",()=>{ lastInput=performance.now(); fly=null; });
window.__open=openSection; window.__house=openHouse; window.__home=home;
const m=location.hash.match(/^#projects(?:\/(.+))?/); if(m){ const i=PROJECTS.findIndex(p=>p.repo===m[1]); setTimeout(()=>i>=0?openHouse(i):openSection("projects"),600); }
addEventListener("resize",()=>{ camera.aspect=innerWidth/innerHeight; camera.updateProjectionMatrix(); renderer.setSize(innerWidth,innerHeight); });
// ---------- loop ----------
const clk=new THREE.Clock(); const ease=u=>u<.5?4*u*u*u:1-Math.pow(-2*u+2,3)/2; let fireT=6;
const gold=dragons[1]; gold.override=false;
function setPerch(o,pos,ry,dt){ o.override=true; o.d.root.position.lerp(pos,Math.min(1,dt*2.5)); o.d.root.rotation.set(0,ry,0); }
$("#load").style.opacity=0; setTimeout(()=>$("#load").remove(),700);
renderer.setAnimationLoop(()=>{ const raw=clk.getDelta(), dt=Math.min(raw,.05), t=clk.elapsedTime;
  if(fly){ fly.u+=Math.min(raw,.5)/fly.dur; const e=ease(Math.min(1,fly.u)); camera.position.lerpVectors(fly.p0,fly.p1,e); controls.target.lerpVectors(fly.t0,fly.t1,e); if(fly.u>=1) fly=null; }
  if(mode==="home"&&!fly&&performance.now()-lastInput>20000&&!reduced){ camera.position.applyAxisAngle(new THREE.Vector3(0,1,0),dt*.03); }
  controls.update();
  if(shake>0){ shake-=dt; camera.position.x+=rnd(-.15,.15)*shake; camera.position.y+=rnd(-.15,.15)*shake; }
  const now=new Date(); clockHands.forEach(([h,mi])=>{ h.rotation.z=-((now.getHours()%12)+now.getMinutes()/60)/12*Math.PI*2; mi.rotation.z=-now.getMinutes()/60*Math.PI*2; });
  banners.forEach((b,k)=>{ const p=b.geometry.attributes.position, B=b.userData.base; for(let j=0;j<p.count;j++){ const y=B[j*3+1]; p.setZ(j,B[j*3+2]+Math.sin(t*2.5+y*1.5+k)*.12*(1.4-y*.5)); } p.needsUpdate=true; });
  flames.forEach(f=>{ const s=f.g.userData.s0*(1+Math.sin(t*12+f.ph)*.12); f.g.scale.set(f.g.userData.s0,s,f.g.userData.s0); f.g.rotation.y=t*.8+f.ph; });
  if(ferris.w) { ferris.w.rotation.z=t*.06; (ferris.g||[]).forEach(g=>g.rotation.z=-t*.06); }
  car.spin.rotation.y=t*.25; car.horses.forEach(h=>h.g.position.y=1.6+Math.sin(t*2+h.ph)*.35);
  houses.forEach(h=>{ const on=hover&&hover===h.g||curHouse===h.i; h.S.door.rotation.y+=((on?-1.2:0)-h.S.door.rotation.y)*dt*4; h.S.plaque.emissive.setHex(on?0x553311:0); h.S.lit.color.setHex(on?0xF2B45A:0xC88A40); if(h.S.gen) h.S.gen.rotation.z=t*3; if(h.S.cat) h.S.cat.rotation.y=Math.PI/2+Math.sin(t*.7)*.4; if(h.S.car) h.S.car.position.x=Math.sin(t*.3)*1.2; });
  if(balloon.g){ balloon.g.position.y=balloon.y+Math.sin(t*.6)*1.2; const top=balloon.g.position.clone().add(new THREE.Vector3(0,-7.3,0)); const a=balloon.anchor; const mid=top.clone().add(a).multiplyScalar(.5); balloon.rope.position.copy(mid); balloon.rope.scale.y=top.distanceTo(a); balloon.rope.lookAt(top.clone().add(post.position)); balloon.rope.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),top.clone().sub(a).normalize()); }
  boats.forEach(b=>{ b.t=(b.t+b.sp*dt*b.dir+1)%1; const p=canalCurve.getPointAt(b.t), tg=canalCurve.getTangentAt(b.t); b.b.position.set(p.x,.15+Math.sin(t*2+b.t*9)*.05,p.z); b.b.rotation.y=-Math.atan2(tg.z,tg.x); });
  bandsmen.forEach((m,k)=>m.position.y=1+Math.abs(Math.sin(t*4+k))*.08);
  // train
  const st=mode==="experience"; let tgt=st?STATION_T:null; if(tgt!==null){ let d=(tgt-train.t+1)%1; if(d>.002) train.t=(train.t+Math.min(d,dt*.012))%1; } else train.t=(train.t+dt*.012)%1;
  train.cars.forEach((c,k)=>{ const u=(train.t-k*.022+1)%1; const p=track.getPointAt(u), q=track.getPointAt((u+.002)%1); c.position.set(p.x,0,p.z); c.lookAt(q.x,0,q.z); c.rotateY(-Math.PI/2); });
  train.wheels.forEach(w=>w.rotation.y=t*5);
  if(Math.random()<dt*6){ const pf=train.puffs.find(p=>p.life<=0); if(pf){ const lc=train.cars[0]; pf.m.position.copy(new THREE.Vector3(2.1,4.2,0).applyMatrix4(lc.matrixWorld)); pf.life=1; pf.m.visible=true; } }
  train.puffs.forEach(p=>{ if(p.life>0){ p.life-=dt*.5; p.m.position.y+=dt*2.5; p.m.scale.setScalar(1+(1-p.life)*2); p.m.material.opacity=.7*p.life; if(p.life<=0) p.m.visible=false; } });
  document.querySelectorAll(".ms .c").forEach((c,k)=>c.classList.toggle("on",st&&Math.abs(((train.t-STATION_T+1)%1))<.004&&k<=Math.floor(t)%4));
  walkers.forEach(w=>{ w.a+=w.sp*dt; w.m.position.set(Math.cos(w.a)*w.r,Math.abs(Math.sin(t*6+w.r))*.06,Math.sin(w.a)*w.r); w.m.rotation.y=-w.a+(w.sp>0?0:Math.PI); });
  // dragons
  const perchPos=mode==="contact"?post.localToWorld(new THREE.Vector3(0,12.2,0)):mode==="house"&&curHouse===4?houses[4].g.localToWorld(houses[4].S.perchLocal.clone()):null;
  if(perchPos) setPerch(gold,perchPos,(mode==="contact"?post:houses[4].g).rotation.y+Math.PI/2,dt); else gold.override=false;
  dragons.forEach(o=>{ animDragon(o,t,dt); if(o.cool>0) o.cool-=dt; if(o.firing>0){ o.firing-=dt; emitFire(o,dt); } });
  fireT-=dt; if(fireT<0){ fireT=rnd(7,12); const o=dragons[Math.floor(rnd(0,dragons.length-1))]; if(!o.override&&!(o.cool>0)) breathe(o); }
  updFire(dt);
  // lights follow nearest flames
  if(Math.floor(t*2)!==animDragon._k){ animDragon._k=Math.floor(t*2); const cp=camera.position; const ws=flames.map(f=>{ f.g.getWorldPosition(tmpV); return [tmpV.clone(),tmpV.distanceTo(controls.target)]; }).sort((a,b)=>a[1]-b[1]); lampLights.forEach((l,k)=>ws[k]&&l.position.copy(ws[k][0]).add(new THREE.Vector3(0,1,0))); }
  lampLights.forEach((l,k)=>l.intensity=16+Math.sin(t*9+k)*3);
  rocks.forEach(r=>r.m.position.y=r.y+Math.sin(t/r.sp*6.28+r.ph)*1.2);
  clouds.forEach((c,k)=>c.g.position.x=c.x0+Math.sin(t*.02+k)*8);
  smokes.forEach(s=>{ const u=(t*.08+s.ph)%1; s.m.position.set(s.x+u*6,s.y+u*18,s.z-u*3); s.m.scale.setScalar(1+u*3); s.m.material.opacity=.5; });
  renderer.render(scene,camera); });
