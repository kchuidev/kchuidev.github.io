/*
  kchui.dev
  homepage.js
*/

const time = new Date();

// display the current time
function displayCurrentTime() {
  let time_current_display = document.getElementById("time_current_display");
  time_current_display.innerHTML = time.toDateString() + "&nbsp;" + time.toLocaleTimeString('en-GB', { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" });
  return;
}

// retrieve and store the last visit time
function retrieveLastVisitTime() {
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
  return Promise.resolve(time_last_visit);
}

// display the last visit time
function displayLastVisitTime(time_last_visit) {
  let display_time_last_visit = document.getElementById("time_last_visit_display");

  if ( time_last_visit != "N/A" ) {
    time_last_visit_milliseconds = new Date(Number(time_last_visit));
    display_time_last_visit.innerHTML = time_last_visit_milliseconds.toDateString() + "&nbsp;" + time_last_visit_milliseconds.toLocaleTimeString('en-GB', { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" });
  } else {
    display_time_last_visit.innerHTML = time_last_visit;
  }
  return;
}

function storeCurrentTime() {
  let value_time = time.getTime();
  localStorage.setItem("time_last_visit", value_time);
  return;
}

setInterval(displayCurrentTime, 1000);

retrieveLastVisitTime().then(
  (time_last_visit)=>{
    displayLastVisitTime(time_last_visit);
  }
).then(
  ()=>{
    storeCurrentTime();
  }
);