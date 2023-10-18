const fs = require("fs");
const { nanoid } = require("nanoid");
const path = require("path");
const dataFilePath = path.join(__dirname, "../data/products.json");
const cartFilePath = path.join(__dirname, "../data/shoppingCart.json");
let inventoryItems = [];
let shoppingCart = []; 

function loadCartItems() {
  try {
    const data = fs.readFileSync(cartFilePath);
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

function saveCartItemsToFile(cartItems) {
  const dataToWrite = JSON.stringify(cartItems, null, 2);
  fs.writeFileSync(cartFilePath, dataToWrite);
}

function addToCart() {
  const cartItems = loadCartItems();
  for (let item of inventoryItems) {
    if (item) {
      cartItems.push(item);
    }
  }

  saveCartItemsToFile(cartItems);
}

function viewCart() {
  const cartItems = loadCartItems();
  for (let item of cartItems) {
    console.log(
      `Product: ${item.product}, Quantity: ${item.quantity}, Price: ${item.price}`
    );
  }
}

function loadProducts() {
  try {
    const data = fs.readFileSync(dataFilePath);
    inventoryItems = JSON.parse(data);
    console.log(inventoryItems);
  } catch (err) {
    inventoryItems = [];
  }
}

function loadCart() {
  try {
    const data = fs.readFileSync(cartFilePath);
    shoppingCart = JSON.parse(data);
    console.log(shoppingCart);
  } catch (err) {
    shoppingCart = [];
  }
}

function saveProductsToFile() {
  const dataToWrite = JSON.stringify(inventoryItems, null, 2);
  fs.writeFileSync(dataFilePath, dataToWrite);
}

loadProducts();
loadCart(); // Load the shopping cart when the application starts.

function createInventoryItem(name, priceInCents, inStock) {
  const id = nanoid(4);
  const newProductItem = { id, name, priceInCents, inStock };
  inventoryItems.push(newProductItem);
  saveProductsToFile();
  return inventoryItems;
}

function listInventoryItems() {
  return inventoryItems;
}

function getInventoryItemDetails(index) {
  if (index >= 0 && index < inventoryItems.length) {
    return inventoryItems[index];
  }
  return "Item not found.";
}

function deleteInventoryItem(index) {
  if (index >= 0 && index < inventoryItems.length) {
    inventoryItems.splice(index, 1);
    saveProductsToFile();
    return "Item deleted.";
  }
  return "Item not found.";
}

function updateInventoryItem(index, name, priceInCents, inStock) {
  if (index >= 0 && index < inventoryItems.length) {
    inventoryItems[index] = { name, priceInCents, inStock };
    saveProductsToFile();
    return "Item updated.";
  }
  return "Item not found.";
}

function filterItemsByProperty(property, operator, value) {
  const inventoryItems = listInventoryItems();

  const filteredItems = inventoryItems.filter((item) => {
    if (operator === ">") {
      return parseFloat(item[property]) > parseFloat(value);
    } else if (operator === "<") {
      return parseFloat(item[property]) < parseFloat(value);
    }

    return false;
  });

  return getFilteredResult(filteredItems, operator, value);
}

function getFilteredResult(filteredItems, operator, value) {
  if (filteredItems.length > 0) {
    return filteredItems;
  } else {
    return `No items with a price ${operator} ${value}`;
  }
}

function calculateTotalPrice() {
    let totalPrice = 0;
    for (let item of shoppingCart) {
      if (typeof item.priceInCents === 'number' && !isNaN(item.priceInCents)) {
        totalPrice += parseFloat(item.priceInCents);
      }
    }
    return totalPrice;
  }
 
  
  
  
  
  
  

function cancelCart() {
  shoppingCart.length = 0;
  saveCartItemsToFile(shoppingCart); // Save an empty shopping cart.
}

module.exports = {
  createInventoryItem,
  listInventoryItems,
  getInventoryItemDetails,
  deleteInventoryItem,
  updateInventoryItem,
  viewCart,
  calculateTotalPrice,
  cancelCart,
  filterItemsByProperty,
  getFilteredResult,
  addToCart,
  loadCart,
};

