// Boiler plate for express js files
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3001;
app.use(express.static('public'));

// Middleware for parsing application/json and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Helper method for generating unique ids
const uuid = require('./helpers/uuid');

// HTML GET routes
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);


// API routes
// GET route to read any notes from db
app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {  
        res.json(JSON.parse(data));
        console.info(data);
    })
});
  
// Post 
app.post('/api/notes', (req, res) => {
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

// create app.delete route


app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);

