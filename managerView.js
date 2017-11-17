var key = require('./keys.js');
var mysql = require('mysql');
var inq = require('inquirer');

var connection = mysql.createConnection(key);
var currentProducts = [];

connection.connect(function(err) {
  if(err) throw err;
  getProducts();
  direction();
})

function quit() {
  connection.end();
}

function getProducts() {
  var query = connection.query(
    'SELECT product_name FROM products',
    function(err, result) {
      if(err) throw err;
      for(var i = 0; i < result.length; i++) {
        currentProducts.push(result[i].product_name);
      }
    }
  )
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

function inventorySelector() {
  inq.prompt([
    {
      type: 'list',
      message: 'Select a product:',
      choices: currentProducts,
      name: 'product'
    },
    {
      type: 'input',
      message: 'How many would you like to add?',
      name: 'amount'
    }
  ]).then(function(response) {
    var query = connection.query(
      'SELECT item_id, stock_quantity FROM products WHERE product_name="' + response.product + '"',
      function(err, result) {
        if(err) throw err;
        addInventory(result, response);
      }
    )
  })
}

function addInventory(obj, response) {
  var newNum = parseInt(obj[0].stock_quantity) + parseInt(response.amount);
  var query = connection.query(
    `UPDATE products SET ? WHERE item_id='${obj[0].item_id}'`,
    {
      stock_quantity: newNum
    },
    function(err, result) {
      if(err) throw err;
      console.log("Added successfully! " + result.affectedRows + ' items updated. New stock total = ' + newNum);
      direction();
    }
  )
}

function addProduct() {
  inq.prompt([
    {
      type: 'input',
      message: 'Product name:',
      name: 'name'
    },
    {
      type: 'input',
      message: '4 digit Item ID:',
      name: 'id'
    },
    {
      type: 'input',
      message: 'Department name',
      name: 'department'
    },
    {
      type: 'input',
      message: 'Product Price',
      name: 'price'
    },
    {
      type: 'input',
      message: 'Total stock',
      name: 'stock'
    }
  ]).then(function(response) {
    var query = connection.query(
      'INSERT INTO products SET ?',
      {
        product_name: response.name,
        item_id: response.id,
        department_name: response.department,
        price: response.price,
        stock_quantity: response.stock
      },
      function(err, result) {
        if(err) throw err;
        console.log('Product added!');
        direction();
      }
    )
  })
}