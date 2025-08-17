// Add your favorite clips (YouTube privacy mode) or Vimeo links
const CLIPS = [
    { title: "clip one", url: "https://www.youtube-nocookie.com/embed/VIDEO_ID_1" },
    { title: "clip two", url: "https://www.youtube-nocookie.com/embed/VIDEO_ID_2" },
    // ...
  ];
  
  const grid = document.getElementById('videoGrid');
  CLIPS.forEach(c => {
    const wrap = document.createElement('div');
    wrap.innerHTML = `
      <div class="embed"><iframe src="${c.url}" title="${c.title}" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div>
      <div style="margin-top:6px; font-weight:700;">${c.title}</div>
    `;
    grid.appendChild(wrap);
  });
  