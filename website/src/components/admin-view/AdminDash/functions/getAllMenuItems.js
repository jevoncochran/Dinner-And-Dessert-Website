import axios from "axios";

export const getAllMenuItems = async () => {
  const response = await axios
    .get("http://localhost:5000/api/menu")
    .catch((err) => {
      console.log(err);
    });
  let menu = {
    entrees: response.data.filter((item) => item.category === "entree"),
    sides: response.data.filter((item) => item.category === "side"),
    dessert: response.data.filter(
      (item) => item.dinner_or_dessert === "dessert"
    ),
  };
  return menu;
};
