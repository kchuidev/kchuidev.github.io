/*
  kchui.dev
  homepage.js
*/

// display the current time
function displayCurrentTime() {
  const time = new Date();
  let time_current_display = document.getElementById("time_current_display");
  time_current_display.innerHTML = time.toDateString() + "&nbsp;" + time.toLocaleTimeString('en-GB', { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" });
  return;
}

// retrieve and store the last visit time
async function retrieveLastVisitTime() {
  let time_last_visit;

  switch (true) {
    case ( ( sessionStorage.getItem("time_last_visit") == null || sessionStorage.getItem("time_last_visit") == "N/A" ) && localStorage.getItem("time_last_visit") == null ):
      time_last_visit = "N/A";
      sessionStorage.setItem("time_last_visit", time_last_visit);
      break;
    case ( ( sessionStorage.getItem("time_last_visit") == null || sessionStorage.getItem("time_last_visit") == "N/A" ) && localStorage.getItem("time_last_visit") != null ):
      sessionStorage.setItem("time_last_visit", localStorage.getItem("time_last_visit"));
      time_last_visit = sessionStorage.getItem("time_last_visit");
      break;
    case ( sessionStorage.getItem("time_last_visit") != null && sessionStorage.getItem("time_last_visit") != "N/A" ):
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

// store Current Time
function storeCurrentTime() {
  const time = new Date();
  let value_time = time.getTime();
  localStorage.setItem("time_last_visit", value_time);
  return;
}

// clear local storage data
function clearLocalData() {
  let text_confirmation = "Do you really want to clear the local data?\nOnce the data is cleared, it can never be recovered.";
  if ( confirm(text_confirmation) == true ) {
    localStorage.clear();
    sessionStorage.clear();
    alert("All the local data related to this project has been cleared.");
    location.reload();
    return;
  }
}

window.addEventListener("load", ()=>{
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

  let button_clear_local_storage_data = document.getElementById("button_clear_data");
  button_clear_local_storage_data.addEventListener("click", clearLocalData, false);
}, false);