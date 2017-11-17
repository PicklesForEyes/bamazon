var key = require('./keys.js');
var mysql = require('mysql');
var inq = require('inquirer');

var connection = mysql.createConnection(key);

connection.connect(function(err) {
  if(err) throw err;
  direction();
})

function quit() {
  connection.end();
}

function direction() {
  inq.prompt([
    {
      type: 'list',
      message: 'Choose an action:',
      choices: ['View products','Low inventory','Add inventory', 'Add product', 'leave'],
      name: 'direction'
    }
  ]).then(function(response) {
    switch(response.direction) {
      case 'View products':
        listProducts();
        break;

      case 'Low inventory':
        listLowInventory();
        break;

      case 'Add inventory':
        inventorySelector();
        break;

      case 'Add product':
        addProduct();
        break;

      case 'leave':
        quit();
    }
  })
}

function listProducts() {
  var query = connection.query(
    'SELECT product_name, item_id, stock_quantity FROM products',
    function(err, res) {
      if(err) throw err;
      for(var i = 0; i < res.length; i++) {
        console.log(res[i].product_name, res[i].item_id, res[i].stock_quantity);
      }
      direction();
    }
  )
}

function listLowInventory() {
  var query = connection.query(
    'SELECT product_name, item_id, stock_quantity FROM products WHERE stock_quantity<4',
    function(err, res) {
      if(err) throw err;
      for(var i = 0; i < res.length; i++) {
        console.log(res[i].product_name, res[i].item_id, res[i].stock_quantity);
      }
      direction();
    }
  )
}

