/*
  kchui.dev
  mode.js
*/

const parameters = new Proxy(new URLSearchParams(window.location.search), {
  get: (parameters, key) => {
    return parameters.get(key);
  }
});

let container_notification = document.getElementById("notification_container");
let container_header = document.getElementById("header_container");
let container_footer = document.getElementById("footer_container");
let container_content = document.getElementById("content_container");

switch (parameters.mode) {
  case ("showcase"):
    console.log("Showcase mode enabled.");
    container_notification.classList.add("hidden");
    container_header.classList.add("hidden");
    container_footer.classList.add("hidden");
    break;
  case("debugging"):
    console.log("Debugging mode enabled.");
    container_notification.classList.add("hidden");
    container_header.classList.add("hidden");
    container_footer.classList.add("hidden");
    container_content.classList.add("debugging");

    let container_debugging = document.createElement("div");
    container_debugging.setAttribute("id", "debugging_container");
    document.body.appendChild(container_debugging);

    let initiation_message = document.createElement("p");
    initiation_message.classList.add("debugging_messages");
    initiation_message.innerText = "Debugging mode enabled.";
    container_debugging.appendChild(initiation_message);
    window.addEventListener("error", (event)=>{
      const time = new Date();
      let error_message = document.createElement("p");
      error_message.classList.add("debugging_messages");
      error_message.innerText = "[" + time.toDateString() + " " + time.toLocaleTimeString('en-GB', { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" }) + "]" + event.message + " (" + event.filename + ":" + event.lineno + ")";
      container_debugging.appendChild(error_message);
    });
    break;
  default:
    container_notification.classList.remove("hidden");
    container_header.classList.remove("hidden");
    container_footer.classList.remove("hidden");
    container_content.classList.remove("debugging");
    break;
}