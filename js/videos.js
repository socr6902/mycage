const vpYouTube = document.getElementById("vpYouTube");
const vpPrev = document.getElementById("vpPrev");
const vpNext = document.getElementById("vpNext");

const vpTitle = document.getElementById("vpTitle");
const vpDesc = document.getElementById("vpDesc");

const videoList = document.getElementById("videoList");

// Video categories - organized by folder
const videoCategories = [
  {
    name: "Music",
    videos: [
      {
        title: "The 1975 — Robbers (Live at Reading Festival 2023) ",
        desc: "Live Music",
        youtubeId: "qu2QXKDNoWs"
      },
      {
        title: "Bleachers — Merry Christmas, Please Don't Call | The Tonight Show",
        desc: "Live Music",
        youtubeId: "XSsuL-Z8jqE"
      },
      {
        title: "The Goo Goo Dolls — Iris (Live in Buffalo, NY, 7/4/2004) ",
        desc: "Live Music",
        youtubeId: "_HZM0QiuUS8"
      },
      {
        title: "Bleachers — Margaret ft. Lana Del Rey",
        desc: "Music Video",
        youtubeId: "A41To7E3KSc"
      },
      {
        title: "YEBBA - My Mind | Sofar NYC",
        desc: "Music Video",
        youtubeId: "RXwE1G7_U9M"
      }
    ]
  },
  {
    name: "Cartoons",
    videos: [
      {
        title: "The Cat Came Back (2015)",
        desc: "Animated Short",
        youtubeId: "Ck0jwS0CvKk"
      },
      {
        title: "The Last Belle (2011)",
        desc: "Animated Short",
        youtubeId: "ja1sjfnfjg0"
      },
      {
        title: "To Be (2016)",
        desc: "Animated Short",
        youtubeId: "ocgFkHElzgQ"
      },
      {
        title: "Silly Symphony Hell's Bells (1929)",
        desc: "Classic Cartoon",
        youtubeId: "AvK6vOyAmSQ"
      },
      {
        title: "Trick or Treat (1956)",
        desc: "Classic Cartoon",
        youtubeId: "aSkXw1bk_NE"
      },
      {
        title: "Inside Out (2012)",
        desc: "Animated Short",
        youtubeId: "LOLFW67JWeU"
      }
    ]
  },
  {
    name: "Movie Clips",
    videos: [
      {
        title: "Brokeblack Mountain - I Wish I Knew How to Quit You",
        desc: "Movie Clip",
        youtubeId: "KVK6yLqY54w"
      },
      {
        title: "Little Women — Its No Use Jo",
        desc: "Movie Clip",
        youtubeId: "3cEg2HCl50I"
      },
      {
        title: "Dead Poets Society — Todd After Neil's Death",
        desc: "Movie Clip",
        youtubeId: "Jpjq3P47eww"
      },
      
    ]
  },
  {
    name: "Philosophy",
    videos: [
      {
        title: "Two Astrophysicicts Debate Free Will w/ Charles Liu",
        desc: "Philosophy",
        youtubeId: "LXvv6CbGg8A"
      },
      {
        title: "Hey VSauce, Does Anything Exist?",
        desc: "Philosophy",
        youtubeId: "fvpLTJX4_D8"
      }
    ]
  },
  {
    name: "Astrophysics",
    videos: [
      {
        title: "Is The Universe Made of Tiny Vibrating Strings? w/ Lara Anderson",
        desc: "Astrophysics",
        youtubeId: "fplTT3IrxDw"
      },
      {
        title: "Are We The Universe’s Way of Knowing Itself? w/ Brian Cox",
        desc: "Astrophysics",
        youtubeId: "tpWaAESy6RE"
      },
      {
        title: "Why Quantum Physics Says There's a Multiverse",
        desc: "Astrophysics",
        youtubeId: "yEjMqelVHHI"
      },
      {
        title: "Are We Programmed to Die? The Real Science of Aging",
        desc: "Astrophysics",
        youtubeId: "EYL44O--Fn8"
      }
    ]
  },
  {
    name: "Theater",
    videos: [
      {
        title: "To Be or Not To Be — Andrew Scott",
        desc: "Misc",
        youtubeId: "q6CLdCl9TB0"
      },
      {
        title: "Dostoyevsky's Notes From The Underground — Larry Cedar",
        desc: "Misc",
        youtubeId: "asp5tqDql0g"
      }
    ]
  }
];

// Flatten all videos for navigation
let allVideos = [];
videoCategories.forEach(cat => {
  cat.videos.forEach(v => {
    allVideos.push(v);
  });
});

let currentIndex = 0;

// Populate list with categories
videoList.innerHTML = '';
let videoIndex = 0;

videoCategories.forEach((category, catIndex) => {
  // Create category header
  const categoryLi = document.createElement("li");
  categoryLi.className = "category-header";
  categoryLi.style.cssText = "cursor: pointer; font-weight: bold; background: #d4d0c8; padding: 8px; border-bottom: 1px solid #808080; user-select: none;";
  categoryLi.innerHTML = `
    <span class="category-arrow" style="display: inline-block; transition: transform 0.2s;">▶</span>
    <span style="margin-left: 8px;">${category.name}</span>
    <span style="opacity: 0.6; font-size: 11px; margin-left: 8px;">(${category.videos.length})</span>
  `;
  
  // Create container for videos in this category
  const videosContainer = document.createElement("div");
  videosContainer.className = "category-videos";
  videosContainer.style.display = "none";
  
  // Add videos to container
  category.videos.forEach((v, i) => {
    const videoLi = document.createElement("li");
    const globalIndex = videoIndex;
    videoLi.innerHTML = `
      <span class="num">${videoIndex + 1}</span>
      <span class="title">${v.title}</span>
      <span class="artist">${v.desc}</span>
    `;
    videoLi.onclick = () => loadVideo(globalIndex);
    videosContainer.appendChild(videoLi);
    videoIndex++;
  });
  
  // Toggle category on click
  categoryLi.onclick = () => {
    const arrow = categoryLi.querySelector(".category-arrow");
    const isExpanded = videosContainer.style.display === "block";
    
    if (isExpanded) {
      videosContainer.style.display = "none";
      arrow.style.transform = "rotate(0deg)";
    } else {
      videosContainer.style.display = "block";
      arrow.style.transform = "rotate(90deg)";
    }
  };
  
  videoList.appendChild(categoryLi);
  videoList.appendChild(videosContainer);
});

function loadVideo(i) {
  currentIndex = i;
  const v = allVideos[i];
  
  // Force iframe reload by clearing and resetting src
  vpYouTube.src = '';
  setTimeout(() => {
    vpYouTube.src = `https://www.youtube.com/embed/${v.youtubeId}`;
  }, 50);
  
  vpTitle.textContent = v.title;
  vpDesc.textContent = v.desc;
  window.updateNotepad?.(v.title);

  // Remove active class from all video items
  const allVideoItems = videoList.querySelectorAll("li:not(.category-header)");
  allVideoItems.forEach(li => li.classList.remove("active"));
  
  // Add active class to current video
  allVideoItems[i].classList.add("active");
  
  // Make sure the category is expanded
  const categoryContainer = allVideoItems[i].parentElement;
  if (categoryContainer.style.display === "none") {
    categoryContainer.style.display = "block";
    const categoryHeader = categoryContainer.previousElementSibling;
    const arrow = categoryHeader.querySelector(".category-arrow");
    arrow.style.transform = "rotate(90deg)";
  }
}

// previous button
vpPrev.onclick = () => {
  currentIndex = (currentIndex - 1 + allVideos.length) % allVideos.length;
  loadVideo(currentIndex);
};

// next button
vpNext.onclick = () => {
  currentIndex = (currentIndex + 1) % allVideos.length;
  loadVideo(currentIndex);
};

// load first video (without autoplay)
if (allVideos.length > 0) {
  const v = allVideos[0];
  vpYouTube.src = `https://www.youtube.com/embed/${v.youtubeId}`;
  vpTitle.textContent = v.title;
  vpDesc.textContent = v.desc;
  
  // Auto-expand first category and highlight first video
  const firstCategory = videoList.querySelector(".category-videos");
  firstCategory.style.display = "block";
  const firstArrow = videoList.querySelector(".category-arrow");
  firstArrow.style.transform = "rotate(90deg)";
  const firstVideo = firstCategory.querySelector("li");
  if (firstVideo) firstVideo.classList.add("active");
}
