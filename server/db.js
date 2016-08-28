/* eslint-disable */

var fs = require('fs');
var db = require('./db.json');

exports.list = function() {
    return db;
}

exports.add = function(comment) {
    db.unshift(comment);
    persist();
}

exports.clear = function() {
    db = [];
    persist();
}

function persist() {
    fs.writeFile('server/db.json', JSON.stringify(db), 'utf8');
}