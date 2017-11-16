var key = require('./keys.js');
var mysql = require('mysql');
var inq = require('inquirer');

var connection = mysql.createConnection(key);

connection.connect(function(err) {
  // if(err) throw err;
  console.log('connected')
  conenction.end();
})