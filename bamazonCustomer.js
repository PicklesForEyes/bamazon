var key = require('./keys.js');
var mysql = require('mysql');
var inq = require('inquirer');

var connection = mysql.createConnection(key);

connection.connect(function(err) {
  if(err) throw err;
  drawProducts();
})

function quit() {
  connection.end();
}

function drawProducts() {
  var query = connection.query(
    'SELECT product_name, price, item_id FROM products',
    function(err, res) {
      if (err) throw err;
      var productList = [];
      for (var i = 0; i < res.length; i++) {
        productList.push(res[i].product_name + ' $' + res[i].price + ', id:' + res[i].item_id);
      }
      inq.prompt([
        {
          type: 'list',
          message: 'Select a product',
          choices: productList,
          name: 'userchoice'
        }
      ]).then(function(result) {
        getProductInfo(result.userchoice);
      })
    }
  )
}

function getProductInfo(itemString) {
  var id = itemString.substr(itemString.length - 4);
  var query1 = connection.query(
    'SELECT stock_quantity FROM products WHERE item_id="' + id + '"',
    function(err, response) {
      if(err) throw err;
      var quantity = response[0].stock_quantity
      purchaseItem(quantity, id);
    }
  )
}

