// ═══════════════════════════════════════════════════════════════
//  JANA'S GARDEN
// ═══════════════════════════════════════════════════════════════
const ST = { INTRO:0, PLAY:1, DIALOGUE:2, NOTE:3, POEM:4 };
let state = ST.INTRO;
let found = new Set();
let musicOn = false;
let bgm=null, fireSnd=null;
let activeScene = null;
let collisionOutside=null, collisionInside=null;

const TILE = TS * SCALE;

// ── INTRO ──────────────────────────────────────────────────────
let introReady=false;
INTRO_LINES.forEach((txt,i)=>{
  const el=document.getElementById('il'+i);
  if(el){ el.textContent=txt; setTimeout(()=>el.classList.add('on'),600+i*2500); }
});
setTimeout(()=>{ document.getElementById('il_skip').classList.add('on'); introReady=true; }, 600+INTRO_LINES.length*2500);
function beginGame(){
  if(!introReady) return;
  const el=document.getElementById('intro'); el.classList.add('out');
  // resume audio context + start music (this runs from a user keypress = allowed)
  try{
    if(activeScene && activeScene.sound && activeScene.sound.context && activeScene.sound.context.state==='suspended')
      activeScene.sound.context.resume();
  }catch(e){}
  if(bgm && !musicOn){ musicOn=true; try{bgm.play();}catch(e){} document.getElementById('mus-btn').textContent='\u266b Playing'; }
  setTimeout(()=>{ el.style.display='none'; state=ST.PLAY; if(fireSnd){try{fireSnd.play();}catch(e){}} }, 1200);
}

window.addEventListener('keydown',e=>{
  if(state===ST.INTRO){ beginGame(); return; }
  if(e.key==='e'||e.key==='E') interact();
  if(e.key==='Escape'){ closePoem(); closeNote(); closeDlg(); }
  if(['arrowup','arrowdown','arrowleft','arrowright',' '].includes(e.key.toLowerCase())) e.preventDefault();
});
document.addEventListener('touchstart',()=>{ if(state===ST.INTRO) beginGame(); },{passive:true,once:true});
document.getElementById('poem-ov').addEventListener('click',e=>{ if(e.target.id==='poem-ov') closePoem(); });

// ── AUDIO ──────────────────────────────────────────────────────
function toggleMusic(){
  musicOn=!musicOn;
  if(bgm) musicOn?bgm.play():bgm.pause();
  document.getElementById('mus-btn').textContent=musicOn?'\u266b Playing':'\u266a Music';
}
function sfx(k){ try{ if(activeScene) activeScene.sound.play(k,{volume:0.5}); }catch(e){} }

// ── NOTE ───────────────────────────────────────────────────────
let np=0;
function openNote(){ np=0; renderNote(); document.getElementById('note-ov').classList.add('open'); document.getElementById('note-pnum').textContent='1/'+NOTE_PAGES.length; state=ST.NOTE; sfx('talk'); }
function closeNote(){ document.getElementById('note-ov').classList.remove('open'); if(state===ST.NOTE) state=ST.PLAY; }
function renderNote(){
  const w=document.getElementById('npages'); w.innerHTML='';
  NOTE_PAGES.forEach((p,i)=>{ const d=document.createElement('div'); d.className='npage'+(i===0?' active':''); d.id='np'+i; d.innerHTML='<div class="nptitle">'+p.title+'</div><div class="nptext">'+p.text+'</div>'; w.appendChild(d); });
}
function npage(d){ document.getElementById('np'+np).classList.remove('active'); np=Math.max(0,Math.min(NOTE_PAGES.length-1,np+d)); document.getElementById('np'+np).classList.add('active'); document.getElementById('note-pnum').textContent=(np+1)+'/'+NOTE_PAGES.length; sfx('talk'); }

// ── POEM ───────────────────────────────────────────────────────
function isArabic(s){ return /[\u0600-\u06FF]/.test(s); }
function openPoem(idx){
  state=ST.POEM; found.add(idx);
  document.getElementById('fn').textContent=found.size;
  const p=POEMS[idx];
  const ti=document.getElementById('poem-ti'), bd=document.getElementById('poem-bd');
  ti.textContent=p.title; bd.textContent=p.body;
  // RTL for Arabic poems
  const ar=isArabic(p.body);
  bd.style.direction=ar?'rtl':'ltr';
  bd.style.textAlign=ar?'right':'left';
  bd.style.fontFamily=ar?'"Noto Naskh Arabic","Amiri",serif':'"IM Fell English",serif';
  bd.style.fontSize=ar?'1.25rem':'1rem';
  document.getElementById('poem-ov').classList.add('open'); sfx('flower');
}
function closePoem(){ document.getElementById('poem-ov').classList.remove('open'); if(state===ST.POEM) state=ST.PLAY; }

// ── DIALOGUE ───────────────────────────────────────────────────
function openDlg(name,text){ state=ST.DIALOGUE; document.getElementById('dlg-name').textContent=name; document.getElementById('dlg-body').textContent=text; document.getElementById('dlg').style.display='block'; sfx('talk'); }
function closeDlg(){ document.getElementById('dlg').style.display='none'; if(state===ST.DIALOGUE) state=ST.PLAY; }

function interact(){
  if(state===ST.DIALOGUE){ closeDlg(); return; }
  if(state===ST.NOTE){ closeNote(); return; }
  if(state===ST.POEM){ closePoem(); return; }
  if(state!==ST.PLAY || !activeScene) return;
  activeScene.tryInteract();
}

// ═══════════════════════════════════════════════════════════════
//  BASE SCENE
// ═══════════════════════════════════════════════════════════════
class Base extends Phaser.Scene {
  constructor(key){ super({key}); }

  preloadCommon(){
    ['down','up','left','right'].forEach(d=>this.load.spritesheet('jana_'+d,'assets/sprites/jana_'+d+'.png',{frameWidth:64,frameHeight:64}));
    ['phoebe','spike','calabar','gilmour'].forEach(a=>this.load.spritesheet('animal_'+a,'assets/animals/'+a+'.png',{frameWidth:32,frameHeight:32}));
    FLOWER_SPRITES.forEach(k=>this.load.image('fl_'+k,'assets/flowers/'+k+'.png'));
    if(!this.cache.audio.has('bgm')) this.load.audio('bgm','assets/audio/bgm.mp3');
    if(!this.cache.audio.has('fire')) this.load.audio('fire','assets/audio/fire.ogg');
    if(!this.cache.audio.has('flower')) this.load.audio('flower','assets/audio/flower.mp3');
    if(!this.cache.audio.has('talk')) this.load.audio('talk','assets/audio/talk.mp3');
    this.load.json('col_out','assets/collision_outside.json');
    this.load.json('col_in','assets/collision_inside.json');
    this.load.on('loaderror',(file)=>{ console.warn('asset failed:',file.key); });
  }

  makeAnims(){
    if(this.anims.exists('jana_walk_down')) return;
    ['down','up','left','right'].forEach(d=>
      this.anims.create({key:'jana_walk_'+d,frames:this.anims.generateFrameNumbers('jana_'+d,{start:0,end:8}),frameRate:10,repeat:-1}));
    ['phoebe','spike','calabar','gilmour'].forEach(a=>
      this.anims.create({key:'anim_'+a,frames:this.anims.generateFrameNumbers('animal_'+a,{start:0,end:3}),frameRate:4,repeat:-1}));
  }

  setupPlayer(spawn){
    this.px=spawn.x; this.py=spawn.y; this.pdir='down'; this.pmove=false;
    this.jana=this.add.sprite(this.px*TILE+TILE/2,this.py*TILE+TILE/2,'jana_down',0)
      .setScale(SCALE*0.6).setOrigin(0.5,0.78).setDepth(99999);
    this.jana.setFrame(0);
    this.cameras.main.startFollow(this.jana,true,0.1,0.1);
    this.cameras.main.setZoom(this.zoomLevel||1.4);
    this.keys=this.input.keyboard.addKeys({up:38,down:40,left:37,right:39,w:87,s:83,a:65,d:68});
  }

  movePlayer(dt, solid, cols, rows, onTile){
    const k=this.keys; let mx=0,my=0;
    if(k.left.isDown||k.a.isDown)mx=-1;
    else if(k.right.isDown||k.d.isDown)mx=1;
    else if(k.up.isDown||k.w.isDown)my=-1;
    else if(k.down.isDown||k.s.isDown)my=1;
    if(mx||my){
      const dir=mx<0?'left':mx>0?'right':my<0?'up':'down';
      if(!this.pmove||dir!==this.pdir){ this.pdir=dir; this.jana.play('jana_walk_'+dir,true); }
      this.pmove=true;
      const spd=6*dt;
      const nx=this.px+mx*spd, ny=this.py+my*spd;
      if(this.canWalk(nx,this.py,solid,cols,rows)) this.px=nx;
      if(this.canWalk(this.px,ny,solid,cols,rows)) this.py=ny;
      if(onTile) onTile(Math.round(this.px),Math.round(this.py));
    } else if(this.pmove){ this.jana.anims.stop(); this.jana.setFrame(0); this.pmove=false; }
    this.jana.setPosition(this.px*TILE+TILE/2,this.py*TILE+TILE/2);
    this.jana.setDepth(this.py*TILE+100);
  }

  canWalk(px,py,solid,cols,rows){
    const tx=Math.floor(px), ty=Math.floor(py);
    if(tx<0||ty<0||tx>=cols||ty>=rows) return false;
    // check the tile and adjacent tiles leniently
    for(let dy=0;dy<=0;dy++) for(let dx=0;dx<=0;dx++){
      const cx=tx+dx, cy=ty+dy;
      if(cx>=0&&cy>=0&&cx<cols&&cy<rows&&solid&&solid[cy]&&solid[cy][cx]) return false;
    }
    return true;
  }
}

// ═══════════════════════════════════════════════════════════════
//  CABIN INTERIOR SCENE
// ═══════════════════════════════════════════════════════════════
class Cabin extends Base {
  constructor(){ super('Cabin'); this.zoomLevel=1.3; }
  preload(){ this.load.image('map_in','assets/map_inside.png'); this.preloadCommon(); }
  create(){
    activeScene=this;
    document.getElementById('area-lbl').textContent='The Cabin';
    this.add.image(0,0,'map_in').setOrigin(0,0).setScale(SCALE).setDepth(0);
    this.cameras.main.setBounds(0,0,INSIDE.px*SCALE,INSIDE.py*SCALE);
    this.cameras.main.setBackgroundColor('#1a1008');
    this.makeAnims();

    const ci=this.cache.json.get('col_in');
    this.solid=(ci&&ci.solid)?ci.solid:null;
    this.door=(ci&&ci.door)?ci.door:{x:15,y:31};

    // NOTE on the table (glowing) — dining table center ~ (12,11)
    this.noteTile={x:12,y:11};
    this.noteGlow=this.add.graphics().setDepth(this.noteTile.y*TILE+50);

    if(!bgm) bgm=this.sound.add('bgm',{loop:true,volume:0.4});
    if(!fireSnd) fireSnd=this.sound.add('fire',{loop:true,volume:0.3});

    this.setupPlayer(SPAWN_INSIDE);
    this.prompt=document.getElementById('interact-prompt');
  }

  tryInteract(){
    const tx=Math.round(this.px),ty=Math.round(this.py);
    if(Math.abs(tx-this.noteTile.x)+Math.abs(ty-this.noteTile.y)<=1){ openNote(); return; }
  }

  update(t,dt){
    const d=dt/1000;
    // note glow pulse
    this.noteGlow.clear();
    const g=Math.abs(Math.sin(t*0.003))*0.5+0.3;
    this.noteGlow.fillStyle(0xffe060,g*0.5);
    this.noteGlow.fillCircle(this.noteTile.x*TILE+TILE/2,this.noteTile.y*TILE+TILE/2,TILE*0.7);

    if(state!==ST.PLAY){ this.prompt.style.display='none'; if(this.pmove){this.jana.anims.stop();this.pmove=false;} return; }

    this.movePlayer(d,this.solid,INSIDE.cols,INSIDE.rows);

    // door exit
    const tx=Math.round(this.px),ty=Math.round(this.py);
    if(ty>=this.door.y-0 && Math.abs(tx-this.door.x)<=1){
      this.scene.start('Garden',{fromCabin:true});
      return;
    }

    // prompt for note
    const nearNote=Math.abs(tx-this.noteTile.x)+Math.abs(ty-this.noteTile.y)<=1;
    if(nearNote){
      const cam=this.cameras.main;
      const sx=(this.jana.x-cam.worldView.x)*cam.zoom;
      const sy=(this.jana.y-TILE*1.6-cam.worldView.y)*cam.zoom;
      this.prompt.textContent='E — Read the note';
      this.prompt.style.display='block';
      this.prompt.style.left=sx+'px'; this.prompt.style.top=sy+'px'; this.prompt.style.transform='translateX(-50%)';
    } else this.prompt.style.display='none';
  }
}

// ═══════════════════════════════════════════════════════════════
//  GARDEN SCENE
// ═══════════════════════════════════════════════════════════════
class Garden extends Base {
  constructor(){ super('Garden'); this.zoomLevel=0.9; }
  preload(){ this.load.image('map_out','assets/map_outside.png'); this.preloadCommon(); }
  create(data){
    activeScene=this;
    document.getElementById('area-lbl').textContent="Jana's Garden";
    this.add.image(0,0,'map_out').setOrigin(0,0).setScale(SCALE).setDepth(0);
    this.cameras.main.setBounds(0,0,OUTSIDE.px*SCALE,OUTSIDE.py*SCALE);
    this.cameras.main.setBackgroundColor('#3a5a6a');
    this.makeAnims();

    const co=this.cache.json.get('col_out');
    this.solid=(co&&co.solid)?co.solid:null;

    if(fireSnd) fireSnd.stop();

    // FLOWERS
    this.flowers=FLOWER_TILES.map(f=>{
      const key='fl_'+FLOWER_SPRITES[f.p%FLOWER_SPRITES.length];
      const wx=f.x*TILE+TILE/2, wy=f.y*TILE+TILE/2;
      const s=this.add.image(wx,wy,key).setDisplaySize(TILE*1.3,TILE*1.3).setDepth(wy);
      s.setData('p',f.p); s.setData('tx',f.x); s.setData('ty',f.y);
      this.tweens.add({targets:s,y:wy-3,duration:1500+f.x*60,yoyo:true,repeat:-1,ease:'Sine.easeInOut'});
      return s;
    });
    this.glow=this.add.graphics().setDepth(4000);

    // ANIMALS
    ANIMALS.forEach(a=>{
      const wx=a.x*TILE+TILE/2, wy=a.y*TILE+TILE/2;
      const s=this.add.sprite(wx,wy,'animal_'+a.key,0).setScale(SCALE).setOrigin(0.5,0.7).setDepth(wy);
      s.play('anim_'+a.key);
      this.add.text(wx,wy-TILE*1.0,a.name,{fontFamily:'"Cormorant Garamond",serif',fontSize:'12px',color:'#a8e080',backgroundColor:'rgba(4,10,4,0.85)',padding:{x:4,y:1}}).setOrigin(0.5,1).setDepth(wy+1);
    });

    if(!bgm) bgm=this.sound.add('bgm',{loop:true,volume:0.4});

    // spawn: if coming from cabin, appear at cabin entrance; else waterfall
    const spawn = data && data.fromCabin ? CABIN_ENTRANCE_OUTSIDE : SPAWN_OUTSIDE;
    this.setupPlayer(spawn);
    this.prompt=document.getElementById('interact-prompt');

    // fireflies
    this.ff=this.add.graphics().setDepth(90000);
    this.ffd=Array.from({length:24},()=>({ox:Math.random()*OUTSIDE.px*SCALE,oy:Math.random()*OUTSIDE.py*SCALE,sp:0.2+Math.random()*0.4,ph:Math.random()*6.28}));
  }

  tryInteract(){
    const tx=Math.round(this.px),ty=Math.round(this.py);
    const dirs=[[0,0],[1,0],[-1,0],[0,1],[0,-1],[1,1],[-1,1],[1,-1],[-1,-1]];
    for(const a of ANIMALS) for(const[dx,dy]of dirs) if(a.x===tx+dx&&a.y===ty+dy){ openDlg(a.name,a.hint); return; }
    for(const f of FLOWER_TILES) if(Math.abs(f.x-tx)+Math.abs(f.y-ty)<=1){ openPoem(f.p); return; }
  }

  update(t,dt){
    const d=dt/1000;
    const ft=t*0.001;
    this.ff.clear();
    this.ffd.forEach((f,i)=>{ const fx=f.ox+Math.sin(ft*f.sp+f.ph)*60,fy=f.oy+Math.cos(ft*f.sp*0.7+f.ph)*60; const a=Math.abs(Math.sin(ft*1.1+i))*0.8; this.ff.fillStyle(0xaaff66,a); this.ff.fillCircle(fx,fy,2.5); });

    if(state!==ST.PLAY){ this.prompt.style.display='none'; if(this.pmove){this.jana.anims.stop();this.pmove=false;} return; }

    this.movePlayer(d,this.solid,OUTSIDE.cols,OUTSIDE.rows);

    // flower glow + found
    this.glow.clear();
    const ptx=Math.round(this.px),pty=Math.round(this.py);
    this.flowers.forEach(s=>{
      const near=Math.abs(s.getData('tx')-ptx)+Math.abs(s.getData('ty')-pty)<=1;
      if(near){ const pl=Math.abs(Math.sin(t*0.003))*0.3+0.1; this.glow.fillStyle(0xf8e860,pl); this.glow.fillCircle(s.x,s.y,TILE); }
      s.setAlpha(found.has(s.getData('p'))?0.45:1);
    });

    // prompt
    const it=this.near(ptx,pty);
    if(it){
      const cam=this.cameras.main;
      const sx=(this.jana.x-cam.worldView.x)*cam.zoom;
      const sy=(this.jana.y-TILE*1.7-cam.worldView.y)*cam.zoom;
      this.prompt.textContent=it==='flower'?'E — Read poem':'E — Talk';
      this.prompt.style.display='block';
      this.prompt.style.left=sx+'px'; this.prompt.style.top=sy+'px'; this.prompt.style.transform='translateX(-50%)';
    } else this.prompt.style.display='none';
  }

  near(tx,ty){
    const dirs=[[0,0],[1,0],[-1,0],[0,1],[0,-1],[1,1],[-1,1],[1,-1],[-1,-1]];
    for(const a of ANIMALS) for(const[dx,dy]of dirs) if(a.x===tx+dx&&a.y===ty+dy) return 'animal';
    for(const f of FLOWER_TILES) if(Math.abs(f.x-tx)+Math.abs(f.y-ty)<=1) return 'flower';
    return null;
  }
}

// ── BOOT ───────────────────────────────────────────────────────
window.__game = new Phaser.Game({
  type: Phaser.CANVAS,
  canvas: document.getElementById('game-canvas'),
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor:'#1a1008',
  pixelArt:true,
  scene:[Cabin,Garden],
  scale:{ mode:Phaser.Scale.RESIZE, autoCenter:Phaser.Scale.CENTER_BOTH }
});
window.addEventListener('resize',()=>{ if(window.__game) window.__game.scale.resize(window.innerWidth,window.innerHeight); });
