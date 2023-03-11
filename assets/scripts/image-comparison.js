/*
  kchui.dev
  image-comparison.js
*/

let images = ["a", "b"];
let text_label_default = "drag & drop or browse the image to upload it";
let text_label_drag_drop = "drag & drop the image here to upload it";
let reader = new FileReader();
let formats_allowed = ["image/png", "image/jpg", "image/jpeg"];
let image_container = document.getElementById("image_container");
let result_container = document.getElementById("result_container");
let reset_button_container = document.getElementById("reset_button_container");
let compare_button_container = document.getElementById("compare_button_container");
let table_result = document.getElementById("result_table");
let body_table_result = table_result.getElementsByTagName("tbody")[0];
let button_reset = document.getElementById("reset_button");
let button_compare = document.getElementById("compare_button");
let verification_upload = [];
let data_images = [];
let comparison;

function initiate() {
  comparison = false;

  images.forEach((image)=>{
    let container = document.getElementById("image_" + image + "_container");
    let label = document.getElementById("label_image_" + image);
    let file = document.getElementById("file_image_" + image);

    file.addEventListener("change", ()=>{
      let file_uploaded = file.files[0];
      if ( verification_upload.includes(image) == false ) {
        uploadImage(file_uploaded, image);
      }
    }, false);

    container.addEventListener("dragover", (event)=>{
      event.preventDefault();
      container.classList.add("dragged");
      label.innerText = text_label_drag_drop;
    }, false);

    container.addEventListener("dragleave", (event)=>{
      event.preventDefault();
      container.classList.remove("dragged");
      label.innerText = text_label_default;
    }, false);

    container.addEventListener("drop", (event)=>{
      event.preventDefault();
      if ( verification_upload.includes(image) == false ) {
        let file_uploaded = event.dataTransfer.files[0];
        uploadImage(file_uploaded, image);
      }
    }, false);

  });

  button_reset.addEventListener("click", reset, false);

  button_compare.addEventListener("click", compareImage, false);

  return;
}

function uploadImage(file_uploaded, image) {
  let container = document.getElementById("image_" + image + "_container");
  let label = document.getElementById("label_image_" + image);
  let file_image = document.getElementById("file_image_" + image);
  container.classList.remove("dragged");
  if ( formats_allowed.includes(file_uploaded.type.toLowerCase()) ) {
    reader.readAsDataURL(file_uploaded);
    reader.onload = ()=>{
      let data_image = {};
      data_image.image = image;
      data_image.name = file_uploaded.name;
      data_image.time_modification = file_uploaded.lastModified;
      data_image.size = file_uploaded.size;
      data_image.type = file_uploaded.type;
      let preview_image = new Image();
      data_image.data_url = reader.result;
      preview_image.src = reader.result;
      preview_image.decode()
        .then(()=>{
          preview_image.classList.add("image_previews");
          preview_image.setAttribute("id", "preview_image_" + image);
          preview_image.style.maxWidth = preview_image.naturalWidth + "px";
          label.classList.add("hidden");
          container.appendChild(preview_image);
          container.classList.add("dropped");
          data_images.push(data_image);
          if ( data_images.length == images.length ) {
            button_compare.disabled = false;
          }
          console.log(data_images);
        })
        .catch((error)=>{
          console.log(error);
        });
    }
    verification_upload.push(image);
    console.log(verification_upload);
    button_reset.disabled = false;
    return;
  } else {
    file_image.value = "";
    verification_upload.splice(verification_upload.indexOf(image), 1);
    console.log(verification_upload);
    container.classList.remove("dropped");
    label.classList.remove("hidden");
    alert("The format of the image isn't supported.");
    return false;
  }
}

function reset() {
  if ( button_reset.disabled == false ) {
    let text_reset_confirmation = "Do you really want to clear the images?";
    if ( comparison == true || confirm(text_reset_confirmation) == true ) {
      images.forEach((image)=>{
        let container = document.getElementById("image_" + image + "_container");
        let label = document.getElementById("label_image_" + image);
        let file_image = document.getElementById("file_image_" + image);
        let preview = document.getElementById("preview_image_" + image);
        if ( preview ) {
          preview.remove();
        }
        file_image.value = "";
        container.classList.remove("dragged");
        container.classList.remove("dropped");
        label.classList.remove("hidden");
      });
      // alert("The images have been cleared.");
      verification_upload = [];
      data_images = [];
      comparison = false;
      document.querySelectorAll("table#result_table tbody tr").forEach((row)=>{
        row.innerHTML = "";
      });
      image_container.classList.remove("hidden");
      result_container.classList.add("hidden");
      compare_button_container.classList.remove("hidden");
      reset_button_container.classList.remove("col_auto");
      reset_button_container.classList.add("col_3");
      button_reset.disabled = true;
      button_compare.disabled = true;
    }
  }
  return;
}

function compareImage() {
  comparison = true;
  image_container.classList.add("hidden");
  compare_button_container.classList.add("hidden");
  reset_button_container.classList.remove("col_3");
  reset_button_container.classList.add("col_auto");
  if ( data_images.length == images.length && data_images.length == verification_upload.length ) {
    data_images.forEach((data_image)=>{

      //document.getElementById("result_preview_image_" + data_image.image).src = data_image.data_url;

      let cell_image_preview_added = document.getElementById("row_image_preview").insertCell(-1);
      let preview_image = new Image();
      preview_image.src = data_image.data_url;
      preview_image.decode()
        .then(()=>{
          preview_image.classList.add("result_image_previews");
          preview_image.setAttribute("id", "result_preview_image_" + data_image.image);
          cell_image_preview_added.appendChild(preview_image);
        })
        .catch((error)=>{
          console.log(error);
        });

      // data url
      if ( data_images.indexOf(data_image) != 0 ) {
        let cell_image_data_url_added = document.getElementById("row_image_data_url").insertCell(-1);
        cell_image_data_url_added.setAttribute("colspan", 2);
        let image_data_url_label_added = document.createElement("span");
        image_data_url_label_added.classList.add("result_labels");
        image_data_url_label_added.innerText = "Data URL";
        cell_image_data_url_added.appendChild(image_data_url_label_added);
        let image_data_url_value_added = document.createElement("span");
        if ( data_image.data_url === data_images[(data_images.indexOf(data_image)) - 1].data_url) {
          image_data_url_value_added.innerText = "The images are the same.";
        } else {
          image_data_url_value_added.innerText = "The images are not the same.";
        }
        cell_image_data_url_added.appendChild(image_data_url_value_added);
      }

      // name
      let cell_image_name_added = document.getElementById("row_image_name").insertCell(-1);
      let image_name_label_added = document.createElement("span");
      image_name_label_added.classList.add("result_labels");
      image_name_label_added.innerText = "Title";
      cell_image_name_added.appendChild(image_name_label_added);
      let image_name_value_added = document.createElement("span");
      image_name_value_added.classList.add("result_values");
      image_name_value_added.innerText = data_image.name;
      cell_image_name_added.appendChild(image_name_value_added);

      // time of last modification
      let cell_image_time_modification_added = document.getElementById("row_image_time_modification").insertCell(-1);
      let image_time_modification_label_added = document.createElement("span");
      image_time_modification_label_added.classList.add("result_labels");
      image_time_modification_label_added.innerText = "Time of Last Modification";
      cell_image_time_modification_added.appendChild(image_time_modification_label_added);
      let image_time_modification_value_added = document.createElement("span");
      image_time_modification_value_added.classList.add("result_values");
      image_time_modification_milliseconds = new Date(Number(data_image.time_modification));
      image_time_modification_value_added.innerText = image_time_modification_milliseconds.toDateString() + " " + image_time_modification_milliseconds.toLocaleTimeString('en-GB', { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" });
      cell_image_time_modification_added.appendChild(image_time_modification_value_added);

      // size
      let cell_image_size_added = document.getElementById("row_image_size").insertCell(-1);
      let image_size_label_added = document.createElement("span");
      image_size_label_added.classList.add("result_labels");
      image_size_label_added.innerText = "Size";
      cell_image_size_added.appendChild(image_size_label_added);
      let image_size_value_added = document.createElement("span");
      image_size_value_added.classList.add("result_values");
      image_size_value_added.innerText = data_image.size + " byte";
      cell_image_size_added.appendChild(image_size_value_added);

      // type
      let cell_image_type_added = document.getElementById("row_image_type").insertCell(-1);
      let image_type_label_added = document.createElement("span");
      image_type_label_added.classList.add("result_labels");
      image_type_label_added.innerText = "Type";
      cell_image_type_added.appendChild(image_type_label_added);
      let image_type_value_added = document.createElement("span");
      image_type_value_added.classList.add("result_values");
      image_type_value_added.innerText = data_image.type.replace("image/", "");
      cell_image_type_added.appendChild(image_type_value_added);
    });
    result_container.classList.remove("hidden");
  }
  return;
}

window.addEventListener("load", ()=>{
  initiate();
}, false);