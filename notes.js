const fs = require("fs");

const fetchNotes = () => {
  try {
    const notesString = fs.readFileSync("notes-data.json");
    return JSON.parse(notesString);
  } catch (error) {
    return [];
  }
}

const saveNotes = (notes) => {
  fs.writeFileSync("notes-data.json", JSON.stringify(notes));
}

module.exports = {
  addNote(title, body) {
    let notes = fetchNotes();
    let note = { title, body };

    if (notes.filter(note => title === note.title).length > 0) return;

    notes.push(note);
    saveNotes(notes);
    return note;
  },

  getAll() {
    return fetchNotes();
  },

  getNote(title) {
    const note = fetchNotes().filter(note => title === note.title);
    return note[0] || ""
  },

  removeNote(title) {
    const filteredNotes = fetchNotes().filter(note => title !== note.title);
    saveNotes(filteredNotes);

    return notes.length !== filteredNotes.length
  }
};
