/*
  kchui.dev
  mode.js
*/

const parameters = new Proxy(new URLSearchParams(window.location.search), {
  get: (parameters, key) => {
    return parameters.get(key);
  }
});

switch (parameters.mode) {
  case ("showcase"):
    console.log("Showcase mode enabled.");
    let container_notification = document.getElementById("notification_container");
    let container_header = document.getElementById("header_container");
    let container_footer = document.getElementById("footer_container");
    container_notification.classList.add("hidden");
    container_header.classList.add("hidden");
    container_footer.classList.add("hidden");
    break;
}