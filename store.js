// Data store
const initialNotes = [];

const deletedNotes = [];

const pinnedNotes = [];

//   // Adicion localStorage
const notesFromLocalStorage = JSON.parse(localStorage.getItem("notes")); //null
const notes = notesFromLocalStorage || initialNotes;
const pinnedFromLocalStorage = JSON.parse(localStorage.getItem("pinned")); //null
const pinned = pinnedFromLocalStorage || deletedNotes;
const deletedNotesFromLocalStorage = JSON.parse(
  localStorage.getItem("deleted_notes")
);
const deleted = deletedNotesFromLocalStorage || pinnedNotes;

function createNote(note) {
  notes.push(note);
  console.log(note);
  localStorage.setItem("notes", JSON.stringify(notes));
}

function editColorNote(note, colorClaseNote) {
  if (note.pin == true) {
    const index = pinned.indexOf(note);
    pinned[index].color = colorClaseNote;
    localStorage.setItem("pinned", JSON.stringify(pinned));
  } else {
    const index = notes.indexOf(note);
    notes[index].color = colorClaseNote;
    localStorage.setItem("notes", JSON.stringify(notes));
  }
}

function editNote(note, editNoteContent) {
  const index = notes.indexOf(note);
  notes[index] = editNoteContent;
  localStorage.setItem("notes", JSON.stringify(notes));
}

function deleteNote(note) {
  deleted.push(note);
  if (note.pin == true) {
    const index = pinned.indexOf(note);
    pinned.splice(index, 1);
    localStorage.setItem("pinned", JSON.stringify(pinned));
    localStorage.setItem("deleted_notes", JSON.stringify(deleted));
  } else {
    const index = notes.indexOf(note);
    notes.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    localStorage.setItem("deleted_notes", JSON.stringify(deleted));
  }
}

function deleteFromTrash(note) {
  const index = deleted.indexOf(note);
  deleted.splice(index, 1);
  localStorage.setItem("deleted_notes", JSON.stringify(deleted));
}

function recoverFromTrash(note) {
  // if (note.pin == false) {
  note.pin = false;
  notes.push(note);
  const index = deleted.indexOf(note);
  deleted.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notes));
  localStorage.setItem("deleted_notes", JSON.stringify(deleted));
  // } else {
  //   pinned.push(note);
  //   const index = deleted.indexOf(note);
  //   deleted.splice(index, 1);
  //   localStorage.setItem("pinned", JSON.stringify(pinned));
  //   localStorage.setItem("deleted_notes", JSON.stringify(deleted));
  // }
}
function pinNote(note) {
  // body
  note.pin = true;
  pinned.push(note);
  const index = notes.indexOf(note);
  notes.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notes));
  localStorage.setItem("pinned", JSON.stringify(pinned));
}

function unpinNote(note) {
  // body
  note.pin = false;
  notes.push(note);
  const index = pinned.indexOf(note);
  pinned.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notes));
  localStorage.setItem("pinned", JSON.stringify(pinned));
}
