/*
  kchui.dev
  calculator.js
*/

let formula;
let number;
let key_pressed;
let integer;
let formula_display = document.getElementById("formula");
let number_display = document.getElementById("number");
let buttons = document.getElementsByClassName("buttons");

math.config({
  number: 'BigNumber',
  precision: 64,
  epsilon: 1e-60
});

function initiate() {
  formula = "";
  number = "";
  integer = true;
  formula_display.innerHTML = "-";
  number_display.innerHTML = 0;
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("mousedown", (event)=>{
      event = event || window.event; //for Internet Explorer
      key_pressed = event.target || event.key;
      press(key_pressed);
    });
    buttons[i].addEventListener("click", (event)=>{
      event = event || window.event; //for Internet Explorer
      key_pressed = event.target || event.key;
      input(key_pressed);
    });
  }
}

function display(value, type) {
  switch (type) {
    case ("formula"):
      formula_display.innerHTML = formula;
      return;
    case ("number"):
      number_display.innerHTML = Number(value);
      // if ( integer != false ) {
      //   number_display.innerHTML = Number(value);
      // } else {
      //   number_display.innerHTML = parseFloat(value);
      // }
      return;
  }
}

// function press(event) {
//   event = event || window.event; //for Internet Explorer
//   key = event.target || event.key;
//   key.classList.add("pressed");
//   setTimeout(()=>{key.classList.remove("pressed");}, 200);
// }

function press(key_pressed) {
  key_pressed.classList.add("pressed");
  setTimeout(()=>{key_pressed.classList.remove("pressed");}, 200);
}

function input(key_pressed) {
  switch (true) {
    case (key_pressed.hasAttribute("data-digit")):
      formula += key_pressed.getAttribute("data-digit");
      number += key_pressed.getAttribute("data-digit");
      display(formula, "formula");
      display(number, "number");
      return;
    case (key_pressed.hasAttribute("data-sign")):
      switch ( key_pressed.getAttribute("data-sign") ) {
        case ( "." ):
          if ( integer != false && formula != "" ) {
            integer = false;
            formula += key_pressed.getAttribute("data-sign");
            number += key_pressed.getAttribute("data-sign");
            display(formula, "formula");
            display(number, "number");
            number_display.innerHTML += ".";
          }
          return;
        case ( "equality" ):
          if ( formula != "" ) {
            number = math.evaluate(formula);
            display(number, "number");
          }
          return;
        default:
          if ( formula != "" ) {
            integer = true;
            formula += key_pressed.getAttribute("data-sign");
            number = "";
            display(formula, "formula");
          }
          return;
      }
  }
}

initiate();

document.onkeydown = (e)=>{console.log(e);};