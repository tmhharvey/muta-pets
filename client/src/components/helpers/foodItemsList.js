import meatHaunch from "../../assets/img/meat.png";
import smallBerry from "../../assets/img/smallBerry.png";
import starFruit from "../../assets/img/starFruit.png";
var foodItemsList = {
  meatHaunch: {
    name: "Meat Haunch",
    type: "food",
    effect: -20,
    description: "A haunch of meat from the Forbidden Forest",
    image: meatHaunch
  },

  smallBerry: {
    name: "Small Berry",
    type: "food",
    effect: -10,
    description: "A couple of berries picked from the Forbidden Forest",
    image: smallBerry
  },
  starFruit: {
    name: "Star Fruit",
    type: "food",
    effect: -99,
    description:
      "An amazing fruit capable of staving off hunger for days with just one bite...",
    image: starFruit
  }
};

export default foodItemsList;
