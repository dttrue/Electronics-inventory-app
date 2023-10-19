const { listInventoryItems } = require("../src/products")
const assert = require('assert')
describe('listInventoryItems', () => {
    it('should return an array of inventory items', () => {
    
      const items = listInventoryItems();
  
      assert(Array.isArray(items));
    });
  });
  