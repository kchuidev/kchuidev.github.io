/*
  kchui.dev
  gyroscope.js
*/

let playground = document.getElementById("playground");
let gyroscope = new Gyroscope({ frequency: 60 });
let reading_x = document.getElementById("reading_x");
let reading_y = document.getElementById("reading_y");
let reading_z = document.getElementById("reading_z");

function initiate() {
  let drawing = playground.getContext("2d");
  drawing.fillStyle = "#FFFFFF";
  drawing.fillRect(0, 0, 5, 5);
  console.log("width: " + playground.width + " & height:" + playground.height);
}

gyroscope.addEventListener("reading", (e) => {
  reading_x.innerHTML = gyroscope.x;
  reading_y.innerHTML = gyroscope.y;
  reading_z.innerHTML = gyroscope.z;
});

window.addEventListener("load", ()=>{
  initiate();
  gyroscope.start();
}, false);