var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");
var colors = require("colors/safe");

var connection = mysql.createConnection ({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "Usethis1",
	database: "bamazon_db"
});

//validate inquirer input for whole integers only 
function validateInput(value) {
	var integer = Number.isInteger(parseFloat(value));
	var sign = Math.sign(value);

	if (integer && (sign === 1)) {
		return true;
	} else {
		return 'Please enter a whole non-zero number.';
	}
}


//make connection to mysql
connection.connect(function(err) {
	if (err) throw err;
	console.log("connected as id " + connection.threadId);
	displayProducts();
});


//start up function to display all products
function displayProducts(){
	var query = "SELECT item_id, product_name, price, stock_quantity FROM products";
	connection.query(query, function(err, res) {
		if (err) throw err;
		//table creation for product display
		var table = new Table({
			head: ["Product Id", "Product Name", "Price", "Quantity Available"],
			style: {
				head: ["green"],
			}
		});

		for (var i = 0; i < res.length; i++) {
			table.push(
				[res[i].item_id, res[i].product_name, res[i].price, res[i].stock_quantity]
			);
		};
		console.log("Products Available: " + "\n" + table.toString() );

		purchasePrompt();
	});
}

//inquirer prompt for user purchase
function purchasePrompt(){
	
	inquirer
		.prompt([
			{
				name: "item_id",
				type: "input",
				message: "Please enter the Product Id of the item you'd like to purchase.",
				validate: validateInput,
				filter: Number
			},
			{
				name: "quantity",
				type: "input",
				message: "How many would you like?",
				validate: validateInput,
				filter: Number
			}
		]).then(function(answer) {
			
			var item = answer.item_id;
			var quantity = answer.quantity;

			//query table for selection info
			var query = "SELECT * FROM products WHERE ?";

			connection.query(query, {item_id: item}, function(err, res){
				if(err) throw err;

				//check to see if id entered is valid on the table
				if (res.length === 0) {
					console.log(colors.red.bold("Oops, you entered an invalid Product Id. Please try again"));
					console.log(colors.red.bold("--------------------------------------"));

					displayProducts();
				}
				else{
					var productChosen = res[0];

					//check to see if there is enough product in stock
					if (quantity <= productChosen.stock_quantity) {
						console.log(colors.magenta.bold("Hurray! The items you want are in stock! Placing your order now!"));

						var updateQuery = "UPDATE products SET stock_quantity = " + (productChosen.stock_quantity - quantity) + " WHERE item_id = " + item;

						//Update the quantity in table
						connection.query(updateQuery, function(err, res){
							if(err) throw err;
							
							//calculate and log out the total price of purchase
							var totalPrice = quantity * productChosen.price;

							console.log("Your total is $" + totalPrice + "\nYour order has been placed. Thank you!");
							console.log("-----------------------------------------");

							//run function to see what user wants to do next
							endShopping();
						})
					} else {
						console.log(colors.yellow("We're sorry, but we do not have enough product in stock." + "\nPlease try your order again."));
						
						displayProducts();
					};

				};
			});
		});
}

function endShopping(){
	inquirer
		.prompt(
			{
				name: "keepShopping",
				type: "list",
				message: "What would you like to do now?",
				choices: ["Keep Shopping", "Leave Bamazon"]
			}
		).then(function(answer) {
			if (answer.keepShopping === "Keep Shopping") {
				console.log("Excellent! \n");
				displayProducts();
			} else {
				console.log("Thank you for shopping with us! Hope to see you back soon!");
				connection.end();
			}
		})	
}

