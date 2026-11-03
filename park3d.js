import * as THREE from "three";
import { OrbitControls } from "three/addons/OrbitControls.js";

/* ---------------- content (same as dragon v8) ---------------- */
const GH="https://github.com/jasbx222/";
const PROJECTS=[
 {latin:"Dawwerli",title:"دوّرلي",desc:"«دوّرلي» — تطبيق Flutter مع خلفية ASP.NET Core 8 + PostgreSQL",chips:["Dart","Flutter","C#","ASP.NET Core","PostgreSQL"],repo:"dawwerli-app",extra:"dawwerli-api"},
 {latin:"Dooja",title:"Dooja",desc:"",chips:["Dart","Flutter"],repo:"dooja-app"},
 {latin:"Molada",title:"مولّدة",desc:"تطبيق React Native لجباية اشتراكات المولدات الأهلية في العراق، يعمل أوفلاين أولاً",chips:["TypeScript","React Native","Expo"],repo:"molada-app"},
 {latin:"Ain Glasses",title:"عين",desc:"ديمو مساعد النظارة الذكية — Flutter demo for HeyCyan/AIMB G1 smart glasses (Arabic)",chips:["Dart","Flutter","Kotlin"],repo:"ain-glasses-demo"},
 {latin:"Payroll",title:"Payroll",desc:"تطبيق ادارة صرف الرواتب الذكي",chips:["TypeScript","Expo","PHP (Laravel backend)"],repo:"payroll-payment-app-",extra:"payroll-backend-payment-service"},
 {latin:"Clinic System",title:"نظام العيادة",desc:"Laravel for Backend",chips:["PHP","Laravel","Blade"],repo:"Clinic-Management-System-Backend",extra:"Clinic-LandingPage-Dashboard-Booking"},
 {latin:"Delivery System",title:"نظام التوصيل",desc:"نظام إدارة توصيل متكامل باستخدام ASP.NET Core Web API وEF Core وSQL Server وRedis",chips:["C#","ASP.NET Core","SQL Server","Redis"],repo:"Delivery-Management-System"},
 {latin:"POS",title:"نظام الكاشير POS",desc:"نظام POS للكاشير: إضافة منتجات وشراء وبيع وعرض تفاصيل المبيعات",chips:["C#","ASP.NET"],repo:"Pos-Caher-system-Asp.net"},
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
 about:`${X}<h1>عنّي</h1><div class="rule"></div><h2>جاسم محمد</h2><p>مطوّر Full Stack</p><p>أعمل في تطوير الويب</p><p>أحب البرمجة والتصميم</p>`,
 projects:`${X}<h1>المشاريع</h1><div class="rule"></div><p>شارع المشاريع — كل مشروع إله بيت. اضغط على أي بيت.</p><div class="chips">${PROJECTS.map((p,i)=>`<a class="chip" href="#projects/${p.repo}" data-h="${i}" style="text-decoration:none;color:inherit">${p.latin}</a>`).join("")}</div>`,
 skills:`${X}<h1>المهارات</h1><div class="rule"></div>`+SKILLS.map(g=>`<div class="grp">${g.g}</div><div class="chips">${g.s.map(s=>`<span class="chip">${s}</span>`).join("")}</div>`).join(""),
 experience:`${X}<h1>الخبرة</h1><div class="rule"></div><div class="ms">${[1,2,3,4].map(()=>`<div class="m"><i></i><span>قريباً</span></div>`).join("")}</div>`,
 contact:`${X}<h1>تواصل</h1><div class="rule"></div>
  <a class="row" href="${GH}" target="_blank" rel="noopener">${ICON.gh}<b>GitHub</b><span class="v">jasbx222</span></a>
  <div class="row">${ICON.mail}<b>البريد</b><span class="v">قريباً</span></div>
  <div class="row">${ICON.ph}<b>واتساب</b><span class="v">قريباً</span></div>
  <div class="row">${ICON.li}<b>LinkedIn</b><span class="v">قريباً</span></div>
  <a class="send" href="${GH}" target="_blank" rel="noopener">أرسل رسالة</a>`,
};
const houseCard=p=>`${X}<h1>${p.title}</h1><div class="rule"></div><div class="lat">${p.latin}</div>${p.desc?`<p>${p.desc}</p>`:""}<div class="chips">${p.chips.map(c=>`<span class="chip">${c}</span>`).join("")}</div>
 <a class="repo" href="${GH+p.repo}" target="_blank" rel="noopener">github.com/jasbx222/${p.repo}</a><a class="gh" href="${GH+p.repo}" target="_blank" rel="noopener">GitHub</a>
 ${p.extra?`<a class="comp" href="${GH+p.extra}" target="_blank" rel="noopener">+ ${p.extra}</a>`:""}`;

/* ---------------- renderer ---------------- */
const mobile=matchMedia("(max-width:760px)").matches||matchMedia("(pointer:coarse)").matches;
const reduced=matchMedia("(prefers-reduced-motion: reduce)").matches;
const canvas=document.getElementById("c");
const renderer=new THREE.WebGLRenderer({canvas,antialias:true,powerPreference:"high-performance"});
renderer.setPixelRatio(Math.min(devicePixelRatio,mobile?1.5:2));
renderer.outputColorSpace=THREE.SRGBColorSpace;
renderer.toneMapping=THREE.ACESFilmicToneMapping; renderer.toneMappingExposure=1.12;
renderer.shadowMap.enabled=!mobile; renderer.shadowMap.type=THREE.PCFSoftShadowMap;
const scene=new THREE.Scene();
scene.fog=new THREE.Fog(0x4a2028,260,700);
const camera=new THREE.PerspectiveCamera(mobile?52:38,1,0.5,1500);
const controls=new OrbitControls(camera,canvas);
controls.enableDamping=true; controls.dampingFactor=.08; controls.maxPolarAngle=1.38; controls.minDistance=12; controls.maxDistance=420; controls.enablePan=true; controls.screenSpacePanning=false;
const R=(a,b)=>a+Math.random()*(b-a);
let seed=7; const rnd=()=>{seed=(seed*16807)%2147483647;return (seed-1)/2147483646;};

/* ---------------- canvas textures ---------------- */
function ctex(w,h,draw,rep=[1,1]){const c=document.createElement("canvas");c.width=w;c.height=h;const g=c.getContext("2d");draw(g,w,h);const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;t.wrapS=t.wrapT=THREE.RepeatWrapping;t.repeat.set(...rep);t.anisotropy=4;return t;}
const shade=(hex,f)=>{const c=new THREE.Color(hex);c.offsetHSL(R(-.01,.01),0,f);return "#"+c.getHexString();};
function brickTex(base){return ctex(256,256,(g,w,h)=>{g.fillStyle="#3b2a22";g.fillRect(0,0,w,h);const bh=16,bw=48;for(let y=0;y<h;y+=bh)for(let x=-(y/bh%2)*bw/2;x<w;x+=bw){g.fillStyle=shade(base,R(-.07,.05));g.fillRect(x+1.5,y+1.5,bw-3,bh-3);}});}
function stoneTex(base){return ctex(256,256,(g,w,h)=>{g.fillStyle="#1d1718";g.fillRect(0,0,w,h);for(let y=0;y<h;y+=32)for(let x=-(y/32%2)*32;x<w;x+=64){g.fillStyle=shade(base,R(-.05,.05));g.fillRect(x+2,y+2,60,28);}});}
function slateTex(base){return ctex(128,128,(g,w,h)=>{g.fillStyle="#1b1d22";g.fillRect(0,0,w,h);for(let y=0;y<h;y+=10)for(let x=-(y/10%2)*8;x<w;x+=16){g.fillStyle=shade(base,R(-.06,.04));g.fillRect(x+1,y+1,14,9);}});}
const cobble=ctex(512,512,(g,w,h)=>{g.fillStyle="#4a3e36";g.fillRect(0,0,w,h);for(let i=0;i<2600;i++){const x=R(0,w),y=R(0,h),r=R(4,9);g.fillStyle=shade("#a08c78",R(-.12,.06));g.beginPath();g.ellipse(x,y,r,r*.75,R(0,3),0,7);g.fill();}},[14,14]);
const grassT=ctex(256,256,(g,w,h)=>{g.fillStyle="#4e5e2e";g.fillRect(0,0,w,h);for(let i=0;i<3000;i++){g.fillStyle=shade("#5f6e34",R(-.1,.08));g.fillRect(R(0,w),R(0,h),2,3);}},[10,10]);
const winTex=ctex(64,96,(g,w,h)=>{const gr=g.createLinearGradient(0,0,0,h);gr.addColorStop(0,"#ffd27a");gr.addColorStop(1,"#f08a2c");g.fillStyle="#2a1c14";g.fillRect(0,0,w,h);g.fillStyle=gr;g.beginPath();g.moveTo(6,h-4);g.lineTo(6,24);g.quadraticCurveTo(w/2,0,w-6,24);g.lineTo(w-6,h-4);g.fill();g.fillStyle="#2a1c14";g.fillRect(w/2-2,10,4,h);g.fillRect(6,h*.55,w-12,4);});
const winDark=ctex(64,96,(g,w,h)=>{g.fillStyle="#2a1c14";g.fillRect(0,0,w,h);g.fillStyle="#3a4048";g.beginPath();g.moveTo(6,h-4);g.lineTo(6,24);g.quadraticCurveTo(w/2,0,w-6,24);g.lineTo(w-6,h-4);g.fill();g.fillStyle="#2a1c14";g.fillRect(w/2-2,10,4,h);g.fillRect(6,h*.55,w-12,4);});
function stripeTex(a,b,n,vertical=true){return ctex(256,64,(g,w,h)=>{for(let i=0;i<n;i++){g.fillStyle=i%2?b:a;g.fillRect(i*w/n,0,w/n+1,h);}});}
function signTex(text,bg="#1A1617",fg="#E8C878",font="bold 44px 'Libre Caslon Text',Georgia,serif",w=512,h=96){return ctex(w,h,(g)=>{g.fillStyle=bg;g.fillRect(0,0,w,h);g.strokeStyle=fg;g.lineWidth=4;g.strokeRect(6,6,w-12,h-12);g.fillStyle=fg;g.font=font;g.textAlign="center";g.textBaseline="middle";g.fillText(text,w/2,h/2+2);});}
const clockTex=ctex(256,256,(g)=>{g.fillStyle="#2a1c14";g.beginPath();g.arc(128,128,126,0,7);g.fill();const gr=g.createRadialGradient(128,128,10,128,128,110);gr.addColorStop(0,"#fff3c8");gr.addColorStop(1,"#e9b85a");g.fillStyle=gr;g.beginPath();g.arc(128,128,110,0,7);g.fill();g.fillStyle="#2a1c14";for(let i=0;i<12;i++){const a=i/12*Math.PI*2;g.fillRect(128+Math.cos(a)*92-4,128+Math.sin(a)*92-4,8,8);}g.strokeStyle="#2a1c14";g.lineWidth=7;g.beginPath();g.moveTo(128,128);g.lineTo(128,58);g.moveTo(128,128);g.lineTo(178,150);g.stroke();});
const flameTex=ctex(64,128,(g,w,h)=>{const gr=g.createRadialGradient(32,96,2,32,80,60);gr.addColorStop(0,"rgba(255,240,170,1)");gr.addColorStop(.35,"rgba(242,160,61,.95)");gr.addColorStop(.7,"rgba(224,112,42,.6)");gr.addColorStop(1,"rgba(224,112,42,0)");g.fillStyle=gr;g.beginPath();g.moveTo(32,4);g.bezierCurveTo(64,60,60,124,32,124);g.bezierCurveTo(4,124,0,60,32,4);g.fill();});
const puffTex=ctex(64,64,(g)=>{const gr=g.createRadialGradient(32,32,0,32,32,32);gr.addColorStop(0,"rgba(255,255,255,1)");gr.addColorStop(1,"rgba(255,255,255,0)");g.fillStyle=gr;g.fillRect(0,0,64,64);});
const glowTex=ctex(64,64,(g)=>{const gr=g.createRadialGradient(32,32,0,32,32,32);gr.addColorStop(0,"rgba(255,220,140,1)");gr.addColorStop(.3,"rgba(255,170,70,.5)");gr.addColorStop(1,"rgba(255,140,40,0)");g.fillStyle=gr;g.fillRect(0,0,64,64);});

/* ---------------- materials & helpers ---------------- */
const MC={};
function mat(color,o={}){const k=color+JSON.stringify(o);if(!MC[k])MC[k]=new THREE.MeshStandardMaterial({color,roughness:o.r??.85,metalness:o.m??0,map:o.map||null,emissive:o.e||0x000000,emissiveIntensity:o.ei??1,side:o.ds?THREE.DoubleSide:THREE.FrontSide,transparent:!!o.t,opacity:o.op??1,emissiveMap:o.em||null,flatShading:!!o.flat});return MC[k];}
const TX={};const texFor=(kind,c)=>TX[kind+c]||(TX[kind+c]=(kind==="brick"?brickTex:kind==="stone"?stoneTex:slateTex)(c));
const wallMat=(kind,c)=>mat("#ffffff",{map:texFor(kind,c)});
function boxGeo(w,h,d,s=4){const g=new THREE.BoxGeometry(w,h,d);const uv=g.attributes.uv;const dims=[[d,h],[d,h],[w,d],[w,d],[w,h],[w,h]];for(let f=0;f<6;f++)for(let i=0;i<4;i++){const j=f*4+i;uv.setXY(j,uv.getX(j)*dims[f][0]/s,uv.getY(j)*dims[f][1]/s);}return g;}
function add(par,geo,m,x=0,y=0,z=0,ry=0,cast=true){const o=new THREE.Mesh(geo,m);o.position.set(x,y,z);o.rotation.y=ry;o.castShadow=cast;o.receiveShadow=true;par.add(o);return o;}
const box=(par,w,h,d,m,x,y,z,ry=0)=>add(par,boxGeo(w,h,d),m,x,y+h/2,z,ry);
const cyl=(par,rt,rb,h,m,x,y,z,seg=16)=>add(par,new THREE.CylinderGeometry(rt,rb,h,seg),m,x,y+h/2,z);
const cone=(par,r,h,m,x,y,z,seg=16)=>add(par,new THREE.ConeGeometry(r,h,seg),m,x,y+h/2,z);
const IRON=mat("#2a2622",{r:.5,m:.6}),GOLD=mat("#C9A24B",{r:.35,m:.8}),BRASS=mat("#b08a3e",{r:.35,m:.8}),CREAM=mat("#E9DCC0"),DARK=mat("#1A1617"),WOOD=mat("#5a3a24");
const WIN=mat("#ffffff",{map:winTex,e:0xffffff,em:winTex,ei:1.8}),WIND=mat("#ffffff",{map:winDark});
const GREEN_IRON=mat("#2F5D50",{r:.5,m:.5});
function gableRoof(w,d,rh,m){const s=new THREE.Shape();s.moveTo(-w/2-.3,0);s.lineTo(0,rh);s.lineTo(w/2+.3,0);s.lineTo(-w/2-.3,0);const g=new THREE.ExtrudeGeometry(s,{depth:d+.6,bevelEnabled:false});g.translate(0,0,-(d+.6)/2);const uv=g.attributes.uv;for(let i=0;i<uv.count;i++)uv.setXY(i,uv.getX(i)/3,uv.getY(i)/3);const o=new THREE.Mesh(g,m);o.castShadow=o.receiveShadow=true;return o;}
function windows(par,w,h,d,floors,lit=.75,step=2.2,skip=0){const ww=1,wh=1.6;const geo=new THREE.PlaneGeometry(ww,wh);for(let f=0;f<floors;f++){const y=skip+1.6+f*(h-skip-.5)/floors;for(const [nx,len,rot] of [[d/2+.02,w,0],[-d/2-.02,w,Math.PI]]){const n=Math.max(1,Math.floor(len/step));for(let i=0;i<n;i++){const x=-len/2+(i+.5)*len/n;const m=new THREE.Mesh(geo,rnd()<lit?WIN:WIND);m.position.set(x,y,nx);m.rotation.y=rot;par.add(m);}}for(const [nx,rot] of [[w/2+.02,Math.PI/2],[-w/2-.02,-Math.PI/2]]){const n=Math.max(1,Math.floor(d/step));for(let i=0;i<n;i++){const z=-d/2+(i+.5)*d/n;const m=new THREE.Mesh(geo,rnd()<lit?WIN:WIND);m.position.set(nx,y,z);m.rotation.y=rot;par.add(m);}}}}
function building(o){const g=new THREE.Group();const {w,d,h}=o;box(g,w,h,d,o.wall,0,0,0);box(g,w+.3,.35,d+.3,o.trim||mat("#cdbb99"),0,h-.35,0);
 const roof=gableRoof(w,d,o.rh??w*.45,o.roof);roof.position.y=h;if(o.rotRoof){roof.rotation.y=Math.PI/2;roof.scale.set(d/w,1,w/d);}g.add(roof);
 windows(g,w,h,d,o.floors||Math.max(1,Math.round(h/3.4)),o.lit??.7,2.2,o.ground??0);
 for(let i=0;i<(o.chim??2);i++)box(g,.8,2.2,.8,o.wall,(i?1:-1)*w*.3,h+(o.rh??w*.45)*.35,d*.15);
 const dg=new THREE.Mesh(new THREE.PlaneGeometry(1.3,2.3),new THREE.MeshBasicMaterial({color:0xffa850}));dg.position.set(0,1.15,d/2+.03);g.add(dg);const dp=new THREE.Group();dp.position.set(-.7,0,d/2+.1);dp.userData.isDoor=true;box(dp,1.4,2.4,.15,WOOD,.7,0,0);g.add(dp);
 g.position.set(o.x,o.y??0,o.z);g.rotation.y=o.ry||0;return g;}

/* ---------------- sky + lights ---------------- */
const skyGeo=new THREE.SphereGeometry(900,32,16);
const skyMat=new THREE.ShaderMaterial({side:THREE.BackSide,depthWrite:false,fog:false,uniforms:{sun:{value:new THREE.Vector3(-.8,.12,-.55).normalize()}},
 vertexShader:`varying vec3 vd;void main(){vd=normalize(position);gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,
 fragmentShader:`varying vec3 vd;uniform vec3 sun;
 float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5);}float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y);}
 float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<5;i++){v+=a*n(p);p*=2.1;a*=.5;}return v;}
 void main(){float y=vd.y;vec3 top=vec3(.165,.078,.125),hor=vec3(.72,.27,.18),low=vec3(.35,.15,.16);
 vec3 c=mix(hor,mix(vec3(.45,.16,.2),top,smoothstep(.15,.6,y)),smoothstep(0.,.25,y));c=mix(c,low,smoothstep(0.,-.3,y));
 float s=max(dot(vd,sun),0.);c+=vec3(1.,.55,.25)*pow(s,8.)*.6+vec3(1.,.8,.5)*pow(s,200.)*1.2;
 vec2 uv=vd.xz/(abs(y)+.25)*1.6;float cl=fbm(uv+vec2(0.,3.));float band=smoothstep(.02,.35,y)*(1.-smoothstep(.45,.85,y));
 c=mix(c,mix(vec3(.35,.13,.12),vec3(.95,.48,.28),pow(s,3.)+.15),smoothstep(.5,.8,cl)*band*.85);
 gl_FragColor=vec4(c,1.);}`});
scene.add(new THREE.Mesh(skyGeo,skyMat));
{const pm=new THREE.PMREMGenerator(renderer);const es=new THREE.Scene();es.add(new THREE.Mesh(skyGeo,skyMat.clone()));scene.environment=pm.fromScene(es,0.04).texture;scene.environmentIntensity=.55;}
scene.add(new THREE.HemisphereLight(0x8a6a80,0x3a2a24,1.1));
const sun=new THREE.DirectionalLight(0xff8a48,3.4);sun.position.set(-130,60,-40);sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);
Object.assign(sun.shadow.camera,{left:-90,right:90,top:90,bottom:-90,near:10,far:400});sun.shadow.bias=-.0006;sun.shadow.normalBias=.04;scene.add(sun);
const fill=new THREE.DirectionalLight(0x8a7aa0,.35);fill.position.set(80,60,120);scene.add(fill);const rim=new THREE.DirectionalLight(0xff6a30,2.2);rim.position.set(-60,30,-160);scene.add(rim);

/* ---------------- island ---------------- */
const floaters=[];
const world=new THREE.Group();scene.add(world);
const IR=72;
function islandShape(a){return IR*(1+.06*Math.sin(a*3)+.04*Math.sin(a*7+1)+.02*Math.sin(a*13));}
{ // top
 const shape=new THREE.Shape();for(let i=0;i<=128;i++){const a=i/128*Math.PI*2,r=islandShape(a);i?shape.lineTo(Math.cos(a)*r,Math.sin(a)*r):shape.moveTo(Math.cos(a)*r,Math.sin(a)*r);}
 const top=new THREE.Mesh(new THREE.ShapeGeometry(shape,64),mat("#ffffff",{map:grassT}));top.rotation.x=-Math.PI/2;top.receiveShadow=true;world.add(top);
 // plaza cobblestone (inner)
 const ps=new THREE.Shape();for(let i=0;i<=96;i++){const a=i/96*Math.PI*2,r=islandShape(a)*.8;i?ps.lineTo(Math.cos(a)*r*.98,Math.sin(a)*r*.9-6):ps.moveTo(Math.cos(a)*r*.98,Math.sin(a)*r*.9-6);}
 const pl=new THREE.Mesh(new THREE.ShapeGeometry(ps,48),mat("#ffffff",{map:cobble}));pl.rotation.x=-Math.PI/2;pl.position.y=.05;pl.receiveShadow=true;world.add(pl);
 // rock underside
 const seg=96,rings=14;const pos=[],col=[],idx=[];const cTop=new THREE.Color("#4a3c34"),cBot=new THREE.Color("#2a2224"),cMoss=new THREE.Color("#3f4a26");
 for(let j=0;j<=rings;j++){const t=j/rings;for(let i=0;i<=seg;i++){const a=i/seg*Math.PI*2;const r=islandShape(a)*(1-Math.pow(t,1.6)*.92)*(1+.05*Math.sin(a*11+j*1.7)+.04*Math.sin(a*23+j));const y=-t*62-(t>.2?Math.sin(a*5+j)*3:0)+.0;pos.push(Math.cos(a)*r,j?y:0,Math.sin(a)*r);const c=(j<2?cMoss:cTop).clone().lerp(cBot,t).offsetHSL(0,0,(Math.sin(a*31+j*7)*.04));col.push(c.r,c.g,c.b);}}
 for(let j=0;j<rings;j++)for(let i=0;i<seg;i++){const a=j*(seg+1)+i,b=a+seg+1;idx.push(a,a+1,b,a+1,b+1,b);}
 const g=new THREE.BufferGeometry();g.setAttribute("position",new THREE.Float32BufferAttribute(pos,3));g.setAttribute("color",new THREE.Float32BufferAttribute(col,3));g.setIndex(idx);g.computeVertexNormals();
 const rock=new THREE.Mesh(g,new THREE.MeshStandardMaterial({vertexColors:true,roughness:.95,flatShading:true}));world.add(rock);
 // floating rocks
 for(let i=0;i<10;i++){const r=new THREE.Mesh(new THREE.DodecahedronGeometry(R(1.5,5),0),mat("#3a302c",{flat:true}));const a=R(0,6.28),d=R(85,130);r.position.set(Math.cos(a)*d,R(-50,-5),Math.sin(a)*d);r.rotation.set(R(0,3),R(0,3),0);r.userData.bob=R(0,6);world.add(r);floaters.push(r);}
}

/* ---------------- landmarks ---------------- */
const picks=[];const pick=(g,sec,tip,house)=>{g.userData.sec=sec;g.userData.tip=tip;if(house!=null)g.userData.house=house;picks.push(g);return g;};
const BRICK=wallMat("brick","#8a3d2c"),BRICK2=wallMat("brick","#7a4030"),BRICK3=wallMat("brick","#9a4a34"),SLATE=wallMat("slate","#4A5560"),SLATE2=wallMat("slate","#3a3e48"),BASALT=wallMat("stone","#2f282a"),SAND=wallMat("stone","#8C7A62");
const flames=[];const bannerMats=[];
function brazier(par,x,y,z,s=1){cyl(par,.15*s,.15*s,1.4*s,IRON,x,y,z,6);cyl(par,.6*s,.25*s,.45*s,IRON,x,y+1.4*s,z,10);const fm=new THREE.MeshBasicMaterial({map:flameTex,transparent:true,depthWrite:false,side:THREE.DoubleSide,fog:false});for(let k=0;k<2;k++){const f=new THREE.Mesh(new THREE.PlaneGeometry(1.1*s,1.9*s),fm);f.position.set(x,y+2.6*s,z);f.rotation.y=k*Math.PI/2;par.add(f);flames.push(f);}}
function banner(par,x,y,z,ry,w=1.6,h=5){const g=new THREE.PlaneGeometry(w,h,4,10);g.translate(0,-h/2,0);const t=ctex(64,160,(c,W,H)=>{c.fillStyle="#8E1B1B";c.fillRect(0,0,W,H);c.fillStyle="#C9A24B";c.fillRect(0,0,W,6);c.fillRect(4,0,3,H);c.fillRect(W-7,0,3,H);c.beginPath();c.moveTo(0,H-26);c.lineTo(W/2,H);c.lineTo(W,H-26);c.lineTo(W,H);c.lineTo(0,H);c.fillStyle="rgba(0,0,0,0)";});const m=new THREE.Mesh(g,mat("#ffffff",{map:t,ds:true}));m.position.set(x,y,z);m.rotation.y=ry;m.userData.base=g.attributes.position.array.slice();m.castShadow=true;par.add(m);bannerMats.push(m);box(par,w+.4,.2,.2,GOLD,x,y,z,ry);}
function tower(par,x,z,r,h,roofH,m,y=0){cyl(par,r,r*1.05,h,m,x,y,z,14);cyl(par,r*1.15,r*1.15,.6,m,x,y+h,z,14);cone(par,r*1.25,roofH,SLATE2,x,y+h+.6,z,14);cyl(par,.06,.06,2,IRON,x,y+h+.6+roofH,z,4);for(let i=0;i<3;i++){const a=i*2.1+.4;const w=new THREE.Mesh(new THREE.PlaneGeometry(.6,1.1),WIN);w.position.set(x+Math.cos(a)*(r+.03),y+h*.6+i*.3,z+Math.sin(a)*(r+.03));w.lookAt(x+Math.cos(a)*9,y+h*.6,z+Math.sin(a)*9);par.add(w);}}

// CASTLE (About)
const castle=new THREE.Group();world.add(castle);castle.position.set(-38,0,-44);
{const cliff=new THREE.Mesh(new THREE.CylinderGeometry(20,24,6,10),mat("#3a302c",{flat:true}));cliff.position.y=3;cliff.receiveShadow=cliff.castShadow=true;castle.add(cliff);
 const Y=6;box(castle,30,8,2,BASALT,0,Y,10);box(castle,30,8,2,BASALT,0,Y,-10);box(castle,2,8,20,BASALT,-15,Y,0);box(castle,2,8,20,BASALT,15,Y,0);
 for(let i=-14;i<=14;i+=2)box(castle,1,1,2.2,BASALT,i,Y+8,10);
 box(castle,12,26,12,BASALT,0,Y,-1);for(let i=-5;i<=5;i+=2){box(castle,1,1.2,1,BASALT,i,Y+26,5);box(castle,1,1.2,1,BASALT,i,Y+26,-7);}
 tower(castle,0,-1,3,34,9,BASALT,Y);
 for(const [x,z,r,h] of [[-15,10,2.6,16],[15,10,2.6,16],[-15,-10,2.4,18],[15,-10,2.4,18],[-6,5,1.8,30],[6,5,1.8,30]])tower(castle,x,z,r,h,6,BASALT,Y);
 windows(castle.children.at(-1)?.parent??castle,0,0,0,0);
 const gate=new THREE.Mesh(new THREE.PlaneGeometry(4,5.5),mat("#120c0c"));gate.position.set(0,Y+2.75,11.05);castle.add(gate);
 const kw=new THREE.Group();kw.position.set(0,Y,-1);windows(kw,12,26,12,7,.9,2.6);castle.add(kw);
 for(let i=0;i<5;i++)banner(castle,-12+i*6,Y+7.6,11.1,0,1.7,5.5);
 for(let i=0;i<4;i++)banner(castle,-4.5+i*3,Y+22,5.1,0,1.4,6);
 for(const x of [-13,-7,7,13])brazier(castle,x,Y+8,10.5,.8);
 pick(castle,"about","القلعة — عنّي");}

// FERRIS WHEEL
const wheel=new THREE.Group();world.add(wheel);wheel.position.set(-10,0,-50);
const wheelRot=new THREE.Group();wheelRot.position.y=22;wheel.add(wheelRot);const gondolas=[];
{const WR=17;for(const z of [-1.2,1.2]){const t=new THREE.Mesh(new THREE.TorusGeometry(WR,.28,8,64),IRON);t.position.z=z;wheelRot.add(t);const t2=new THREE.Mesh(new THREE.TorusGeometry(WR*.55,.18,6,48),IRON);t2.position.z=z;wheelRot.add(t2);}
 for(let i=0;i<24;i++){const a=i/24*Math.PI*2;for(const z of [-1.2,1.2]){const s=new THREE.Mesh(new THREE.CylinderGeometry(.08,.08,WR,4),IRON);s.position.set(Math.cos(a)*WR/2,Math.sin(a)*WR/2,z);s.rotation.z=a-Math.PI/2;wheelRot.add(s);}}
 for(let i=0;i<16;i++){const a=i/16*Math.PI*2;const g=new THREE.Group();g.position.set(Math.cos(a)*WR,Math.sin(a)*WR,0);const c=new THREE.Mesh(new THREE.CylinderGeometry(.9,.9,1.4,8),mat(i%2?"#8E1B1B":"#C9A24B",{r:.6}));c.position.y=-1.4;c.rotation.x=Math.PI/2;g.add(c);const rf=new THREE.Mesh(new THREE.ConeGeometry(1.1,.7,8),DARK);rf.position.y=-.4;g.add(rf);const b=new THREE.Mesh(new THREE.SphereGeometry(.15,6,4),new THREE.MeshBasicMaterial({color:0xffc070}));g.add(b);wheelRot.add(g);gondolas.push(g);}
 cyl(wheelRot,.0,.0,0,IRON,0,0,0);const hub=new THREE.Mesh(new THREE.CylinderGeometry(1,1,3.2,12),BRASS);hub.rotation.x=Math.PI/2;wheelRot.add(hub);
 for(const s of [-1,1])for(const z of [-2.2,2.2]){const l=new THREE.Mesh(new THREE.CylinderGeometry(.35,.5,24.5,6),IRON);l.position.set(s*6,11,z);l.rotation.z=s*.26;l.castShadow=true;wheel.add(l);}
 box(wheel,16,1.2,7,BASALT,0,0,0);}
pick(wheel,"skills","العجلة الدوّارة — المهارات");

// GLASS EXHIBITION HALL (Projects overview)
const hall=new THREE.Group();world.add(hall);hall.position.set(-9,0,-13);hall.rotation.y=.25;
{const L=22,Rr=7;const glass=new THREE.MeshStandardMaterial({color:0x7fc49a,roughness:.05,metalness:.1,transparent:true,opacity:.28,side:THREE.DoubleSide,envMapIntensity:1.6});
 box(hall,L+1,1.2,Rr*2+1,SAND,0,0,0);box(hall,L,5,Rr*2,mat("#2F5D50",{r:.5,m:.4,t:true,op:.0}),0,1.2,0);
 const walls=new THREE.Mesh(new THREE.BoxGeometry(L,5,Rr*2),glass);walls.position.y=3.7;hall.add(walls);
 const inner=new THREE.Mesh(new THREE.BoxGeometry(L-.6,4.6,Rr*2-.6),new THREE.MeshBasicMaterial({color:0xffb060,transparent:true,opacity:.18}));inner.position.y=3.7;hall.add(inner);
 const vault=new THREE.Mesh(new THREE.CylinderGeometry(Rr,Rr,L,24,1,true,0,Math.PI),glass);vault.rotation.z=Math.PI/2;vault.rotation.y=Math.PI/2;vault.rotation.set(0,0,Math.PI/2);vault.position.y=6.2;vault.rotation.x=0;hall.add(vault);vault.rotation.set(Math.PI/2,0,Math.PI/2);vault.rotation.set(0,0,0);vault.geometry.rotateZ(Math.PI/2);vault.geometry.rotateX(-Math.PI/2);
 for(let i=0;i<=11;i++){const x=-L/2+i*L/11;const rib=new THREE.Mesh(new THREE.TorusGeometry(Rr,.14,6,24,Math.PI),GREEN_IRON);rib.position.set(x,6.2,0);rib.rotation.y=Math.PI/2;hall.add(rib);for(const z of [-Rr,Rr])box(hall,.25,5,.25,GREEN_IRON,x,1.2,z);}
 for(const z of [-Rr*.5,0,Rr*.5]){const t=new THREE.Mesh(new THREE.CylinderGeometry(.1,.1,L,4),GREEN_IRON);t.rotation.z=Math.PI/2;t.position.set(0,6.2+Math.sqrt(Rr*Rr-z*z),z);hall.add(t);}
 // end gable with rose window
 for(const x of [-L/2-.05,L/2+.05]){const d=new THREE.Mesh(new THREE.CircleGeometry(Rr,24,0,Math.PI),glass);d.position.set(x,6.2,0);d.rotation.y=Math.PI/2;hall.add(d);const rw=new THREE.Mesh(new THREE.TorusGeometry(2.4,.15,6,24),GREEN_IRON);rw.position.set(x,8,0);rw.rotation.y=Math.PI/2;hall.add(rw);}
 const sign=new THREE.Mesh(new THREE.PlaneGeometry(8,1.3),mat("#ffffff",{map:signTex("EXHIBITION HALL")}));sign.position.set(0,5.4,Rr+.08);hall.add(sign);
}
pick(hall,"projects","قاعة المعارض — المشاريع");

// CLOCK TOWER
const clock=new THREE.Group();world.add(clock);clock.position.set(6,0,-26);
{box(clock,8,4,8,SAND,0,0,0);box(clock,6.5,30,6.5,BRICK3,0,4,0);box(clock,7.5,.6,7.5,SAND,0,14,0);box(clock,7.5,5.5,7.5,BRICK3,0,30,0);box(clock,8,.6,8,SAND,0,35.5,0);
 const cf=new THREE.CircleGeometry(2.6,32);const cm=mat("#ffffff",{map:clockTex,e:0xffd080,em:clockTex,ei:.55});for(let i=0;i<4;i++){const f=new THREE.Mesh(cf,cm);const a=i*Math.PI/2;f.position.set(Math.sin(a)*3.8,32.8,Math.cos(a)*3.8);f.rotation.y=a;clock.add(f);}
 const sp=new THREE.Mesh(new THREE.ConeGeometry(5.2,13,4),SLATE2);sp.position.y=42.6;sp.rotation.y=Math.PI/4;sp.castShadow=true;clock.add(sp);for(const [x,z] of [[-3.7,-3.7],[3.7,-3.7],[-3.7,3.7],[3.7,3.7]])cone(clock,.6,4,SLATE2,x,36,z,6);
 cyl(clock,.08,.08,3,GOLD,0,49,0,4);const tw=new THREE.Group();tw.position.y=4;windows(tw,6.5,26,6.5,7,.6,3);clock.add(tw);}
pick(clock,"about","برج الساعة — عنّي");

// ROWHOUSES (background town)
const town=new THREE.Group();world.add(town);
{const walls=[BRICK,BRICK2,BRICK3];const spots=[];for(let i=0;i<7;i++)spots.push([16+i*7.2,-44+Math.sin(i)*1.5,-.08]);for(let i=0;i<6;i++)spots.push([20+i*7.6,-30,-.05]);for(let i=0;i<4;i++)spots.push([-4+i*7,-35+((i%2)?0:-2),0]);for(let i=0;i<5;i++)spots.push([28+i*6.5,-55+i*.5,0]);
 spots.forEach(([x,z,ry],i)=>{const h=R(9,15),w=R(6,7),d=R(6,8);town.add(building({x,z,ry,w,d,h,wall:walls[i%3],roof:SLATE,rh:R(3,4.5),lit:.7,chim:2}));if(i%3===0){const dm=new THREE.Group();dm.position.set(x,h,z+d/2-.6);box(dm,1.6,1.8,1.4,walls[i%3],0,.4,0);const dr=gableRoof(1.6,1.4,1,SLATE);dr.position.y=2.2;dm.add(dr);town.add(dm);}});}

// POST OFFICE (Contact)
const post=new THREE.Group();world.add(post);post.position.set(44,0,-8);post.rotation.y=-.55;
{post.add(building({x:0,z:0,w:16,d:10,h:10,wall:BRICK,roof:SLATE,rh:4.5,floors:2,lit:.85,chim:2}));box(post,17,.5,11,SAND,0,0,0);
 const s=new THREE.Mesh(new THREE.PlaneGeometry(7,1.3),mat("#ffffff",{map:signTex("POST OFFICE","#1e2a3a","#E8C878")}));s.position.set(0,7.6,5.12);post.add(s);
 for(const x of [-6.5,-2.2,2.2,6.5]){cyl(post,.3,.3,5,SAND,x,0,5.6,10);}box(post,15,.6,2,SAND,0,5,5.6);
 for(let i=-2;i<=2;i++)box(post,1.2,1.5,1.2,BRICK,i*3.2,10+2.6,-1);brazier(post,-9,0,6,.8);brazier(post,9,0,6,.8);}
pick(post,"contact","مكتب البريد — تواصل");

// BALLOON (Contact)
const balloon=new THREE.Group();world.add(balloon);balloon.position.set(32,42,-20);
{const t=ctex(256,128,(g,w,h)=>{for(let i=0;i<12;i++){g.fillStyle=i%2?"#E9DCC0":"#8E1B1B";g.fillRect(i*w/12,0,w/12+1,h);}g.fillStyle="#C9A24B";g.fillRect(0,h*.62,w,6);});
 const env=new THREE.Mesh(new THREE.SphereGeometry(5,24,18),mat("#ffffff",{map:t,r:.7}));env.scale.y=1.2;env.castShadow=true;balloon.add(env);
 const sk=new THREE.Mesh(new THREE.CylinderGeometry(2.2,1.2,2.5,18,1,true),mat("#8E1B1B",{ds:true}));sk.position.y=-6.6;balloon.add(sk);
 for(let i=0;i<4;i++){const a=i*Math.PI/2+.78;const r=new THREE.Mesh(new THREE.CylinderGeometry(.04,.04,3.4,3),IRON);r.position.set(Math.cos(a)*1.0,-9.2,Math.sin(a)*1.0);balloon.add(r);}
 const bk=new THREE.Mesh(new THREE.CylinderGeometry(1.1,.9,1.3,10),WOOD);bk.position.y=-11.3;balloon.add(bk);
 const fl=new THREE.PointLight(0xffa040,8,14,2);fl.position.y=-8;balloon.add(fl);}
pick(balloon,"contact","المنطاد — تواصل");

// CAROUSEL (Skills)
const carousel=new THREE.Group();world.add(carousel);carousel.position.set(-16,0,37);const carRot=new THREE.Group();carousel.add(carRot);const horses=[];
{cyl(carousel,8.5,9,1,mat("#6a2020"),0,0,0,32);cyl(carousel,8.2,8.2,.25,GOLD,0,1,0,32);cyl(carousel,1.1,1.1,7,mat("#E9DCC0"),0,1,0,16);
 const roofT=ctex(512,64,(g,w,h)=>{for(let i=0;i<16;i++){g.fillStyle=i%2?"#EFE2C6":"#9a1e1e";g.fillRect(i*w/16,0,w/16+1,h);}});
 const roof=new THREE.Mesh(new THREE.ConeGeometry(9.6,4.6,32,1,true),mat("#ffffff",{map:roofT,ds:true,r:.7}));roof.position.y=9.8;roof.castShadow=true;carRot.add(roof);
 const valT=ctex(512,64,(g,w,h)=>{g.fillStyle="#C9A24B";g.fillRect(0,0,w,h);g.fillStyle="#8E1B1B";for(let i=0;i<16;i++){g.beginPath();g.arc((i+.5)*w/16,h,w/40,Math.PI,0);g.fill();}g.fillStyle="#ffe7a8";for(let i=0;i<32;i++){g.beginPath();g.arc((i+.5)*w/32,14,4,0,7);g.fill();}});
 const val=new THREE.Mesh(new THREE.CylinderGeometry(9.6,9.6,1.4,32,1,true),mat("#ffffff",{map:valT,ds:true,e:0x553311,ei:.3}));val.position.y=6.9;carRot.add(val);
 cone(carRot,1,2.4,GOLD,0,12,0,12);const fl=new THREE.Mesh(new THREE.PlaneGeometry(1.4,.8),mat("#8E1B1B",{ds:true}));fl.position.set(.7,15,0);carRot.add(fl);
 for(let i=0;i<16;i++){const a=i/16*Math.PI*2,r=i%2?6.6:5;const p=new THREE.Mesh(new THREE.CylinderGeometry(.07,.07,6,5),GOLD);p.position.set(Math.cos(a)*r,4.2,Math.sin(a)*r);carRot.add(p);
  const h=new THREE.Group();const hm=mat(i%3?"#EFE6D6":"#B07A4A");const body=new THREE.Mesh(new THREE.CapsuleGeometry(.42,1.3,4,8),hm);body.rotation.z=Math.PI/2;h.add(body);const neck=new THREE.Mesh(new THREE.CapsuleGeometry(.24,.7,3,6),hm);neck.position.set(.85,.5,0);neck.rotation.z=-.6;h.add(neck);const head=new THREE.Mesh(new THREE.CapsuleGeometry(.2,.45,3,6),hm);head.position.set(1.25,.85,0);head.rotation.z=Math.PI/2.4;h.add(head);for(const [lx,lz] of [[-.5,.2],[-.5,-.2],[.5,.2],[.5,-.2]]){const l=new THREE.Mesh(new THREE.CylinderGeometry(.08,.06,.9,4),hm);l.position.set(lx,-.6,lz);l.rotation.z=lx>0?.5:-.4;h.add(l);}const sad=new THREE.Mesh(new THREE.BoxGeometry(.6,.15,.9),mat("#8E1B1B"));sad.position.y=.42;h.add(sad);
  h.position.set(Math.cos(a)*r,3,Math.sin(a)*r);h.rotation.y=-a;h.userData.ph=i;h.traverse(o=>o.castShadow=true);carRot.add(h);horses.push(h);}
 for(let i=0;i<24;i++){const a=i/24*Math.PI*2;const b=new THREE.Mesh(new THREE.SphereGeometry(.14,6,4),new THREE.MeshBasicMaterial({color:0xffd890}));b.position.set(Math.cos(a)*9.65,6.3,Math.sin(a)*9.65);carRot.add(b);}
 const l=new THREE.PointLight(0xffb060,30,22,1.6);l.position.y=5.5;carousel.add(l);}
pick(carousel,"skills","الدوّامة — المهارات");

// TRAIN LOOP + STATION (Experience)
const trackCurve=new THREE.CatmullRomCurve3([[-14,0,14],[-6,0,26],[12,0,30],[32,0,24],[38,0,10],[28,0,-2],[10,0,0],[-8,0,2]].map(p=>new THREE.Vector3(...p)),true,"centripetal");
{const N=400,ballast=[],rails=[[],[]];const up=new THREE.Vector3(0,1,0);for(let i=0;i<=N;i++){const t=i/N,p=trackCurve.getPointAt(t),tg=trackCurve.getTangentAt(t),n=new THREE.Vector3().crossVectors(up,tg).normalize();rails[0].push(p.clone().addScaledVector(n,.75).setY(.55));rails[1].push(p.clone().addScaledVector(n,-.75).setY(.55));}
 for(const r of rails){const c=new THREE.CatmullRomCurve3(r,true);const m=new THREE.Mesh(new THREE.TubeGeometry(c,600,.09,5,true),mat("#6d6a66",{r:.35,m:.85}));world.add(m);}
 const bed=new THREE.Mesh(new THREE.TubeGeometry(trackCurve,300,1.4,6,true),mat("#4a3e36",{flat:true}));bed.scale.y=.22;bed.position.y=.05;bed.receiveShadow=true;world.add(bed);
 const sl=new THREE.InstancedMesh(new THREE.BoxGeometry(2.3,.18,.38),mat("#3a2a1e"),260);const d=new THREE.Object3D();for(let i=0;i<260;i++){const t=i/260;const p=trackCurve.getPointAt(t),tg=trackCurve.getTangentAt(t);d.position.copy(p).setY(.38);d.lookAt(p.clone().add(tg).setY(.38));d.updateMatrix();sl.setMatrixAt(i,d.matrix);}sl.receiveShadow=true;world.add(sl);}
const train=[];
{function car(color,isLoco){const g=new THREE.Group();const inner=new THREE.Group();inner.position.y=.6;g.add(inner);
  if(isLoco){const LG=mat("#1f4a34",{r:.45,m:.3});const boiler=new THREE.Mesh(new THREE.CylinderGeometry(1.05,1.05,4.2,18),LG);boiler.rotation.x=Math.PI/2;boiler.position.set(0,1.9,1);inner.add(boiler);for(const z of [-.6,1,2.6]){const b=new THREE.Mesh(new THREE.TorusGeometry(1.07,.07,5,18),BRASS);b.position.set(0,1.9,z);inner.add(b);}
   const ch=new THREE.Mesh(new THREE.CylinderGeometry(.45,.3,1.6,10),DARK);ch.position.set(0,3.4,2.4);inner.add(ch);const dm=new THREE.Mesh(new THREE.SphereGeometry(.45,10,6),BRASS);dm.position.set(0,3,.6);inner.add(dm);
   const cab=new THREE.Mesh(boxGeo(2.4,2.6,2),LG);cab.position.set(0,2.2,-1.9);inner.add(cab);const cr=new THREE.Mesh(new THREE.BoxGeometry(2.7,.25,2.4),DARK);cr.position.set(0,3.6,-1.9);inner.add(cr);
   const fr=new THREE.Mesh(new THREE.BoxGeometry(2.2,.5,6),DARK);fr.position.set(0,.6,.1);inner.add(fr);const hl=new THREE.Mesh(new THREE.SphereGeometry(.25,8,6),new THREE.MeshBasicMaterial({color:0xffe0a0}));hl.position.set(0,2.6,3.2);inner.add(hl);
   const cw=new THREE.Mesh(new THREE.ConeGeometry(1,1,4),IRON);cw.rotation.x=Math.PI/2;cw.position.set(0,.7,3.4);cw.scale.set(1.2,.5,.6);inner.add(cw);
   for(const z of [2,.7,-.6])for(const x of [-1.05,1.05]){const w=new THREE.Mesh(new THREE.CylinderGeometry(.55,.55,.2,14),mat("#8E1B1B",{r:.5}));w.rotation.z=Math.PI/2;w.position.set(x,.55,z);inner.add(w);}}
  else{const body=new THREE.Mesh(boxGeo(2.3,2.2,5.4),mat(color,{r:.55}));body.position.y=1.7;inner.add(body);const rf=new THREE.Mesh(new THREE.CylinderGeometry(1.4,1.4,5.6,16,1,false,-Math.PI/2.6,Math.PI/1.3),DARK);rf.rotation.set(0,0,0);rf.rotation.x=Math.PI/2;rf.rotation.z=Math.PI;rf.position.y=1.9+.0;rf.scale.set(1,1,.35);inner.add(rf);rf.rotation.set(Math.PI/2,0,0);rf.geometry.rotateY(Math.PI);
   const band=new THREE.Mesh(new THREE.BoxGeometry(2.34,.1,5.44),GOLD);band.position.y=1.25;inner.add(band);for(const s of [-1,1])for(let i=0;i<5;i++){const w=new THREE.Mesh(new THREE.PlaneGeometry(.75,.8),WIN);w.position.set(s*1.16,2.1,-2+i);w.rotation.y=s*Math.PI/2;inner.add(w);}
   for(const z of [-1.8,1.8])for(const x of [-1,1]){const w=new THREE.Mesh(new THREE.CylinderGeometry(.42,.42,.2,12),DARK);w.rotation.z=Math.PI/2;w.position.set(x,.45,z);inner.add(w);}}
  g.traverse(o=>{if(o.isMesh)o.castShadow=true;});world.add(g);return g;}
 train.push(car(0,true));for(let i=0;i<4;i++)train.push(car(["#6e1c1c","#7a2222"][i%2]));}
const station=new THREE.Group();world.add(station);station.position.set(18,0,-6);station.rotation.y=-.05;
{box(station,16,1,6,SAND,0,0,0);for(let i=0;i<5;i++)for(const z of [-2.4,2.4])cyl(station,.18,.18,5,GREEN_IRON,-7+i*3.5,1,z,8);
 const rf=gableRoof(16,6,2.6,mat("#2F5D50",{r:.5,m:.3}));rf.rotation.y=Math.PI/2;rf.scale.set(6/16,1,16/6);rf.position.y=6;rf.rotation.y=0;rf.scale.set(1,1,1);station.add(rf);
 const rf2=gableRoof(6,16,2.4,mat("#2F5D50",{r:.5,m:.3}));rf2.position.y=6;rf2.rotation.y=Math.PI/2;station.remove(rf);station.add(rf2);
 const s=new THREE.Mesh(new THREE.PlaneGeometry(5,.9),mat("#ffffff",{map:signTex("STATION")}));s.position.set(0,5.4,3.1);station.add(s);box(station,1,6,1,GREEN_IRON,0,1,0);
 const ct=new THREE.Mesh(new THREE.CircleGeometry(.7,20),mat("#ffffff",{map:clockTex,e:0xffd080,em:clockTex,ei:.5}));ct.position.set(0,7.2,3.05);station.add(ct);}
pick(station,"experience","المحطة — الخبرة");

// CANAL + BOATS + BRIDGES
const canalCurve=new THREE.CatmullRomCurve3([[-2,0,66],[14,0,50],[30,0,40],[50,0,34],[72,0,24]].map(p=>new THREE.Vector3(...p)));
{const N=120,W=3.6,pos=[],idx=[],up=new THREE.Vector3(0,1,0);const L=[],Rt=[];for(let i=0;i<=N;i++){const t=i/N,p=canalCurve.getPointAt(t),tg=canalCurve.getTangentAt(t),n=new THREE.Vector3().crossVectors(up,tg).normalize();const a=p.clone().addScaledVector(n,W),b=p.clone().addScaledVector(n,-W);pos.push(a.x,.12,a.z,b.x,.12,b.z);L.push(a.setY(.4));Rt.push(b.setY(.4));if(i<N)idx.push(i*2,i*2+1,i*2+2,i*2+1,i*2+3,i*2+2);}
 const g=new THREE.BufferGeometry();g.setAttribute("position",new THREE.Float32BufferAttribute(pos,3));g.setIndex(idx);g.computeVertexNormals();
 const water=new THREE.Mesh(g,new THREE.MeshStandardMaterial({color:0x4a7078,roughness:.18,metalness:.35,envMapIntensity:1.6}));water.receiveShadow=true;world.add(water);
 for(const side of [L,Rt]){const c=new THREE.CatmullRomCurve3(side);const wall=new THREE.Mesh(new THREE.TubeGeometry(c,120,.5,5),mat("#6e6254",{flat:true}));world.add(wall);}
 for(const t of [.3,.72]){const p=canalCurve.getPointAt(t),tg=canalCurve.getTangentAt(t);const br=new THREE.Group();br.position.copy(p);br.rotation.y=Math.atan2(tg.x,tg.z);
  const arch=new THREE.Mesh(new THREE.TorusGeometry(4.6,.5,6,20,Math.PI),mat("#7a6c5c",{flat:true}));arch.scale.y=.45;br.add(arch);const deck=new THREE.Mesh(new THREE.BoxGeometry(10.5,.4,3),mat("#7a6c5c"));deck.position.y=2.1;br.add(deck);
  for(const z of [-1.4,1.4]){const rail=new THREE.Mesh(new THREE.BoxGeometry(10.5,.7,.15),IRON);rail.position.set(0,2.6,z);br.add(rail);}br.traverse(o=>{o.castShadow=true;});world.add(br);}}
const boats=[];
for(let i=0;i<4;i++){const b=new THREE.Group();const hull=new THREE.Mesh(new THREE.SphereGeometry(1,12,8,0,Math.PI*2,Math.PI/2,Math.PI/2),WOOD);hull.scale.set(.9,.6,2.4);hull.position.y=.6;b.add(hull);const rim=new THREE.Mesh(new THREE.TorusGeometry(1,.08,4,20),mat("#3a2414"));rim.scale.set(.9,2.4,1);rim.rotation.x=Math.PI/2;rim.position.y=.6;b.add(rim);
 const p=new THREE.Mesh(new THREE.CapsuleGeometry(.25,.5,3,6),mat(["#1A1617","#5a2a2a","#2a3340"][i%3]));p.position.set(0,1.2,0);b.add(p);const hd=new THREE.Mesh(new THREE.SphereGeometry(.2,6,5),mat("#d7b49a"));hd.position.y=1.85;b.add(hd);
 const oar=new THREE.Mesh(new THREE.CylinderGeometry(.04,.04,3.2,3),WOOD);oar.rotation.z=Math.PI/2.2;oar.position.y=1;b.add(oar);b.userData={u:i/4,dir:i%2?1:-1,sp:R(.008,.013),oar};world.add(b);boats.push(b);}

// GAZEBO
{const gz=new THREE.Group();gz.position.set(44,0,52);world.add(gz);cyl(gz,5,5.4,1,mat("#8C7A62"),0,0,0,8);for(let i=0;i<8;i++){const a=i/8*Math.PI*2;cyl(gz,.2,.2,5,CREAM,Math.cos(a)*4.3,1,Math.sin(a)*4.3,8);}
 cyl(gz,4.9,4.9,.5,CREAM,0,6,0,8);const dome=new THREE.Mesh(new THREE.SphereGeometry(5,16,8,0,Math.PI*2,0,Math.PI/2),mat("#2F5D50",{r:.4,m:.4}));dome.scale.y=.65;dome.position.y=6.5;dome.castShadow=true;gz.add(dome);cone(gz,.5,2,GOLD,0,9.6,0,8);}

// TREES (instanced)
const treeSpots=[];{const zones=[[50,30,14,22],[30,62,12,16],[60,6,8,10],[-50,46,10,8],[-60,-30,6,8],[66,-24,6,8],[14,-56,10,6],[-20,52,8,10],[8,40,6,4]];for(const [x,z,r,n] of zones)for(let i=0;i<n;i++){const a=R(0,6.28),d=Math.sqrt(Math.random())*r;const px=x+Math.cos(a)*d,pz=z+Math.sin(a)*d;if(Math.hypot(px,pz)<IR*.93&&canalCurve.getPoints(40).every(p=>Math.hypot(p.x-px,p.z-pz)>5))treeSpots.push([px,pz,R(.8,1.4)]);}}
{const n=treeSpots.length;const trunk=new THREE.InstancedMesh(new THREE.CylinderGeometry(.25,.35,3,5),WOOD,n);const fol=new THREE.InstancedMesh(new THREE.IcosahedronGeometry(2.2,1),new THREE.MeshStandardMaterial({color:0xffffff,roughness:.9,flatShading:true}),n*3);const d=new THREE.Object3D();const col=new THREE.Color();
 treeSpots.forEach(([x,z,s],i)=>{d.position.set(x,1.5*s,z);d.scale.setScalar(s);d.rotation.set(0,0,0);d.updateMatrix();trunk.setMatrixAt(i,d.matrix);for(let k=0;k<3;k++){d.position.set(x+R(-1,1)*s,(3.4+k*1.1)*s,z+R(-1,1)*s);d.scale.setScalar(s*(1-k*.22)*R(.9,1.1));d.rotation.set(R(0,3),R(0,3),0);d.updateMatrix();fol.setMatrixAt(i*3+k,d.matrix);col.set(["#3d5a2a","#4a6630","#34502a","#56703a"][Math.floor(R(0,4))]);fol.setColorAt(i*3+k,col);}});
 trunk.castShadow=fol.castShadow=true;fol.receiveShadow=true;world.add(trunk,fol);}

// FENCE around rim
{const pts=[];for(let i=0;i<=200;i++){const a=i/200*Math.PI*2,r=islandShape(a)*.975;pts.push(new THREE.Vector3(Math.cos(a)*r,0,Math.sin(a)*r));}const n=200;const posts=new THREE.InstancedMesh(new THREE.BoxGeometry(.18,1.6,.18),IRON,n);const d=new THREE.Object3D();for(let i=0;i<n;i++){d.position.copy(pts[i]).setY(.8);d.updateMatrix();posts.setMatrixAt(i,d.matrix);}world.add(posts);
 for(const y of [1.5,.7]){const c=new THREE.CatmullRomCurve3(pts.map(p=>p.clone().setY(y)),true);world.add(new THREE.Mesh(new THREE.TubeGeometry(c,400,.06,4,true),IRON));}}

// LAMPS
const lampSpots=[[-8,8],[2,-8],[-14,-4],[14,12],[30,14],[38,-18],[24,-16],[-2,-18],[-16,10],[-18,34],[-38,12],[-40,34],[8,34],[24,34],[36,24],[52,14],[0,48],[18,58],[-30,-30],[-4,22],[44,-26],[-6,-32]];
{const n=lampSpots.length;const post=new THREE.InstancedMesh(new THREE.CylinderGeometry(.08,.12,4,5),IRON,n),bulb=new THREE.InstancedMesh(new THREE.SphereGeometry(.28,8,6),new THREE.MeshBasicMaterial({color:0xffd590}),n);const d=new THREE.Object3D();lampSpots.forEach(([x,z],i)=>{d.position.set(x,2,z);d.updateMatrix();post.setMatrixAt(i,d.matrix);d.position.set(x,4.2,z);d.updateMatrix();bulb.setMatrixAt(i,d.matrix);const s=new THREE.Sprite(new THREE.SpriteMaterial({map:glowTex,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,opacity:.55}));s.position.set(x,4.2,z);s.scale.setScalar(2.6);world.add(s);});world.add(post,bulb);
 if(!mobile)for(const [x,z] of [[-8,8],[30,14],[-38,12],[24,34],[2,-8],[-18,34]]){const l=new THREE.PointLight(0xffa850,16,18,1.8);l.position.set(x,4.4,z);world.add(l);}}

// PEOPLE (instanced)
const people=(()=>{const blockers=[[-16,37,11],[-9,-13,14],[6,-26,6],[18,-6,9],[44,-8,10],[-38,-44,24],[-10,-50,10]];const spots=[];let tries=0;const N=mobile?80:300;
 while(spots.length<N&&tries++<6000){const x=R(-36,40),z=R(-30,44);if(blockers.some(([bx,bz,r])=>Math.hypot(x-bx,z-bz)<r))continue;if(Math.hypot(x,z)>IR*.85)continue;if(canalCurve.getPoints(30).some(p=>Math.hypot(p.x-x,p.z-z)<5))continue;let near=false;for(let k=0;k<40;k++){const p=trackCurve.getPointAt(k/40);if(Math.hypot(p.x-x,p.z-z)<2.4){near=true;break;}}if(near)continue;spots.push([x,z]);}
 const hatG=new THREE.LatheGeometry([[0,0],[.32,0],[.32,.04],[.15,.05],[.14,.34],[0,.34]].map(p=>new THREE.Vector2(...p)),8);const hat=new THREE.InstancedMesh(hatG,mat('#141012'),spots.length);const body=new THREE.InstancedMesh(new THREE.CylinderGeometry(.2,.42,1.2,8),new THREE.MeshStandardMaterial({roughness:.9}),spots.length),head=new THREE.InstancedMesh(new THREE.SphereGeometry(.21,8,6),mat("#d7b49a"),spots.length);
 const d=new THREE.Object3D(),c=new THREE.Color();spots.forEach(([x,z],i)=>{d.position.set(x,.75,z);d.scale.set(1,R(.9,1.1),1);d.updateMatrix();body.setMatrixAt(i,d.matrix);c.set(["#1A1617","#3a1e22","#5a2a2a","#2a3340","#4a3a2a","#6e1c1c","#2F3D34","#7a6a5a"][i%8]);body.setColorAt(i,c);d.position.set(x,1.65,z);d.scale.set(1,1,1);d.updateMatrix();head.setMatrixAt(i,d.matrix);d.position.y=1.82;d.scale.setScalar(i%3?1:0);d.updateMatrix();hat.setMatrixAt(i,d.matrix);});
 body.castShadow=!mobile;world.add(body,head,hat);return {body,head,hat,spots};})();

/* ---------------- plaza dressing: hedges, flowers, stalls, carriage, walkers ---------------- */
const wd=new THREE.Object3D();const walkers=[];
for(let i=0;i<(mobile?40:90);i++){const k=Math.floor(R(0,people.spots.length));const [x,z]=people.spots[k];walkers.push({idx:k,cx:x+R(-6,6),cz:z+R(-6,6),r:R(3,8),a:R(0,6.28),s:R(.08,.2)*(Math.random()<.5?-1:1)});}
{const hedgeSpots=[];const beds=[[12,14,6],[-30,6,5],[14,44,6],[36,-24,4],[-28,50,4]];
 for(const [cx,cz,r] of beds){for(let i=0;i<16;i++){const a=i/16*Math.PI*2;hedgeSpots.push([cx+Math.cos(a)*r,cz+Math.sin(a)*r,a]);}}
 const hg=new THREE.InstancedMesh(new THREE.BoxGeometry(2,.8,.9),new THREE.MeshStandardMaterial({color:0x5a7a3a,roughness:.95}),hedgeSpots.length);hedgeSpots.forEach(([x,z,a],i)=>{wd.position.set(x,.4,z);wd.rotation.set(0,-a+Math.PI/2,0);wd.scale.set(R(1.2,1.6),1,1);wd.updateMatrix();hg.setMatrixAt(i,wd.matrix);});hg.castShadow=hg.receiveShadow=true;world.add(hg);
 const fl=[];for(const [cx,cz,r] of beds)for(let i=0;i<(mobile?25:60);i++){const a=R(0,6.28),d=R(r-1.6,r+1.4);fl.push([cx+Math.cos(a)*d,cz+Math.sin(a)*d]);}
 const fm=new THREE.InstancedMesh(new THREE.IcosahedronGeometry(.28,0),new THREE.MeshStandardMaterial({roughness:.8}),fl.length);const c=new THREE.Color();fl.forEach(([x,z],i)=>{wd.position.set(x,.95,z);wd.scale.setScalar(R(.7,1.3));wd.updateMatrix();fm.setMatrixAt(i,wd.matrix);c.set(["#c8323a","#e8a03a","#f0d8a0","#a02a5a","#e0702a"][i%5]);fm.setColorAt(i,c);});world.add(fm);
 for(const [cx,cz] of beds.slice(0,3)){cyl(world,1.6,1.8,.8,SAND,cx,0,cz,12);cyl(world,.3,.4,2.4,SAND,cx,.8,cz,8);const w=new THREE.Mesh(new THREE.CircleGeometry(1.4,16),new THREE.MeshStandardMaterial({color:0x4a7078,roughness:.1,metalness:.4}));w.rotation.x=-Math.PI/2;w.position.set(cx,.82,cz);world.add(w);}
 // market stalls
 const stalls=[[-6,10,.3],[0,6,.6],[22,-14,-.2],[30,-16,0],[-18,0,1.2],[4,-6,.1],[38,28,-.6]];
 stalls.forEach(([x,z,ry],i)=>{const st=new THREE.Group();st.position.set(x,0,z);st.rotation.y=ry;box(st,3,1,1.6,WOOD,0,0,0);for(const [px,pz] of [[-1.4,-.7],[1.4,-.7],[-1.4,.7],[1.4,.7]])cyl(st,.06,.06,2.6,WOOD,px,0,pz,4);
  const cv=new THREE.Mesh(new THREE.PlaneGeometry(3.4,2.2),mat("#ffffff",{map:stripeTex(["#8E1B1B","#2F5D50","#7A2E3A","#C9A24B"][i%4],"#EFE2C6",8),ds:true}));cv.rotation.x=-Math.PI/2+.3;cv.position.y=2.75;st.add(cv);
  for(let k=0;k<5;k++){const f=new THREE.Mesh(new THREE.SphereGeometry(.18,6,4),mat(["#e0702a","#c8323a","#e8c050","#6a8a30"][k%4]));f.position.set(-1+k*.5,1.15,0);st.add(f);}const lm=new THREE.Mesh(new THREE.SphereGeometry(.15,6,4),new THREE.MeshBasicMaterial({color:0xffc070}));lm.position.set(1.3,2.3,.8);st.add(lm);st.traverse(o=>o.castShadow=true);world.add(st);});
 // horse carriage near canal
 const cr=new THREE.Group();cr.position.set(24,0,30);cr.rotation.y=-.5;box(cr,2.6,1.8,1.8,mat("#1A1617",{r:.4}),0,1,0);const crf=new THREE.Mesh(new THREE.CylinderGeometry(1,1,2.6,12,1,false,0,Math.PI),mat("#1A1617"));crf.rotation.z=Math.PI/2;crf.position.y=2.8;crf.scale.set(1,.5,.9);cr.add(crf);for(const x of [-.9,.9])for(const z of [-1,1]){const w=new THREE.Mesh(new THREE.TorusGeometry(.6,.07,4,14),GOLD);w.position.set(x,.6,z);cr.add(w);}
 const hm=mat("#3a2414");const hb=new THREE.Mesh(new THREE.CapsuleGeometry(.45,1.5,4,8),hm);hb.rotation.z=Math.PI/2;hb.position.set(3.2,1.5,0);cr.add(hb);const hn=new THREE.Mesh(new THREE.CapsuleGeometry(.26,.8,3,6),hm);hn.position.set(4.2,2.2,0);hn.rotation.z=-.6;cr.add(hn);for(const [x,z] of [[2.6,.2],[2.6,-.2],[3.8,.2],[3.8,-.2]]){const l=new THREE.Mesh(new THREE.CylinderGeometry(.09,.07,1.2,4),hm);l.position.set(x,.6,z);cr.add(l);}cr.traverse(o=>o.castShadow=true);world.add(cr);}

/* ---------------- PROJECTS LANE: one house per project ---------------- */
const LC=new THREE.Vector3(-6,0,4),LR=46;const houses=[];
{// lane street
 const pts=[];for(let i=0;i<=40;i++){const a=THREE.MathUtils.degToRad(224-i*78/40);pts.push(new THREE.Vector3(LC.x+Math.cos(a)*(LR-7),0,LC.z-Math.sin(a)*(LR-7)));}
 const lc=new THREE.CatmullRomCurve3(pts);const st=new THREE.Mesh(new THREE.TubeGeometry(lc,80,4.2,8),mat("#ffffff",{map:cobble}));st.scale.y=.02;st.position.y=.1;st.receiveShadow=true;world.add(st);}
function plaque(par,text,y,z,w=3.2){const tx=signTex(text,"#C9A24B","#2a1c14","bold 46px 'Libre Caslon Text',Georgia,serif");const p=new THREE.Mesh(new THREE.PlaneGeometry(w,.6),new THREE.MeshStandardMaterial({map:tx,emissiveMap:tx,emissive:0xffc060,emissiveIntensity:0,roughness:.4,metalness:.5}));p.userData.isPlaque=true;p.position.set(0,y,z);par.add(p);return p;}
const P=(c,k="stone")=>wallMat(k,c);
const HB=[
 g=>{const W=8,D=9,H=16;g.add(building({x:0,z:0,w:W,d:D,h:H,wall:P("#2F5D50"),trim:CREAM,roof:SLATE,rh:3.4,floors:4,chim:1}));const lo=new THREE.Group();lo.position.set(0,H+2.6,0);box(lo,2.4,2.2,2.4,mat("#ffd890",{e:0xffb050,ei:.9,t:true,op:.85}),0,0,0);cone(lo,2.1,1.6,SLATE2,0,2.2,0,4);g.add(lo);
  const sg=new THREE.Group();sg.position.set(W/2+.9,7,D/2-.6);const ring=new THREE.Mesh(new THREE.TorusGeometry(.9,.12,6,20),IRON);sg.add(ring);const lens=new THREE.Mesh(new THREE.CircleGeometry(.85,20),mat("#bfe3ff",{r:.1,m:.3,t:true,op:.6}));sg.add(lens);const mg=new THREE.Mesh(new THREE.TorusGeometry(.35,.09,6,16),BRASS);mg.position.set(-.1,.1,.06);sg.add(mg);const hd=new THREE.Mesh(new THREE.CylinderGeometry(.06,.06,.5,4),BRASS);hd.position.set(.25,-.25,.06);hd.rotation.z=.8;sg.add(hd);box(g,1.6,.12,.12,IRON,W/2+.3,7.9,D/2-.6);g.add(sg);return {H,sign:sg};},
 g=>{const W=7,D=8,H=11;g.add(building({x:0,z:0,w:W,d:D,h:H,wall:P("#E9DCC0"),trim:mat("#b89a6a"),roof:SLATE,rh:3.2,floors:2,chim:1}));const catT=ctex(128,128,(c)=>{const gr=c.createRadialGradient(64,64,4,64,64,64);gr.addColorStop(0,"#ffe2a0");gr.addColorStop(1,"#e98a30");c.fillStyle=gr;c.fillRect(0,0,128,128);c.fillStyle="#1A1617";c.beginPath();c.ellipse(64,92,24,20,0,0,7);c.fill();c.beginPath();c.arc(64,60,15,0,7);c.fill();c.beginPath();c.moveTo(50,52);c.lineTo(52,36);c.lineTo(60,48);c.moveTo(78,52);c.lineTo(76,36);c.lineTo(68,48);c.fill();c.fillRect(84,96,22,6);c.strokeStyle="#2a1c14";c.lineWidth=6;c.beginPath();c.moveTo(64,0);c.lineTo(64,128);c.moveTo(0,64);c.lineTo(128,64);c.stroke();});
  const rw=new THREE.Mesh(new THREE.CircleGeometry(1.7,28),mat("#ffffff",{map:catT,e:0xffffff,em:catT,ei:.9}));rw.position.set(0,7.6,D/2+.06);g.add(rw);const fr=new THREE.Mesh(new THREE.TorusGeometry(1.75,.16,6,28),mat("#7a5a3a"));fr.position.copy(rw.position);g.add(fr);
  for(const x of [-2.4,-1.4,1.4,2.4]){cyl(g,.35,.28,.6,mat("#A65A3F"),x,0,D/2+.8,8);const b=new THREE.Mesh(new THREE.IcosahedronGeometry(.45,0),mat("#4a6630",{flat:true}));b.position.set(x,.95,D/2+.8);g.add(b);}return {H};},
 g=>{const W=8,D=9,H=13;g.add(building({x:0,z:0,w:W,d:D,h:H,wall:wallMat("brick","#A65A3F"),roof:SLATE,rh:3.4,floors:3,chim:2}));const gen=new THREE.Group();gen.position.set(-2.2,1.4,D/2+1);const tank=new THREE.Mesh(new THREE.CylinderGeometry(.9,.9,2.6,16),BRASS);tank.rotation.z=Math.PI/2;gen.add(tank);for(const x of [-1,0,1]){const b=new THREE.Mesh(new THREE.TorusGeometry(.92,.06,4,16),IRON);b.position.x=x;b.rotation.y=Math.PI/2;gen.add(b);}const pipe=new THREE.Mesh(new THREE.CylinderGeometry(.15,.15,4,6),BRASS);pipe.position.set(.8,2.4,-.3);gen.add(pipe);const gauge=new THREE.Mesh(new THREE.CircleGeometry(.35,16),mat("#f3e6cc",{e:0x553311}));gauge.position.set(0,.2,.93);gen.add(gauge);gen.traverse(o=>o.castShadow=true);g.add(gen);
  const led=new THREE.Group();led.position.set(2.2,0,D/2+1.4);const pb=new THREE.Mesh(new THREE.CapsuleGeometry(.3,.9,3,6),mat("#2a3340"));pb.position.y=.75;led.add(pb);const ph=new THREE.Mesh(new THREE.SphereGeometry(.22,6,5),mat("#d7b49a"));ph.position.y=1.6;led.add(ph);const bk=new THREE.Mesh(new THREE.BoxGeometry(.5,.35,.1),mat("#6e1c1c"));bk.position.set(0,1.1,.35);led.add(bk);g.add(led);return {H,cables:true};},
 g=>{const W=7,D=8,H=12;g.add(building({x:0,z:0,w:W,d:D,h:H,wall:P("#3E4A63"),trim:CREAM,roof:SLATE2,rh:3,floors:3,chim:1,ground:3}));const dw=new THREE.Mesh(new THREE.PlaneGeometry(4,2.4),mat("#ffcf88",{e:0xffa040,ei:.8}));dw.position.set(-.2,1.6,D/2+.06);g.add(dw);
  for(let i=0;i<4;i++){const gl=new THREE.Group();gl.position.set(-1.6+i*1,1.4,D/2+.12);for(const s of [-.18,.18]){const r=new THREE.Mesh(new THREE.TorusGeometry(.14,.03,4,12),DARK);r.position.x=s;gl.add(r);}g.add(gl);}
  const sp=new THREE.Group();sp.position.set(0,4.2,D/2+.5);for(const s of [-1,1]){const r=new THREE.Mesh(new THREE.TorusGeometry(.8,.14,8,24),BRASS);r.position.x=s*1;sp.add(r);const l=new THREE.Mesh(new THREE.CircleGeometry(.75,20),mat("#bfe3ff",{r:.05,m:.4,t:true,op:.55}));l.position.x=s;sp.add(l);}const br=new THREE.Mesh(new THREE.TorusGeometry(.25,.1,6,10,Math.PI),BRASS);br.position.y=.2;sp.add(br);g.add(sp);return {H,sign:sp};},
 g=>{const W=9,D=10,H=13;box(g,W,H-3,D,SAND,0,0,0);box(g,W+1,.8,D+1,SAND,0,0,0);windows(g,W,H-3,D,2,.6,2.6,1);const rf=gableRoof(W,D,2.4,SLATE);rf.position.y=H-3;g.add(rf);
  const ped=new THREE.Group();ped.position.set(0,H-4.2,D/2+1.6);const ps=new THREE.Shape();ps.moveTo(-W/2,0);ps.lineTo(0,2.4);ps.lineTo(W/2,0);ps.lineTo(-W/2,0);const pg=new THREE.Mesh(new THREE.ExtrudeGeometry(ps,{depth:1,bevelEnabled:false}),mat("#a8967c"));ped.add(pg);box(ped,W+.4,.6,1.4,mat("#a8967c"),0,-.6,.5);g.add(ped);
  for(let i=0;i<4;i++)cyl(g,.38,.42,H-4.8,mat("#cbb894"),-3.3+i*2.2,.8,D/2+1.8,12);for(let i=0;i<5;i++){const s=new THREE.Mesh(new THREE.SphereGeometry(.42,8,6),mat("#8a6a3a"));s.scale.y=1.2;s.position.set(-3.6+i*.6+(i>2?4.2:0),1.25,D/2+3);g.add(s);}
  const pd=makeDragon(5,"#5a3a24","#2a1c14","#8A6A3A",true);pd.position.set(0,H-1.2+1.2,D/2+2);pd.rotation.y=Math.PI;pd.scale.setScalar(.55);g.add(pd);perched.push(pd);return {H,plaqueY:H-5.6,plaqueZ:D/2+2.65};},
 g=>{const W=7,D=8,H=12;g.add(building({x:0,z:0,w:W,d:D,h:H,wall:P("#D9D2C3"),trim:mat("#8a8a80"),roof:SLATE,rh:3,floors:3,chim:1,ground:3}));const dw=new THREE.Mesh(new THREE.PlaneGeometry(3.6,2.2),mat("#ffe7b8",{e:0xffb060,ei:.6}));dw.position.set(-.4,1.6,D/2+.06);g.add(dw);
  for(let i=0;i<7;i++){const b=new THREE.Mesh(new THREE.CylinderGeometry(.15,.15,.55,8),mat(["#2a7a5a","#8E1B1B","#3E4A63","#C9A24B"][i%4],{r:.15,t:true,op:.85}));b.position.set(-2+i*.5,1.4+(i%2)*.7,D/2+.15);g.add(b);}
  const sg=new THREE.Group();sg.position.set(W/2+.9,4.2,D/2-.4);const bowl=new THREE.Mesh(new THREE.SphereGeometry(.5,12,8,0,Math.PI*2,Math.PI/2,Math.PI/2),mat("#b8b0a0"));sg.add(bowl);const pst=new THREE.Mesh(new THREE.CylinderGeometry(.08,.12,1,6),WOOD);pst.position.set(.15,.3,0);pst.rotation.z=-.4;sg.add(pst);box(g,1.5,.1,.1,IRON,W/2+.4,4.9,D/2-.4);g.add(sg);
  const nu=new THREE.Group();nu.position.set(2.2,0,D/2+1.4);const nb=new THREE.Mesh(new THREE.CapsuleGeometry(.32,.9,3,6),mat("#f3f0ea"));nb.position.y=.75;nu.add(nb);const nh=new THREE.Mesh(new THREE.SphereGeometry(.22,6,5),mat("#d7b49a"));nh.position.y=1.6;nu.add(nh);const cap=new THREE.Mesh(new THREE.BoxGeometry(.32,.12,.25),mat("#ffffff"));cap.position.y=1.82;nu.add(cap);g.add(nu);return {H,sign:sg};},
 g=>{const W=9,D=10,H=11;g.add(building({x:0,z:0,w:W,d:D,h:H,wall:wallMat("brick","#7A4A35"),roof:SLATE,rh:3,floors:2,chim:1,ground:4}));const dr=new THREE.Mesh(new THREE.PlaneGeometry(5,3.6),mat("#3a2414"));dr.position.set(0,1.8,D/2+.06);g.add(dr);const di=new THREE.Mesh(new THREE.PlaneGeometry(4.4,3.2),mat("#ffc070",{e:0xff9a40,ei:.55}));di.position.set(0,1.7,D/2+.07);g.add(di);
  const parc=mat("#b8915a");for(let i=0;i<6;i++)box(g,.7,.55,.6,parc,-1.6+(i%3)*1.1,(i>2?.55:0)+.05,D/2-.4);
  const cr=new THREE.Group();cr.position.set(1,0,D/2+4.2);cr.rotation.y=Math.PI/2;box(cr,3.4,1,1.8,WOOD,0,1,0);for(let i=0;i<5;i++)box(cr,.7,.6,.6,parc,-1.2+i*.6,2+(i%2)*.4,R(-.4,.4));for(const x of [-1.2,1.2])for(const z of [-1,1]){const w=new THREE.Mesh(new THREE.TorusGeometry(.6,.08,4,14),DARK);w.position.set(x,.65,z);cr.add(w);}
  const hm=mat("#6a4428");const hb=new THREE.Mesh(new THREE.CapsuleGeometry(.5,1.6,4,8),hm);hb.rotation.z=Math.PI/2;hb.position.set(3.8,1.6,0);cr.add(hb);const hn=new THREE.Mesh(new THREE.CapsuleGeometry(.28,.9,3,6),hm);hn.position.set(4.9,2.3,0);hn.rotation.z=-.6;cr.add(hn);for(const [x,z] of [[3.2,.25],[3.2,-.25],[4.4,.25],[4.4,-.25]]){const l=new THREE.Mesh(new THREE.CylinderGeometry(.1,.08,1.3,4),hm);l.position.set(x,.65,z);cr.add(l);}cr.traverse(o=>o.castShadow=true);g.add(cr);return {H};},
 g=>{const W=7,D=8,H=11;g.add(building({x:0,z:0,w:W,d:D,h:H,wall:P("#7A2E3A"),trim:CREAM,roof:SLATE2,rh:3,floors:2,chim:1,ground:3}));const sw=new THREE.Mesh(new THREE.PlaneGeometry(4.6,2.2),mat("#ffcf88",{e:0xffa040,ei:.7}));sw.position.set(-.3,1.6,D/2+.06);g.add(sw);
  const aw=new THREE.Mesh(new THREE.PlaneGeometry(W,2.2,1,1),mat("#ffffff",{map:stripeTex("#7A2E3A","#EFE2C6",14),ds:true}));aw.position.set(0,3.4,D/2+.9);aw.rotation.x=-1.0;aw.castShadow=true;g.add(aw);
  box(g,2.6,1,.8,WOOD,1.6,0,D/2+1.2);const reg=new THREE.Group();reg.position.set(1.6,1,D/2+1.2);box(reg,.9,.6,.6,BRASS,0,0,0);const rt=new THREE.Mesh(new THREE.BoxGeometry(.7,.35,.1),BRASS);rt.position.set(0,.8,-.1);rt.rotation.x=-.3;reg.add(rt);g.add(reg);return {H};},
];
const perched=[];

/* ---------------- dragons (built from primitives) ---------------- */
const scaleTex=ctex(128,128,(g,w,h)=>{g.fillStyle="#808080";g.fillRect(0,0,w,h);for(let y=0;y<h+8;y+=8)for(let x=-(y/8%2)*5;x<w;x+=10){const v=Math.floor(R(150,230));g.fillStyle=`rgb(${v},${v},${v})`;g.beginPath();g.arc(x+5,y,5.5,0,Math.PI);g.fill();g.strokeStyle="#3a3a3a";g.lineWidth=1;g.stroke();}},[6,6]);
scaleTex.colorSpace=THREE.NoColorSpace;
const membTex=ctex(256,256,(g,w,h)=>{const gr=g.createLinearGradient(0,0,0,h);gr.addColorStop(0,"#d8b8a0");gr.addColorStop(.6,"#a07060");gr.addColorStop(1,"#604038");g.fillStyle=gr;g.fillRect(0,0,w,h);g.strokeStyle="rgba(40,10,10,.55)";g.lineWidth=2;for(let i=0;i<26;i++){let x=R(0,w),y=R(h*.3,h*.7);g.beginPath();g.moveTo(x,y);for(let k=0;k<5;k++){x+=R(-25,25);y+=R(-30,30);g.lineTo(x,y);}g.stroke();}for(let i=0;i<300;i++){g.fillStyle=`rgba(60,20,20,${R(.05,.2)})`;g.fillRect(R(0,w),R(0,h),R(2,6),R(2,6));}});
function makeDragon(span,body,memb,horn,perch=false){const k=span/18;const D=new THREE.Group();const root=new THREE.Group();root.scale.setScalar(k);D.add(root);
 const BM=new THREE.MeshStandardMaterial({color:body,map:scaleTex,bumpMap:scaleTex,bumpScale:2,roughness:.72,metalness:.18});const BL=new THREE.MeshStandardMaterial({color:new THREE.Color(body).lerp(new THREE.Color("#E0A060"),.35),roughness:.7});
 const WM=new THREE.MeshStandardMaterial({color:memb,map:membTex,roughness:.8,side:THREE.DoubleSide,emissive:memb,emissiveIntensity:.15});const HM=mat(horn,{r:.4,m:.4});
 const torso=new THREE.Mesh(new THREE.SphereGeometry(1,18,12),BM);torso.scale.set(1,.85,2.3);root.add(torso);const belly=new THREE.Mesh(new THREE.SphereGeometry(1,14,10),BL);belly.scale.set(.8,.6,2);belly.position.y=-.3;root.add(belly);
 for(let i=0;i<6;i++){const sp=new THREE.Mesh(new THREE.ConeGeometry(.16,.5,4),HM);sp.position.set(0,.85-i*.02,1.6-i*.65);sp.rotation.x=-.5;root.add(sp);}
 const neckPts=[];let prev=new THREE.Vector3(0,.3,1.9);const neck=[];for(let i=0;i<7;i++){const t=i/6;const p=new THREE.Vector3(0,.3+Math.sin(t*1.4)*1.9,1.9+t*3.2);const s=new THREE.Mesh(new THREE.SphereGeometry(.62-t*.27,12,8),BM);s.position.copy(p);s.scale.z=1.4;root.add(s);neck.push(s);neckPts.push(p);}
 const head=new THREE.Group();head.position.copy(neckPts[6]).add(new THREE.Vector3(0,.15,.4));root.add(head);
 const skull=new THREE.Mesh(new THREE.SphereGeometry(.55,14,10),BM);skull.scale.set(.9,.75,1.2);head.add(skull);const snout=new THREE.Mesh(new THREE.CylinderGeometry(.22,.42,1.4,10),BM);snout.rotation.x=Math.PI/2;snout.position.set(0,-.08,.95);head.add(snout);
 const jaw=new THREE.Mesh(new THREE.CylinderGeometry(.16,.32,1.2,8),BL);jaw.rotation.x=Math.PI/2+.15;jaw.position.set(0,-.33,.8);head.add(jaw);
 for(const s of [-1,1]){const h=new THREE.Mesh(new THREE.ConeGeometry(.12,1.3,6),HM);h.position.set(s*.28,.45,-.45);h.rotation.set(-2.1,0,s*.25);head.add(h);const h2=new THREE.Mesh(new THREE.ConeGeometry(.07,.6,5),HM);h2.position.set(s*.42,.15,-.3);h2.rotation.set(-1.9,0,s*.6);head.add(h2);const e=new THREE.Mesh(new THREE.SphereGeometry(.08,6,5),new THREE.MeshBasicMaterial({color:0xffb030}));e.position.set(s*.33,.16,.35);head.add(e);}
 const tail=[];let parent=root,off=new THREE.Vector3(0,.0,-2.1);for(let i=0;i<14;i++){const seg=new THREE.Group();seg.position.copy(off);parent.add(seg);const r=.55*(1-i/15)+.06;const m=new THREE.Mesh(new THREE.SphereGeometry(r,10,8),BM);m.scale.z=1.7;seg.add(m);if(i%2===0){const sp=new THREE.Mesh(new THREE.ConeGeometry(r*.35,r*.9,4),HM);sp.position.y=r*.9;sp.rotation.x=-.6;seg.add(sp);}tail.push(seg);parent=seg;off=new THREE.Vector3(0,0,-r*1.5-.1);}
 const spade=new THREE.Mesh(new THREE.ConeGeometry(.35,.9,3),HM);spade.rotation.x=-Math.PI/2;spade.scale.y=1;spade.scale.x=1.4;spade.position.z=-.5;parent.add(spade);
 const ws=new THREE.Shape();const P2=[[0,1.2],[2.5,2.6],[5.5,2.4],[8.8,.3],[7.2,-.6],[6.2,-.2],[5.2,-2.2],[4.2,-1],[2.9,-2.9],[1.8,-1.4],[.6,-2.3],[0,-1.2]];ws.moveTo(...P2[0]);for(let i=1;i<P2.length;i++){const [x,y]=P2[i];const [px,py]=P2[i-1];if(i>4){ws.quadraticCurveTo((x+px)/2+.1,(y+py)/2+.45,x,y);}else ws.lineTo(x,y);}ws.lineTo(...P2[0]);
 const wg=new THREE.ShapeGeometry(ws,10);{const ps=wg.attributes.position;for(let i=0;i<ps.count;i++){const x=ps.getX(i),z=ps.getZ(i);const lead=Math.max(0,1.2+(x/8.8)*1.0-z)/4;ps.setY(i,-Math.sin(Math.min(1,x/8.8)*Math.PI)*.5*lead-.15*x*.1);}wg.computeVertexNormals();const uv=wg.attributes.uv;for(let i=0;i<uv.count;i++)uv.setXY(i,uv.getX(i)/9,(uv.getY(i)+3)/6);}wg.rotateX(Math.PI/2);const bones=[[0,1.2,2.5,2.6],[2.5,2.6,5.5,2.4],[5.5,2.4,8.8,.3],[5.5,2.4,5.2,-2.2],[5.5,2.4,2.9,-2.9],[5.5,2.4,.6,-2.3]];
 const wings=[];for(const s of [-1,1]){const pv=new THREE.Group();pv.position.set(s*.75,.55,.9);const inner=new THREE.Group();inner.scale.x=s;pv.add(inner);const m=new THREE.Mesh(wg,WM);m.castShadow=true;inner.add(m);for(const [x1,z1,x2,z2] of bones){const a=new THREE.Vector3(x1,0,z1),b=new THREE.Vector3(x2,0,z2);const len=a.distanceTo(b);const bm=new THREE.Mesh(new THREE.CylinderGeometry(.06,.11,len,5),BM);bm.position.copy(a).lerp(b,.5);bm.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),b.clone().sub(a).normalize());inner.add(bm);}const cl=new THREE.Mesh(new THREE.ConeGeometry(.08,.4,4),HM);cl.position.set(5.5,.0,2.6);cl.rotation.x=Math.PI/2;inner.add(cl);root.add(pv);wings.push(pv);}
 for(const [x,z] of [[-.6,1.2],[.6,1.2],[-.6,-1.2],[.6,-1.2]]){const l=new THREE.Mesh(new THREE.CapsuleGeometry(.18,.9,3,6),BM);l.position.set(x,-.75,z);l.rotation.x=perch?0:1.1;root.add(l);}
 D.traverse(o=>{if(o.isMesh)o.castShadow=true;});D.userData={wings,tail,neck,head,root,perch,ph:Math.random()*6};return D;}
const dragons=[];
function flyer(span,c1,c2,c3,pts,period,flap){const d=makeDragon(span,c1,c2,c3);d.userData.curve=new THREE.CatmullRomCurve3(pts.map(p=>new THREE.Vector3(...p)),true,"centripetal");d.userData.period=period;d.userData.flap=flap;scene.add(d);dragons.push(d);return d;}
const ell=(cx,cz,rx,rz,y0,ya,n=10)=>Array.from({length:n},(_,i)=>{const a=i/n*Math.PI*2;return [cx+Math.cos(a)*rx,y0+Math.sin(a*2)*ya,cz+Math.sin(a)*rz];});
flyer(26,"#6a1616","#7a1c1c","#8A6A3A",ell(0,-10,96,74,62,6),38,1.6);
flyer(18,"#3e3c40","#4a4248","#8a8a90",[[-10,52,-40],[10,56,-20],[30,52,-6],[44,50,-24],[30,54,-40],[10,52,-26],[-14,56,-8],[-30,52,-28]],24,1.3);
if(!mobile)flyer(16,"#9a7a3a","#8a6a3a","#5a4020",ell(-14,-10,40,30,46,3,8),30,1.1);
const perchK=makeDragon(14,"#3a1c14","#5a2418","#8A6A3A",true);perchK.position.set(-38,6+26+1.4,-46);perchK.rotation.y=.6;perchK.userData.wings.forEach((w,i)=>{w.rotation.z=(i?1:-1)*1.05;w.rotation.y=(i?-1:1)*.9;});scene.add(perchK);perched.push(perchK);

if(!mobile)for(let i=0;i<4;i++)flyer(5,"#3a2a2e","#4a3038","#5a4a40",ell(R(-60,60),R(-200,-120),R(60,110),R(30,50),R(80,120),4,8),R(40,70),1.2);
const perchK2=makeDragon(12,"#4a2a20","#6a2a1c","#8A6A3A",true);perchK2.position.set(-29,15.4,-33.6);perchK2.rotation.y=.5;perchK2.userData.wings.forEach((w,i)=>{w.rotation.z=(i?1:-1)*.5;w.rotation.y=(i?-1:1)*.3;});scene.add(perchK2);perched.push(perchK2);
// place houses (after makeDragon exists)
PROJECTS.forEach((p,i)=>{const a=THREE.MathUtils.degToRad(218-i*66/7);const x=LC.x+Math.cos(a)*LR,z=LC.z-Math.sin(a)*LR;const g=new THREE.Group();g.position.set(x,0,z);g.rotation.y=Math.atan2(LC.x-x,LC.z-z);
 const info=HB[i](g);const W=[8,7,8,7,9,7,9,7][i],D=[9,8,9,8,10,8,10,8][i];plaque(g,p.latin.toUpperCase(),info.plaqueY??2.9,info.plaqueZ??D/2+.08,Math.min(W-1,3.6));brazier(g,W/2+1.2,0,D/2+1.6,.6);
 g.traverse(o=>{if(o.isMesh){o.castShadow=true;o.receiveShadow=true;}});world.add(g);pick(g,"house",p.latin,i);houses.push({g,info,face:new THREE.Vector3(LC.x-x,0,LC.z-z).normalize()});});
// Molada cables to neighbours
{const h=houses[2].g.position,a=houses[1].g.position,b=houses[3].g.position;for(const n of [a,b]){const m=h.clone().lerp(n,.5).setY(7.2);const c=new THREE.QuadraticBezierCurve3(h.clone().setY(10),m,n.clone().setY(9));world.add(new THREE.Mesh(new THREE.TubeGeometry(c,20,.05,4),DARK));}}

/* ---------------- clouds, smoke, fire ---------------- */
{const cm=[];for(let i=0;i<(mobile?60:110);i++){const s=new THREE.Sprite(new THREE.SpriteMaterial({map:puffTex,color:new THREE.Color().setHSL(R(.02,.05),R(.35,.55),R(.45,.62)),transparent:true,opacity:R(.35,.7),depthWrite:false,fog:false}));const a=R(0,6.28),d=R(40,320);s.position.set(Math.cos(a)*d,R(-90,-28),Math.sin(a)*d);s.scale.set(R(60,140),R(22,40),1);s.userData.v=R(.6,1.6);scene.add(s);cm.push(s);}
 for(let i=0;i<30;i++){const s=new THREE.Sprite(new THREE.SpriteMaterial({map:puffTex,color:new THREE.Color("#c46a52"),transparent:true,opacity:R(.15,.3),depthWrite:false,fog:false}));const a=R(0,6.28),d=R(260,420);s.position.set(Math.cos(a)*d,R(10,70),Math.sin(a)*d);s.scale.set(R(120,220),R(20,40),1);scene.add(s);cm.push(s);}window.__clouds=cm;}
const puffs=[];const puffMat=()=>new THREE.SpriteMaterial({map:puffTex,color:0xd8cfc6,transparent:true,depthWrite:false,opacity:.5});
function puff(pos,v,life=3,size=1.2,col){const s=puffs.find(p=>p.userData.life<=0)||(()=>{if(puffs.length>260)return null;const n=new THREE.Sprite(puffMat());scene.add(n);puffs.push(n);return n;})();if(!s)return;s.position.copy(pos);s.userData={v:v.clone(),life,max:life,size,col};s.material.color.set(col==='fire'?'#ff8a2a':(col||0xd8cfc6));s.visible=true;}
let fireCool=0;
function breath(d,target){if(reduced||performance.now()<fireCool)return;fireCool=performance.now()+4000;d.userData.breath={t:0,dur:1.8,target:target?target.clone():null};}

/* ---------------- interaction ---------------- */
const ray=new THREE.Raycaster(),mouse=new THREE.Vector2();let hover=null;
const tip=document.getElementById("tip"),sheet=document.getElementById("sheet"),back=document.getElementById("back"),nav=document.getElementById("nav"),prevB=document.getElementById("prev"),nextB=document.getElementById("next");
function hitAt(x,y){const r=canvas.getBoundingClientRect();mouse.set((x-r.left)/r.width*2-1,-(y-r.top)/r.height*2+1);ray.setFromCamera(mouse,camera);const h=ray.intersectObjects(picks,true)[0];if(!h)return null;let o=h.object;while(o&&!o.userData.sec)o=o.parent;return o;}
canvas.addEventListener("pointermove",e=>{if(e.pointerType!=="mouse")return;const o=hitAt(e.clientX,e.clientY);hover=o&&o.userData.sec==='house'?o:(o||null);canvas.style.cursor=o?"pointer":"grab";if(o){tip.textContent=o.userData.tip;tip.style.display="block";tip.style.left=e.clientX+"px";tip.style.top=e.clientY+"px";}else tip.style.display="none";});
let down=null;canvas.addEventListener("pointerdown",e=>{down=[e.clientX,e.clientY,performance.now()];});
canvas.addEventListener("pointerup",e=>{if(!down)return;const moved=Math.hypot(e.clientX-down[0],e.clientY-down[1]);down=null;if(moved>6)return;const o=hitAt(e.clientX,e.clientY);if(!o)return;tip.style.display="none";
 if(o.userData.sec==="house")go("h"+o.userData.house);else if(o.userData.sec==="projects")go("projects");else go(o.userData.sec);});
const V3=(...a)=>new THREE.Vector3(...a);
const VIEWS={home:{p:V3(64,118,136),t:V3(0,-4,-2)},about:{p:V3(-6,30,18),t:V3(-40,18,-44)},projects:{p:V3(14,19,30),t:V3(-11,5,-13)},skills:{p:V3(-2,14,60),t:V3(-16,4,37)},experience:{p:V3(70,70,120),t:V3(4,0,2)},contact:{p:V3(28,10,18),t:V3(44,7,-8)}};
function houseView(i){const h=houses[i];const c=h.g.position.clone();const f=h.face;const side=new THREE.Vector3(-f.z,0,f.x);return {p:c.clone().addScaledVector(f,27).addScaledVector(side,-7).setY(9),t:c.clone().addScaledVector(f,1).setY(6.5)};}
let cur=null,fly=null;
function flyTo(v,dur=1.6){const asp=innerWidth/innerHeight;const p=v.p.clone();if(asp<1.2){const dir=p.clone().sub(v.t);p.copy(v.t).addScaledVector(dir,Math.min(1.7,1.1/asp));}fly={p0:camera.position.clone(),t0:controls.target.clone(),p1:p,t1:v.t.clone(),t:0,dur:reduced?.01:dur};}
function go(k,instant){if(k===cur&&!instant)return;cur=k;const isH=k[0]==="h"&&k!=="home";const hi=isH?+k.slice(1):null;
 nav.querySelectorAll("button").forEach(b=>b.classList.toggle("on",b.dataset.v===k||(isH&&b.dataset.v==="projects")));
 back.style.display=k==="home"?"none":"block";back.textContent=isH?"↩ رجوع للشارع":"↩ رجوع للمدينة";prevB.style.display=nextB.style.display=isH?"block":"none";
 const html=k==="home"?"":`<div class="card">${orns}${isH?houseCard(PROJECTS[hi]):CARDS[k]}</div>`;sheet.innerHTML=html;sheet.classList.toggle("open",!!html);
 sheet.querySelectorAll("[data-close]").forEach(b=>b.onclick=goBack);sheet.querySelectorAll("[data-h]").forEach(a=>a.onclick=e=>{e.preventDefault();go("h"+a.dataset.h);});
 const v=isH?houseView(hi):VIEWS[k];flyTo(v);if(instant&&fly)fly.t=fly.dur;
 if(k!=="home"){const tgt=v.t.clone().add(V3(0,18,0));const d=isH&&houses[4]?perched[0]:(k==="about"?perchK:dragons[0]);if(d)breath(d,tgt);}
 const hash=k==="home"?"":isH?"#projects/"+PROJECTS[hi].repo:"#"+k;if(location.hash!==hash)history.replaceState(null,"",hash||location.pathname);document.getElementById("hint").style.opacity=k==="home"?1:0;}
function goBack(){go(cur&&cur[0]==="h"&&cur!=="home"?"projects":"home");}
const openHouse=i=>go("h"+((i+8)%8));
back.onclick=goBack;prevB.onclick=()=>openHouse(+cur.slice(1)-1);nextB.onclick=()=>openHouse(+cur.slice(1)+1);
nav.querySelectorAll("button").forEach(b=>b.onclick=()=>go(b.dataset.v));
addEventListener("keydown",e=>{if(e.key==="Escape"&&cur!=="home")goBack();if(cur&&cur[0]==="h"&&cur!=="home"){if(e.key==="ArrowLeft")openHouse(+cur.slice(1)+1);if(e.key==="ArrowRight")openHouse(+cur.slice(1)-1);}});
let sx0=null;sheet.addEventListener("touchstart",e=>{sx0=e.touches[0].clientX;},{passive:true});sheet.addEventListener("touchend",e=>{if(sx0==null||!(cur&&cur[0]==="h"&&cur!=="home"))return;const dx=e.changedTouches[0].clientX-sx0;if(Math.abs(dx)>60)openHouse(+cur.slice(1)+(dx>0?1:-1));sx0=null;});

/* ---------------- resize + view offset ---------------- */
let offX=0,offY=0;
function resize(){const w=innerWidth,h=innerHeight;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();}
addEventListener("resize",resize);resize();

/* ---------------- loop ---------------- */
const clock3=new THREE.Clock();const tmp=V3(),tmp2=V3(),up=V3(0,1,0);let tAll=0;
const ease=t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;
function animDragon(d,t,dt){const u=d.userData;const ph=t+u.ph;
 if(!u.perch&&u.curve){const s=((t/u.period)+u.ph/6)%1;u.curve.getPointAt(s,tmp);u.curve.getPointAt((s+.004)%1,tmp2);d.position.copy(tmp);const dir=tmp2.clone().sub(tmp).normalize();const prevDir=u.prevDir||dir;const turn=prevDir.clone().cross(dir).y;u.prevDir=dir;u.bank=THREE.MathUtils.lerp(u.bank||0,THREE.MathUtils.clamp(-turn*160,-.45,.45),.05);
  d.lookAt(tmp.clone().add(dir));d.rotateZ(u.bank);const glide=Math.sin(ph*.25)>.55;const fl=glide?Math.sin(ph*12)*.03+.12:Math.sin(ph*Math.PI*2/u.flap)*.75;u.wings[0].rotation.z=-fl;u.wings[1].rotation.z=fl;u.root.position.y=glide?0:-Math.sin(ph*Math.PI*2/u.flap)*.25;}
 else{u.root.scale.y=u.root.scale.x*(1+Math.sin(ph*Math.PI/2)*.015);u.head.rotation.y=Math.sin(ph*.9)*.4;}
 u.tail.forEach((s,i)=>{s.rotation.y=Math.sin(ph*2.8-i*.5)*(u.perch?.12:.08);s.rotation.x=u.perch?.08:Math.sin(ph*1.6-i*.4)*.03;});
 if(u.breath){const b=u.breath;b.t+=dt;u.head.getWorldPosition(tmp);u.head.getWorldDirection(tmp2);const tdir=b.target?b.target.clone().sub(tmp).normalize():tmp2;if(b.t<b.dur){for(let k=0;k<(mobile?2:5);k++){const v=tdir.clone().multiplyScalar(R(16,24)).add(V3(R(-2,2),R(1,4),R(-2,2)));puff(tmp.clone().addScaledVector(tmp2,1.4*d.scale.x),v,.8,R(1.2,2.2),"fire");}}else u.breath=null;}}
const fireCol=new THREE.Color(),c1=new THREE.Color("#F2A03D"),c2=new THREE.Color("#E0702A"),c3=new THREE.Color("#5A4E4E");
let smokeAcc=0;
function frame(){const dt=Math.min(clock3.getDelta(),.05);tAll+=reduced?dt*.3:dt;const t=tAll;
 if(fly){fly.t+=dt;const k=ease(Math.min(1,fly.t/fly.dur));camera.position.lerpVectors(fly.p0,fly.p1,k);controls.target.lerpVectors(fly.t0,fly.t1,k);if(k<1){camera.position.y+=Math.sin(k*Math.PI)*6;}if(fly.t>=fly.dur)fly=null;}
 controls.update();
 // card offset: shift scene away from card
 const open=sheet.classList.contains("open");const mob=innerWidth<=760;const tx=open&&!mob?Math.min(540,innerWidth*.38)/2+12:0,ty=open&&mob?innerHeight*.28:0;offX+=(tx-offX)*.1;offY+=(ty-offY)*.1;
 if(Math.abs(offX)>.5||Math.abs(offY)>.5)camera.setViewOffset(innerWidth,innerHeight,offX,offY,innerWidth,innerHeight);else camera.clearViewOffset();
 wheelRot.rotation.z=t*.12;gondolas.forEach(g=>g.rotation.z=-wheelRot.rotation.z);
 carRot.rotation.y=t*.5;horses.forEach((h,i)=>h.position.y=3+Math.sin(t*2.4+i)*.45);
 const base=(t/26)%1;train.forEach((c,i)=>{const u=(base-i*.022+1)%1;trackCurve.getPointAt(u,tmp);trackCurve.getPointAt((u+.003)%1,tmp2);c.position.copy(tmp).setY(.35);c.lookAt(tmp2.setY(.35));});
 smokeAcc+=dt;if(smokeAcc>.12){smokeAcc=0;const lc=train[0];tmp.set(0,4.6,2.4).applyMatrix4(lc.matrixWorld);puff(tmp,V3(R(-.3,.3),R(2,3),R(-.3,.3)),3,1.2);if(!mobile){puff(V3(-38+R(-1,1),40,-46),V3(R(.6,1),R(1.2,2),R(-.2,.2)),9,3.5,0x6a5e5e);}}
 boats.forEach(b=>{const u=b.userData;u.u+=u.sp*dt*u.dir*.3;if(u.u>.95||u.u<.05)u.dir*=-1,u.u=THREE.MathUtils.clamp(u.u,.05,.95);canalCurve.getPointAt(u.u,tmp);canalCurve.getPointAt(Math.min(.999,u.u+.01),tmp2);b.position.copy(tmp).setY(.05+Math.sin(t*1.5+u.u*40)*.06);b.lookAt(tmp2.setY(b.position.y));if(u.dir<0)b.rotateY(Math.PI);u.oar.rotation.x=Math.sin(t*2.5)*.4;});
 bannerMats.forEach((m,j)=>{const a=m.geometry.attributes.position,b=m.userData.base;for(let i=0;i<a.count;i++){const y=b[i*3+1];a.setZ(i,Math.sin(t*2.2+y*1.1+j)*.12*(-y/5));}a.needsUpdate=true;});
 flames.forEach((f,i)=>{const s=1+Math.sin(t*14+i*1.7)*.08+Math.sin(t*23+i)*.05;f.scale.set(1/s,s,1);});
 balloon.position.y=42+Math.sin(t*.4)*1.6;balloon.rotation.y=t*.05;
 floaters.forEach(r=>{r.position.y+=Math.sin(t*.5+r.userData.bob)*.01;r.rotation.y+=dt*.05;});
 window.__clouds.forEach(s=>{if(s.userData.v){s.position.x+=s.userData.v*dt;if(s.position.x>340)s.position.x=-340;}});
 dragons.forEach(d=>{animDragon(d,t,dt);const a=camera.position,b=controls.target;const ab=b.clone().sub(a),L=ab.length();ab.normalize();const ap=d.position.clone().sub(a);const k=THREE.MathUtils.clamp(ap.dot(ab),0,L);d.visible=cur==='home'||ap.clone().sub(ab.multiplyScalar(k)).length()>d.scale.x*14+8&&k>0||ap.length()>L*1.05;});perched.forEach(d=>animDragon(d,t,dt));
 puffs.forEach(p=>{const u=p.userData;if(u.life<=0){p.visible=false;return;}u.life-=dt;p.position.addScaledVector(u.v,dt);const k=1-u.life/u.max;if(u.col==="fire"){u.v.multiplyScalar(.96);fireCol.copy(k<.4?c1.clone().lerp(c2,k/.4):c2.clone().lerp(c3,(k-.4)/.6));p.material.color.copy(fireCol);p.material.opacity=.9*(1-k);p.scale.setScalar(u.size*(1+k*2.5));}else{p.material.opacity=.45*(1-k);p.scale.setScalar(u.size*(1+k*3));}});

 houses.forEach((h,i)=>{const on=hover===h.g||cur==="h"+i;h.g.traverse(o=>{if(o.userData.isDoor)o.rotation.y+=((on?-1.1:0)-o.rotation.y)*.12;if(o.userData.isPlaque)o.material.emissiveIntensity+=((on?.9:0)-o.material.emissiveIntensity)*.12;});});
 walkers.forEach((w,i)=>{w.a+=w.s*dt;const x=w.cx+Math.cos(w.a)*w.r,z=w.cz+Math.sin(w.a)*w.r;wd.position.set(x,.75+Math.abs(Math.sin(t*6+i))*.08,z);wd.rotation.y=-w.a;wd.updateMatrix();people.body.setMatrixAt(w.idx,wd.matrix);wd.position.y+=.9;wd.updateMatrix();people.head.setMatrixAt(w.idx,wd.matrix);wd.position.y+=.17;wd.scale.setScalar(w.idx%3?1:0);wd.updateMatrix();people.hat.setMatrixAt(w.idx,wd.matrix);wd.scale.setScalar(1);});people.body.instanceMatrix.needsUpdate=people.head.instanceMatrix.needsUpdate=people.hat.instanceMatrix.needsUpdate=true;
 renderer.render(scene,camera);requestAnimationFrame(frame);}

/* ---------------- boot ---------------- */
camera.position.copy(VIEWS.home.p).multiplyScalar(1.25);controls.target.copy(VIEWS.home.t);
const m=location.hash.match(/^#(\w+)(?:\/(.+))?/);let start="home";if(m){if(m[1]==="projects"&&m[2]){const i=PROJECTS.findIndex(p=>p.repo===decodeURIComponent(m[2]));start=i>=0?"h"+i:"projects";}else if(VIEWS[m[1]])start=m[1];}
go(start);requestAnimationFrame(frame);
setTimeout(()=>{const L=document.getElementById("load");L.style.opacity=0;setTimeout(()=>L.remove(),900);},300);
window.__open=k=>go(k,true);window.__house=i=>go("h"+i,true);window.__home=()=>go("home",true);window.__ready=true;
