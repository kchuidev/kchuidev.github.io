/*
  kchui.dev
  calculator.js
*/

let formula;
let number;
let target;
let integer;
let digits = ["1","2","3","4","5","6","7","8","9","0"];
let signs = ["+","-","*","/",".","="];
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
      target = event.target || event.key;
      press(target);
    });
    buttons[i].addEventListener("click", (event)=>{
      event = event || window.event; //for Internet Explorer
      target = event.target || event.key;
      input(target);
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

function press(target) {
  target.classList.add("pressed");
  setTimeout(()=>{target.classList.remove("pressed");}, 200);
}

function input(target) {
  switch (true) {
    case (target.hasAttribute("data-digit")):
      formula += target.getAttribute("data-digit");
      number += target.getAttribute("data-digit");
      display(formula, "formula");
      display(number, "number");
      return;
    case (target.hasAttribute("data-sign")):
      switch ( target.getAttribute("data-sign") ) {
        case ( "." ):
          if ( integer != false && formula != "" ) {
            integer = false;
            formula += target.getAttribute("data-sign");
            number += target.getAttribute("data-sign");
            display(formula, "formula");
            display(number, "number");
            number_display.innerHTML += ".";
          }
          return;
        case ( "=" ):
          if ( formula != "" ) {
            number = math.evaluate(formula);
            display(number, "number");
          }
          return;
        default:
          if ( formula != "" ) {
            integer = true;
            formula += target.getAttribute("data-sign");
            number = "";
            display(formula, "formula");
          }
          return;
      }
  }
}

initiate();

document.onkeydown = (event)=>{
  switch (true) {
    case (digits.includes(event.key)):
      press(document.querySelector('[data-digit="' + event.key + '"]'));
      input(document.querySelector('[data-digit="' + event.key + '"]'));
      break;
    case (signs.includes(event.key)):
      press(document.querySelector('[data-sign="' + event.key + '"]'));
      input(document.querySelector('[data-sign="' + event.key + '"]'));
      break;
    case (event.key == "Enter"):
      press(document.querySelector('[data-sign="="]'));
      input(document.querySelector('[data-sign="="]'));
      break;
  }
};