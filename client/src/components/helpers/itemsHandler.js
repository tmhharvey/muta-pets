import axios from "axios";

var itemsHandler = {
  foodItemHandler: async (petId, item) => {
    const itemUsed = await axios.post(
      process.env.REACT_APP_BACKEND + "/pet/useItemHunger",
      {
        item: item,
        id: petId
      }
    );

    return itemUsed;
  }
};

export default itemsHandler;
