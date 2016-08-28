/* eslint-disable */

var express = require('express');
var path = require('path');
var fs = require("fs");
var app = express();
var db = require('./db.js');

var bodyParser = require('body-parser');
app.use( bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
})); 

var port = process.env.PORT || 8180;

app.use('/', express.static(path.join(__dirname, '../dist')))

app.get('/comment', function(req, res) {
    res.send(db.list());
});

app.post('/comment', function(req, res) {
    var comment = req.body;
    db.add(comment);
    res.send(comment);
});

app.delete('/comment', function(req, res) {
    db.clear();
    res.send(db);
})

app.listen(port);