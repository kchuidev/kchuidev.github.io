/*
  kchui.dev
  japanese-vocabulator.js
*/

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
let display_order = document.getElementById("display_order");
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
let button_import = document.getElementById("import_button");
let button_instructions = document.getElementById("instructions_button");
let input_import_file = document.getElementById("input_import_file");
let file_import_uploaded;
let instructions_shown;

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
    instructions_shown = true;
  } else {
    entries_registered = [];
    button_export.disabled = true;
    instructions_shown = false;
  }
  entries_stored_loaded = true;
  filter_checkboxes.forEach((c)=>{
    c.checked = true;
    c.addEventListener("change", applyFilters, false);
  });
  button_remove.disabled = true;
  button_remove.addEventListener("click", removeEntry, false);
  button_register.addEventListener("click", ()=>{
    entry_registered.word = input_word.value;
    entry_registered.furigana = input_furigana.value;
    entry_registered.type = input_type.value;
    entry_registered.meaning = input_meaning.value;
    registerEntry(entry_registered);
  }, false);
  button_export.addEventListener("click", exportEntries, false);
  button_import.addEventListener("click", importEntries, false);
  button_instructions.addEventListener("click", showInstructions, false);
  if ( instructions_shown == false ) {
    showInstructions();
  }
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

function validateInput(object_entry) {
  document.querySelectorAll("label").forEach((e) => {
    e.classList.remove("error");
  });
  switch (true) {
    case ( object_entry.word == null || object_entry.word == "" ):
      alert("単語を入力してください。");
      input_word.focus();
      document.querySelector("label[for='" + input_word.id + "']").classList.add("error");
      return false;
    case ( !/[\u3040-\u309f\u30a0-\u30ff\u4e00-\u9faf\u3400-\u4dbf]/.test(object_entry.word) ):
      alert("単語のフィールドに日本語だけ入力してください。");
      input_word.focus();
      document.querySelector("label[for='" + input_word.id + "']").classList.add("error");
      return false;
    case ( /^\s+$/.test(object_entry.word) ):
      alert("単語のフィールドにスペースだけ入力しないでください。");
      input_event.focus();
      document.querySelector("label[for='" + input_word.id + "']").classList.add("error");
      return false;
    case ( object_entry.furigana == null || object_entry.furigana == "" ):
      alert("振り仮名を入力してください。");
      input_furigana.focus();
      document.querySelector("label[for='" + input_furigana.id + "']").classList.add("error");
      return false;
    case ( !/[\u3040-\u309f\u30a0-\u30ff]/.test(object_entry.furigana) ):
      alert("振り仮名のフィールドに仮名だけ入力してください。");
      input_furigana.focus();
      document.querySelector("label[for='" + input_furigana.id + "']").classList.add("error");
      return false;
    case ( object_entry.type == null || object_entry.type == "" ):
      alert("品詞を選んでください。");
      input_type.focus();
      document.querySelector("label[for='" + input_type.id + "']").classList.add("error");
      return false;
    case ( object_entry.meaning == null || object_entry.meaning == "" ):
      alert("単語の意味を入力してください。");
      input_meaning.focus();
      document.querySelector("label[for='" + input_meaning.id + "']").classList.add("error");
      return false;
    default:
      return true;
  }
}

function registerEntry(object_entry) {
  if ( validateInput(object_entry) == true ) {
    description.classList.add("hidden");
    details.classList.remove("hidden");
    list.classList.remove("hidden");
    displayEntry(object_entry);
    entries_registered.push(object_entry);
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
  display_order.innerHTML = "";
  display_word.innerText =  "-";
  display_furigana.innerText =  "-";
  display_type.innerText =  "-";
  display_meaning.innerText =  "-";
  return;
}

function displayDetails(event) {
  clearDetails();
  let entry_targeted = event.target || event.srcElement;
  word_selected = entry_targeted.dataset.word;
  entry_targeted.classList.add("selected");
  button_remove.disabled = false;
  display_order.innerHTML = "<kaki-jun>" + entry_targeted.dataset.word + "</kaki-jun><img src='assets/images/irasutoya/job_teacher_woman.png' id='display_order_image'>";
  display_word.innerText =  entry_targeted.dataset.word;
  display_furigana.innerText =  entry_targeted.dataset.furigana;
  display_type.innerText =  types[entry_targeted.dataset.type];
  display_meaning.innerText =  entry_targeted.dataset.meaning;
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
    const time = new Date();
    let time_export = "";
    time_export += time.getFullYear().toString();
    time_export += ("0" + (time.getMonth() + 1)).slice(-2).toString();
    time_export += ("0" + time.getDate()).slice(-2).toString();
    time_export += ("0" + time.getHours()).slice(-2).toString();
    time_export += ("0" + time.getMinutes()).slice(-2).toString();
    time_export += ("0" + time.getSeconds()).slice(-2).toString();
    let content_export = "data:text/csv;charset=utf-8,";
    content_export += time_export + "\r\n";
    content_export += "***\r\n";
    content_export += "単語,振り仮名,品詞,意味\r\n";
    entries_registered.forEach((e)=>{
      let row_export = e.word + "," + e.furigana + "," + types[e.type] + "," + e.meaning;
      content_export += row_export + "\r\n";
    });
    content_export += "***\r\n";
    var URI_export = encodeURI(content_export);
    var link_export = document.createElement("a");
    link_export.setAttribute("href", URI_export);
    link_export.setAttribute("download", "list_" + time_export);
    link_export.classList.add("hidden");
    document.body.appendChild(link_export);
    link_export.click();
    return true;
  } else {
    alert("登録されている単語はありません。");
    return false;
  }
}

function importEntries() {
  input_import_file.addEventListener("change", processImportFile, false);
  input_import_file.click();
  return;
}

function processImportFile() {
  file_import_uploaded = input_import_file.files[0];
  let reader = new FileReader();
  reader.readAsText(file_import_uploaded);
  reader.onload = ()=>{
    let file_import_entries = reader.result.split("\r\n");
    switch (true) {
      case (file_import_uploaded.type != "text/csv"):
        alert("許可されるファイルの形式はcsvだけです。");
        file_import_uploaded.value = "";
        return false;
      case (isNaN(file_import_entries[0])):
        alert("アップロードされたファイルは内容が改竄されましたので、読み取られません。[0]");
        file_import_uploaded.value = "";
        return false;
      case (file_import_entries[1] != "***"):
        alert("アップロードされたファイルは内容が改竄されましたので、読み取られません。[1]");
        file_import_uploaded.value = "";
        return false;
      case (file_import_entries[2][0] != "単" || file_import_entries[2][1] != "語"):
        alert("アップロードされたファイルは内容が改竄されましたので、読み取られません。[2]");
        file_import_uploaded.value = "";
        return false;
      case (file_import_entries[(file_import_entries.length - 2)] != "***"):
        alert("アップロードされたファイルは内容が改竄されましたので、読み取られません。[-1]");
        file_import_uploaded.value = "";
        return false;
      default:
        file_import_entries.splice(0, 3);
        file_import_entries.splice((file_import_entries.length - 2), 2);
        break;
    }
    file_import_entries.forEach((entry)=>{
      let entry_component = entry.split(",");
      let entry_imported = {};
      entry_imported.word = entry_component[0];
      entry_imported.furigana = entry_component[1];
      entry_imported.type = entry_component[2][0];
      entry_imported.meaning = entry_component[3];
      registerEntry(entry_imported);
      file_import_uploaded.value = "";
    });
  }
  return;
}

function showInstructions() {
  var page_current = 0;
  let container_instructions = document.getElementById("instructions_container");
  let content_instructions = document.getElementById("instructions_content");
  let button_next = document.getElementById("next_button");
  let button_back = document.getElementById("back_button");
  let button_dismiss = document.getElementById("dismiss_button");
  let instructions_introduction = "<img src='assets/images/irasutoya/ojigi_animal_inu.png' class='instructions_images max-width_40percent'>日本語ボキャブレーターのご利用ありがとうございます。当アプリは、語彙力を高めることを目指している日本語学習者向けのアプリです。当アプリを使って、単語をためたり、漢字の書き方を理解したりできます。これから、当アプリの使い方を紹介させていただきます。";
  let instructions_input = "<img src='assets/images/japanese-vocabulator/instructions_input.png' class='instructions_images'>登録したい単語、その単語の振り仮名、品詞と意味をそれぞれのフィールドに入力して登録ボタンをクリックしてください。";
  let instructions_input_error = "<img src='assets/images/japanese-vocabulator/instructions_input_error.png' class='instructions_images'>入力した情報が不具合なら、エラーメッセージが出て、そのフィールドは赤になります。その時、エラーメッセージの指示を従って情報を再入力してください。";
  let instructions_list = "<img src='assets/images/japanese-vocabulator/instructions_list.png' class='instructions_images'>単語は登録してから、単語リストが生成します。リストの単語をクリックすると、その単語の情報と書き順が現れます。書き順の動画が終わったら、漢字や仮名をクリックすると、その漢字や仮名の動画が再生します。";
  let instructions_filter = "<img src='assets/images/japanese-vocabulator/instructions_filter.png' class='instructions_images'>単語リストのフィルターをかけって、特定の品詞に属する単語を表したり、隠したりできます。";
  let instructions_export = "<img src='assets/images/japanese-vocabulator/instructions_export.png' class='instructions_images'>エクスポートのボタンをクリックすると、全ての単語についての情報を含むcsvファイルがダウンロードできます。単語リストが空いている場合には、エクスポート機能が使用できません。";
  let instructions_import = "<img src='assets/images/japanese-vocabulator/instructions_import.png' class='instructions_images'>インポートのボタンをクリックして、前にエクスポートしたcsvファイルを選ぶと、そのcsvファイルの単語がリストに加えられます。エクスポートしたcsvファイルが改竄されれば、エクスポート機能が使用できない可能性があります。";
  let instructions_end = "<img src='assets/images/irasutoya/ojigi_animal_inu.png' class='instructions_images max-width_40percent'>使い方ガイドはここまでです。重ねて当アプリのご利用ありがとうございます。";
  let instructions_order = [instructions_introduction, instructions_input, instructions_input_error, instructions_list, instructions_filter, instructions_export, instructions_import, instructions_end];

  content_instructions.innerHTML = instructions_order[page_current];
  function navigate(direction) {
    if ( direction == "forwards" ) {
      page_current = page_current + 1;
    } else if ( direction == "backwards" ) {
      page_current = page_current - 1;
    }
    content_instructions.innerHTML = instructions_order[page_current];
    switch (true) {
      case ( page_current == (instructions_order.length - 1) ):
        button_next.classList.add("hidden");
        button_back.classList.remove("hidden");
        button_dismiss.classList.remove("hidden");
        break;
      case ( page_current == 0 ):
        button_next.classList.remove("hidden");
        button_back.classList.add("hidden");
        button_dismiss.classList.add("hidden");
        break;
      default:
        button_next.classList.remove("hidden");
        button_back.classList.remove("hidden");
        button_dismiss.classList.add("hidden");
        break;
    }
    return;
  }
  button_next.addEventListener("click", ()=>{
    navigate("forwards");
    return;
  }, false);
  button_back.addEventListener("click", ()=>{
    navigate("backwards");
    return;
  }, false);
  button_dismiss.addEventListener("click", ()=>{
    instructions_shown = true;
    container_instructions.classList.add("hidden");
    document.body.classList.remove("instructions_shown");
    return;
  }, false);
  button_next.classList.remove("hidden");
  button_back.classList.add("hidden");
  button_dismiss.classList.add("hidden");
  document.body.classList.add("instructions_shown");
  container_instructions.classList.remove("hidden");
  return;
}

window.addEventListener("load", ()=>{
  initiate();
}, false);