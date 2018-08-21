var mysql = require("mysql");
var inquirer = require("inquirer");

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

function findProduct() {
  inquirer
    .prompt([
      {
        name: "Search for for product by ID",
        type: "rawlist",
        choices: function () {
          var choiceArray = [];
          for (var i = 0; i < results.length; i++) {
            choiceArray.push(results[i].item_name);
          }
          return choiceArray;
        },
        message: "Please enter the ID of the product you'd like ot purchase",
      },
    {
      name: "product ID",
      type: "input",
      message: "How many units would you like to purchase?"
    }
  ])
  // .then(function (answer) {
  // var chosenItem;
  // for (var i = 0; i < results.length; i++) {
  //   if (results[i].item_name === answer.choice) {
  //     chosenItem = results[i];
  //   }
  // }
// })
}
findProduct();

