function renderNotes(notes) {
  const othersTitle = document.querySelector("#others-title");
  const pinnedTitle = document.querySelector("#pinned-title");
  const pinnedList = document.querySelector("#pinned-container");
  const notesList = document.querySelector("#others-container");
  const emptyContainer = document.querySelector(".empty-container");

  notesList.innerHTML = "";
  pinnedList.innerHTML = "";
  othersTitle.innerHTML = "";
  pinnedTitle.innerHTML = "";

  if (pinned.length > 0) {
    pinnedTitle.textContent = "PINNED";
    pinned.forEach((note) => {
      const noteEl = createNoteEl(note);
      pinnedList.append(noteEl);
    });
  }
  if (notes.length > 0) {
    const othersTitle = document.querySelector("#others-title");
    othersTitle.textContent = "OTHERS";
    notes.forEach((note) => {
      const noteEl = createNoteEl(note);
      notesList.append(noteEl);
    });
  } else if (pinned.length == 0 && notes.length == 0) {
    emptyContainer.style.display = "flex";
  }
}

function renderModal(note) {
  const modalList = document.querySelector(".modal-list");
  modalList.innerHTML = "";

  const modalEl = editNoteEl(note);
  modalList.append(modalEl);
}

function createNoteEl(note) {
  // Create elements
  const noteContainer = document.createElement("div");
  const textContainer = document.createElement("div");
  const title = document.createElement("p");
  const content = document.createElement("p");
  const actionsContainer = document.createElement("div");
  const colorButtonContainer = document.createElement("div");
  const colorButtonIcon = document.createElement("button");
  const colorButtonImg = document.createElement("img");
  const paletteContainerNote = document.createElement("div");
  const deleteButtonContainer = document.createElement("div");
  const deleteButtonIcon = document.createElement("button");
  const deleteButtonWrapper = document.createElement("div");
  const deleteButtonImg1 = document.createElement("img");
  const deleteButtonImg2 = document.createElement("img");
  const pinButtonContainer = document.createElement("div");
  const pinButtonImg = document.createElement("img");
  // Setup elements
  noteContainer.classList.add("note-container");
  if (note.color) noteContainer.classList.add(note.color);
  textContainer.className = "text-container";
  pinButtonContainer.className = "pin-container";
  title.className = "heading";
  title.textContent = note.title;
  content.textContent = note.content;
  actionsContainer.className = "flex gap-10";
  colorButtonContainer.className = "color-palette-container";
  colorButtonIcon.className = "button";
  colorButtonImg.src = "./assets/icons/color-pallete-icon.png";
  paletteContainerNote.className = "colors__container-custom";
  deleteButtonContainer.className = "color-palette-container";
  deleteButtonIcon.className = "button";
  deleteButtonWrapper.className = "trash-div";
  deleteButtonImg1.src = "./assets/icons/trash-icon-gray.png";
  deleteButtonImg2.className = "inner-image";
  deleteButtonImg2.src = "./assets/icons/trash_lines.png";

  pinButtonImg.src = note.pin
    ? "./assets/icons/pinned-icon.png"
    : "./assets/icons/others-icon.svg";
  // Build template
  noteContainer.append(textContainer, actionsContainer, pinButtonContainer);
  textContainer.append(title, content);
  actionsContainer.append(colorButtonContainer, deleteButtonContainer);
  colorButtonContainer.append(colorButtonIcon, paletteContainerNote);
  colorButtonIcon.append(colorButtonImg);
  deleteButtonContainer.append(deleteButtonIcon);
  deleteButtonIcon.append(deleteButtonWrapper);
  deleteButtonWrapper.append(deleteButtonImg2, deleteButtonImg1);
  pinButtonContainer.append(pinButtonImg);

  noteContainer.addEventListener("click", (event) => {
    var target = event.target;
    if (
      target === deleteButtonContainer ||
      deleteButtonContainer.contains(target)
    ) {
      return;
    }
    if (target === pinButtonContainer || pinButtonContainer.contains(target)) {
      return;
    }
    if (
      target === colorButtonContainer ||
      colorButtonContainer.contains(target)
    ) {
      return;
    }
    if (
      target === paletteContainerNote ||
      paletteContainerNote.contains(target)
    ) {
      return;
    }
    event.preventDefault();
    renderModal(note);
  });
  //Event Listeners
  const colorsArrayNote = createColorPalette(paletteContainerNote, colors);
  colorButtonContainer.addEventListener("click", function (event) {
    event.preventDefault();
    paletteContainerNote.classList.toggle("colors__container-custom-open");
    console.log(colorsArrayNote);
  });
  document.addEventListener("mouseup", function (event) {
    paletteContainerNote.classList.remove("colors__container-custom-open");
  });
  colorsArrayNote.forEach((colorSelected) => {
    colorSelected.addEventListener("click", function (event) {
      event.preventDefault();
      colorClaseNote = event.currentTarget.classList[1];
      editColorNote(note, colorClaseNote);
      renderNotes(notes);
      paletteContainerNote.classList.toggle("colors__container-custom-open");
    });
  });

  deleteButtonContainer.addEventListener("click", (event) => {
    event.preventDefault();

    deleteNote(note);
    renderNotes(notes);
  });

  pinButtonContainer.addEventListener("click", (event) => {
    event.preventDefault();
    if (note.pin == true) {
      unpinNote(note);
    } else {
      pinNote(note);
    }

    renderNotes(notes);
  });
  return noteContainer;
}

const form = document.querySelector(".js-form-container");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const { title, content } = event.currentTarget;
  const newNote = {
    title: title.value,
    content: content.value,
    color: colorClase,
    pin: false,
  };
  createNote(newNote);
  location.assign("/");
});

const notesCtgry = document.querySelector("#notes_ctgry");
const trashCtgry = document.querySelector("#trash_ctgry");
notesCtgry.onclick = function () {
  toogleCtgryStatus(this);
};
trashCtgry.onclick = function () {
  toogleCtgryStatus(this);
};

function toogleCtgryStatus(element) {
  document
    .querySelector(".aside__active-menu")
    .classList.remove("aside__active-menu");
  element.classList.add("aside__active-menu");
}

renderNotes(notes);

function editNoteEl(note) {
  // Edit elements
  const modalContainer = document.createElement("div");
  const modalContent = document.createElement("div");
  const formContainer = document.createElement("form");
  const textContainer = document.createElement("div");
  const title = document.createElement("input");
  const content = document.createElement("input");
  const footer = document.createElement("div");
  const actionsContainer = document.createElement("div");
  const colorButtonContainer = document.createElement("div");
  const colorButtonIcon = document.createElement("button");
  const colorButtonImg = document.createElement("img");
  const paletteContainerNote = document.createElement("div");
  const deleteButtonContainer = document.createElement("div");
  const deleteButtonIcon = document.createElement("button");
  const deleteButtonWrapper = document.createElement("div");
  const deleteButtonImg1 = document.createElement("img");
  const deleteButtonImg2 = document.createElement("img");
  const submitButtonContainer = document.createElement("div");
  const submitButtonIcon = document.createElement("button");
  // Setup elements
  modalContainer.className = "modal";
  modalContainer.style.display = "block";
  formContainer.action = "#";
  formContainer.className = "modal-content";
  modalContent.className = "modal-content";
  textContainer.className = "text-container";
  title.className = "heading";
  title.id = "title";
  title.name = "title";
  title.value = note.title;
  content.id = "content";
  content.name = "content";
  content.value = note.content;
  footer.className = "flex space-between";
  actionsContainer.className = "flex gap-10";
  colorButtonContainer.className = "color-palette-container";
  colorButtonIcon.className = "button";
  paletteContainerNote.className = "colors__container-custom-form";
  colorButtonImg.src = "./assets/icons/color-pallete-icon.png";
  deleteButtonContainer.className = "color-palette-container";
  deleteButtonIcon.className = "button";
  deleteButtonWrapper.className = "trash-div";
  deleteButtonImg1.src = "./assets/icons/trash-icon-gray.png";
  deleteButtonImg2.className = "inner-image";
  deleteButtonImg2.src = "./assets/icons/trash_lines.png";
  submitButtonContainer.className = "color-palette-container";
  submitButtonIcon.className = "button bold";
  submitButtonIcon.textContent = "Keep it!";
  submitButtonIcon.type = "submit";

  // Build template
  modalContainer.append(formContainer);
  formContainer.append(textContainer, footer);
  textContainer.append(title, content);
  footer.append(actionsContainer, submitButtonIcon);
  // actionsContainer.append(colorButtonContainer, deleteButtonContainer);
  actionsContainer.append(colorButtonContainer, deleteButtonContainer);
  colorButtonContainer.append(colorButtonIcon, paletteContainerNote);
  colorButtonIcon.append(colorButtonImg);
  deleteButtonContainer.append(deleteButtonIcon);
  deleteButtonIcon.append(deleteButtonWrapper);
  deleteButtonWrapper.append(deleteButtonImg2, deleteButtonImg1);
  console.log(note);
  const colorModalDefault = note.color.replace(/-bg/, "");
  if (colorModalDefault == "white") {
    formContainer.style.backgroundColor = "white";
    title.style.backgroundColor = "white";
    content.style.backgroundColor = "white";
  } else {
    formContainer.style.backgroundColor = `var(--${colorModalDefault})`;
    title.style.backgroundColor = `var(--${colorModalDefault})`;
    content.style.backgroundColor = `var(--${colorModalDefault})`;
  }
  //Event Listeners
  const colorsArrayNote = createColorPalette(paletteContainerNote, colors);

  colorButtonContainer.addEventListener("click", function (event) {
    event.preventDefault();
    paletteContainerNote.classList.toggle("colors__container-custom-open");
    console.log(colorArrayForm);
  });

  document.addEventListener("mouseup", function (event) {
    paletteContainerNote.classList.remove("colors__container-custom-open");
  });

  let colorClaseModal = "";
  colorsArrayNote.forEach((colorSelected) => {
    colorSelected.addEventListener("click", function (event) {
      event.preventDefault();
      colorClaseModal = event.currentTarget.classList[1];
      const colorClaseStr = colorClaseModal.replace(/-bg/, "");
      if (colorClaseStr == "white") {
        formContainer.style.backgroundColor = "white";
        title.style.backgroundColor = "white";
        content.style.backgroundColor = "white";
      } else {
        formContainer.style.backgroundColor = `var(--${colorClaseStr})`;
        title.style.backgroundColor = `var(--${colorClaseStr})`;
        content.style.backgroundColor = `var(--${colorClaseStr})`;
      }
    });
  });
  if (!colorClaseModal) colorClaseModal = note.color;

  deleteButtonContainer.addEventListener("click", (event) => {
    event.preventDefault();
    deleteNote(note);
    renderNotes(notes);
    modalContainer.style.display = "none";
  });

  formContainer.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log(note);
    const { title, content } = event.target;
    modalContainer.style.display = "none";
    const editNoteContent = {
      title: title.value,
      content: content.value,
      color: colorClaseModal,
    };
    editNote(note, editNoteContent);
    location.assign("index.html");
  });
  document.addEventListener("mouseup", function (event) {
    if (!formContainer.contains(event.target)) {
      modalContainer.style.display = "none";
    }
  });
  return modalContainer;
}
