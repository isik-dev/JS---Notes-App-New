import moment from "moment";
import { getFilters } from "./filters";
import { getNotes, sortNotes } from "./notes";

// Generate new DOM 'p' for each new note
const generateNoteDOM = (note) => {
  const noteEl = document.createElement("a");
  const textEl = document.createElement("p");
  const statusEl = document.createElement("p");

  // Setup note text
  if (note.title.length > 0) {
    textEl.textContent = note.title;
  } else {
    textEl.textContent = "unnamed note";
  }
  textEl.classList.add("list-item__title");
  noteEl.appendChild(textEl);

  // Setup the link
  noteEl.setAttribute("href", `/edit.html#${note.id}`);
  noteEl.classList.add("list-item");

  // Setup the status message
  statusEl.textContent = generateLastEdited(note.updatedAt);
  statusEl.classList.add("list-item__subtitle");
  noteEl.appendChild(statusEl);
  return noteEl;
};

// Render application notes
const renderNotes = () => {
  const notesEl = document.querySelector("#notes");
  const filters = getFilters();
  const notes = sortNotes(filters.sortBy);
  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(filters.searchText.toLowerCase())
  );

  notesEl.innerHTML = "";

  if (filteredNotes.length > 0) {
    filteredNotes.forEach((note) => {
      notesEl.appendChild(generateNoteDOM(note));
    });
  } else {
    const emptyEl = document.createElement("p");
    emptyEl.textContent = "No notes to show";
    emptyEl.classList.add("empty-message");
    notesEl.appendChild(emptyEl);
  }
};

const initializeEditPage = (noteID) => {
  const noteTitle = document.querySelector("#note-title");
  const lastEdited = document.querySelector("#last-edited");
  const noteBody = document.querySelector("#note-text");
  const notes = getNotes();
  const note = notes.find((note) => note.id === noteID);

  if (!note) {
    location.assign("/index.html");
  }

  noteTitle.value = note.title;
  noteBody.value = note.body;
  lastEdited.textContent = generateLastEdited(note.updatedAt);
};

// Generate the last edited message
const generateLastEdited = (timestamp) =>
  `Last edited: ${moment(timestamp).fromNow()}`;

export { generateNoteDOM, renderNotes, generateLastEdited, initializeEditPage };
