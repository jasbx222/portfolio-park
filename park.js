import * as THREE from "three";
const $=id=>document.getElementById(id);const bar=document.querySelector("#bar i");bar.style.width="30%";
const MOB=matchMedia("(pointer:coarse)").matches||innerWidth<760;
const cv=$("c");const R=new THREE.WebGLRenderer({canvas:cv,antialias:!MOB,alpha:true,powerPreference:"high-performance"});
R.setPixelRatio(Math.min(devicePixelRatio,MOB?1.25:1.5));R.setSize(innerWidth,innerHeight);R.shadowMap.enabled=!MOB;R.shadowMap.type=THREE.PCFSoftShadowMap;
R.outputColorSpace=THREE.SRGBColorSpace;R.toneMapping=THREE.ACESFilmicToneMapping;R.toneMappingExposure=1.05;
const S=new THREE.Scene();
const cam=new THREE.OrthographicCamera(-1,1,1,-1,-500,1000);
function fit(){const a=innerWidth/innerHeight,h=70;cam.left=-h*a;cam.right=h*a;cam.top=h;cam.bottom=-h;cam.updateProjectionMatrix();R.setSize(innerWidth,innerHeight)}fit();addEventListener("resize",fit);
// lights
const hemi=new THREE.HemisphereLight("#cfe3ff","#8a6a4a",1.1);S.add(hemi);
const sun=new THREE.DirectionalLight("#ffe2bf",2.2);sun.position.set(60,90,40);sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);
Object.assign(sun.shadow.camera,{left:-80,right:80,top:80,bottom:-80,near:1,far:300});sun.shadow.bias=-.0005;S.add(sun);
// materials
const MC={};const M=(c,o={})=>{const k=c+JSON.stringify(o);return MC[k]||(MC[k]=new THREE.MeshStandardMaterial(Object.assign({color:c,roughness:.75,flatShading:true},o)))};
const glow=[];const E=c=>{const m=new THREE.MeshStandardMaterial({color:c,emissive:c,emissiveIntensity:.4,roughness:.4});glow.push(m);return m};
const B=(w,h,d)=>new THREE.BoxGeometry(w,h,d),CY=(a,b,h,s=10)=>new THREE.CylinderGeometry(a,b,h,s),SP=(r,s=10)=>new THREE.SphereGeometry(r,s,Math.max(6,s*.7|0));
function mk(g,m,p,x=0,y=0,z=0,sh=true){const o=new THREE.Mesh(g,m);o.position.set(x,y,z);if(sh){o.castShadow=true;o.receiveShadow=true}(p||S).add(o);return o}
const grp=(p,x=0,y=0,z=0)=>{const g=new THREE.Group();g.position.set(x,y,z);(p||S).add(g);return g};
const COL=["#ef4444","#f59e0b","#facc15","#22c55e","#14b8a6","#38bdf8","#6366f1","#a855f7","#ec4899","#fb923c"];
const rnd=(a,b)=>a+Math.random()*(b-a),pick=a=>a[Math.random()*a.length|0];
const anim=[];const hitList=[];const rides={};
// ---------- island ----------
const SZ=130,H=SZ/2;
mk(B(SZ,3,SZ),M("#d9c7a3"),S,0,-1.5,0);
mk(B(SZ+.01,.2,SZ+.01),M("#7fae5a"),S,0,.05,0).receiveShadow=true;
{const g=new THREE.ConeGeometry(H*1.02,60,4,4);g.rotateY(Math.PI/4);const p=g.attributes.position;for(let i=0;i<p.count;i++){if(p.getY(i)<34){p.setX(i,p.getX(i)*(1+rnd(-.08,.08)));p.setZ(i,p.getZ(i)*(1+rnd(-.08,.08)))}}g.computeVertexNormals();
 const u=mk(g,M("#a0714b"),S,0,-38,0,false);u.rotation.x=Math.PI;u.scale.set(1,1,1);
 mk(B(SZ,6,SZ),M("#8b5e3c"),S,0,-6,0,false);
 const rocks=[];for(let i=0;i<10;i++){const r=mk(new THREE.DodecahedronGeometry(rnd(2,5)),M("#9a6b47"),S,rnd(-90,90),rnd(-50,-15),rnd(-90,90),false);if(Math.hypot(r.position.x,r.position.z)<70)r.position.x+=r.position.x>0?60:-60;rocks.push([r,rnd(0,6)])}
 anim.push((t)=>rocks.forEach(([r,o])=>{r.position.y+=Math.sin(t+o)*.01;r.rotation.y=t*.1+o}))}
// roads grid
const ROADS=[-32,0,32];
const roadM=M("#3f4352"),walkM=M("#c8bfae");
for(const c of ROADS){mk(B(SZ,.1,7),roadM,S,0,.12,c).receiveShadow=true;mk(B(7,.1,SZ),roadM,S,c,.13,0).receiveShadow=true;
 for(const s of[-4.6,4.6]){mk(B(SZ,.25,2.2),walkM,S,0,.14,c+s);mk(B(2.2,.26,SZ),walkM,S,c+s,.15,0)}
 for(let i=-60;i<60;i+=6){mk(B(2.4,.12,.3),M("#f8fafc"),S,i,.18,c,false);mk(B(.3,.12,2.4),M("#f8fafc"),S,c,.19,i,false)}}
// perimeter tram track
const TR=58;{const g=new THREE.TorusGeometry(TR,.25,4,96);g.rotateX(Math.PI/2);for(const d of[-.8,.8]){const m=mk(new THREE.TorusGeometry(TR+d,.18,4,128),M("#6b7280",{metalness:.6}),S,0,.25,0);m.rotation.x=Math.PI/2}
 const sl=new THREE.InstancedMesh(B(2.4,.15,.5),M("#7c5a3a"),220);const o=new THREE.Object3D();for(let i=0;i<220;i++){const a=i/220*Math.PI*2;o.position.set(Math.cos(a)*TR,.17,Math.sin(a)*TR);o.rotation.y=-a;o.updateMatrix();sl.setMatrixAt(i,o.matrix)}S.add(sl)}
// block centers
const BC=[-48,-16,16,48];
const SLOT={};let si=0;const blocks=[];for(const x of BC)for(const z of BC)blocks.push([x,z]);
// ---------- labels ----------
const LB=[];function label(k,obj,h){const p=PLACES.find(q=>q[0]===k);const d=document.createElement("div");d.className="lb";d.onclick=e=>{e.stopPropagation();window.go(k)};
 d.onmouseenter=()=>hov(k,1);d.onmouseleave=()=>hov(k,0);$("labels").appendChild(d);LB.push({k,obj,h,d,col:p[1]})}
window.relabel=()=>LB.forEach(l=>{const p=PLACES.find(q=>q[0]===l.k);l.d.innerHTML=`<span class="dot" style="color:${l.col};background:${l.col}"></span>${info(p).t}`});
// ---------- people (instanced, full 3D) ----------
const NP=MOB?160:420;
const SKIN=["#f1c27d","#e0ac69","#c68642","#8d5524","#ffdbac"];
function crowd(n,scale){const body=new THREE.InstancedMesh(CY(.42,.55,1.5,7),M("#fff"),n),head=new THREE.InstancedMesh(SP(.42,8),M("#fff"),n),
 legs=new THREE.InstancedMesh(B(.28,.9,.28),M("#334155"),n*2),arms=new THREE.InstancedMesh(B(.22,.85,.22),M("#fff"),n*2),hair=new THREE.InstancedMesh(SP(.44,8),M("#2b1d14"),n);
 [body,head,legs,arms,hair].forEach(m=>{m.castShadow=!MOB;S.add(m)});const c=new THREE.Color();
 for(let i=0;i<n;i++){c.set(pick(COL));body.setColorAt(i,c);arms.setColorAt(i*2,c);arms.setColorAt(i*2+1,c);c.set(pick(SKIN));head.setColorAt(i,c)}
 return {body,head,legs,arms,hair,n,scale}}
const ppl=crowd(NP,1),P=[];
const lanes=[];for(const c of ROADS)for(const s of[-4.6,4.6]){lanes.push({ax:"x",c:c+s});lanes.push({ax:"z",c:c+s})}
for(let i=0;i<NP;i++)P.push({ln:pick(lanes),u:rnd(-62,62),d:Math.random()<.5?1:-1,sp:rnd(1.2,2.6),off:rnd(-.7,.7),ph:rnd(0,6),wave:Math.random()<.18,stop:0,kid:Math.random()<.22});
// balloons for kids
const kids=P.filter(p=>p.kid);const bal=new THREE.InstancedMesh(SP(.55,10),M("#fff",{roughness:.3}),kids.length),str=new THREE.InstancedMesh(CY(.02,.02,2.4,3),M("#e5e7eb"),kids.length);
{const c=new THREE.Color();kids.forEach((k,i)=>{c.set(pick(COL));bal.setColorAt(i,c)});S.add(bal,str)}
const O=new THREE.Object3D(),Q=new THREE.Object3D();
function placePerson(set,i,x,y,z,ry,t,ph,walk,wave,s){
 const sw=walk?Math.sin(t*8+ph)*.6:0,bob=walk?Math.abs(Math.sin(t*8+ph))*.12:0;
 O.position.set(x,y+bob,z);O.rotation.set(0,ry,0);O.scale.setScalar(s);O.updateMatrix();
 Q.position.set(0,1.75,0);Q.rotation.set(0,0,0);Q.scale.set(1,1,1);Q.updateMatrix();
 const m=new THREE.Matrix4();m.multiplyMatrices(O.matrix,Q.matrix);set.body.setMatrixAt(i,m);
 Q.position.set(0,2.95,0);Q.updateMatrix();m.multiplyMatrices(O.matrix,Q.matrix);set.head.setMatrixAt(i,m);
 Q.position.set(0,3.08,-.06);Q.scale.set(1,.7,1);Q.updateMatrix();m.multiplyMatrices(O.matrix,Q.matrix);set.hair.setMatrixAt(i,m);Q.scale.set(1,1,1);
 for(const sd of[-1,1]){Q.position.set(sd*.22,.55,0);Q.rotation.set(sw*sd,0,0);Q.updateMatrix();m.multiplyMatrices(O.matrix,Q.matrix);set.legs.setMatrixAt(i*2+(sd>0),m);
  let ax=-sw*sd*.8,az=0;if(wave&&sd>0){ax=0;az=-2.6+Math.sin(t*10+ph)*.45}Q.position.set(sd*.62,2.15,0);Q.rotation.set(ax,0,sd*.12+az*sd);Q.translateY(-.35);Q.updateMatrix();m.multiplyMatrices(O.matrix,Q.matrix);set.arms.setMatrixAt(i*2+(sd>0),m)}
 return O}
function updCrowd(t,dt){let ki=0;for(let i=0;i<NP;i++){const p=P[i];let walk=true;
  if(p.stop>0){p.stop-=dt;walk=false}else{p.u+=p.d*p.sp*dt;if(Math.random()<.0015)p.stop=rnd(1.5,4)}
  if(p.u>63)p.u=-63;if(p.u<-63)p.u=63;
  const x=p.ln.ax==="x"?p.u:p.ln.c+p.off,z=p.ln.ax==="x"?p.ln.c+p.off:p.u,ry=p.ln.ax==="x"?(p.d>0?Math.PI/2:-Math.PI/2):(p.d>0?0:Math.PI);
  const wave=p.wave&&Math.sin(t*.7+p.ph)>.3;const s=p.kid?.62:1;
  placePerson(ppl,i,x,.25,z,ry,t,p.ph,walk&&!wave,wave,s);
  if(p.kid){const sx=Math.sin(t*1.3+p.ph)*.3;O.position.set(x+.5*s,0,z);O.rotation.set(0,0,0);O.scale.set(1,1,1);O.position.y=4.6+Math.sin(t*2+p.ph)*.12;O.position.x+=sx;O.updateMatrix();bal.setMatrixAt(ki,O.matrix);
   O.position.y=3.3;O.position.x-=sx/2;O.rotation.z=-sx*.2;O.updateMatrix();str.setMatrixAt(ki,O.matrix);ki++}}
 for(const k of["body","head","legs","arms","hair"])ppl[k].instanceMatrix.needsUpdate=true;bal.instanceMatrix.needsUpdate=true;str.instanceMatrix.needsUpdate=true}
// riders (real 3D mini people attached to rides)
function rider(par,x,y,z,s=.55,wave=true){const g=grp(par,x,y,z);g.scale.setScalar(s);const c=pick(COL);
 mk(CY(.42,.55,1.3,7),M(c),g,0,.65,0,false);mk(SP(.42,8),M(pick(SKIN)),g,0,1.75,0,false);mk(SP(.44,8),M("#2b1d14"),g,0,1.88,-.06,false).scale.y=.7;
 const a1=mk(B(.22,.85,.22),M(c),g,-.6,1.1,0,false),a2=mk(B(.22,.85,.22),M(c),g,.6,1.1,0,false);const ph=rnd(0,6);
 if(wave)anim.push(t=>{const w=Math.sin(t*3+ph)>0;a1.rotation.z=w?-2.6+Math.sin(t*12+ph)*.4:-.2;a2.rotation.z=w?2.6-Math.sin(t*12+ph)*.4:.2;a1.position.y=a2.position.y=w?1.8:1.1});return g}
// ---------- cats (full 3D, animated) ----------
const CATC=["#f97316","#1f2937","#f5f5f4","#9ca3af","#a16207","#fde68a"];
function cat(par,x,y,z,col){const g=grp(par,x,y,z);const m=M(col||pick(CATC));const body=grp(g,0,.55,0);
 mk(new THREE.CapsuleGeometry(.32,.75,3,8).rotateZ(Math.PI/2),m,body,0,0,0);
 const hd=grp(body,.62,.25,0);mk(SP(.32,10),m,hd);for(const s of[-1,1]){mk(new THREE.ConeGeometry(.11,.24,4),m,hd,.02,.3,s*.16);mk(SP(.05,6),M("#111827"),hd,.27,.06,s*.12,false)}
 mk(SP(.05,6),M("#f472b6"),hd,.31,-.04,0,false);
 const legs=[];for(const [lx,lz] of[[.35,.18],[.35,-.18],[-.35,.18],[-.35,-.18]]){const l=grp(body,lx,-.15,lz);mk(CY(.07,.07,.45,5),m,l,0,-.22,0);legs.push(l)}
 const tail=[];let tp=body;for(let i=0;i<5;i++){const s=grp(tp,i?.2:-.5,i?0:.1,0);mk(SP(.08,6),m,s,-.1,0,0);tail.push(s);tp=s}
 return {g,body,hd,legs,tail}}
function catPose(c,t,ph,{walk=0,sleep=0,jump=0}={}){c.tail.forEach((s,i)=>{s.rotation.z=.35+Math.sin(t*3+ph-i*.6)*(sleep?.05:.25);s.rotation.y=Math.sin(t*2.2+ph-i*.5)*(sleep?.05:.35)});
 c.legs.forEach((l,i)=>l.rotation.z=walk?Math.sin(t*12+ph+(i%2?Math.PI:0)*(i<2?1:-1))*.6:0);
 c.hd.rotation.y=sleep?0:Math.sin(t*.8+ph)*.35;if(sleep){c.body.scale.set(1,.8+Math.sin(t*1.5+ph)*.04,1);c.body.position.y=.38;c.hd.rotation.z=-.5}c.body.position.y=sleep?.38:.55+(walk?Math.abs(Math.sin(t*12+ph))*.04:0)+jump}
const butterflies=[];
// ---------- ride builders ----------
const SC=new Map();function hov(k,on){const r=rides[k];if(!r)return;r.hov=on;document.body.style.cursor=on?"pointer":""}
function ride(k,i,h,build){const [x,z]=blocks[i];const g=grp(S,x,0,z);mk(B(26,.35,26),M("#e7dcc6"),g,0,.2,0).receiveShadow=true;
 const p=PLACES.find(q=>q[0]===k);const ring=mk(new THREE.TorusGeometry(12.2,.15,4,64),E(p[1]),g,0,.45,0,false);ring.rotation.x=Math.PI/2;
 build(g);rides[k]={g,h,hov:0,ring,i};g.traverse(o=>{if(o.isMesh)o.userData.k=k;});hitList.push(g);
 const a=grp(g,0,h,0);label(k,a,h);
 // fences + flags
 for(let j=0;j<4;j++){const f=grp(g,0,0,0);f.rotation.y=j*Math.PI/2;for(let q=-11;q<=11;q+=2.2){if(Math.abs(q)<3&&j===0)continue;mk(CY(.08,.08,1.1,4),M("#f8fafc"),f,q,.8,12.6,false)}mk(B(22,.1,.1),M("#f8fafc"),f,0,1.2,12.6,false)}
 for(const [fx,fz] of[[-12,-12],[12,-12],[12,12],[-12,12]]){mk(CY(.08,.08,5,4),M("#e5e7eb"),g,fx,2.7,fz);flag(g,fx,5,fz,p[1])}
 return g}
const flags=[];function flag(par,x,y,z,c){const geo=new THREE.PlaneGeometry(1.8,1.1,6,2);geo.translate(.9,0,0);const f=mk(geo,new THREE.MeshStandardMaterial({color:c,side:THREE.DoubleSide,flatShading:true}),par,x,y,z,false);flags.push(f)}
// about: ferris wheel
ride("about",5,30,g=>{const w=grp(g,0,15,0);const rim=E("#f59e0b");for(const z of[-1.3,1.3]){mk(new THREE.TorusGeometry(11,.28,6,48),rim,w,0,0,z);mk(new THREE.TorusGeometry(4,.2,6,24),M("#fef3c7"),w,0,0,z);
  for(let i=0;i<16;i++){const s=mk(CY(.1,.1,11,4),M("#fde68a"),w,0,0,z);s.rotation.z=i*Math.PI/8;s.translateY(5.5)}}
 mk(CY(.6,.6,3.4,10).rotateX(Math.PI/2),M("#78716c"),w);
 const bulbs=[];for(let i=0;i<32;i++){const a=i/32*Math.PI*2;bulbs.push(mk(SP(.22,6),E(COL[i%10]),w,Math.cos(a)*11,Math.sin(a)*11,1.6,false))}
 const cabs=[];for(let i=0;i<12;i++){const a=i/12*Math.PI*2;const c=grp(w,Math.cos(a)*11,Math.sin(a)*11,0);const cc=grp(c,0,-1.4,0);
  mk(CY(1,1.2,1.4,8),M(COL[i%10]),cc,0,0,0);mk(new THREE.ConeGeometry(1.3,.8,8),M("#fff7ed"),cc,0,1.5,0);mk(CY(.05,.05,1.2,3),M("#e5e7eb"),cc,0,1,0);
  rider(cc,-.3,.2,0,.4);if(i%3==0)rider(cc,.35,.2,0,.4);if(i%4==1){const ct=cat(cc,.2,.5,.3,null);ct.g.scale.setScalar(.5);anim.push(t=>catPose(ct,t,i))}cabs.push(c)}
 for(const z of[-2.4,2.4])for(const s of[-1,1]){const l=mk(CY(.35,.45,17,6),M("#94a3b8",{metalness:.5}),g,s*4.2,7.6,z);l.rotation.z=s*.28}
 mk(B(6,1.6,4),M("#fb923c"),g,0,1.2,6);
 anim.push(t=>{w.rotation.z=t*.18;cabs.forEach(c=>{c.rotation.z=-w.rotation.z+Math.sin(t*1.5+c.position.x)*.06});bulbs.forEach((b,i)=>b.scale.setScalar(.8+.5*(Math.sin(t*6-i*.6)>0)))})});
// dawwerli: roller coaster
ride("dawwerli",0,20,g=>{const pts=[];for(let i=0;i<160;i++){const a=i/160*Math.PI*2;pts.push(new THREE.Vector3(Math.cos(a)*10.5,2.5+7*Math.pow(Math.max(0,Math.sin(a)),2)+3*Math.max(0,Math.sin(a*3+1))+1.5*Math.sin(a*2),Math.sin(a)*8+Math.sin(a*2)*2.5))}
 const cu=new THREE.CatmullRomCurve3(pts,true);mk(new THREE.TubeGeometry(cu,300,.28,6,true),E("#14b8a6"),g);
 const off=new THREE.CatmullRomCurve3(pts.map(p=>p.clone().add(new THREE.Vector3(0,0,0))),true);
 for(let i=0;i<40;i++){const p=cu.getPoint(i/40);mk(CY(.12,.15,p.y,5),M("#e2e8f0"),g,p.x,p.y/2,p.z)}
 const cars=[];for(let i=0;i<6;i++){const c=grp(g);mk(B(1.6,.8,1.1),M(i?"#f43f5e":"#facc15"),c,0,.55,0);rider(c,-.2,.8,0,.38);if(i==3){const ct=cat(c,.4,.8,0,"#f97316");ct.g.scale.setScalar(.45);anim.push(t=>catPose(ct,t,3))}cars.push(c)}
 let u=0,v=.06;const tg=new THREE.Vector3(),wp=new THREE.Vector3();
 anim.push((t,dt)=>{const p=cu.getPoint(u),q=cu.getPoint((u+.004)%1);v+=(p.y-q.y)*.02*dt*60*.05;v=THREE.MathUtils.clamp(v,.035,.11);u=(u+v*dt)%1;
  cars.forEach((c,i)=>{const uu=(u-i*.012+1)%1;c.position.copy(cu.getPoint(uu));tg.copy(cu.getPoint((uu+.003)%1));c.lookAt(g.localToWorld(wp.copy(tg)));c.rotateY(Math.PI/2)})})});
// delivery: tram station + 2 trams around the city
ride("delivery",15,10,g=>{mk(B(16,.6,6),M("#cbd5e1"),g,0,.6,0);mk(B(17,.4,7),M("#f97316"),g,0,5.2,0);for(const x of[-7,0,7])mk(CY(.2,.2,4.4,6),M("#475569"),g,x,3,2.5);
 for(const x of[-5,-2,2,5])mk(B(2,.5,.8),M("#a16207"),g,x,1.2,-1.5);rider(g,-4,1,-.5,.9,false);rider(g,3,1,0,.9);const ct=cat(g,-5,1.4,-1.5,"#1f2937");anim.push(t=>catPose(ct,t,1,{sleep:1}))});
const trams=[];for(let k=0;k<2;k++){const t=grp(S);for(let i=0;i<3;i++){const car=grp(t);const c=k?"#0ea5e9":"#f97316";mk(B(4.4,2.4,2.2),M(c),car,0,1.8,0);mk(B(4.5,.7,2.3),M("#f8fafc"),car,0,2.4,0);
  mk(B(4.6,.15,2.4),M("#334155"),car,0,3.1,0);for(const s of[-1.3,0,1.3]){rider(car,s,1.4,.45,.4,Math.random()<.5)}trams.push({car,k,i})}}
anim.push((t)=>trams.forEach(o=>{const a=t*.05+o.k*Math.PI-o.i*.08;o.car.position.set(Math.cos(a)*TR,.3,Math.sin(a)*TR);o.car.rotation.y=-a}));
// qicard: drop tower
ride("qicard",3,34,g=>{mk(CY(1,1.4,30,8),M("#38bdf8"),g,0,15,0);mk(new THREE.ConeGeometry(2,3,8),E("#38bdf8"),g,0,31.5,0);
 const ringG=grp(g,0,3,0);mk(new THREE.TorusGeometry(2.6,.6,6,16).rotateX(Math.PI/2),M("#facc15"),ringG);for(let i=0;i<8;i++){const a=i/8*Math.PI*2;const r=rider(ringG,Math.cos(a)*2.9,-.6,Math.sin(a)*2.9,.55);r.rotation.y=-a+Math.PI/2}
 const bl=[];for(let i=0;i<10;i++)bl.push(mk(SP(.25,6),E(COL[i]),g,1.05,3+i*2.8,0,false));
 anim.push(t=>{const c=t%9;let y;if(c<5)y=3+c/5*22;else if(c<6.2)y=25;else if(c<6.8)y=25-Math.pow((c-6.2)/.6,2)*22;else y=3+Math.sin((c-6.8)*9)*.4*(9-c);ringG.position.y=y;ringG.rotation.y=t*.2;bl.forEach((b,i)=>b.material.emissiveIntensity=(Math.sin(t*5-i)>.2?2:.2))})});
// clinic: pirate ship
ride("clinic",12,18,g=>{for(const s of[-1,1])for(const z of[-3,3]){const l=mk(CY(.3,.3,14,6),M("#7c2d12"),g,s*3.2,7,z);l.rotation.z=s*.42}
 mk(CY(.4,.4,7,6).rotateX(Math.PI/2),M("#78716c"),g,0,13,0);const sw=grp(g,0,13,0);
 for(const z of[-2.8,2.8])for(const s of[-1,1]){const a=mk(CY(.15,.15,8,4),M("#a8a29e"),sw,s*2,-4,z);a.rotation.z=s*.45}
 const ship=grp(sw,0,-9,0);const hull=new THREE.CylinderGeometry(2.6,1.2,11,10,1,false,0,Math.PI);hull.rotateZ(Math.PI/2);hull.rotateX(Math.PI/2);mk(hull,M("#92400e"),ship,0,0,0).scale.set(1,1.1,1);
 mk(B(10,.3,4.4),M("#d6a76b"),ship,0,.1,0);mk(CY(.15,.15,6,5),M("#78350f"),ship,0,3,0);const sail=mk(B(.1,3.5,3.5),M("#f5f5f4"),ship,0,3.4,0);flag(ship,0,6,0,"#111827");
 for(let i=-4;i<=4;i+=1.6){rider(ship,i,.3,1,.6);rider(ship,i,.3,-1,.6)}
 anim.push(t=>{sw.rotation.z=Math.sin(t*.9)*1.05;sail.scale.z=1+Math.sin(t*3)*.08})});
// airest: teacups
ride("airest",10,9,g=>{const pl=grp(g,0,.6,0);mk(CY(10,10,.5,24),M("#fecaca"),pl);mk(CY(2,2.4,2.5,12),M("#ef4444"),pl,0,1.3,0);mk(new THREE.ConeGeometry(3,2,12),M("#fee2e2"),pl,0,3.5,0);
 const cups=[];for(let i=0;i<6;i++){const a=i/6*Math.PI*2;const c=grp(pl,Math.cos(a)*6.5,.3,Math.sin(a)*6.5);mk(CY(1.6,1,1.6,12),M(COL[i+2]),c,0,.8,0);mk(new THREE.TorusGeometry(.5,.12,5,10),M(COL[i+2]),c,1.7,.9,0);
  rider(c,-.5,.4,0,.45);rider(c,.5,.4,.2,.45);cups.push(c)}
 anim.push(t=>{pl.rotation.y=t*.4;cups.forEach((c,i)=>c.rotation.y=t*(1.5+i*.3)*(i%2?1:-1))})});
// payroll: bumper cars
ride("payroll",6,8,g=>{mk(B(20,.3,16),M("#475569"),g,0,.5,0);for(const [w,d,x,z] of[[20,.6,0,8],[20,.6,0,-8],[.6,16,10,0],[.6,16,-10,0]])mk(B(w,1,d),M("#facc15"),g,x,1,z);
 mk(B(21,.4,17),M("#a855f7"),g,0,7,0);for(const [x,z] of[[-10,-8],[10,-8],[10,8],[-10,8]])mk(CY(.25,.25,6.5,6),M("#e5e7eb"),g,x,3.8,z);
 const cars=[];for(let i=0;i<9;i++){const c=grp(g,rnd(-7,7),.7,rnd(-5,5));mk(B(2.2,.8,1.5),M(COL[i]),c,0,.4,0);mk(CY(.05,.05,5.2,3),M("#9ca3af"),c,-.6,3,0);mk(new THREE.TorusGeometry(1.1,.25,4,12).rotateX(Math.PI/2),M("#111827"),c,0,.3,0);
  rider(c,.1,.6,0,.45);cars.push({c,a:rnd(0,6),v:rnd(2,4),bump:0})}
 anim.push((t,dt)=>cars.forEach(o=>{o.a+=Math.sin(t*.7+o.v)*dt;o.c.position.x+=Math.cos(o.a)*o.v*dt;o.c.position.z+=Math.sin(o.a)*o.v*dt;
  if(Math.abs(o.c.position.x)>8.4){o.c.position.x=Math.sign(o.c.position.x)*8.4;o.a=Math.PI-o.a;o.bump=1}if(Math.abs(o.c.position.z)>6.4){o.c.position.z=Math.sign(o.c.position.z)*6.4;o.a=-o.a;o.bump=1}
  for(const p of cars)if(p!==o&&o.c.position.distanceTo(p.c.position)<2.2){o.a+=Math.PI*.7;o.bump=1}
  o.bump*=.9;o.c.rotation.y=-o.a;o.c.position.y=.7+o.bump*.3;o.c.rotation.z=o.bump*.15}))});
// more: swing ride
ride("more",9,22,g=>{mk(CY(.8,1.2,14,10),M("#eab308"),g,0,7,0);const top=grp(g,0,14,0);mk(new THREE.ConeGeometry(6,2.5,16),M("#f43f5e"),top,0,1.3,0);mk(CY(6,6,.6,16),M("#fde047"),top);
 const sw=[];for(let i=0;i<14;i++){const a=i/14*Math.PI*2;const p=grp(top,Math.cos(a)*5.5,0,Math.sin(a)*5.5);p.rotation.y=-a;const ch=grp(p);mk(CY(.04,.04,6,3),M("#d1d5db"),ch,0,-3,0);const seat=grp(ch,0,-6,0);mk(B(.9,.15,.9),M(COL[i%10]),seat);rider(seat,0,0,0,.45,i%2==0);sw.push(ch)}
 anim.push(t=>{const sp=1+.6*Math.sin(t*.3);top.rotation.y=t*sp*.9;top.rotation.x=Math.sin(t*.5)*.06;sw.forEach(c=>c.rotation.set(0,0,.5*sp))})});
// skills: carousel with horses and cats riding
ride("skills",1,14,g=>{mk(CY(9,9.4,.8,24),M("#fde68a"),g,0,.6,0);const top=grp(g,0,0,0);mk(new THREE.ConeGeometry(10,4,24),M("#ec4899"),top,0,10.6,0);mk(CY(10,10,.8,24),M("#fdf2f8"),top,0,8.4,0);mk(CY(1,1,8,12),M("#fef3c7"),top,0,4.6,0);
 const bl=[];for(let i=0;i<24;i++){const a=i/24*Math.PI*2;bl.push(mk(SP(.25,6),E(COL[i%10]),top,Math.cos(a)*10,8.4,Math.sin(a)*10,false))}
 const hs=[];const H=(c)=>{const h=grp(null);mk(B(2,.9,.7),M(c),h,0,0,0);mk(B(.6,1.2,.5),M(c),h,.9,.6,0).rotation.z=-.4;mk(B(.9,.5,.45),M(c),h,1.35,1.1,0);for(const [x,z] of[[.7,.25],[.7,-.25],[-.7,.25],[-.7,-.25]])mk(B(.18,.9,.18),M(c),h,x,-.8,z);return h};
 for(let i=0;i<10;i++){const a=i/10*Math.PI*2;const p=grp(top,Math.cos(a)*6.5,0,Math.sin(a)*6.5);p.rotation.y=-a+Math.PI;mk(CY(.08,.08,8,4),M("#facc15"),p,0,4.4,0);
  const h=H(i%2?"#f8fafc":"#fbcfe8");h.position.y=3;p.add(h);if(i%3==0){const ct=cat(h,0,.25,0,pick(CATC));ct.g.scale.setScalar(.8);anim.push(t=>catPose(ct,t,i))}else rider(h,0,.4,0,.6);hs.push([h,i])}
 anim.push(t=>{top.rotation.y=t*.45;hs.forEach(([h,i])=>{h.position.y=3+Math.sin(t*2.4+i)*.7});bl.forEach((b,i)=>b.material.emissiveIntensity=.3+1.5*(Math.sin(t*4+i)>.5))})});
// exp: big top tent + juggling clowns
ride("exp",14,16,g=>{for(let i=0;i<16;i++){const a0=i*Math.PI/8;const w=mk(new THREE.CylinderGeometry(8,8,5,2,1,true,a0,Math.PI/8),M(i%2?"#f8fafc":"#2563eb",{side:THREE.DoubleSide}),g,0,2.9,0);
  mk(new THREE.ConeGeometry(8.6,7,2,1,true,a0,Math.PI/8),M(i%2?"#2563eb":"#f8fafc",{side:THREE.DoubleSide}),g,0,8.9,0)}
 mk(CY(.15,.15,3,4),M("#e5e7eb"),g,0,13.5,0);flag(g,0,14.6,0,"#ef4444");
 const balls=[];for(let i=0;i<3;i++)balls.push(mk(SP(.3,6),M(COL[i*3]),g,0,0,10,false));const cl=rider(g,0,.4,10,.9);
 anim.push(t=>{balls.forEach((b,i)=>{const a=t*4+i*2.1;b.position.set(Math.cos(a)*.8,3.4+Math.abs(Math.sin(a))*1.6,10.4)});cl.position.y=.4+Math.abs(Math.sin(t*4))*.1})});
// contact: game booths + spinning targets + cat chasing yarn
ride("contact",11,11,g=>{for(let k=-1;k<=1;k++){const b=grp(g,k*7,0,-2);mk(B(6,3.4,4),M(["#14b8a6","#f43f5e","#6366f1"][k+1]),b,0,1.9,0);mk(B(6.4,.4,4.6),M("#fef08a"),b,0,6.6,0);
  for(let i=0;i<5;i++)mk(B(1.28,1,4.6),M(i%2?"#fff":["#14b8a6","#f43f5e","#6366f1"][k+1]),b,-2.56+i*1.28,5.9,.1);for(const x of[-2.9,2.9])mk(CY(.12,.12,2.6,4),M("#fff"),b,x,4.6,1.9);
  const tg=mk(CY(.9,.9,.2,16).rotateX(Math.PI/2),E("#fde047"),b,0,4.7,-1.2);anim.push(t=>tg.rotation.z=t*3*(k||1));
  const bl=[];for(let i=0;i<4;i++)bl.push(mk(SP(.55,10),M(COL[(i+k*3+10)%10],{roughness:.3}),b,-1.5+i,8+(i%2),0));anim.push(t=>bl.forEach((x,i)=>x.position.y=8+(i%2)+Math.sin(t*1.6+i+k)*.35));
  rider(b,0,0,3.2,.9)}
 const yarn=mk(SP(.35,8),M("#ec4899"),g,0,.75,7);const ct=cat(g,0,.4,6,"#f97316");
 anim.push(t=>{const a=t*.9;yarn.position.set(Math.cos(a)*7,.75+Math.abs(Math.sin(t*5))*.4,6+Math.sin(a*2)*2.5);yarn.rotation.z=-t*6;const b=t*.9-.35;ct.g.position.set(Math.cos(b)*7,.4,6+Math.sin(b*2)*2.5);
  ct.g.lookAt(g.localToWorld(yarn.position.clone()));ct.g.rotateY(-Math.PI/2);catPose(ct,t,0,{walk:1,jump:Math.max(0,Math.sin(t*3))*.5})})});
// ---------- plaza w/ fountain (block 2) & extra rides for big-city feel ----------
{const [x,z]=blocks[2];const g=grp(S,x,0,z);mk(CY(11,11,.3,32),M("#e7dcc6"),g,0,.25,0);mk(CY(6,6.4,1.2,24),M("#94a3b8"),g,0,.8,0);mk(CY(5.5,5.5,.2,24),M("#38bdf8",{roughness:.1,metalness:.2}),g,0,1.3,0);
 mk(CY(.6,.9,3.5,10),M("#cbd5e1"),g,0,2.8,0);mk(CY(2,1.5,.5,16),M("#cbd5e1"),g,0,4.5,0);
 const N=MOB?250:600,geo=new THREE.BufferGeometry(),pos=new Float32Array(N*3),vel=[];for(let i=0;i<N;i++)vel.push([0,0,0,rnd(0,2)]);geo.setAttribute("position",new THREE.BufferAttribute(pos,3));
 const pts=new THREE.Points(geo,new THREE.PointsMaterial({color:"#bae6fd",size:.35,transparent:true,opacity:.85}));g.add(pts);
 anim.push((t,dt)=>{for(let i=0;i<N;i++){const v=vel[i];v[3]-=dt;if(v[3]<=0){const a=rnd(0,6.28),s=rnd(.5,2.2);v[0]=Math.cos(a)*s;v[2]=Math.sin(a)*s;v[1]=rnd(7,10);v[3]=1.9;pos[i*3]=0;pos[i*3+1]=4.8;pos[i*3+2]=0}
  v[1]-=18*dt;pos[i*3]+=v[0]*dt;pos[i*3+1]=Math.max(1.4,pos[i*3+1]+v[1]*dt);pos[i*3+2]+=v[2]*dt}geo.attributes.position.needsUpdate=true});
 for(let i=0;i<8;i++){const a=i/8*Math.PI*2;const b=grp(g,Math.cos(a)*9,0,Math.sin(a)*9);b.rotation.y=-a;mk(B(.6,.2,3),M("#92400e"),b,0,1,0);mk(B(.15,.8,3),M("#92400e"),b,-.3,1.5,0);for(const s of[-1.2,1.2])mk(B(.5,.9,.15),M("#374151"),b,0,.5,s);
  if(i%2==0){const ct=cat(b,0,.65,rnd(-.8,.8));ct.g.rotation.y=Math.PI/2;const ph=i;anim.push(t=>catPose(ct,t,ph,{sleep:1}))}else if(i==3)rider(b,0,1,0,.9)}}
// small extra rides in leftover blocks
function bigWheel2(i){const [x,z]=blocks[i];const g=grp(S,x,0,z);mk(B(24,.3,24),M("#e7dcc6"),g,0,.2,0);
 // spinning "octopus"
 mk(CY(1,1.4,4,10),M("#6366f1"),g,0,2,0);const hub=grp(g,0,4,0);const arms=[];for(let k=0;k<6;k++){const a=grp(hub);a.rotation.y=k/6*Math.PI*2;const arm=grp(a);mk(B(7,.4,.4),M("#a5b4fc"),arm,3.5,0,0);const c=grp(arm,7,-1.5,0);mk(CY(1,1.2,1,10),M(COL[k]),c);rider(c,0,.3,0,.45);arms.push([arm,c,k])}
 anim.push(t=>{hub.rotation.y=t*.8;arms.forEach(([a,c,k])=>{a.rotation.z=Math.sin(t*1.6+k)*.3;c.rotation.y=t*2})})}
bigWheel2(7);
function balloonShop(i){const [x,z]=blocks[i];const g=grp(S,x,0,z);mk(B(24,.3,24),M("#e7dcc6"),g,0,.2,0);
 // hot air balloon tethered + mini train loop
 const hb=grp(g,0,0,0);mk(SP(4,14),M("#f43f5e"),hb,0,14,0).scale.y=1.2;mk(B(1.8,1.2,1.8),M("#a16207"),hb,0,8.6,0);rider(hb,0,8.4,0,.5);for(const [a,b] of[[-1,-1],[1,-1],[1,1],[-1,1]])mk(CY(.04,.04,3.4,3),M("#e5e7eb"),hb,a*.8,10.6,b*.8);
 anim.push(t=>{hb.position.y=Math.sin(t*.5)*2;hb.rotation.y=t*.1});
 const loop=new THREE.CatmullRomCurve3([...Array(12)].map((_,k)=>{const a=k/12*Math.PI*2;return new THREE.Vector3(Math.cos(a)*9,.4,Math.sin(a)*6)}),true);
 const tr=mk(new THREE.TubeGeometry(loop,80,.12,4,true),M("#6b7280"),g);const tc=[];for(let k=0;k<5;k++){const c=grp(g);mk(B(1.6,1,1.1),M(k?COL[k]:"#111827"),c,0,.8,0);if(k)rider(c,0,1,0,.4);else{mk(CY(.25,.25,1,6),M("#111827"),c,.4,1.6,0)}tc.push(c)}
 const tmp=new THREE.Vector3();anim.push(t=>tc.forEach((c,k)=>{const u=(t*.05-k*.03+10)%1;c.position.copy(loop.getPoint(u));c.lookAt(g.localToWorld(tmp.copy(loop.getPoint((u+.01)%1))));c.rotateY(Math.PI/2)}))}
balloonShop(8);
// buildings: instanced shops & houses in remaining blocks + along edges
{const free=[4,13].map(i=>blocks[i]);const pos=[];for(const [x,z] of free)for(let a=-1;a<=1;a++)for(let b=-1;b<=1;b++)if(a||b)pos.push([x+a*7.5,z+b*7.5,rnd(5,16)]);
 // also city skyline around the edge corners
 for(let i=0;i<26;i++){const s=i%4,v=rnd(-55,55);const e=62;if(s==0)pos.push([v,-e,rnd(4,9)]);}
 const n=pos.length;const bm=new THREE.InstancedMesh(B(1,1,1),M("#fff"),n),rm=new THREE.InstancedMesh(B(1,1,1),M("#fff"),n),wm=new THREE.InstancedMesh(B(1,1,1),E("#fde68a"),n*2);
 bm.castShadow=bm.receiveShadow=true;const c=new THREE.Color(),o=new THREE.Object3D();const PAL=["#f4d6a0","#e8b27a","#f2e3c6","#d9a066","#c9d6df","#f6c6b0"];
 pos.forEach(([x,z,h],i)=>{o.position.set(x,h/2+.3,z);o.scale.set(6,h,6);o.rotation.set(0,0,0);o.updateMatrix();bm.setMatrixAt(i,o.matrix);c.set(pick(PAL));bm.setColorAt(i,c);
  o.position.y=h+.5;o.scale.set(6.4,.6,6.4);o.updateMatrix();rm.setMatrixAt(i,o.matrix);c.set(pick(["#b45309","#0f766e","#be123c","#475569"]));rm.setColorAt(i,c);
  for(const s of[0,1]){o.position.set(x+(s?3.02:0),h*.55+.3,z+(s?0:3.02));o.scale.set(s?.1:4,h*.6,s?4:.1);o.updateMatrix();wm.setMatrixAt(i*2+s,o.matrix)}});
 S.add(bm,rm,wm);
 // rooftop cats
 pos.slice(0,10).forEach(([x,z,h],i)=>{const ct=cat(S,x,h+.8,z);ct.g.rotation.y=rnd(0,6);anim.push(t=>{const w=(t*.3+i)%6;const walk=w<3;if(walk)ct.g.position.x=x+Math.sin(t*.3+i)*2;catPose(ct,t,i,{walk:walk?1:0,sleep:!walk&&i%3==0?1:0})})})}
// trees (instanced) + lamps (instanced) along streets
{const tp=[];for(const c of ROADS)for(let u=-60;u<=60;u+=8){for(const s of[-6.4,6.4]){if(Math.random()<.7)tp.push([u+rnd(-1,1),c+s]);if(Math.random()<.7)tp.push([c+s,u+rnd(-1,1)])}}
 for(let i=0;i<40;i++){const a=rnd(0,6.28);tp.push([Math.cos(a)*62,Math.sin(a)*62])}
 const tr=new THREE.InstancedMesh(CY(.25,.35,2.4,5),M("#7c5a3a"),tp.length),cr=new THREE.InstancedMesh(new THREE.IcosahedronGeometry(1.6,0),M("#fff"),tp.length);tr.castShadow=cr.castShadow=!MOB;
 const o=new THREE.Object3D(),c=new THREE.Color();tp.forEach(([x,z],i)=>{o.position.set(x,1.4,z);o.scale.setScalar(1);o.rotation.set(0,0,0);o.updateMatrix();tr.setMatrixAt(i,o.matrix);o.position.y=3.4;const s=rnd(.8,1.3);o.scale.set(s,s*1.2,s);o.rotation.y=rnd(0,6);o.updateMatrix();cr.setMatrixAt(i,o.matrix);c.set(pick(["#4d7c0f","#65a30d","#15803d","#3f6212"]));cr.setColorAt(i,c)});
 S.add(tr,cr);const crowns=cr;anim.push(t=>{crowns.rotation.y=0});
 const lp=[];for(const c of ROADS)for(let u=-56;u<=56;u+=11){lp.push([u,c+3.4]);lp.push([c-3.4,u])}
 const pl=new THREE.InstancedMesh(CY(.08,.1,4,4),M("#1f2937"),lp.length),bu=new THREE.InstancedMesh(SP(.32,6),E("#fde68a"),lp.length);lp.forEach(([x,z],i)=>{o.position.set(x,2.2,z);o.scale.setScalar(1);o.rotation.set(0,0,0);o.updateMatrix();pl.setMatrixAt(i,o.matrix);o.position.y=4.3;o.updateMatrix();bu.setMatrixAt(i,o.matrix)});S.add(pl,bu);
 // string lights over roads
 for(const c of ROADS)for(let u=-50;u<=50;u+=20){const g=grp(S,u,0,c);for(let k=0;k<9;k++){const zz=-3.4+k*.85;mk(SP(.14,5),E(COL[k%10]),g,0,4.3-Math.sin(k/8*Math.PI)*.8,zz,false)}}}
// wandering cats on streets + chasing butterflies/balls
const streetCats=[];for(let i=0;i<(MOB?14:30);i++){const ct=cat(S,0,.25,0);const ln=pick(lanes);streetCats.push({ct,ln,u:rnd(-60,60),d:Math.random()<.5?1:-1,sp:rnd(1.5,3),ph:rnd(0,6),mode:i%3,off:rnd(-.8,.8)})}
const BN=MOB?20:50;const bw=new THREE.InstancedMesh(new THREE.PlaneGeometry(.5,.4).translate(.25,0,0),new THREE.MeshStandardMaterial({color:"#fff",side:THREE.DoubleSide}),BN*2);{const c=new THREE.Color();for(let i=0;i<BN;i++){c.set(pick(["#f472b6","#facc15","#60a5fa","#fb923c","#a78bfa"]));bw.setColorAt(i*2,c);bw.setColorAt(i*2+1,c)}}S.add(bw);
const balls=new THREE.InstancedMesh(SP(.22,8),M("#fff",{roughness:.4}),streetCats.length);{const c=new THREE.Color();streetCats.forEach((_,i)=>{c.set(pick(COL));balls.setColorAt(i,c)})}S.add(balls);
function updCats(t,dt){const o=new THREE.Object3D();streetCats.forEach((s,i)=>{s.u+=s.d*s.sp*dt;if(s.u>63)s.u=-63;if(s.u<-63)s.u=63;const ax=s.ln.ax==="x";
  const x=ax?s.u:s.ln.c+s.off,z=ax?s.ln.c+s.off:s.u;const ry=ax?(s.d>0?0:Math.PI):(s.d>0?-Math.PI/2:Math.PI/2);
  const ahead=1.6+Math.sin(t*2+s.ph)*.4;const tx=ax?x+s.d*ahead:x,tz=ax?z:z+s.d*ahead;
  let jump=0;if(s.mode==1)jump=Math.max(0,Math.sin(t*4+s.ph))*.6;
  s.ct.g.position.set(x,.25,z);s.ct.g.rotation.y=ry;catPose(s.ct,t,s.ph,{walk:1,jump});
  if(s.mode==0){o.position.set(tx,.5+Math.abs(Math.sin(t*6+s.ph))*.8,tz);o.scale.setScalar(1)}else o.scale.setScalar(.0001);o.updateMatrix();balls.setMatrixAt(i,o.matrix)});balls.instanceMatrix.needsUpdate=true;
 for(let i=0;i<BN;i++){let x,y,z;if(i<streetCats.length&&streetCats[i].mode==1){const s=streetCats[i],ax=s.ln.ax==="x";const g=s.ct.g.position;x=g.x+(ax?s.d*1.8:0)+Math.sin(t*3+i)*.4;z=g.z+(ax?0:s.d*1.8)+Math.cos(t*2.6+i)*.4;y=1.6+Math.sin(t*3.3+i)*.5}
  else{const a=t*.2+i;x=Math.cos(a*1.3+i)*(20+i%30);z=Math.sin(a+i*2)*(20+i%25);y=2.5+Math.sin(t*2+i)*1}
  const f=Math.sin(t*25+i)*1.1;for(const s of[0,1]){o.position.set(x,y,z);o.rotation.set(Math.PI/2+(s?-f:f)*0,t+i,0);o.rotation.set(0,t*.5+i,0);o.rotateX(s?Math.PI-f:f);o.rotateX(-Math.PI/2);o.scale.setScalar(1);o.updateMatrix();bw.setMatrixAt(i*2+s,o.matrix)}}bw.instanceMatrix.needsUpdate=true}
// floating balloons + clouds
const sky=[];for(let i=0;i<24;i++){const b=mk(SP(1,10),M(pick(COL),{roughness:.3}),S,rnd(-60,60),rnd(15,40),rnd(-60,60),false);b.scale.y=1.2;sky.push([b,rnd(0,6),rnd(.5,1.5)])}
anim.push((t,dt)=>sky.forEach(([b,o,s])=>{b.position.y+=dt*s;b.position.x+=Math.sin(t+o)*.01;if(b.position.y>60)b.position.y=10}));
const clouds=[];for(let i=0;i<9;i++){const ca=rnd(0,6.28),g=grp(S,Math.cos(ca)*rnd(95,130),rnd(-20,10),Math.sin(ca)*rnd(95,130));for(let k=0;k<5;k++)mk(SP(rnd(3,6),7),M("#ffffff",{transparent:true,opacity:.85}),g,k*4-8,rnd(-1,1),rnd(-2,2),false);clouds.push(g)}
anim.push((t,dt)=>clouds.forEach(c=>{c.position.x+=dt*2;if(c.position.x>140)c.position.x=-140;if(Math.abs(c.position.x)<90&&Math.abs(c.position.z)<90)c.position.z+=c.position.z>0?1:-1}));
// fireworks (3D particle bursts)
const FW=[];const FN=120;for(let k=0;k<6;k++){const geo=new THREE.BufferGeometry(),pos=new Float32Array(FN*3);geo.setAttribute("position",new THREE.BufferAttribute(pos,3));
 const m=new THREE.PointsMaterial({color:pick(COL),size:.9,transparent:true,opacity:0,blending:THREE.AdditiveBlending,depthWrite:false});const p=new THREE.Points(geo,m);S.add(p);
 const dirs=[];for(let i=0;i<FN;i++)dirs.push(new THREE.Vector3(rnd(-1,1),rnd(-1,1),rnd(-1,1)).normalize().multiplyScalar(rnd(6,10)));FW.push({p,geo,m,dirs,life:0,c:new THREE.Vector3()})}
let fwT=0;function updFW(t,dt){fwT-=dt;if(fwT<=0){fwT=nf>.5?rnd(.4,1):rnd(2,4);const f=FW.find(f=>f.life<=0);if(f){f.life=2.2;f.c.set(rnd(-50,50),rnd(35,55),rnd(-50,50));f.m.color.set(pick(COL))}}
 FW.forEach(f=>{if(f.life<=0)return;f.life-=dt;const e=2.2-f.life,a=f.geo.attributes.position.array;for(let i=0;i<FN;i++){const d=f.dirs[i];a[i*3]=f.c.x+d.x*e*(1-e*.18);a[i*3+1]=f.c.y+d.y*e*(1-e*.18)-4*e*e;a[i*3+2]=f.c.z+d.z*e*(1-e*.18)}
  f.geo.attributes.position.needsUpdate=true;f.m.opacity=Math.max(0,f.life/2.2)*(.6+nf*.4)})}
bar.style.width="80%";
// ---------- day / night ----------
const bh=+new Intl.DateTimeFormat("en",{hour:"numeric",hourCycle:"h23",timeZone:"Asia/Baghdad"}).format(new Date());
let night=bh>=18||bh<6,nf=night?1:0;const bD=$("bDay");
function setNight(v){night=v;document.body.classList.toggle("night",v);bD.textContent=v?TX[L].night:TX[L].day}setNight(night);bD.onclick=()=>setNight(!night);
// ---------- camera ----------
const tgt=new THREE.Vector3(0,0,0),gT=new THREE.Vector3();let yaw=Math.PI/4,gYaw=yaw,zoom=.35,gZoom=1,pitch=.6;
const HOME={t:new THREE.Vector3(0,0,0),z:MOB?.75:1};
window.home=()=>{gT.copy(HOME.t);gZoom=HOME.z};
window.go=k=>{const r=rides[k];if(!r)return;gT.set(r.g.position.x,r.h*.3,r.g.position.z);gZoom=MOB?1.9:2.3;
 openP(k)};
let drag=null,rot=false,moved=0;
cv.addEventListener("contextmenu",e=>e.preventDefault());
cv.addEventListener("pointerdown",e=>{drag=[e.clientX,e.clientY];rot=e.button===2||e.shiftKey;moved=0;cv.setPointerCapture(e.pointerId)});
const pts=new Map();cv.addEventListener("pointerdown",e=>pts.set(e.pointerId,[e.clientX,e.clientY]));addEventListener("pointerup",e=>pts.delete(e.pointerId));let pinch=0;
cv.addEventListener("pointermove",e=>{if(pts.has(e.pointerId))pts.set(e.pointerId,[e.clientX,e.clientY]);
 if(pts.size===2){const [a,b]=[...pts.values()];const d=Math.hypot(a[0]-b[0],a[1]-b[1]);if(pinch)gZoom=THREE.MathUtils.clamp(gZoom*d/pinch,.5,4);pinch=d;return}pinch=0;
 if(drag){const dx=e.clientX-drag[0],dy=e.clientY-drag[1];moved+=Math.abs(dx)+Math.abs(dy);drag=[e.clientX,e.clientY];
  if(rot){gYaw-=dx*.006}else{const s=(cam.top*2)/innerHeight/zoom;const r=new THREE.Vector3(Math.cos(yaw),0,-Math.sin(yaw)),f=new THREE.Vector3(-Math.sin(yaw),0,-Math.cos(yaw));gT.addScaledVector(r,-dx*s).addScaledVector(f,dy*s/Math.sin(pitch));gT.x=THREE.MathUtils.clamp(gT.x,-70,70);gT.z=THREE.MathUtils.clamp(gT.z,-70,70)}}
 else hover(e)});
cv.addEventListener("pointerup",e=>{if(drag&&moved<6)click(e);drag=null});
cv.addEventListener("wheel",e=>{e.preventDefault();gZoom=THREE.MathUtils.clamp(gZoom*Math.exp(-e.deltaY*.0012),.5,4)},{passive:false});
addEventListener("keydown",e=>{if(e.key==="q"||e.key==="Q")gYaw+=Math.PI/4;if(e.key==="e"||e.key==="E")gYaw-=Math.PI/4;if(e.key==="Escape"){closeP();window.home()}});
$("rl1").onclick=()=>gYaw+=Math.PI/4;$("rr1").onclick=()=>gYaw-=Math.PI/4;$("hm").onclick=()=>{closeP();window.home()};
const ray=new THREE.Raycaster(),v2=new THREE.Vector2();let lastHov=null;
function pickRide(e){v2.set(e.clientX/innerWidth*2-1,-e.clientY/innerHeight*2+1);ray.setFromCamera(v2,cam);const h=ray.intersectObjects(hitList,true)[0];return h&&h.object.userData.k}
let hvT=0;function hover(e){if(performance.now()-hvT<60)return;hvT=performance.now();const k=pickRide(e);if(k!==lastHov){lastHov&&hov(lastHov,0);k&&hov(k,1);lastHov=k}}
function click(e){const k=pickRide(e);if(k)window.go(k)}
// ---------- loop ----------
const clk=new THREE.Clock();const sky1=new THREE.Color(),tmpV=new THREE.Vector3();let started=false;
function frame(){const dt=Math.min(clk.getDelta(),.05),t=clk.elapsedTime;
 nf+=((night?1:0)-nf)*Math.min(1,dt*1.5);sun.intensity=2.2*(1-nf)+.25;hemi.intensity=1.1-nf*.75;sun.color.setHSL(.09,.6,.8-nf*.3);hemi.color.set(nf>.5?"#6b7bd6":"#cfe3ff");
 glow.forEach(m=>m.emissiveIntensity=Math.max(m.emissiveIntensity*0+(.35+nf*1.8),m.userData.f||0));
 if(!started)gYaw+=dt*.08;
 yaw+=(gYaw-yaw)*Math.min(1,dt*4);zoom+=(gZoom-zoom)*Math.min(1,dt*2.2);tgt.lerp(gT,Math.min(1,dt*2.5));
 cam.zoom=zoom;cam.updateProjectionMatrix();cam.position.set(tgt.x+Math.sin(yaw)*Math.cos(pitch)*200,tgt.y+Math.sin(pitch)*200,tgt.z+Math.cos(yaw)*Math.cos(pitch)*200);cam.lookAt(tgt);
 anim.forEach(f=>f(t,dt));updCrowd(t,dt);updCats(t,dt);updFW(t,dt);
 flags.forEach((f,i)=>{const p=f.geometry.attributes.position;for(let j=0;j<p.count;j++){const x=p.getX(j);p.setZ(j,Math.sin(x*3-t*6+i)*.18*x)}p.needsUpdate=true});
 for(const k in rides){const r=rides[k];const s=1+(r.hov||window.cur===k?.06+Math.sin(t*6)*.02:0);r.ring.scale.setScalar(s);r.ring.material.emissiveIntensity=r.hov||window.cur===k?3:.35+nf*1.8}
 LB.forEach(l=>{l.obj.getWorldPosition(tmpV);tmpV.project(cam);const x=(tmpV.x*.5+.5)*innerWidth,y=(-tmpV.y*.5+.5)*innerHeight;const on=rides[l.k].hov||window.cur===l.k;
  l.d.style.transform=`translate(${x|0}px,${(y|0)-(on?6:0)}px) translate(-50%,-100%) scale(${on?1.08:1})`;l.d.style.opacity=tmpV.z<1&&started?1:0;l.d.style.borderColor=on?l.col:""});
 R.render(S,cam)}
R.setAnimationLoop(frame);
window.relabel();
// intro
bar.style.width="100%";window.parkReady=true;const go=$("go");go.classList.add("r");
function enter(){const ld=$("load");if(!ld)return;ld.style.opacity=0;setTimeout(()=>ld.remove(),900);started=true;gZoom=HOME.z;gYaw=yaw+Math.PI/6}
go.onclick=enter;setTimeout(enter,2500);
