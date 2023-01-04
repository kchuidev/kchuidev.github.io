/*
  kchui.dev
  calculator.js
*/

let formula;
let number;
let key;
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
    buttons[i].addEventListener("mousedown", press);
    buttons[i].addEventListener("click", input);
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

function press(event) {
  event = event || window.event;
  key = event.target;
  key.classList.add("pressed");
  setTimeout(()=>{key.classList.remove("pressed");}, 200);
}

function input(event) {
  event = event || window.event;
  key = event.target;
  switch (true) {
    case (key.hasAttribute("data-digit")):
      formula += key.getAttribute("data-digit");
      number += key.getAttribute("data-digit");
      display(formula, "formula");
      display(number, "number");
      return;
    case (key.hasAttribute("data-sign")):
      switch ( key.getAttribute("data-sign") ) {
        case ( "." ):
          if ( integer != false && formula != "" ) {
            integer = false;
            formula += key.getAttribute("data-sign");
            number += key.getAttribute("data-sign");
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
            formula += key.getAttribute("data-sign");
            number = "";
            display(formula, "formula");
          }
          return;
      }
  }
}

initiate();