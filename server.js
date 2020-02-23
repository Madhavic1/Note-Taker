const express = require('express');
const path = require('path');
const fs = require('fs');
const port = 8080;
const app = express();

/***************************Routes*****************************/
app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'./public/index.html'));
});

app.get('/notes',(req,res)=>{
res.sendFile(path.join(__dirname,'./public/notes.html'));
});

// app.get('api/notes',(req,res)=>{

// });

app.listen(port,()=>{
    console.log(`Server is listening to ${port}`);
    
});