var key = require('./keys.js');
var mysql = require('mysql');
var inq = require('inquirer');

var connection = mysql.createConnection()