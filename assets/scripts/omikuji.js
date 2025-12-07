/*
  kchui.dev
  omikuji.js
*/

"use strict";

let omikuji_number = document.getElementById("omikuji_number");
let draw = document.getElementById("draw");

function initiate() {
  draw.addEventListener("click", ()=>{
    displayLotNumber();
  }, false);
}

function drawLot() {
  let lot_number;

  lot_number = new Promise((resolve)=>{
    const array = new Uint32Array(1);
    crypto.getRandomValues(array);
    resolve((array[0] % 100) + 1);
  });
  return lot_number;
}

async function displayLotNumber() {
  let lot_number = await drawLot();

  omikuji_number.value = lot_number;
  return;
}

window.addEventListener("load", initiate, false);