/*
  kchui.dev
  menu.js
*/

const menu_icon = document.getElementById("menu_icon");
const navigation_menu = document.getElementById("navigation_menu");
menu_icon.addEventListener("click", menuOpen);

function menuOpen() {
  menu_icon.classList.toggle("menu-open");
  navigation_menu.classList.toggle("menu-open");
}