// Sparkle trail
document.addEventListener('mousemove', e => {
    const s = document.createElement('div');
    s.className = 'sparkle';
    s.textContent = Math.random() > .5 ? '✧' : '✦';
    s.style.left = e.clientX + 'px';
    s.style.top  = e.clientY + 'px';
    document.body.appendChild(s);
    setTimeout(() => s.remove(), 400);
  });
  
  // Autoplay music on first interaction (browser-friendly)
  const bg = document.getElementById('bgAudio');
  let started = false;
  const startMusic = () => {
    if (started) return;
    bg.play().catch(()=>{}); // ignore if blocked
    started = true;
    window.removeEventListener('click', startMusic);
    window.removeEventListener('keydown', startMusic);
  };
  window.addEventListener('click', startMusic);
  window.addEventListener('keydown', startMusic);
  
  // Toggle button on home
  const toggleBtn = document.getElementById('musicToggle');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      if (bg.paused) { bg.play(); toggleBtn.textContent = '⏸︎ music off'; }
      else { bg.pause(); toggleBtn.textContent = '▶︎ music on'; }
    });
  }
  
  // Lightweight “Now Playing” hookup to the playlist when present
  window.setNowPlaying = (text) => {
    const el = document.getElementById('nowPlaying');
    if (el) el.textContent = text || '—';
  };
  