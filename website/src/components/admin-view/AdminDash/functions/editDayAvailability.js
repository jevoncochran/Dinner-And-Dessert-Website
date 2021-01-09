import axios from "axios";

export const editDayAvailability = (newStatus, itemId) => {
  axios.patch(`https://dinner-and-dessert.herokuapp.com/api/menu/item${itemId}`, newStatus);
};
