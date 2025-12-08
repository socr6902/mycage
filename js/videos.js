const vpYouTube = document.getElementById("vpYouTube");
const vpPrev = document.getElementById("vpPrev");
const vpNext = document.getElementById("vpNext");

const vpTitle = document.getElementById("vpTitle");
const vpDesc = document.getElementById("vpDesc");

const videoList = document.getElementById("videoList");

// your videos - use YouTube video IDs
const videos = [
  {
    title: "The Cat Came Back",
    desc: "Cartoon",
    youtubeId: "Ck0jwS0CvKk"
  }
  // Add more videos here
  // TIP: Videos from these sources usually allow embedding:
  // - Creative Commons licensed videos
  // - Official music videos from major labels
  // - Educational channels (TED, Crash Course, etc.)
  // - Many gaming/tech channels
  // 
  // If a video doesn't work, try finding it on the official channel
  // or look for re-uploads that allow embedding
];

let currentIndex = 0;

// populate list
videos.forEach((v, i) => {
  const li = document.createElement("li");
  li.innerHTML = `
    <span class="num">${i + 1}</span>
    <span class="title">${v.title}</span>
    <span class="artist">${v.desc}</span>
  `;
  li.onclick = () => loadVideo(i);
  videoList.appendChild(li);
});

function loadVideo(i) {
  currentIndex = i;
  const v = videos[i];
  
  // Force iframe reload by clearing and resetting src
  vpYouTube.src = '';
  setTimeout(() => {
    vpYouTube.src = `https://www.youtube.com/embed/${v.youtubeId}`;
  }, 50);
  
  vpTitle.textContent = v.title;
  vpDesc.textContent = v.desc;
  window.updateNotepad?.(v.title);

  [...videoList.children].forEach(li => li.classList.remove("active"));
  videoList.children[i].classList.add("active");
}

// previous button
vpPrev.onclick = () => {
  currentIndex = (currentIndex - 1 + videos.length) % videos.length;
  loadVideo(currentIndex);
};

// next button
vpNext.onclick = () => {
  currentIndex = (currentIndex + 1) % videos.length;
  loadVideo(currentIndex);
};

// load first video (without autoplay)
const v = videos[0];
vpYouTube.src = `https://www.youtube.com/embed/${v.youtubeId}`;
vpTitle.textContent = v.title;
vpDesc.textContent = v.desc;
videoList.children[0].classList.add("active");
