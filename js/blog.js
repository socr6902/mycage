// Media notes - add your thoughts about each song/video
const MEDIA_NOTES = {
  // Music notes (use the track title as the key)
  "All Flowers In Time Bend Towards The Sun": {
    artist: "Jeff Buckley & Elizabeth Fraser",
    note: "This song is ethereal and haunting. The way their voices blend together is just magical. Makes me think of foggy mornings and bittersweet memories."
  },
  "Fake Plastic Trees": {
    artist: "Radiohead",
    note: "The build-up in this song always gets me. Such raw emotion. Perfect for rainy days."
  },

  // Video notes (use the video title as the key)
  "Sample Video 1": {
    note: "aesthetic clips that capture a certain vibe. Love the colors and composition."
  },
  "Sample Video 2": {
    note: "more stuff that I find interesting. Need to add more context here."
  }
};

// Global function to update notepad
window.updateNotepad = function(title, artist = null) {
  const notepadTitle = document.getElementById('notepadTitle');
  const notepadContent = document.getElementById('notepadContent');
  
  if (!notepadTitle || !notepadContent) return;

  const mediaInfo = MEDIA_NOTES[title];
  
  if (mediaInfo) {
    // Update title
    if (artist) {
      notepadTitle.textContent = `♪ ${title} — ${artist}`;
    } else {
      notepadTitle.textContent = `📹 ${title}`;
    }
    
    // Update content
    notepadContent.innerHTML = `<p>${mediaInfo.note}</p>`;
  } else {
    // No notes found
    notepadTitle.textContent = title;
    notepadContent.innerHTML = `<p style="opacity:0.6; font-style:italic;">No notes for this media yet...</p>`;
  }
};

// Original blog page list (for /blog.html if you have it)
const POSTS = [
    { file:"2025-08-01-first-post.html", title:"first post", date:"2025-08-01" },
    { file:"2025-08-10-another-post.html", title:"another post", date:"2025-08-10" },
    // add more here when you create a new post in /posts
  ];
  
  const ul = document.getElementById('postList');
  if (ul) {
    POSTS.sort((a,b)=> b.date.localeCompare(a.date)).forEach(p=>{
      const li = document.createElement('li');
      li.innerHTML = `<a href="/posts/${p.file}">${p.title}</a> <span style="margin-left:auto; font-family:monospace">${p.date}</span>`;
      ul.appendChild(li);
    });
  }
