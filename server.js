// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
var fs = require('fs');
// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get('/',(req,res)=>{
    res.sendFile('index.html');
});

app.get('/notes',(req,res)=>{
   res.sendFile(path.join(__dirname,'./public/notes.html'));
});

app.get('/api/notes', (req, res) => {
    //reading bd.json file
    var data = fs.readFileSync(path.join(__dirname, './db/db.json'));
    var jsonData = JSON.parse(data);
    console.log(jsonData);
    //return json data as response to the request
    return res.json(jsonData);
});

app.post('/api/notes',(req,res)=>{
    //new note
    var note = req.body;
    console.log(note);

    //reading db.json file
    var data = fs.readFileSync(path.join(__dirname, './db/db.json'));
    var jsonData = JSON.parse(data);
    jsonData.push(note);
    console.log(jsonData);
    console.log('appending data ');
    
    fs.writeFileSync(path.join(__dirname, './db/db.json'),JSON.stringify(jsonData));

    var data2 = fs.readFileSync(path.join(__dirname, './db/db.json'));
    var jsonData2 = JSON.parse(data2);
    console.log(jsonData2);

    //return json data as response to the request
    return res.json(note);
});

app.delete('/api/notes/:id',(req,res)=>{
    res.send('Deleting data from db.json')
});

app.listen(PORT,()=>{
    console.log(`Server is listening to the port ${PORT}`);
});
