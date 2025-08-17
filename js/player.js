/* =========================================
   Optional: "Now Playing" bridge
   (If you have an element with id="nowPlaying")
   ========================================= */
   window.setNowPlaying = (text) => {
    const el = document.getElementById('nowPlaying');
    if (el) el.textContent = text || '—';
  };
  
  /* =========================================
     Win95 Mini Player + Tracklist
     ========================================= */
  (function(){
    const DEBUG = false; // set true to see logs
  
    const A = document.getElementById('bgAudio');
    if (!A) return;
  
    const $ = id => document.getElementById(id);
    const els = {
      play:   $('hpPlay'),
      next:   $('hpNext'),
      seek:   $('hpSeek'),
      time:   $('hpTime'),      // optional
      cover:  $('hpCover'),
      artist: $('hpArtist'),
      title:  $('hpTitle'),
      list:   $('trackList'),   // <ul id="trackList" class="tracklist95"></ul>
    };
  
    // Playlist comes from /js/player-data.js
    const list = (Array.isArray(window.PLAYLIST) && window.PLAYLIST.length)
      ? window.PLAYLIST
      : [{ title:"theme.mp3", artist:"me", src:"/assets/audio/theme.mp3", cover:"/assets/img/cover1.jpg" }];
  
    let i = 0;         // current index
    let seeking = false;
    let kicked = false;
  
    const fmt = s => (!isFinite(s) ? "0:00" : `${Math.floor(s/60)}:${Math.floor(s%60).toString().padStart(2,'0')}`);
  
    function setLabel(){
      if (!els.play) return;
      els.play.textContent = A.paused ? '▶' : '❚❚';
      els.play.setAttribute('aria-label', A.paused ? 'Play' : 'Pause');
    }
  
    function renderList() {
      if (!els.list) return;
      els.list.innerHTML = list.map((t, idx) => `
        <li data-idx="${idx}" tabindex="0" aria-label="Play ${t.title} by ${t.artist}">
          <span class="num">${idx + 1}</span>
          <span class="title">${t.title || 'Untitled'}</span>
          <span class="artist">— ${t.artist || 'Unknown'}</span>
        </li>
      `).join('');
    }
  
    function highlightActive() {
      if (!els.list) return;
      els.list.querySelectorAll('li').forEach(li =>
        li.classList.toggle('active', Number(li.dataset.idx) === i)
      );
      const active = els.list.querySelector('li.active');
      if (active) active.scrollIntoView({ block: 'nearest' });
    }
  
    function load(idx){
      i = (idx + list.length) % list.length;
      const t = list[i];
      A.src = t.src;
      if (els.cover && t.cover) els.cover.src = t.cover;
      if (els.artist) els.artist.textContent = t.artist || '—';
      if (els.title)  els.title.textContent  = t.title  || '—';
      window.setNowPlaying?.(`${t.title} — ${t.artist}`);
      highlightActive();
      if (DEBUG) console.log('load()', i, t.src);
    }
  
    function playPause(){
      if (A.paused) {
        if (els.play) els.play.textContent = '❚❚'; // optimistic
        A.play().catch(()=>{});
      } else {
        if (els.play) els.play.textContent = '▶';
        A.pause();
      }
      requestAnimationFrame(setLabel);
      if (DEBUG) console.log('click play/pause; paused =', A.paused);
    }
  
    function next(){
      load(i + 1);
      A.play().catch(()=>{});
      requestAnimationFrame(setLabel);
    }
  
    // Single autoplay kicker (first user interaction)
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
  
    // === Wire controls ===
    els.play?.addEventListener('click', playPause);
    els.next?.addEventListener('click', next);
  
    // Tracklist interactions
    renderList();
    els.list?.addEventListener('click', (e) => {
      const li = e.target.closest('li[data-idx]');
      if (!li) return;
      load(Number(li.dataset.idx));
      A.play().catch(()=>{});
    });
    els.list?.addEventListener('keydown', (e) => {
      const li = e.target.closest('li[data-idx]');
      if (!li) return;
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        load(Number(li.dataset.idx));
        A.play().catch(()=>{});
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        load(i + 1); A.play().catch(()=>{});
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        load(i - 1); A.play().catch(()=>{});
      }
    });
  
    // === Audio events ===
    A.addEventListener('loadedmetadata', ()=>{
      if (els.seek) els.seek.value = 0;
      if (els.time) els.time.textContent = `0:00 / ${fmt(A.duration)}`;
      setLabel();
      if (DEBUG) console.log('loadedmetadata src:', A.currentSrc, 'duration:', A.duration);
    });
    A.addEventListener('play',  () => { if (DEBUG) console.log('audio play');  setLabel(); });
    A.addEventListener('pause', () => { if (DEBUG) console.log('audio pause'); setLabel(); });
    A.addEventListener('ended', () => { next(); });
  
    A.addEventListener('timeupdate', ()=>{
      if (els.seek && !seeking && A.duration) els.seek.value = (A.currentTime / A.duration) * 100;
      if (els.time) els.time.textContent = `${fmt(A.currentTime)} / ${fmt(A.duration)}`;
    });
  
    els.seek?.addEventListener('input', ()=> seeking = true);
    els.seek?.addEventListener('change', ()=>{
      if (A.duration) A.currentTime = (els.seek.value/100) * A.duration;
      seeking = false;
    });
  
    // === Init ===
    load(0);
    setLabel();
  })();