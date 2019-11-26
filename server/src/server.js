var express = require('express');
var app = express();

app.get('/api/members', function(req, res){
   res.send("Csillagvillaskulcs");
});

app.listen(4000);