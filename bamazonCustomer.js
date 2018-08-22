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

function findProduct(varArray) {
  console.log();
  inquirer.prompt([
    {
      name: "productID",
      message: "Enter the ID of the product you like to buy? You can Exit by entering 0: "
    }
  ]).then(function (reply) {
    if (parseInt(reply.item_id) === 0) {
      console.log("Sorry to see you go! Goodbye!");
      connection.end();
    } else {
      var x = 0;
      var itemFound = false;
      while (x < varArray.length && !itemFound) {
        if (parseInt(reply.item_id) === varArray[x]) {
          itemFound = true;
        } else {
          x++;
        }
      }
      if (itemFound) {
        getQuantity(reply.item_id);
      } else {
        console.log("\nI'm sorry, product id #" + reply.item_id + " is not available in the inventory.");
        displayProducts();
      }
    }
  });
}
//Ask user how many items they want to buy and validate the entry
function productQuantity(item_id) {
  inquirer
    .prompt({
      name: "Quantity",
      message: "How many units would you like to purchase?",
    })
    .then(function (replyQuantity) {
      var quantity = parseInt(replyQuantity.quantity)
      if (!isNaN(quantity)) {
        productQuantity(item_id, replyQuantity.quantity);
      }
      else {
        console.log("\nI'm sorry, this is an invalid quantity");
        displayProducts();
      }
    });
}

// Verify quantity is available in DB in stock quantity 
// and then adjuct it accordingly to show the new quantity after "purchase".
function quantityRequest(item_id, quantity) {
  connection.query(
    "SELECT stock_quantity FROM products WHERE item_id = ?",
    item_id,
    function (err, res) {
      if (err) throw err;
      if (res[0].stock_quantity >= quantity && quantity >= 0) {
        var newQuantity = parseInt(res[0].stock_quantity) - parseInt(quantity);
        connection.query(
          "UPDATE products SET stock_quantity = ? WHERE item_id = ?",
          [newQuantity, item_id],
          function (err, updateRes) {
            if (err) throw err;
            var total;
            connection.query(
              "SELECT price FROM products WHERE item_id = ?",
              item_id,
              function (err, res) {
                if (err) throw err;
                total = parseFloat(res[0].price) * parseInt(quant);
                console.log("Thank you for your purchase of $" + total.toFixed(2));
                connection.query(
                  "UPDATE products SET product_sales = ? WHERE item_id = ?",
                  [total, id],
                  function (err, data) {
                    if (err) throw err;
                    console.log("product_sales updated");
                    additionalPurchase();
                  }
                );
              }
            );
          }
        );
      } else {
        console.log("\nInsufficient Quantity.\n");
        displayProducts();
      }
    }
  );
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


