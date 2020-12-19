import axios from "axios";

export const editDayAvailability = (newStatus, itemId) => {
  axios.patch(`http://localhost:5000/api/menu/item${itemId}`, newStatus);
};
