const productsAPI = require("./src/products");
const { faker } = require("@faker-js/faker");
const fs = require("fs");
const dataFolder = "data";
const dataFilePath = `${dataFolder}/products.json`;

function generateElectronics() {
    const productTypes = [
      "earbuds",
      "headphones",
      "USB-C cable",
      "Thunderbolt Cable",
      "Android phones",
      `TCL 55" Class 4-Series 4K UHD HDR Smart Roku TV `,
      `TCL S Class 2.1 Channel Sound Bar with DTS Virtual:X and Wireless Subwoofer , S210W`,
      `RCA 720p Smart Wi-Fi Home Theater Projector w/ Roku Stick`,
      `ONN.HDMI CBL 6FT BLK`,
      `Simyoung Wii to HDMI Wii 2 HDMI Full HD Portable Converter Adapter 3.5mm Audio Out`,
      `Tv`,
      `sound bar`
    ];
  
    const electronicsProducts = [];
  
    for (let i = 1; i <= 12; i++) {
      electronicsProducts.push({
        id: faker.random.alphaNumeric(4),
        name: productTypes[i - 1], 
        priceInCents: faker.commerce.price(100, 200, 0, '$'), 
        inStock: faker.datatype.boolean(),
      });
    }
  
    return electronicsProducts;
  }

  function processInput() {
    const expectedCommand = process.argv[2];
    let result = "Error: Command not found";
  
    if (expectedCommand === "create") {
      const [name, price, stock] = process.argv.slice(3);
      const parsedPrice = parseFloat(price);
      const stockString = parseInt(stock) > 0 ? "true" : "false"; 
  
      result = productsAPI.createInventoryItem(name, parsedPrice, stockString);
    } else if (expectedCommand === "list") {
      result = productsAPI.listInventoryItems();
    } else if (expectedCommand === "view") {
      const index = parseInt(process.argv[3]);
      result = productsAPI. getInventoryItemDetails(index);
    } else if (expectedCommand === "delete") {
      const index = parseInt(process.argv[3]);
      result = productsAPI.deleteInventoryItem(index);
    } else if (expectedCommand === "update") {
      const index = parseInt(process.argv[3]);
      const [name, price, stock] = process.argv.slice(4);
  
      const parsedPrice = parseFloat(price);
      const stockString = parseInt(stock) > 0 ? "true" : "false";
  
      result = productsAPI.updateInventoryItem(
        index,
        name,
        parsedPrice,
        stockString
      );
    } else if (expectedCommand === "generate") {
      const randomItems = generateElectronics();
      fs.writeFileSync(dataFilePath, JSON.stringify(randomItems, null, 2));
      result = "Random items generated and saved to products.json";
    }else if (expectedCommand === "addtocart") {
    
      const itemIndex = parseInt(process.argv[3]);
      const quantity = parseInt(process.argv[4]);
  
      const item = productsAPI.getInventoryItemDetails(itemIndex);
  
      if (item) {
        productsAPI.addItemToCart(item, quantity);
        result = "Item added to the shopping cart.";
      } else {
        result = "Item not found in inventory.";
      }
    } else if (expectedCommand === "carttotalprice") {
      const totalPrice = productsAPI.calculateCartTotalPrice();
      result = `Total price in the shopping cart: $${totalPrice.toFixed(2)}`;
    } else if (expectedCommand === "carttotalquantity") {
      const totalQuantity = productsAPI.calculateCartTotalQuantity();
      result = "Total quantity in the shopping cart:\n" + JSON.stringify(totalQuantity, null, 2);
    } else if (expectedCommand === "cancelcart") {
     
      productsAPI.cancelCart();
      result = "Shopping cart has been canceled.";
    }
  
    console.log(result);
  }
  
  processInput();
  
