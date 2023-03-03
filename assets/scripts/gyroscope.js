/*
  kchui.dev
  gyroscope.js
*/

let playground = document.getElementById("playground");
let container_button_start = document.getElementById("button_start_container");
let button_start = document.getElementById("button_start");
let dot = document.getElementById("dot");
let reading_alpha = document.getElementById("reading_alpha");
let reading_beta = document.getElementById("reading_beta");
let reading_gamma = document.getElementById("reading_gamma");
let position_x = 0;
let position_y = 0;
let velocity_x = 0.0;
let velocity_y = 0.0;
let rate_update = 1/60;

function initiate() {
  button_start.addEventListener("click", startGame, false);
}

function startGame() {
  container_button_start.style.display = "none";
  DeviceMotionEvent.requestPermission()
    .then(response => {
      if (response == 'granted') {
        window.addEventListener('deviceorientation', (event) => {
          // reading_alpha.innerHTML = event.alpha;
          // reading_beta.innerHTML = event.beta;
          // reading_gamma.innerHTML = event.gamma;
          velocity_x += velocity_x + event.gamma + ( rate_update * 2 );
          velocity_y += velocity_y + event.beta;
          position_x += (velocity_x * 0.5);
          if ( position_x < 0 || position_x > playground.offsetWidth ) {
            position_x = Math.max(0, Math.min(playground.offsetWidth, position_x));
            velocity_x = 0;
          }
          position_y += (velocity_y + 0.5);
          if ( position_y < 0 || position_y > playground.offsetHeight ) {
            position_y = Math.max(0, Math.min(playground.offsetHeight, position_y));
            velocity_y = 0;
          }
          dot.style.left = position_x + "px";
          dot.style.top = position_y + "px";
        });
      }
    })
    .catch(alert(error));
}

window.addEventListener("load", ()=>{
  initiate();
}, false);