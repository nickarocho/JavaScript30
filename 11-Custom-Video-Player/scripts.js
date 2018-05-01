/* Get Our Elements */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

/* Build Our Functions */
function togglePlay() {
  // alternative ternary syntax to if/else below
  const method = video.paused ? 'play' : 'pause';
  video[method]();
//   if (video.paused) {
//     video.play();
//     console.log('playing')
//   } else {
//     video.pause();
//     console.log('paused')
//   }
};

function updateButton() {
  const icon = this.paused ? '►' : '| |';
  toggle.textContent = icon;
}

/* Hook Up Our Event Listeners */
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);

toggle.addEventListener('click', togglePlay);
