/*
  kchui.dev
  who-is-this.js
*/

let cards = document.querySelectorAll(".cards");
let cards_front = document.querySelectorAll(".cards_front");
let cards_back = document.querySelectorAll(".cards_back");
let pop_up = document.querySelector("#pop-up");
let pop_up_text = document.querySelector("#pop-up_text");
let members = ["アニー", "いつき", "いのり", "ウ", "かおる", "カク", "gan", "ケーシー", "シャー", "シュ", "ナン", "ネム", "pamu", "bita", "putra", "bosen", "まさゆき", "マチュ", "マヤ", "mingyu", "せんせい"];
let attempt;
let cards_cleared;
let time_used;
let time_passing;
let record_this;
let card_chosen_a;
let card_chosen_b;

async function reorderArray(array) {
  let array_reordered = array;
  for (let i = 0; i < array_reordered.length; i++) {
    const j = Math.floor(Math.random() * (i + 1));
    [array_reordered[i], array_reordered[j]] = [array_reordered[j], array_reordered[i]];
  }
  return Promise.resolve(array_reordered);
}

function assignMembers() {
  reorderArray(members).then(
    (members_reordered)=>{
      let members_trimmed = members_reordered.slice(0, 8);
      reorderArray(members_trimmed).then(
        (members_trimmed_reordered_once)=>{
          for (let i = 0; i < 8; i++) {
            if ( !cards_back[i].classList.contains("assigned") ) {
              switch (members_trimmed_reordered_once[i]) {
                case("gan"):
                  cards_back[i].dataset.member = "ガン";
                  break;
                case("pamu"):
                  cards_back[i].dataset.member = "パーム";
                  break;
                case("bita"):
                  cards_back[i].dataset.member = "ビター";
                  break;
                case("putra"):
                  cards_back[i].dataset.member = "プトラ";
                  break;
                case("bosen"):
                  cards_back[i].dataset.member = "ボースン";
                  break;
                case("mingyu"):
                  cards_back[i].dataset.member = "ミンギュ";
                  break;
                default:
                  cards_back[i].dataset.member = members_trimmed_reordered_once[i];
                  break;
              }
              // cards_back[i].innerHTML = "<img src='/assets/images/who-is-this/avatars/" + members_trimmed_reordered_once[i] + ".JPG' class='avatars'>";
              let avatar_image_added = document.createElement("img");
              avatar_image_added.setAttribute("src", "/assets/images/who-is-this/avatars/" + members_trimmed_reordered_once[i] + ".JPG");
              avatar_image_added.classList.add("avatars");
              cards_back[i].appendChild(avatar_image_added);
              cards_back[i].classList.add("assigned");
            }
          }
          reorderArray(members_trimmed_reordered_once).then(
            (members_trimmed_reordered_twice)=>{
              for (let i = 8; i < 16; i++) {
                let index_members_trimmed_reordered_twice = Number( i - 8 );
                if ( !cards_back[i].classList.contains("assigned") ) {
                  cards_back[i].dataset.member = members_trimmed_reordered_twice[index_members_trimmed_reordered_twice];

                  switch (members_trimmed_reordered_twice[index_members_trimmed_reordered_twice]) {
                    case("gan"):
                      cards_back[i].dataset.member = "ガン";
                      //cards_back[i].innerHTML = "<p class='names'>ガン</p>";
                      var name_added = document.createElement("p");
                      name_added.innerText = "ガン";
                      name_added.classList.add("names");
                      cards_back[i].appendChild(name_added);
                      break;
                    case("pamu"):
                      cards_back[i].dataset.member = "パーム";
                      //cards_back[i].innerHTML = "<p class='names'>パーム</p>";
                      var name_added = document.createElement("p");
                      name_added.innerText = "パーム";
                      name_added.classList.add("names");
                      cards_back[i].appendChild(name_added);
                      break;
                    case("bita"):
                      cards_back[i].dataset.member = "ビター";
                      //cards_back[i].innerHTML = "<p class='names'>ビター</p>";
                      var name_added = document.createElement("p");
                      name_added.innerText = "ビター";
                      name_added.classList.add("names");
                      cards_back[i].appendChild(name_added);
                      break;
                    case("putra"):
                      cards_back[i].dataset.member = "プトラ";
                      //cards_back[i].innerHTML = "<p class='names'>プトラ</p>";
                      var name_added = document.createElement("p");
                      name_added.innerText = "プトラ";
                      name_added.classList.add("names");
                      cards_back[i].appendChild(name_added);
                      break;
                    case("bosen"):
                      cards_back[i].dataset.member = "ボースン";
                      //cards_back[i].innerHTML = "<p class='names'>ボースン</p>";
                      var name_added = document.createElement("p");
                      name_added.innerText = "ボースン";
                      name_added.classList.add("names");
                      cards_back[i].appendChild(name_added);
                      break;
                    case("mingyu"):
                      cards_back[i].dataset.member = "ミンギュ";
                      //cards_back[i].innerHTML = "<p class='names'>ミンギュ</p>";
                      var name_added = document.createElement("p");
                      name_added.innerText = "ミンギュ";
                      name_added.classList.add("names");
                      cards_back[i].appendChild(name_added);
                      break;
                    default:
                      cards_back[i].dataset.member = members_trimmed_reordered_twice[index_members_trimmed_reordered_twice];
                      //cards_back[i].innerHTML = "<p class='names'>" + members_trimmed_reordered_twice[index_members_trimmed_reordered_twice] + "</p>";
                      var name_added = document.createElement("p");
                      name_added.innerText = members_trimmed_reordered_twice[index_members_trimmed_reordered_twice];
                      name_added.classList.add("names");
                      cards_back[i].appendChild(name_added);
                      break;
                  }
                  cards_back[i].classList.add("assigned");
                }
              }
              let cards_container = document.querySelector("#cards_container");
              for (let i = cards_container.children.length; i >= 0; i--) {
                cards_container.appendChild(cards_container.children[Math.random() * i | 0]);
              }
            }
          );
          return;
        },
        (error)=>{
          console.log(error);
          return;
        }
      );
    }
  );
  return new Promise((resolve)=>{setTimeout(resolve,1);});
}

function calculateTime() {
  time_used += 1000;
  return;
}

async function resetGame() {
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
  document.querySelectorAll(".cards_back").forEach((e)=>{
    e.innerHTML = "";
    e.classList.remove("assigned");
  });
  await assignMembers();
  time_passing = setInterval(calculateTime, 1000);
  return;
}

function initiate() {
  for (let i = 0; i < cards.length; i++) {
    cards[i].id = "card_" + (i + 1);
    cards[i].addEventListener("click", ()=>{
      if ( !cards[i].classList.contains("deactivated") ) {
        cards[i].classList.add("chosen");
        if ( card_chosen_a == undefined && card_chosen_b == undefined ) {
          card_chosen_a = cards[i].id;
        } else if ( card_chosen_a != undefined && card_chosen_b == undefined && cards[i].id != card_chosen_a ) {
          card_chosen_b = cards[i].id;
          document.querySelectorAll(".cards").forEach((e)=>{
            e.classList.add("deactivated");
          });
          setTimeout(verifyAnswer, 600, card_chosen_a, card_chosen_b);
        }
      }
    }, false);
  }
  return;
}

async function checkVictory() {
  if ( cards_cleared == 16 && document.querySelectorAll(".cleared").length == 16 ) {
    clearInterval(time_passing);
    record_this = new Date().getTime() + "_" + time_used + "_" + attempt;
    let message_victory = "おめでとう！\nかかった時間： " + new Date(time_used).toISOString().slice(11, 19);
    let message_victory_display = setTimeout( ()=>{
      alert(message_victory);
    } , 500);
    await resetGame();
  }
  return;
}

function verifyAnswer(a,b) {
  attempt += 1;
  let answer_a = document.querySelector("#" + a + " .cards_sides .cards_back").dataset.member;
  let answer_b = document.querySelector("#" + b + " .cards_sides .cards_back").dataset.member;
  if ( answer_a == answer_b ) {
    cards_cleared += 2;
    document.getElementById(a).classList.add("cleared");
    document.getElementById(b).classList.add("cleared");
    pop_up_text.innerText = answer_a;
    pop_up.classList.remove("hidden");
    let pop_up_removal = setTimeout( ()=>{
      pop_up.classList.add("hidden");
    } , 1000);
    switch (answer_a) {
      case("ガン"):
        var member_name = "gan";
        break;
      case("パーム"):
        var member_name = "pamu";
        break;
      case("ビター"):
        var member_name = "bita";
        break;
      case("プトラ"):
      var member_name = "putra";
        break;
      case("ボースン"):
        var member_name = "bosen";
        break;
      case("ミンギュ"):
        var member_name = "mingyu";
        break;
      default:
        var member_name = answer_a;
        break;
    }
    let audio_member_name = new Audio("/assets/audio/who-is-this/" + member_name + ".mp3");
    audio_member_name.play();
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
  return;
}

window.addEventListener("load", ()=>{
  resetGame();
  initiate();
}, false);