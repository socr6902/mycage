// --- Sparkle trail (keep) ---
document.addEventListener('mousemove', e => {
    const s = document.createElement('div');
    s.className = 'sparkle';
    s.textContent = Math.random() > .5 ? '✧' : '✦';
    s.style.left = e.clientX + 'px';
    s.style.top  = e.clientY + 'px';
    document.body.appendChild(s);
    setTimeout(() => s.remove(), 400);
  });
  
  // --- Optional: "Now Playing" bridge (keep) ---
  window.setNowPlaying = (text) => {
    const el = document.getElementById('nowPlaying');
    if (el) el.textContent = text || '—';
  };
  
  // --- Win95 HOME MINI PLAYER (tight sync + logs) ---
(function(){
    const A = document.getElementById('bgAudio');
    if (!A) return;
  
    const $ = id => document.getElementById(id);
    const els = {
      play:  $('hpPlay'),
      next:  $('hpNext'),
      seek:  $('hpSeek'),
      time:  $('hpTime'),
      cover: $('hpCover'),
      artist:$('hpArtist'),
      title: $('hpTitle'),
    };
  
    const list = (Array.isArray(window.PLAYLIST) && window.PLAYLIST.length)
      ? window.PLAYLIST
      : [{ title:"theme.mp3", artist:"me", src:"/assets/audio/theme.mp3", cover:"/assets/img/cover1.jpg" }];
  
    let i = 0, seeking = false, kicked = false;
  
    const fmt = s => (!isFinite(s) ? "0:00" : `${Math.floor(s/60)}:${Math.floor(s%60).toString().padStart(2,'0')}`);
    const setLabel = () => {
      if (!els.play) return;
      els.play.textContent = A.paused ? '▶' : '❚❚';
      els.play.setAttribute('aria-label', A.paused ? 'Play' : 'Pause');
    };
  
    function load(idx){
      i = (idx + list.length) % list.length;
      const t = list[i];
      A.src = t.src;
      if (els.cover && t.cover) els.cover.src = t.cover;
      if (els.artist) els.artist.textContent = t.artist || '—';
      if (els.title)  els.title.textContent  = t.title  || '—';
      window.setNowPlaying?.(`${t.title} — ${t.artist}`);
    }
  
    function playPause(){
      // optimistic label update so UI flips instantly
      if (A.paused) {
        els.play && (els.play.textContent = '❚❚');
        A.play().catch(()=>{ /* ignore */ });
      } else {
        els.play && (els.play.textContent = '▶');
        A.pause();
      }
      // confirm with the real state next frame
      requestAnimationFrame(setLabel);
      console.log('click play/pause; paused =', A.paused);
    }
  
    function next(){
      load(i+1);
      A.play().catch(()=>{});
      requestAnimationFrame(setLabel);
    }
  
    // single autoplay kicker
    const kick = () => {
      if (!kicked){
        A.play().catch(()=>{});
        kicked = true;
      }
      setLabel();
      window.removeEventListener('click', kick);
      window.removeEventListener('keydown', kick);
    };
    window.addEventListener('click', kick);
    window.addEventListener('keydown', kick);
  
    // wire events
    els.play?.addEventListener('click', playPause);
    els.next?.addEventListener('click', next);
  
    A.addEventListener('loadedmetadata', ()=>{
      if (els.seek) els.seek.value = 0;
      if (els.time) els.time.textContent = `0:00 / ${fmt(A.duration)}`;
      setLabel();
    });
    A.addEventListener('play',  () => { console.log('audio play');  setLabel(); });
    A.addEventListener('pause', () => { console.log('audio pause'); setLabel(); });
  
    A.addEventListener('timeupdate', ()=>{
      if (els.seek && !seeking && A.duration) els.seek.value = (A.currentTime / A.duration) * 100;
      if (els.time) els.time.textContent = `${fmt(A.currentTime)} / ${fmt(A.duration)}`;
    });
    els.seek?.addEventListener('input', ()=> seeking = true);
    els.seek?.addEventListener('change', ()=>{
      if (A.duration) A.currentTime = (els.seek.value/100) * A.duration;
      seeking = false;
    });
    A.addEventListener('ended', ()=>{ next(); });
  
    // init
    load(0);
    setLabel();
  })();
  