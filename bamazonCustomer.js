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
      console.log(productList)
    }
  )
}