const express = require('express');
const notes = require('./db/db.json');
const fs = require('fs');
const uuid = require('./uuid/uuid')
const notesJs = require('./lib/notes')

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'))

app.get('/api/notes', (req, res) => {
   let results = notes;
   if (req.query) {
    results = filterByQuery(req.query, results);
  }
  res.json(results);
});

app.get('/api/notes/:id', (req, res) => {
    const result = findById(req.params.id, notes);
    if (result) {
      res.json(result); 
     } else {
         res.send(404);
     }
  });

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
            
            const previousNotes = JSON.parse(data)
        
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

