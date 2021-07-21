import { initializeEditPage, generateLastEdited } from "./view";
import { updateNote, removeNote } from "./notes";

const noteTitle = document.querySelector("#note-title");
const lastEdited = document.querySelector("#last-edited");
const noteBody = document.querySelector("#note-text");
const removeButton = document.querySelector("#remove-note");
const noteID = location.hash.substring(1);

initializeEditPage(noteID);

noteTitle.addEventListener("input", (e) => {
  const note = updateNote(noteID, {
    title: e.target.value,
  });
  lastEdited.textContent = generateLastEdited(note.updatedAt);
});

noteBody.addEventListener("input", (e) => {
  const note = updateNote(noteID, {
    body: e.target.value,
  });
  lastEdited.textContent = generateLastEdited(note.updatedAt);
});

removeButton.addEventListener("click", (e) => {
  removeNote(noteID);
  location.assign("/index.html");
});

window.addEventListener("storage", (e) => {
  if (e.key === "notes") {
    initializeEditPage(noteID);
  }
});
