/*
  kchui.dev
  gyroscope.js
*/

let playground = document.getElementById("playground");
let gyroscope = new Gyroscope({ frequency: 60 });
let button_start = document.getElementById("button_start");
let reading_alpha = document.getElementById("reading_alpha");
let reading_beta = document.getElementById("reading_beta");
let reading_gamma = document.getElementById("reading_gamma");
reading_alpha.innerHTML = 0;
reading_beta.innerHTML = 0;
reading_gamma.innerHTML = 0;

function initiate() {
  let drawing = playground.getContext("2d");
  drawing.fillStyle = "#FFFFFF";
  drawing.fillRect(0, 0, 5, 5);
  console.log("width: " + playground.width + " & height:" + playground.height);
  button_start.addEventListener("click", startGame, false);
}

function startGame() {
  DeviceMotionEvent.requestPermission()
    .then(response => {
      if (response == 'granted') {
        window.addEventListener('deviceorientation', (event) => {
          reading_alpha.innerHTML = event.alpha;
          reading_beta.innerHTML = event.beta;
          reading_gamma.innerHTML = event.gamma;
        });
      }
    })
    .catch(alert(error));
}

window.addEventListener("load", ()=>{
  initiate();
}, false);