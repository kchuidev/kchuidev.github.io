/*
  kchui.dev
  tracker.js
*/

const time = new Date();
const time_value = time.getTime();
let time_last_visit;

switch (true) {
  case ( sessionStorage.getItem("time_last_visit") == null && localStorage.getItem("time_last_visit") == null ):
    time_last_visit = "N/A";
    sessionStorage.setItem("time_last_visit", time_last_visit);
    break;
  case ( sessionStorage.getItem("time_last_visit") == null && localStorage.getItem("time_last_visit") != null ):
    sessionStorage.setItem("time_last_visit", localStorage.getItem("time_last_visit"));
    time_last_visit = sessionStorage.getItem("time_last_visit");
    break;
  case ( sessionStorage.getItem("time_last_visit") != null ):
    time_last_visit = sessionStorage.getItem("time_last_visit");
    break;
}

localStorage.setItem("time_last_visit", time_value);