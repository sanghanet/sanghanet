var express = require('express');
var app = express();

app.get('/api/members', function(req, res){
   res.send("Hello World!");
});

app.listen(4000, ()=>{
    console.log("Backend server is running as well.");
});