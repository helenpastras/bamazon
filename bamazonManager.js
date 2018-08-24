
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
    managerView();
});

   // List a set of menu options:
function managerView() {
    inquirer
        .prompt({
            name: "Manager's View: Select Action",
            type: "rawlist",
            message: "Hello Manager!  What would you like to do?",
            choices: ["Display All Items for Sale", "View Low Inventory Items", "Add Item Quantity to Inventory", "Add New Item to Inventory"]
        })
        .then(function (answer) {
            switch (answer.action) {
                case "Display All Items for Sale":
                    displayProductsM();
                    break;

                case "View Low Inventory Items":
                    viewLowInv();
                    break;

                case "Add Item Quantity to Inventory":
                    addToInv();
                    break;

                case "Add New Item to Inventory":
                    addNew();
                    break;
        }
    });
}


// View Products for Sale
// If a manager selects View Products for Sale, the app should list every available item: the item IDs, names, prices, and quantities.
function displayProductsM() {
    connection.query("SELECT * FROM products", function (err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price  + " | " + res[i].stock_quantity);
        }
        console.log("-----------------------------------");
    });
}
// View Low Inventory
// If a manager selects View Low Inventory, then it should list all items with an inventory count lower than five.
function viewLowInv() {
    connection.query("SELECT * FROM products WHERE stock_quantity < 5", function (err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price  + " | " + res[i].stock_quantity);
        }
        console.log("-----------------------------------");
    });
}
    // Add to Inventory
// If a manager selects Add to Inventory, 
function addToInv() {
    // your app should display a prompt that will let the manager "add more" of any item currently in the store.
    inquirer
        .prompt([
        {
            name: "item_id",
            type: "input",
            message: "What is the item ID you would like to add more of?"
        },
        {
            name: "stock_inventory",
            type: "input",
            message: "How many more units would you like to add?"
        },
        //     validate: function(value) {
        //     if (isNaN(value) === false) {
        //         return true;
        //     }
        //     return false;
        //     }
        // }
        // ])
        // .then(function(answer) {
        // // when finished prompting, insert a new item into the db with that info
        // connection.query(
        //     "UPDATE products SET ?",
        //     {
        //     item_id: answer.item_id,
        //     category: answer.category,
        //     starting_bid: answer.startingBid,
        //     highest_bid: answer.startingBid
        //     },
        //     function(err) {
        //     if (err) throw err;
        //     console.log("Your auction was created successfully!");
        //     // re-prompt the user for if they want to bid or post
        //     start();
        //     }
        // );
    //     });
    // }

//     // Add New Product
//     addNew();
//     function postAuction() {
//         // prompt for info about the item being put up for auction
//         inquirer
//           .prompt([
//             {
//               name: "item",
//               type: "input",
//               message: "What is the item you would like to submit?"
//             },
//             {
//               name: "category",
//               type: "input",
//               message: "What category would you like to place your auction in?"
//             },
//             {
//               name: "startingBid",
//               type: "input",
//               message: "What would you like your starting bid to be?",
//               validate: function(value) {
//                 if (isNaN(value) === false) {
//                   return true;
//                 }
//                 return false;
//               }
//             }
//           ])
//           .then(function(answer) {
//             // when finished prompting, insert a new item into the db with that info
//             connection.query(
//               "INSERT INTO auctions SET ?",
//               {
//                 item_name: answer.item,
//                 category: answer.category,
//                 starting_bid: answer.startingBid,
//                 highest_bid: answer.startingBid
//               },
//               function(err) {
//                 if (err) throw err;
//                 console.log("Your auction was created successfully!");
//                 // re-prompt the user for if they want to bid or post
//                 start();
//               }
//             );
//           });
//       }
      


// // If a manager selects Add to Inventory, your app should display a prompt that will let the manager "add more" of any item currently in the store.
// // If a manager selects Add New Product, it should allow the manager to add a completely new product to the store.
