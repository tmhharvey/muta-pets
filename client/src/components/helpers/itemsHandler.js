import axios from "axios";

var itemsHandler = {
  foodItemHandler: async (petId, item, inventoryIndex) => {
    const itemUsed = await axios.post(
      process.env.REACT_APP_BACKEND + "/pet/useItemHunger",
      {
        item: item,
        inventoryIndex: inventoryIndex,
        id: petId
      }
    );

    return itemUsed;
  },
  userInventoryUpdated: async inventoryIndex => {
    console.log("user inventory updated function was hit");
    console.log("the index is: " + inventoryIndex);
    const inventoryUpdated = await axios.post(
      process.env.REACT_APP_BACKEND + "/user/updateInventory",
      {
        inventoryIndex: inventoryIndex
      }
    );

    return inventoryUpdated;
  }
};

export default itemsHandler;
