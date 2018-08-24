//Dependencies
var mysql = require("mysql");
var inquirer = require("inquirer");

//Connection
var connection = mysql.createConnection({
  host: "localhost",

  // Port;
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "password",
  database: "bamazon_db"
});

// On connection call the funtction to display all products. 
connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  displayProducts();
});

function displayProducts() {
  connection.query("SELECT * FROM products", function (err, res) {
    for (var i = 0; i < res.length; i++) {
      console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price);
    }
    console.log("-----------------------------------");
  });
}
//After displaying all products on startup, call the function to ask user what products they want to buy
findProduct();

function findProduct() {
  console.log();
  inquirer.prompt([
    {
      name: "item_id",
      type: "input",
      message: "Enter the ID of the product you like to buy? You can Exit by entering 0: "
    }
  ]).then(function (reply) {
    if (parseInt(reply.item_id) === 0) {
      console.log("Sorry to see you go! Goodbye!");
      connection.end();
    } else {
      inquirer.prompt([
        {
          name: "Quantity",
          type: "input",
          message: "How many units would you like to purchase?"
        }
      ]).then(function (reply) {
        var quantity = parseInt(reply.Quantity)
        if (!isNaN(quantity)) {
          // productQuantity(item_id, quantity);
          quantityRequest(reply.item_id, quantity);
        }
        else {
          console.log("\nI'm sorry, this is an invalid quantity");
          displayProducts();
        }
      });
    }
  })
}
// Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.
// Verify quantity is available in DB in stock quantity 
function quantityRequest(item_id, quantity) {
  connection.query("SELECT stock_quantity FROM products WHERE item_id = ?", [item_id], function (err, res) {
    if (err) throw err;
    var res = res[0];
    if (quantity > res.stock_quantity) {
      console.log("\nI'm sorry, the " + product_name + " is temporarily out of stock.");
      additionalPurchase();
    } else {
      var total = (quantity * price);
      console.log("\nThe total of your order is $" + total + ". \nThank you. Hope to see you again soon!");
      updateInv(item_id, res.stock_quantity, quantity);
      additionalPurchase();
    }
  });
}
// Adjuct product accordingly in db to show the new quantity after "purchase".
function updateInv() {
  var updatedStock = parseInt(res[0].stock_quantity) - parseInt(quantity);
connection.query("UPDATE products SET stock_quantity = ? WHERE item_id = ?",[updatedStock, item_id],function (err, updateRes) {
    if (err) throw err;
  });
}

function additionalPurchase() {
  inquirer.prompt({
    type: "confirm",
    message: "Would you like to purchase another item? ",
    name: "again"
  }).then(function (response) {
    //console.log(response.again);
    if (response.again) {
      displayProducts();
    } else {
      console.log("Thank you for visiting. Goodbye");
      connection.end();
    }
  });
}


