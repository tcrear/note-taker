const fs = require('fs');
const util = require('util');

const { v4: uuidv4 } = require('uuid');
const db = require('express').Router();

db.get('/notes', (req, res) => {
  util.promisify(fs.readFile)('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

db.get('/notes/:note_id', (req, res) => {
  const noteId = req.params.note_id
  util.promisify(fs.readFile)('./db/db.json').then((data) => JSON.parse(data))
  .then((json) => {
    const result = json.filter((note) => note.note_id == noteId);
    return result.length > 0
    ? res.json(result)
    : res.json('No ID');
  });
});

db.post('/notes', (req, res) => {
 console.info(`${req.method} add note`);
  const { title, text } = req.body;
  if (title && text) {
    const newNote = {
      title,
      text,
      note_id: uuidv4(),
    };

    fs.readFile('./db/db.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      } else {
        const allTheNotes = JSON.parse(data) || [];
        console.log('----------', allTheNotes);

        allTheNotes.push(newNote);
      
      fs.writeFile('./db/db.json', 
      JSON.stringify(allTheNotes, null, 4),
      (err) =>

        err
          ? console.error(err)
          : console.log(
              `Review for ${newNote.title} has been written to JSON file`
         )
      );
    }
  });
  const response = {
    status: 'success',
    body: newNote,
  };
  console.log(response);
    res.status(201).json(response);
  } else {
    res.status(500).json('Error');
  }
});

module.exports = db;