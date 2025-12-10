// 🎞️ VHS Tape Wall - Click to play mystery videos

const tapes = document.querySelectorAll('.vhs-tape');
const playerModal = document.getElementById('vhsPlayer');
const playerFrame = document.getElementById('vhsFrame');
const closeBtn = document.getElementById('vhsClose');

// Click tape to open player
tapes.forEach(tape => {
  tape.addEventListener('click', () => {
    const youtubeId = tape.dataset.youtubeId;
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
