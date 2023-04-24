/*
  kchui.dev
  japanese-vocabulator.js
*/

const time = new Date();
let entry_registered;
let word_selected;
let entries_registered;
let entries_stored = JSON.parse(localStorage.getItem("japanese-vocabulator_entries_registered"));
let entries_stored_loaded = false;
let types = {
  "名": "名詞",
  "動": "動詞",
  "形": "形容詞",
  "副": "副詞",
  "四": "四字熟語",
  "諺": "諺"
};
let filter_checkboxes = document.querySelectorAll(".filter_checkboxes");
let description = document.getElementById("description");
let details = document.getElementById("details");
let list = document.getElementById("list");
let display_word = document.getElementById("display_word");
let display_furigana = document.getElementById("display_furigana");
let display_type = document.getElementById("display_type");
let display_meaning = document.getElementById("display_meaning");
let input_word = document.getElementById("input_word");
let input_furigana = document.getElementById("input_furigana");
let input_type = document.getElementById("input_type");
let input_meaning = document.getElementById("input_meaning");
let list_entry = document.getElementById("entry_list");
let button_remove = document.getElementById("remove_button");
let button_register = document.getElementById("register_button");
let button_export = document.getElementById("export_button");

function initiate() {
  entry_registered = {};
  if ( entries_stored != null && entries_stored.length > 0 && entries_stored_loaded == false ) {
    description.classList.add("hidden");
    details.classList.remove("hidden");
    list.classList.remove("hidden");
    entries_registered = entries_stored;
    entries_registered.forEach((e)=>{
      displayEntry(e);
    });
    button_export.disabled = false;
  } else {
    entries_registered = [];
    button_export.disabled = true;
  }
  entries_stored_loaded = true;
  filter_checkboxes.forEach((c)=>{
    c.checked = true;
    c.addEventListener("change", applyFilters, false);
  });
  button_remove.disabled = true;
  button_remove.addEventListener("click", removeEntry, false);
  button_register.addEventListener("click", registerEntry, false);
  button_export.addEventListener("click", exportEntries, false);
  return;
}

function resetInput() {
  entry_registered = {};
  input_word.value = null;
  input_furigana.value = null;
  input_type.value = "";
  input_meaning.value = null;
  return;
}

function validateInput() {
  document.querySelectorAll("label").forEach((e) => {
    e.classList.remove("error");
  });
  switch (true) {
    case ( input_word.value == null || input_word.value == "" ):
      alert("単語を入力してください。");
      input_word.focus();
      document.querySelector("label[for='" + input_word.id + "']").classList.add("error");
      return false;
    case ( !/[\u3040-\u309f\u30a0-\u30ff\u4e00-\u9faf\u3400-\u4dbf]/.test(input_word.value) ):
      alert("単語のフィールドに日本語だけ入力してください。");
      input_word.focus();
      document.querySelector("label[for='" + input_word.id + "']").classList.add("error");
      return false;
    case ( /^\s+$/.test(input_word.value) ):
      alert("単語のフィールドにスペースだけ入力しないでください。");
      input_event.focus();
      document.querySelector("label[for='" + input_word.id + "']").classList.add("error");
      return false;
    case ( input_furigana.value == null || input_furigana.value == "" ):
      alert("振り仮名を入力してください。");
      input_furigana.focus();
      document.querySelector("label[for='" + input_furigana.id + "']").classList.add("error");
      return false;
    case ( !/[\u3040-\u309f\u30a0-\u30ff]/.test(input_furigana.value) ):
      alert("振り仮名のフィールドに仮名だけ入力してください。");
      input_furigana.focus();
      document.querySelector("label[for='" + input_furigana.id + "']").classList.add("error");
      return false;
    case ( input_type.value == null || input_type.value == "" ):
      alert("品詞を選んでください。");
      input_type.focus();
      document.querySelector("label[for='" + input_type.id + "']").classList.add("error");
      return false;
    case ( input_meaning.value == null || input_meaning.value == "" ):
      alert("単語の意味を入力してください。");
      input_meaning.focus();
      document.querySelector("label[for='" + input_meaning.id + "']").classList.add("error");
      return false;
    default:
      return true;
  }
}

function registerEntry() {
  if ( validateInput() == true ) {
    description.classList.add("hidden");
    details.classList.remove("hidden");
    list.classList.remove("hidden");
    entry_registered = {};
    entry_registered.word = input_word.value;
    entry_registered.furigana = input_furigana.value;
    entry_registered.type = input_type.value;
    entry_registered.meaning = input_meaning.value;
    displayEntry(entry_registered);
    entries_registered.push(entry_registered);
    localStorage.setItem("japanese-vocabulator_entries_registered", JSON.stringify(entries_registered));
    clearDetails();
    resetInput();
  }
  return;
}

function displayEntry(object_entry) {
  // add new column
  let col_added = document.createElement("div");
  col_added.classList.add("col-md_3");
  col_added.classList.add("col-sm_6");
  col_added.classList.add("col_12");
  list_entry.appendChild(col_added);

  // add entry
  let entry_added = document.createElement("div");
  entry_added.classList.add("entries");
  entry_added.innerText = object_entry.word;
  entry_added.innerText += "（" + object_entry.type + "）";
  entry_added.dataset.word = object_entry.word;
  entry_added.dataset.furigana = object_entry.furigana;
  entry_added.dataset.type = object_entry.type;
  entry_added.dataset.meaning = object_entry.meaning;
  col_added.appendChild(entry_added);
  entry_added.addEventListener("click", displayDetails, false);

  button_export.disabled = false;
  return;
}

function applyFilters(event) {
  let type_changed = event.target || event.srcElement;
  let entries_targeted = document.querySelectorAll("div[data-type='" + type_changed.dataset.type + "']");
  if ( entries_targeted.length > 0 ) {
    entries_targeted.forEach((e)=>{
      e.parentNode.classList.toggle("hidden");
    });
  }
  clearDetails();
  return;
}

function clearDetails() {
  word_selected = "";
  document.querySelectorAll(".entries").forEach((e)=>{
    e.classList.remove("selected");
  });
  button_remove.disabled = true;
  display_word.innerHTML =  "-";
  display_furigana.innerHTML =  "-";
  display_type.innerHTML =  "-";
  display_meaning.innerHTML =  "-";
  return;
}

function displayDetails(event) {
  clearDetails();
  let entry_targeted = event.target || event.srcElement;
  word_selected = entry_targeted.dataset.word;
  entry_targeted.classList.add("selected");
  button_remove.disabled = false;
  display_word.innerHTML =  entry_targeted.dataset.word;
  display_furigana.innerHTML =  entry_targeted.dataset.furigana;
  display_type.innerHTML =  types[entry_targeted.dataset.type];
  display_meaning.innerHTML =  entry_targeted.dataset.meaning;
  return;
}

function removeEntry() {
  if ( entries_registered != undefined && word_selected != "" && !button_remove.disabled ) {
    entries_registered.splice( entries_registered.findIndex((e) => e.word === word_selected), 1 );
    localStorage.setItem("japanese-vocabulator_entries_registered", JSON.stringify(entries_registered));
    list_entry.innerHTML = "";
    clearDetails();
    if ( entries_registered.length > 0 ) {
      description.classList.add("hidden");
      details.classList.remove("hidden");
      list.classList.remove("hidden");
      entries_registered.forEach((e)=>{
        displayEntry(e);
      });
      button_export.disabled = false;
    } else {
      description.classList.remove("hidden");
      details.classList.add("hidden");
      list.classList.add("hidden");
      entry_registered = {};
      entries_registered = [];
      button_export.disabled = true;
    }
    return;
  }
}

function exportEntries() {
  if ( entries_registered.length > 0 ) {
    let content_export = "data:text/csv;charset=utf-8,";
    content_export += time.toUTCString().replace(",", "") + "\r\n";
    content_export += "単語,振り仮名,品詞,意味\r\n";
    entries_registered.forEach((e)=>{
      let row_export = e.word + "," + e.furigana + "," + types[e.type] + "," + e.meaning;
      content_export += row_export + "\r\n";
    });
    var URI_export = encodeURI(content_export);
    window.open(URI_export);
    return true;
  } else {
    alert("登録されている単語はありません。");
    return false;
  }
}

window.addEventListener("load", ()=>{
  initiate();
}, false);