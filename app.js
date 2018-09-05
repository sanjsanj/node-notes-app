const fs = require("fs");
const _ = require("lodash");
const yargs = require("yargs");
const notes = require("./notes");

const titleOptions = {
  describe: "Title of note",
  demand: true,
  alias: "t",
}

const bodyOptions = {
  describe: "Body of note",
  demand: true,
  alias: "b",
}

const { title, body } = yargs
  .command("add", "Add a new note", {
    title: titleOptions,
    body: bodyOptions,
  })
  .command("list", "List all notes")
  .command("read", "Read a note", {
    title: titleOptions,
  })
  .command("remove", "Remove a note", {
    title: titleOptions,
  })
  .help()
  .argv;

const command = yargs.argv._[0];

const logNote = ({ title, body }) => {
  return `
    ---
    Title: ${title}
    Body:  ${body}
  `;
};

switch (command) {
  case "add": {
    let note = notes.addNote(title, body);
    let message = note
      ? `Success: Note added ${logNote(note)}`
      : "Error: A note with that title already exists";
    console.log(message);
    break;
  }

  case "list": {
    const allNotes = notes.getAll();
    let message = allNotes.length ? `${allNotes.map(logNote)}` : `--- No notes`;
    debugger;
    console.log(message);
    break;
  }

  case "read": {
    let note = notes.getNote(title);
    let message = note
      ? `Success: ${logNote(note)}`
      : `Error: Note "${title}" - not found`;
    console.log(message);
    break;
  }

  case "remove": {
    const noteRemoved = notes.removeNote(title);
    let message = noteRemoved
      ? `Success: Note: "${title}" - removed`
      : "Error: Note not found";
    console.log(message);
    break;
  }

  default:
    console.log("Command not found");
}
