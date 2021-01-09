import axios from "axios";
import { w3cwebsocket as W3CWebSocket } from "websocket";

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
export const ADD_ORDER_START = "ADD_ORDER_START";
export const ADD_ORDER_SUCCESS = "ADD_ORDER_SUCCESS";
export const PREPARE_ORDER_START = "PREPARE_ORDER_START";
export const PREPARE_ORDER_SUCCESS = "PREPARE_ORDER_SUCCESS";
export const ADD_ORDER_DETAIL_START = "ADD_ORDER_DETAIL_START";
export const ADD_ORDER_DETAIL_SUCCESS = "ADD_ORDER_DETAIL_SUCCESS";

const client = new W3CWebSocket("ws://127.0.0.1:8000");

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
    .post("https://dinner-and-dessert.herokuapp.com/api/inquiries", inquiry)
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

// executes when customer confirms and pays for order
export const addOrder = (orderObj, itemsArr) => (dispatch) => {
  dispatch({ type: ADD_ORDER_START });
  // adds new row to orders table in database
  axios
    .post("https://dinner-and-dessert.herokuapp.com/api/orders", orderObj)
    .then((res) => {
      // maps over array of individual items in order
      // adds new row to order_details table for each individual item in array
      // returns array of responses
      const orderItems = itemsArr.map((item) => {
        return axios
          .post("https://dinner-and-dessert.herokuapp.com/api/orders/details", {
            order_id: res.data.id,
            item_id: item.id,
            quantity: item.count,
          })
          .then((res) => {
            console.log(res);
            return res;
          })
          .catch((err) => console.log(err));
      });
      // gets array of responses from .map of array of individual items in order
      Promise.all(orderItems).then((res) => {
        console.log("order_id ", res[0].data.order_id);
        // the API call pulls from the first response in the response array (res[0]) to get the order_id
        // plus that order_id in as parameter for this call
        axios
          .get(
            `https://dinner-and-dessert.herokuapp.com/orders/${res[0].data.order_id}/display`
          )
          .then((res) => {
            console.log(res);
            // sends order info to web socket server so that admin can receive it
            client.send(
              JSON.stringify({
                type: "message",
                msg: "order received",
                order_display: res.data,
              })
            );
          })
          .catch((err) => console.log(err));
      });
    })
    .then(() => dispatch({ type: ADD_ORDER_SUCCESS }))
    .catch((err) => {
      console.log(err);
    });
};

export const prepareOrder = (orderObj) => (dispatch) => {
  dispatch({ type: PREPARE_ORDER_START });
  dispatch({ type: PREPARE_ORDER_SUCCESS, payload: orderObj });
};

export const addOrderDetail = (entry) => (dispatch) => {
  dispatch({ type: ADD_ORDER_DETAIL_START });
  axios
    .post("https://dinner-and-dessert.herokuapp.com/api/orders/details", entry)
    .then((res) => {
      console.log(res);
      dispatch({ type: ADD_ORDER_DETAIL_SUCCESS });
    })
    .catch((err) => {
      console.log(err);
    });
};
