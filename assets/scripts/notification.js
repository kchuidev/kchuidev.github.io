/*
  kchui.dev
  notification.js
*/

const launch_date = new Date("December 30, 2022");
const notification_content = "This project was launched on " + launch_date.toDateString() + ".";
const notification = document.getElementById("notification");

notification.innerHTML = notification_content;