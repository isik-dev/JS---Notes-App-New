import { getNotes, createNotes, removeNote, updateNote } from "./notes";
import { getFilters, setFilters } from "./filters";

// console.log(getNotes());
// createNotes();
// updateNote("69d05b37-9fb1-4441-a552-fd10e17f6080", {
//   title: "this is my title",
//   body: "this is my body",
// });
// console.log(getNotes());

console.log(getFilters());
setFilters({
  searchText: "Office",
  sortBy: "byCreated",
});
console.log(getFilters());
