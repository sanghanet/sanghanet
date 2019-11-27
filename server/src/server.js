const express = require('express');
const app = express();
const mongourl = 'mongodb://localhost/test'; // Mongo DB URL later can be exported to ENV
const mongoose = require('mongoose');

mongoose.connect(mongourl, {useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {console.log('Successfully connected to MongoDB database.')})
.catch((error) => {console.log('Database connection error: ' + error.message)});

app.use(express.static('app'));

app.get('/api/members', function(req, res){
   res.send("Hello World!");
});

app.listen(4000, ()=>{
    console.log("Backend server is running as well.");
});