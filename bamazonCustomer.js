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

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  displayProducts();
});

function displayProducts() {
    connection.query("SELECT * FROM products", function(err, res) {
      for (var i = 0; i < res.length; i++) {
        console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price);
      }
      console.log("-----------------------------------");
    });
  }
  // function findProduct() {
  //   inquirer
  //   .prompt({
  //     name: "Search for for product by ID?",
  //     type: "rawlist",
  //     message: "Please enter the ID of the product you'd like ot purchase"
  //   })
  //     .then(function(answer) {
  //       // based on their answer, either call the bid or the post functions
  //       if (answer.artistOrSong.toUpperCase() === "All songs by artist") {
  //         artistSearch();
  //         break;
  //       }
  //       else if (answer.artistOrSong.toUpperCase() === "Artists that appear more than once"){
  //         artistRepeat();
  //         break;
  //       }
  //       else if (answer.artistOrSong.toUpperCase() === "Songs within a specific range"){
  //           songYears();
  //           break;
  //       } 
  //       else if (answer.artistOrSong.toUpperCase() === "Specific song"){
  //           song();
  //           break;
  //       }   
  //     });
  // }


