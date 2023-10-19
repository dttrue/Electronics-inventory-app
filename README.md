# Inventory and Shopping Cart Management

This Node.js application allows you to manage an inventory of products and a shopping cart. You can create, view, update, delete, and filter inventory items, as well as add items to a shopping cart, view the shopping cart, calculate the total price, and cancel the shopping cart.

## Getting Started

1. Clone this repository to your local machine.

2. Install the required dependencies using npm:

npm install @faker-js/faker --save-dev

npm install nanoid@3

npm install --save-dev jest

npm install chalk@5


3. Use the command-line interface (CLI) to interact with the application. You can use the following commands:

- `create <name> <priceInCents> <inStock>`: Create a new inventory item.
- `list`: List all inventory items.
- `view <index>`: View details of a specific inventory item.
- `delete <index>`: Delete an inventory item.
- `update <index> <name> <priceInCents> <inStock>`: Update an inventory item.
- `viewcart`: View the contents of the shopping cart.
- `addtocart <itemIndex> <quantity>`: Add an item to the shopping cart.
- `totalprice`: Calculate the total price of items in the shopping cart.
- `cancelcart`: Cancel the shopping cart.
- `filter`: Streamlines the process of filtering inventory items according to different attributes or properties. For instance `<priceInCents>` as the property.

## File Structure
- `products.test.js`: JS file containing test case.
- `index.js`: JS file containing inventory API.
- `src/products.js`: JS file containing inventory function
- `data/products.json`: JSON file containing the inventory items.
- `data/shoppingCart.json`: JSON file containing the shopping cart items.
- `README.md`: This documentation.

## Functions

- `createInventoryItem()`: Create a new inventory item.
- `listInventoryItems()`: List all inventory items.
- `getInventoryItemDetails()`: View details of a specific inventory item.
- `deleteInventoryItem()`: Delete an inventory item.
- `updateInventoryItem()`: Update an inventory item.
- `viewCart()`: View the contents of the shopping cart.
- `addToCart()`: Add an item to the shopping cart.
- `calculateTotalPrice()`: Calculate the total price of items in the shopping cart.
- `cancelCart()`: Cancel the shopping cart.
- `filterItemsByProperty()`: Filter inventory items based on a property and value.

Please refer to the application usage section above for details on how to use these functions.







