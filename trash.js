function createDeletedNoteEl(note) {
  // Create elements
  const noteContainer = document.createElement("div");
  const textContainer = document.createElement("div");
  const title = document.createElement("p");
  const content = document.createElement("p");
  const actionsContainer = document.createElement("div");
  const recoverButtonContainer = document.createElement("div");
  const recoverButtonIcon = document.createElement("button");
  const recoverButtonImg = document.createElement("img");
  const deleteButtonContainer = document.createElement("div");
  const deleteButtonIcon = document.createElement("button");
  const deleteButtonWrapper = document.createElement("div");
  const deleteButtonImg1 = document.createElement("img");
  const deleteButtonImg2 = document.createElement("img");
  // Setup elements
  noteContainer.classList.add("note-container");
  if (note.color) noteContainer.classList.add(note.color);
  noteContainer.classList.add("activeNote");
  textContainer.className = "text-container";
  title.className = "heading";
  title.textContent = note.title;
  content.textContent = note.content;
  actionsContainer.className = "flex gap-10";
  recoverButtonContainer.className = "color-palette-container";
  recoverButtonIcon.className = "button";
  recoverButtonImg.src = "./assets/icons/recover-arrow.png";
  deleteButtonContainer.className = "color-palette-container";
  deleteButtonIcon.className = "button";
  deleteButtonWrapper.className = "trash-div";
  deleteButtonImg1.src = "./assets/icons/trash-icon-gray.png";
  deleteButtonImg2.className = "inner-image";
  deleteButtonImg2.src = "./assets/icons/trash_lines.png";

  // Build template
  noteContainer.append(textContainer, actionsContainer);
  textContainer.append(title, content);
  actionsContainer.append(deleteButtonContainer, recoverButtonContainer);
  deleteButtonContainer.append(deleteButtonIcon);
  deleteButtonIcon.append(deleteButtonWrapper);
  deleteButtonWrapper.append(deleteButtonImg2, deleteButtonImg1);
  recoverButtonContainer.append(recoverButtonIcon);
  recoverButtonIcon.append(recoverButtonImg);

  //Event Listeners
  deleteButtonContainer.addEventListener("click", (event) => {
    event.preventDefault();
    deleteFromTrash(note);
    renderDeletedNotes(deleted);
  });
  recoverButtonContainer.addEventListener("click", (event) => {
    event.preventDefault();
    recoverFromTrash(note);
    renderDeletedNotes(deleted);
  });
  return noteContainer;
}

function renderDeletedNotes(notes) {
  const deletedNotesList = document.querySelector(".deleted_notes-container");
  deletedNotesList.innerHTML = "";

  notes.forEach((note) => {
    const deletedNoteEl = createDeletedNoteEl(note);
    deletedNotesList.append(deletedNoteEl);
  });
}

renderDeletedNotes(deleted);
