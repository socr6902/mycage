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
  