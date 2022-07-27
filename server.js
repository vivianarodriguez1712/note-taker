const express = require('express');
const notes = require('./db/db.json');
const fs = require('fs');
const uuid = require('./uuid/uuid')
const path = require('path');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'))

function filterByQuery(query, notesArray) {
 
    let filteredResults = notesArray;
    if (query.text) {
  
      if (typeof query.text === 'string') {
        textArray = [query.text];
      } else {
        textArray = query.text;
      }
  
      textArray.forEach(text => {
        filteredResults = filteredResults.filter(
          notes => notes.text.indexOf(text) !== -1
        );
    });
  }
   
    if (query.title) {
      filteredResults = filteredResults.filter(notes => notes.title === query.title);
    }
    if (query.text) {
      filteredResults = filteredResults.filter(notes => notes.text === query.text);
    }
    return filteredResults;
  }
  
  function findById(id, notesArray) {
    const result = notesArray.filter(notes => notes.id === id)[0];
    return result;
  }

app.get('/api/notes', (req, res) => {

fs.readFile(path.join(__dirname, "./db/db.json"), "utf8", (error, notes) => {
    if (error) {
        return console.log(error)
    }
   
    else{
        
        const previousNotes = JSON.parse(notes)
        res.json(previousNotes);
    }
    
})
});

app.get('/api/notes/:id', (req, res) => {
    const result = findById(req.params.id, notes);
    if (result) {
      res.json(result); 
     } else {
         res.send(404);
     }
  });

app.put('/api/notes/:id', (req, res) => {
    const currentNotes = req.body;
    console.log(currentNotes)
})

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"))
});

app.get("/notes", (req, res) => {
   res.sendFile(path.join(__dirname, "./public/notes.html"))
});

app.post('/api/notes', (req, res) => {

    const currentNotes = req.body;
    currentNotes.id = uuid();

    fs.readFile(path.join(__dirname, "./db/db.json"), "utf8", (error, notes) => {
        if (error) {
            return console.log(error)
        }
       
        else{
            
            const previousNotes = JSON.parse(notes)
        
        previousNotes.push(currentNotes);

        fs.writeFile(
            path.join(__dirname, './db/db.json'),
            JSON.stringify(previousNotes, null, 2), (writeerror) => 
                writeerror ? console.error(writeerror) : console.info('Notes added')
        )
    }
})

       res.json()
})  

app.listen(PORT, () => console.log(`API server now on port 3001!`));

