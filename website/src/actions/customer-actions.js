import axios from "axios";

export const ADD_TO_ORDER_START = "ADD_TO_ORDER_START";
export const ADD_TO_ORDER_SUCCESS = "ADD_TO_ORDER_SUCCESS";
export const UPDATE_ORDER_START = "UPDATE_ORDER_START";
export const UPDATE_ORDER_SUCCESS = "UPDATE_ORDER_SUCCESS";
export const OPEN_ORDER_CARD_START = "OPEN_ORDER_CARD_START";
export const OPEN_ORDER_CARD_SUCCESS = "OPEN_ORDER_CARD_SUCCESS";
export const CLOSE_ORDER_CARD_START = "CLOSE_ORDER_CARD_START";
export const CLOSE_ORDER_CARD_SUCCESS = "CLOSE_ORDER_CARD_SUCCESS";
export const SUBMIT_INQUIRY_START = "SUBMIT_INQUIRY_START";
export const SUBMIT_INQUIRY_SUCCESS = "SUBMIT_INQUIRY_SUCCESS";
export const REMOVE_FROM_ORDER_START = "REMOVE_FROM_ORDER_START";
export const REMOVE_FROM_ORDER_SUCCESS = "REMOVE_FROM_ORDER_SUCCESS";
export const UPDATE_COUNT_START = "UPDATE_COUNT_START";
export const UPDATE_COUNT_SUCCESS = "UPDATE_COUNT_SUCCESS";

// add to customer order
export const addItemToOrder = (item) => (dispatch) => {
  dispatch({ type: ADD_TO_ORDER_START });
  dispatch({ type: ADD_TO_ORDER_SUCCESS, payload: item });
};

// I think this just updates the count for a particular item stored in redux state for the order
export const updateOrder = (item) => (dispatch) => {
  dispatch({ type: UPDATE_ORDER_START });
  dispatch({ type: UPDATE_ORDER_SUCCESS, payload: item });
};

// display order card
export const openOrderCard = () => (dispatch) => {
  dispatch({ type: OPEN_ORDER_CARD_START });
  dispatch({ type: OPEN_ORDER_CARD_SUCCESS });
};

// close order card
export const closeOrderCard = () => (dispatch) => {
  dispatch({ type: CLOSE_ORDER_CARD_START });
  dispatch({ type: CLOSE_ORDER_CARD_SUCCESS });
};

// submit inquiry
export const submitInquiry = (inquiry) => (dispatch) => {
  dispatch({ type: SUBMIT_INQUIRY_START });
  axios
    .post("http://localhost:5000/api/inquiries", inquiry)
    .then((res) => {
      console.log(res);
      dispatch({ type: SUBMIT_INQUIRY_SUCCESS });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const removeFromOrder = (itemId) => (dispatch) => {
  dispatch({ type: REMOVE_FROM_ORDER_START });
  dispatch({ type: REMOVE_FROM_ORDER_SUCCESS, payload: itemId });
};

export const updateCount = (newCount, itemId) => (dispatch) => {
  dispatch({ type: UPDATE_COUNT_START });
  dispatch({ type: UPDATE_COUNT_SUCCESS, payload: { newCount, itemId } });
};
