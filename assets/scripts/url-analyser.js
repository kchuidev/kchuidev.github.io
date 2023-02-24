/*
  kchui.dev
  url-analyser.js
*/

let label_input_url = document.querySelector("label[for='input_url']");
let input_url = document.getElementById("input_url");
let button_analyse = document.getElementById("button_analyse");
let result = document.getElementById("result");
let table_result = document.getElementById("result_table");

function initiate() {
  button_analyse.addEventListener("click", ()=>{
    button_analyse.classList.add("pressed");
    setTimeout(()=>{button_analyse.classList.remove("pressed");}, 200);
    analyseURL().then(
      (url_analysed)=>{
        displayResult(url_analysed);return;
      },
      (error)=>{
        label_input_url.classList.add("error");
        alert("Please provide a valid URL.");
        console.log(error);
        return;
      }
    );
  }, false);
  return;
}

function reset() {
  url_analysed = {};
  input_url.value = null;
  table_result.removeChild(table_result.getElementsByTagName("tbody")[0]);
  let table_result_body = table_result.createTBody();
  let table_result_url_analysed_row = table_result_body.insertRow(-1);
  let table_result_url_analysed_cell = table_result_url_analysed_row.insertCell(-1);
  table_result_url_analysed_cell.setAttribute("colspan", 2);
  let table_result_url_analysed_container = document.createElement("div");
  table_result_url_analysed_container.setAttribute("id", "analysed_url_container");
  table_result_url_analysed_cell.appendChild(table_result_url_analysed_container);
  let table_result_url_analysed = document.createElement("span");
  table_result_url_analysed.setAttribute("id", "analysed_url");
  table_result_url_analysed_container.appendChild(table_result_url_analysed);

  return;
}

function analyseURL() {
  let url = new URL(input_url.value);
  let url_analysed = {};

  url_analysed.scheme = url.protocol.slice(0, -1);
  url_analysed.username = url.username;
  url_analysed.password = url.password;
  url_analysed.host = url.hostname;
  url_analysed.port = url.port;
  url_analysed.path = url.pathname;
  url_analysed.query_string = url.search.slice(1);
  url_analysed.fragment = url.hash.slice(1);

  return Promise.resolve(url_analysed);
}

function displayResult(url_analysed) {

  reset();

  let display_url_analysed = document.getElementById("analysed_url");

  let display_url_scheme = document.createElement("span");
  display_url_scheme.setAttribute("id", "display_url_scheme");
  display_url_scheme.innerHTML = url_analysed.scheme;
  display_url_analysed.appendChild(display_url_scheme);
  display_url_analysed.innerHTML += "://";

  let display_url_scheme_row = table_result.insertRow(-1);
  let display_url_scheme_cell_label = display_url_scheme_row.insertCell(-1);
  display_url_scheme_cell_label.classList.add("labels");
  display_url_scheme_cell_label.innerHTML = "scheme";
  let display_url_scheme_cell_value = display_url_scheme_row.insertCell(-1);
  display_url_scheme_cell_value.classList.add("values");
  display_url_scheme_cell_value.innerHTML = url_analysed.scheme;

  if ( url_analysed.username ) {
    let display_url_username = document.createElement("span");
    display_url_username.setAttribute("id", "display_url_username");
    display_url_username.innerHTML = url_analysed.username;
    display_url_analysed.appendChild(display_url_username);
    display_url_analysed.innerHTML += ":";

    let display_url_username_row = table_result.insertRow(-1);
    let display_url_username_cell_label = display_url_username_row.insertCell(-1);
    display_url_username_cell_label.classList.add("labels");
    display_url_username_cell_label.innerHTML = "username";
    let display_url_username_cell_value = display_url_username_row.insertCell(-1);
    display_url_username_cell_value.classList.add("values");
    display_url_username_cell_value.innerHTML = url_analysed.username;
  }

  if ( url_analysed.password ) {
    let display_url_password = document.createElement("span");
    display_url_password.setAttribute("id", "display_url_password");
    display_url_password.innerHTML = url_analysed.password;
    display_url_analysed.appendChild(display_url_password);
    display_url_analysed.innerHTML += "@";

    let display_url_password_row = table_result.insertRow(-1);
    let display_url_password_cell_label = display_url_password_row.insertCell(-1);
    display_url_password_cell_label.classList.add("labels");
    display_url_password_cell_label.innerHTML = "password";
    let display_url_password_cell_value = display_url_password_row.insertCell(-1);
    display_url_password_cell_value.classList.add("values");
    display_url_password_cell_value.innerHTML = url_analysed.password;
  }

  let display_url_host = document.createElement("span");
  display_url_host.setAttribute("id", "display_url_host");
  display_url_host.innerHTML = url_analysed.host;
  display_url_analysed.appendChild(display_url_host);

  let display_url_host_row = table_result.insertRow(-1);
  let display_url_host_cell_label = display_url_host_row.insertCell(-1);
  display_url_host_cell_label.classList.add("labels");
  display_url_host_cell_label.innerHTML = "host";
  let display_url_host_cell_value = display_url_host_row.insertCell(-1);
  display_url_host_cell_value.classList.add("values");
  display_url_host_cell_value.innerHTML = url_analysed.host;

  if ( url_analysed.port ) {
    display_url_analysed.innerHTML += ":";
    let display_url_port = document.createElement("span");
    display_url_port.setAttribute("id", "display_url_port");
    display_url_port.innerHTML = url_analysed.port;
    display_url_analysed.appendChild(display_url_port);

    let display_url_port_row = table_result.insertRow(-1);
    let display_url_port_cell_label = display_url_port_row.insertCell(-1);
    display_url_port_cell_label.classList.add("labels");
    display_url_port_cell_label.innerHTML = "port";
    let display_url_port_cell_value = display_url_port_row.insertCell(-1);
    display_url_port_cell_value.classList.add("values");
    display_url_port_cell_value.innerHTML = url_analysed.port;
  }

  let display_url_path = document.createElement("span");
  display_url_path.setAttribute("id", "display_url_path");
  display_url_path.innerHTML = url_analysed.path;
  display_url_analysed.appendChild(display_url_path);

  let display_url_path_row = table_result.insertRow(-1);
  let display_url_path_cell_label = display_url_path_row.insertCell(-1);
  display_url_path_cell_label.classList.add("labels");
  display_url_path_cell_label.innerHTML = "path";
  let display_url_path_cell_value = display_url_path_row.insertCell(-1);
  display_url_path_cell_value.classList.add("values");
  display_url_path_cell_value.innerHTML = url_analysed.path;

  if ( url_analysed.path.length > 1 ) {
    let symbol_path = "&#8627;&#xFE0E;";
    let path_segments = url_analysed.path.split("/");
    display_url_path_cell_value.innerHTML += "<br><br>";
    for ( let i = 1; i < path_segments.length; i++ ) {
      display_url_path_cell_value.innerHTML += "&nbsp;".repeat(i) + symbol_path + path_segments[i] + "<br>";
    }
  }

  if ( url_analysed.query_string ) {
    display_url_analysed.innerHTML += "?";
    let display_url_query_string = document.createElement("span");
    display_url_query_string.setAttribute("id", "display_url_query_string");
    display_url_query_string.innerHTML = url_analysed.query_string;
    display_url_analysed.appendChild(display_url_query_string);

    let display_url_query_string_row = table_result.insertRow(-1);
    let display_url_query_string_cell_label = display_url_query_string_row.insertCell(-1);
    display_url_query_string_cell_label.classList.add("labels");
    display_url_query_string_cell_label.innerHTML = "query string";
    let display_url_query_string_cell_value = display_url_query_string_row.insertCell(-1);
    display_url_query_string_cell_value.classList.add("values");
    display_url_query_string_cell_value.innerHTML = url_analysed.query_string + "<br><br>";

    let url_analysed_query_strings = url_analysed.query_string.split("&");
    url_analysed_query_strings.forEach((query_string) => {
      let query_string_label = query_string.split("=")[0];
      let query_string_value = query_string.split("=")[1];
      let query_string_label_container = document.createElement("span");
      let query_string_value_container = document.createElement("span");

      query_string_label_container.classList.add("labels");
      query_string_label_container.innerHTML = query_string_label + ":&nbsp;";
      display_url_query_string_cell_value.appendChild(query_string_label_container);

      query_string_value_container.classList.add("values");
      query_string_value_container.innerHTML = query_string_value + "<br>";
      display_url_query_string_cell_value.appendChild(query_string_value_container);
    });
  }

  if ( url_analysed.fragment ) {
    display_url_analysed.innerHTML += "#";
    let display_url_fragment = document.createElement("span");
    display_url_fragment.setAttribute("id", "display_url_fragment");
    display_url_fragment.innerHTML = url_analysed.fragment;
    display_url_analysed.appendChild(display_url_fragment);

    let display_url_fragment_row = table_result.insertRow(-1);
    let display_url_fragment_cell_label = display_url_fragment_row.insertCell(-1);
    display_url_fragment_cell_label.classList.add("labels");
    display_url_fragment_cell_label.innerHTML = "fragment";
    let display_url_fragment_cell_value = display_url_fragment_row.insertCell(-1);
    display_url_fragment_cell_value.classList.add("values");
    display_url_fragment_cell_value.innerHTML = url_analysed.fragment;
  }

  result.classList.remove("hidden");
  return;
}

window.addEventListener("load", initiate, false);