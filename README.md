# Bamazon App

### Overview
***

Bamazon is a CLI Amazon-inspired storefront using MySQL for database storage. 

#### Customer View

*This view allows a customer to view items that are available for purchase from Bamazon. 
*The user is prompted to choose the item they would like to purchase using the Product Id as well as how many of that item they would like. 
*If the item has sufficient stock, then the order is completed and the user is given a total price for the purchase. Then they are prompted to keep shopping or not.
	*The quantity number is then decreased by the amount purchased.

![Customer View](images/customercompleted.png)

![Taboo number decreased](images/amountdecreased.png)

*If there is insufficient stock, then the customer receives an error and is shown the available item table again.

![Insufficient Stock](images/insufficient.png)

*If the customer enters a product id that does not correspond to a product in the inventory, an error is displayed and they are prompted to try again

![Invalid Product Id](images/invalidproduct.png)

*If the customer tries to enter anything besides an integer, they are given an error and must correct it before continuing with the purchase.

![Not An Integer](images/Nan.png)

*Once the customer has completed their purchase. They are prompted to either Keep Shopping or Leave Bamazon. If they Keep Shopping, then the available products are displayed and they go through the purchasing prompts.
*If they choose to Leave Bamazon, the connection to the MySQL database is disconnected and the session ended.

![Leave Bamazon](images/leave.png)

#### Contributors:
***
Caitlin Rose [GitHub](https://github.com/cnrose)

#### Technologies Used:
***

*Javascript
*NodeJS
*MySQL
*npm packages:
	-[mysql](https://github.com/felixge/node-mysql)
	-[inquirer](https://github.com/SBoudrias/Inquirer.js)
	-[cli-table](https://github.com/Automattic/cli-table)
	-[colors/safe](https://github.com/Marak/colors.js)	
