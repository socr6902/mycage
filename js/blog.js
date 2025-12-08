// Media notes - add your thoughts about each song/video
const MEDIA_NOTES = {
  // Music notes (use the track title as the key)
  "All Flowers In Time Bend Towards The Sun": {
    artist: "Jeff Buckley & Elizabeth Fraser",
    note: "This is love i think. This song is unreleased but was leaked after Jeffs' death against the wishes of Elizabeth. It reminds me of all the music that i'd love but will never hear. If heaven is real, there's a way for me to hear them all."
  },
  "Charlie on the MTA": {
    artist: "Kingston Trio",
    note: "Absolute pinnacle of nostalgia. It reminds me of the songs you hear in your head when you take too much Benadryl."
  },
  "Chinatown — Live at Electric Lady": {
    artist: "Bleachers ft. Bruce Springsteen",
    note: "This sounds like windchimes. I almost got 'chase every feeling' tatooed on me because of this song. Looking back, I probably should have."
  },
  "Fake Plastic Trees": {
    artist: "Radiohead",
    note: "IF I COULD BE WHO YOU WANTED, ALL THE TIME. "
  },
  "Gagging Order": {
    artist: "Radiohead",
    note: "Different from Radiohead's usual sound, i love it."
  },
  "Merry Christmas, Please Dont Call": {
    artist: "Bleachers",
    note: "I've heard it said that there is intimacy in never speaking again. I disagree. Merry Christmas, please dont call.   "
  },
  "Moon River": {
    artist: "Frank Sinatra",
    note: "You know the scene in SATC where Big and Carrie dance to this in his empty apartment? Guy was an absolute villian. "
  },
  "Nutshell": {
    artist: "Alice In Chains",
    note: "This song first introduced me to the subgenre of 'songs you would want to bleed out to'. I can see it so clearly. 10/10. "
  },

  // Video notes (use the video title as the key)
  "The Cat Came Back (2015)": {
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
  
  // Update title (always show artist for music)
  if (artist) {
    notepadTitle.textContent = `${title} — ${artist}`;
  } else {
    notepadTitle.textContent = `${title}`;
  }
  
  // Update content
  if (mediaInfo) {
    notepadContent.innerHTML = `<p>${mediaInfo.note}</p>`;
  } else {
    // No notes found
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
