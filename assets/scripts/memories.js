/*
  kchui.dev
  memories.js
*/

const time = new Date();
let date_earliest = time;
let event_recorded;
let events_recorded;
let events_stored = JSON.parse(localStorage.getItem("memories_events_recorded"));
let titles_stored = [];
let events_stored_loaded = false;
let graph = document.getElementById("graph");
let year_earliest = document.getElementById("earliest_year");
let year_this = document.getElementById("this_year");
let description = document.getElementById("description");
let details = document.getElementById("details");
let display_event = document.getElementById("display_event");
let display_from = document.getElementById("display_from");
let display_to = document.getElementById("display_to");
let display_day = document.getElementById("display_day");
let table_graph = document.getElementById("graph_table");
let body_table_graph = table_graph.getElementsByTagName("tbody")[0];
let removal_signs = document.querySelectorAll(".removal_signs");
let input_event = document.getElementById("input_event");
let input_from = document.getElementById("input_from");
let input_to = document.getElementById("input_to");
let button_record = document.getElementById("button_record");
let colours = ["#990000", "#007399", "#009973", "#999900", "#008040", "#994D00", "#800060"];
let index_colour = 0;

function initiate() {
  event_recorded = {};
  if ( events_stored != null && events_stored_loaded == false ) {
    if (events_stored.length > 0) {
      description.classList.add("hidden");
      details.classList.remove("hidden");
      events_recorded = events_stored;
      events_recorded.forEach((e)=>{
        titles_stored.push(e.event);
        updateYearLabel(e.from);
        displayEvent(e);
      });
      drawGraph();
    }
    events_stored_loaded = true;
  } else {
    updateYearLabel();
    events_recorded = [];
  }
  button_record.addEventListener("click", recordEvent, false);
  return;
}

function resetGraph() {
  titles_stored = [];
  date_earliest = time;
  index_colour = 0;
  table_graph.getElementsByTagName("tbody")[0].innerHTML = "";
  return;
}

function resetInput() {
  event_recorded = {};
  input_event.value = null;
  input_from.value = "2020-01-01";
  input_to.value = "2023-01-01";
  return;
}

function updateYearLabel(event_from = null) {
  if ( event_from == null ) {
    date_earliest = time;
    year_earliest.innerHTML = null;
    year_this.innerHTML = null;
  } else {
    let date_event_from = new Date(event_from);
    if ( date_event_from < date_earliest ) {
      date_earliest = date_event_from;
    }
    year_earliest.innerHTML = date_earliest.getFullYear();
    year_this.innerHTML = time.getFullYear();
  }
  return;
}

function validateInput() {
  document.querySelectorAll("label").forEach((e) => {
    e.classList.remove("error");
  });
  let date_event_to_input = new Date(input_to.value);
  switch (true) {
    case ( input_event.value == null || input_event.value == "" ):
      alert("Please provide a title for the event.");
      input_event.focus();
      document.querySelector("label[for='" + input_event.id + "']").classList.add("error");
      return false;
    case ( !/^[\w\-\s]+$/.test(input_event.value) ):
      alert("Please ensure the event title does not contain any non-alphanumeric characters.");
      input_event.focus();
      document.querySelector("label[for='" + input_event.id + "']").classList.add("error");
      return false;
    case ( /^\s+$/.test(input_event.value) ):
      alert("Please ensure the event title does not contain space only.");
      input_event.focus();
      document.querySelector("label[for='" + input_event.id + "']").classList.add("error");
      return false;
    case ( titles_stored.includes(input_event.value) ):
      alert("Please ensure the event has not been recorded before.");
      input_event.focus();
      document.querySelector("label[for='" + input_event.id + "']").classList.add("error");
      return false;
    case ( input_event.value.length > 16 ):
      alert("Please ensure the title contains no more than 16 characters.");
      input_event.focus();
      document.querySelector("label[for='" + input_event.id + "']").classList.add("error");
      return false;
    case ( input_from.value == null || input_from.value == "" ):
      alert("Please indicate when the event began.");
      input_from.focus();
      document.querySelector("label[for='" + input_from.id + "']").classList.add("error");
      return false;
    case ( input_to.value != "" && input_to.value < input_from.value ):
      alert("Please ensure the period of time is correct.");
      input_to.focus();
      document.querySelector("label[for='" + input_to.id + "']").classList.add("error");
      return false;
    case ( input_to.value != "" && date_event_to_input.getTime() > time.getTime() ):
      alert("Please ensure the event does not last beyond today.");
      input_to.focus();
      document.querySelector("label[for='" + input_to.id + "']").classList.add("error");
      return false;
    default:
      return true;
  }
}

function recordEvent() {
  if ( validateInput() == true ) {
    description.classList.add("hidden");
    details.classList.remove("hidden");
    event_recorded = {};
    event_recorded.event = input_event.value;
    event_recorded.from = input_from.value;
    event_recorded.to = input_to.value == null || input_to.value == "" ? "the present" : input_to.value;
    updateYearLabel(event_recorded.from);
    displayEvent(event_recorded);
    events_recorded.push(event_recorded);
    localStorage.setItem("memories_events_recorded", JSON.stringify(events_recorded));
    clearDetails();
    drawGraph();
    resetInput();
  }
  return;
}

function calculateDay(from, to) {
  let date_event_from = new Date(from);
  let date_event_to = to == "the present" ? time : new Date(to);
  let day = 1000 * 60 * 60 * 24;
  let period = Math.round((date_event_to.getTime() - date_event_from.getTime()) / day);
  return period;
}

function displayEvent(object_event) {
  // add new row
  let row_added = body_table_graph.insertRow(-1);
  row_added.dataset.event = object_event.event;
  // add cell for removal sign
  let cell_removal_sign_added = row_added.insertCell(-1);
  cell_removal_sign_added.classList.add("removal_sign_containers");
  let removal_sign_added = document.createElement("span");
  removal_sign_added.classList.add("removal_signs");
  removal_sign_added.dataset.event = object_event.event;
  removal_sign_added.innerHTML = "&#x292B;&#xFE0E;";
  cell_removal_sign_added.appendChild(removal_sign_added);
  removal_sign_added.addEventListener("click", removeEvent, false);
  // add cell for title
  let cell_title_added = row_added.insertCell(-1);
  cell_title_added.classList.add("title_containers");
  let title_added = document.createElement("span");
  title_added.classList.add("titles");
  title_added.dataset.event = object_event.event;
  title_added.innerHTML = object_event.event;
  cell_title_added.appendChild(title_added);
  // add cell for bar
  let cell_bar_added = row_added.insertCell(-1);
  cell_bar_added.classList.add("bar_containers");

  let bar_before_added = document.createElement("span");
  bar_before_added.classList.add("bars_before");
  bar_before_added.dataset.event = object_event.event;
  cell_bar_added.appendChild(bar_before_added);

  let bar_added = document.createElement("span");
  bar_added.classList.add("bars");
  bar_added.dataset.event = object_event.event;
  bar_added.dataset.day = calculateDay(object_event.from, object_event.to);
  bar_added.dataset.from = object_event.from;
  let time_to = object_event.to == null || object_event.to == "" ? "the present" : object_event.to;
  bar_added.dataset.to = time_to;
  cell_bar_added.appendChild(bar_added);
  bar_added.addEventListener("mouseover", displayDetails, false);
  bar_added.addEventListener("click", displayDetails, false);

  let bar_after_added = document.createElement("span");
  bar_after_added.classList.add("bars_after");
  bar_after_added.dataset.event = object_event.event;
  cell_bar_added.appendChild(bar_after_added);

  return;
}

function drawGraph() {
  let bars = document.querySelectorAll(".bars");
  bars.forEach((e)=>{
    // determine width and position
    e.style.width = "100%";
    let date_event_from = new Date(e.dataset.from);
    let date_event_to = e.dataset.to == "the present" ? time : new Date(e.dataset.to);
    document.querySelector(".bars_before[data-event='" + e.dataset.event + "']").style.width = ( ( date_event_from.getTime() - date_earliest.getTime() ) / ( time.getTime() - date_earliest.getTime() ) * 100 ) + "%";
    document.querySelector(".bars_after[data-event='" + e.dataset.event + "']").style.width = ( ( time.getTime() - date_event_to.getTime() ) / ( time.getTime() - date_earliest.getTime() ) * 100 ) + "%";
    // determine colour
    if ( index_colour > 6 ) {
      index_colour = 0;
    }
    e.style.backgroundColor = colours[index_colour];
    index_colour += 1;
  });
  return;
}

function clearDetails() {
  display_event.innerHTML =  "-";
  display_from.innerHTML =  "-";
  display_to.innerHTML =  "-";
  display_day.innerHTML =  "-";
  return;
}

function displayDetails(event) {
  let event_targeted = event.target || event.srcElement;
  display_event.innerHTML =  event_targeted.dataset.event;
  display_from.innerHTML =  event_targeted.dataset.from;
  display_to.innerHTML =  event_targeted.dataset.to;
  display_day.innerHTML =  event_targeted.dataset.day;
  return;
}

function removeEvent(event) {
  let removal_sign_targeted = event.target || event.srcElement;
  let title_event_targeted = removal_sign_targeted.dataset.event;
  events_recorded.splice( events_recorded.findIndex((e) => e.event === title_event_targeted), 1 );
  localStorage.setItem("memories_events_recorded", JSON.stringify(events_recorded));
  clearDetails();
  resetGraph();
  if ( events_recorded.length > 0 ) {
    description.classList.add("hidden");
    details.classList.remove("hidden");
    events_recorded.forEach((e)=>{
      titles_stored.push(e.event);
      updateYearLabel(e.from);
      displayEvent(e);
    });
    drawGraph();
  } else {
    description.classList.remove("hidden");
    details.classList.add("hidden");
    updateYearLabel();
    event_recorded = {};
    events_recorded = [];
  }
  return;
}

initiate();