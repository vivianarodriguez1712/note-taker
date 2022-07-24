const express = require('express');
const notes = require('./db/db.json');
const fs = require('fs');

const PORT = process.env.PORT || 3001;
const app = express();

app.listen(PORT, () => {
    console.log(`API server now on port 3001!`);
  });

app.get('/api/notes', (req, res) =>
   res.json(notes)
);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"))
});

app.get("/notes", (req, res) => {
   res.sendFile(path.join(__dirname, "./public/notes.html"))
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public')

,app.post('/api/notes', (req, res) => {

    const currentNotes = req.body;

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
})  )
