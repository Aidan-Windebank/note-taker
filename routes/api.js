// API routes for saving notes to side bar, and displaying notes from sidebar
const path = require("path");
const router = require('express').Router();
const uuid = require('../helpers/uuid');
const fs = require('fs');

router.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {  
        res.json(JSON.parse(data));
        console.info(data);
    })
});
  
router.post('/api/notes', (req, res) => {
    const {title, text} = req.body;
    if (title && text) {
      const newNote = {
        title,
        text,
        id: uuid(),
    };
  
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
          console.error(err);
        } else {
          const parsedNotes = JSON.parse(data);
          parsedNotes.push(newNote);
          fs.writeFile('./db/db.json',
            JSON.stringify(parsedNotes, null, 4),
            (writeErr) =>
              writeErr
                ? console.error(writeErr)
                : console.info('Successfully updated notes!')
          );
        }
    });
  
    const response = {
        status: 'success',
        body: newNote,
    };
  
    res.status(201).json(newNote);
    } else {
    res.status(500).json('Error in posting note');
    }
});

module.exports = router