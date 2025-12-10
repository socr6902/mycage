// 🎞️ VHS Tape Wall - Click play button to open mystery videos

const playButtons = document.querySelectorAll('.vhs-play-btn');
const playerModal = document.getElementById('vhsPlayer');
const playerFrame = document.getElementById('vhsFrame');
const closeBtn = document.getElementById('vhsClose');

// Click play button to open player
playButtons.forEach(button => {
  button.addEventListener('click', () => {
    const youtubeId = button.dataset.youtubeId;
    const embedUrl = `https://www.youtube.com/embed/${youtubeId}?autoplay=1`;
    
    playerFrame.src = embedUrl;
    playerModal.classList.remove('hidden');
  });
});

// Close player
function closePlayer() {
  playerModal.classList.add('hidden');
  playerFrame.src = ''; // Stop video
}

closeBtn.addEventListener('click', closePlayer);

// Click outside to close
playerModal.addEventListener('click', (e) => {
  if (e.target === playerModal) {
    closePlayer();
  }
});

// ESC key to close
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !playerModal.classList.contains('hidden')) {
    closePlayer();
  }
});
