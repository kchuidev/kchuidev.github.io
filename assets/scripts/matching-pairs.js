/*
  kchui.dev
  matching-pairs.js
*/

let cards = document.querySelectorAll(".cards");
let cards_back = document.querySelectorAll(".cards_back");
let symbols = ["&#9818;&#xFE0E;", "&#9819;&#xFE0E;", "&#9820;&#xFE0E;", "&#9821;&#xFE0E;", "&#9822;&#xFE0E;", "&#9823;&#xFE0E;", "&#10021;&#xFE0E;", "&#9876;&#xFE0E;", "&#9818;&#xFE0E;", "&#9819;&#xFE0E;", "&#9820;&#xFE0E;", "&#9821;&#xFE0E;", "&#9822;&#xFE0E;", "&#9823;&#xFE0E;", "&#10021;&#xFE0E;", "&#9876;&#xFE0E;"];
let attempt;
let cards_cleared;
let time_used;
let time_passing;
let record_this;
let card_chosen_a;
let card_chosen_b;

function shuffleSymbol() {
  for (let i = 0; i < symbols.length; i++) {
    const j = Math.floor(Math.random() * (i + 1));
    [symbols[i], symbols[j]] = [symbols[j], symbols[i]];
  }
  return;
}

function assignSymbol() {
  for (let i = 0; i < symbols.length; i++) {
    cards_back[i].innerHTML = symbols[i];
  }
  return;
}

function calculateTime() {
  time_used += 1000;
  return;
}

function resetGame() {
  record_this = "";
  attempt = 0;
  cards_cleared = 0;
  time_used = 0;
  card_chosen_a = undefined;
  card_chosen_b = undefined;
  document.querySelectorAll(".cards").forEach((e)=>{
    e.classList.remove("chosen");
    e.classList.remove("cleared");
    e.classList.remove("deactivated");
  });
  setTimeout(shuffleSymbol, 100);
  setTimeout(assignSymbol, 200);
  time_passing = setInterval(calculateTime, 1000);
}

function checkVictory() {
  if ( cards_cleared == 16 && document.querySelectorAll(".cleared").length == 16 ) {
    clearInterval(time_passing);
    record_this = new Date().getTime() + "_" + time_used + "_" + attempt;
    let message_record_comparison;
    if ( record_this != compareRecord(record_this) ) {
      message_record_comparison = "\nBest Record: " + new Date(Number(compareRecord(record_this).split("_")[1])).toISOString().slice(11, 19) + " with " + Number(compareRecord(record_this).split("_")[2]) + " attempts on " + new Date(Number(compareRecord(record_this).split("_")[0])).toDateString();
    } else {
      message_record_comparison = "\nThis is your best record.";
    }
    let message_victory = "Victory!\nThis Record: " + new Date(time_used).toISOString().slice(11, 19) + " with " + attempt + " attempts" + message_record_comparison;
    alert(message_victory);
    resetGame();
  }
}

function compareRecord(record_this) {
  let record_best = localStorage.getItem("mp_record_best");
  switch (true) {
    case ( record_best == null ):
      localStorage.setItem("mp_record_best", record_this);
      return record_this;
    case ( record_best != null):
      let record_best_array = record_best.split("_");
      if ( record_best_array[1] > record_this.split("_")[1] ) {
        localStorage.setItem("mp_record_best", record_this);
        return record_this;
      } else if ( record_best_array[1] < record_this.split("_")[1] ) {
        return record_best;
      }
  }
}

function verifyAnswer(a,b) {
  attempt += 1;
  let a_pattern = document.querySelector("#" + a + " .cards_sides .cards_back").innerHTML;
  let b_pattern = document.querySelector("#" + b + " .cards_sides .cards_back").innerHTML;
  if ( a_pattern == b_pattern ) {
    cards_cleared += 2;
    document.getElementById(a).classList.add("cleared");
    document.getElementById(b).classList.add("cleared");
    checkVictory();
  }
  card_chosen_a = undefined;
  card_chosen_b = undefined;
  document.querySelectorAll(".cards").forEach((e)=>{
    if ( !e.classList.contains("cleared") ) {
      e.classList.remove("chosen");
      e.classList.remove("deactivated");
    }
  });
}

resetGame();

for (let i = 0; i < cards.length; i++) {
  cards[i].id = "card_" + (i + 1);
  cards[i].addEventListener("click", ()=>{
    if ( !cards[i].classList.contains("deactivated") ) {
      cards[i].classList.add("chosen");
      if ( card_chosen_a == undefined && card_chosen_b == undefined ) {
        card_chosen_a = cards[i].id;
      } else if ( card_chosen_a != undefined && card_chosen_b == undefined ) {
        card_chosen_b = cards[i].id;
        document.querySelectorAll(".cards").forEach((e)=>{
          e.classList.add("deactivated");
        });
        setTimeout(verifyAnswer, 600, card_chosen_a, card_chosen_b);
      }
    }
  }, false);
}
