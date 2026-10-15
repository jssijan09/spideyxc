(() => {
  const screen=document.getElementById("loaderScreen");
  const track=document.getElementById("loaderTrack");
  const bar=document.getElementById("loaderProgress");
  const percent=document.getElementById("loaderPercent");
  const detail=document.getElementById("loaderDetail");
  const button=document.getElementById("enterStore");
  const canvas=document.getElementById("loaderParticles");
  if(!screen||!track||!bar||!button)return;
  const reduced=window.matchMedia?.("(prefers-reduced-motion: reduce)").matches??false;
  let ready=false,navigating=false,timer=0;
  const started=Date.now()-80,duration=1550;

  function enter(){
    if(!ready||navigating)return;
    navigating=true;
    screen.classList.add("is-exiting");
    window.setTimeout(()=>window.location.replace("store.html"),reduced?0:940);
  }

  function updateProgress(){
    if(ready)return;
    const raw=Math.min(1,(Date.now()-started)/duration);
    const eased=1-Math.pow(1-raw,2);
    const pct=Math.min(100,Math.round(eased*100));
    bar.style.width=`${eased*100}%`;
    track.style.setProperty("--progress-position",`${eased*100}%`);
    if(percent)percent.textContent=`${pct}%`;
    if(detail){
      detail.textContent=raw<.35?"Preparing the storefront...":raw<.72?"Loading product details...":"Finishing up...";
    }
    if(raw>=1){
      ready=true;
      window.clearInterval(timer);
      bar.style.width="100%";
      track.style.setProperty("--progress-position","100%");
      if(percent)percent.textContent="100%";
      if(detail)detail.textContent="Store ready — welcome.";
      button.disabled=false;
      window.setTimeout(enter,300);
    }
  }

  // Use a timer for progress so background canvas rendering cannot block it.
  button.addEventListener("click",enter);
  updateProgress();
  timer=window.setInterval(updateProgress,24);

  if(!canvas)return;
  let ctx=null,width=0,height=0,particles=[];
  try{ctx=canvas.getContext("2d");}catch(_){return;}
  if(!ctx)return;
  function resize(){
    const d=Math.min(window.devicePixelRatio||1,2);
    width=window.innerWidth;height=window.innerHeight;
    canvas.width=Math.round(width*d);canvas.height=Math.round(height*d);
    canvas.style.width=width+"px";canvas.style.height=height+"px";
    ctx.setTransform(d,0,0,d,0,0);
    // Match the store's subtle red particles: sparse, softly glowing, and drifting upward.
    const count=Math.min(65,Math.max(24,Math.floor(width/20)));
    particles=Array.from({length:count},()=>({x:Math.random()*width,y:Math.random()*height,r:Math.random()+.35,v:Math.random()*.35+.08,a:Math.random()*.4+.12}));
  }
  function draw(time){
    if(!ctx)return;
    ctx.clearRect(0,0,width,height);
    for(const p of particles){
      p.y-=p.v;
      if(p.y< -4){p.y=height+4;p.x=Math.random()*width;}
      ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle=`rgba(255,35,58,${p.a})`;ctx.shadowColor="#ff233a";ctx.shadowBlur=8;ctx.fill();
    }
    ctx.shadowBlur=0;
    window.requestAnimationFrame(draw);
  }
  window.addEventListener("resize",resize,{passive:true});
  try{resize();window.requestAnimationFrame(draw);}catch(_){/* Progress and navigation run without decorative particles. */}
})();
