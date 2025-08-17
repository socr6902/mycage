// define your tracks (use local MP3s or remote URLs you have rights to)
const TRACKS = [
    { title: "opening theme", artist: "you", src: "/assets/audio/theme.mp3" },
    { title: "track one", artist: "artist", src: "/assets/audio/track1.mp3" },
    { title: "track two", artist: "artist", src: "/assets/audio/track2.mp3" },
    // add more...
  ];
  
  const audio = document.getElementById('player');
  const list  = document.getElementById('playlist');
  const playBtn = document.getElementById('play');
  const prevBtn = document.getElementById('prev');
  const nextBtn = document.getElementById('next');
  const titleEl = document.getElementById('trackTitle');
  const seek = document.getElementById('seek');
  const time = document.getElementById('time');
  
  let index = 0;
  let seeking = false;
  
  function fmt(s){
    if (!isFinite(s)) return "0:00";
    const m = Math.floor(s/60), ss = Math.floor(s%60);
    return `${m}:${ss.toString().padStart(2,'0')}`;
  }
  
  function load(i){
    index = (i + TRACKS.length) % TRACKS.length;
    const t = TRACKS[index];
    audio.src = t.src;
    titleEl.textContent = `${t.title} — ${t.artist}`;
    window.setNowPlaying?.(titleEl.textContent);
    [...list.children].forEach((li, idx) => li.classList.toggle('active', idx === index));
  }
  
  function playPause(){
    if (audio.paused) { audio.play(); playBtn.textContent = '⏸︎'; }
    else { audio.pause(); playBtn.textContent = '▶︎'; }
  }
  
  function next(){ load(index+1); audio.play().catch(()=>{}); playBtn.textContent = '⏸︎'; }
  function prev(){ load(index-1); audio.play().catch(()=>{}); playBtn.textContent = '⏸︎'; }
  
  TRACKS.forEach((t,i)=>{
    const li = document.createElement('li');
    const btn = document.createElement('button');
    btn.className = 'btn';
    btn.textContent = '▶︎';
    btn.addEventListener('click', ()=>{ load(i); audio.play().catch(()=>{}); playBtn.textContent='⏸︎'; });
    const label = document.createElement('span');
    label.textContent = `${t.title} — ${t.artist}`;
    li.append(btn,label);
    list.appendChild(li);
  });
  
  // Events
  playBtn.addEventListener('click', playPause);
  nextBtn.addEventListener('click', next);
  prevBtn.addEventListener('click', prev);
  
  audio.addEventListener('loadedmetadata', ()=>{
    seek.value = 0;
    time.textContent = `0:00 / ${fmt(audio.duration)}`;
  });
  audio.addEventListener('timeupdate', ()=>{
    if (!seeking && audio.duration) seek.value = (audio.currentTime / audio.duration) * 100;
    time.textContent = `${fmt(audio.currentTime)} / ${fmt(audio.duration)}`;
  });
  seek.addEventListener('input', ()=> seeking = true);
  seek.addEventListener('change', ()=>{
    if (audio.duration) audio.currentTime = (seek.value/100) * audio.duration;
    seeking = false;
  });
  audio.addEventListener('ended', next);
  
  // initial load + small auto-start if user came from a click
  load(0);
  document.addEventListener('click', () => {
    if (audio.paused && document.visibilityState === 'visible') {
      // only start if coming from a user interaction page load
      // keeps your “autoplay vibe” without fighting the browser
      // remove this block if you don’t want it
    }
  }, {once:true});
  