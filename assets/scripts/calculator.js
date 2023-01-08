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
let signs_operators = ["+","-","*","/"];
let functions = ["ce", "ac"];
let formula_display = document.getElementById("formula");
let number_display = document.getElementById("number");
let buttons = document.getElementsByClassName("buttons");
let event_listeners_added = false;
let formula_calculated = false;

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
  if ( event_listeners_added == false ) {
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
  event_listeners_added = true;
  formula_calculated = false;
}

function display(value, type) {
  switch (type) {
    case ("formula"):
      formula_display.innerHTML = formula;
      return;
    case ("number"):
      number_display.innerHTML = Number(value);
      return;
  }
}

function press(target) {
  target.classList.add("pressed");
  setTimeout(()=>{target.classList.remove("pressed");}, 200);
}

function input(target) {
  switch (true) {
    case (target.hasAttribute("data-digit")):
      if ( formula_calculated != true ) {
        formula += target.getAttribute("data-digit");
        number += target.getAttribute("data-digit");
        display(formula, "formula");
        display(number, "number");
      } else {
        initiate();
        formula += target.getAttribute("data-digit");
        number += target.getAttribute("data-digit");
        display(formula, "formula");
        display(number, "number");
        formula_calculated = false;
      }
      return;
    case (target.hasAttribute("data-sign")):
      switch ( target.getAttribute("data-sign") ) {
        case ( "." ):
          if ( integer != false && formula != "" && !signs.includes(formula.slice(-1)) && formula_calculated != true ) {
            integer = false;
            formula += target.getAttribute("data-sign");
            number += target.getAttribute("data-sign");
            display(formula, "formula");
            display(number, "number");
            number_display.innerHTML += ".";
          }
          return;
        case ( "=" ):
          if ( formula != "" && !signs.includes(formula.slice(-1)) ) {
            number = math.evaluate(formula);
            display(number, "number");
            formula_calculated = true;
          }
          return;
        default:
          if ( formula_calculated != true ) {
            if ( formula != "" ) {
              integer = true;
              formula += target.getAttribute("data-sign");
              number = "";
              display(formula, "formula");
              formula_calculated = false;
            }
          } else {
            if ( number != "" ) {
              integer = true;
              formula = number + target.getAttribute("data-sign");
              number = "";
              display(formula, "formula");
              formula_calculated = false;
            }
          }
          return;
      }
    case (target.hasAttribute("data-function")):
      switch ( target.getAttribute("data-function") ) {
        case ( "ac" ):
          initiate();
          return;
        case ( "ce" ):
          if ( formula != "" ) {
            let position_last_sign = 0;
            signs_operators.forEach((e)=>{
              if ( formula.lastIndexOf(e) > position_last_sign ) {
                position_last_sign = formula.lastIndexOf(e);
              } 
            });
            if ( position_last_sign == 0 ) {
              initiate();
            } else {
              number = "";
              formula = formula.slice(0, position_last_sign + 1);
              display(formula, "formula");
              display(number, "number");
              formula_calculated = false;
            }
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