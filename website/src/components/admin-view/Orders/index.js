import React, { useState, useEffect } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";

const client = new W3CWebSocket("ws://127.0.0.1:8000");

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    client.onopen = () => {
      console.log("WebSocket Client connected");
    };

    client.onmessage = (message) => {
      const dataFromServer = JSON.parse(message.data);
      console.log("got order! ", dataFromServer);
      if (dataFromServer.type === "message") {
        setOrders([
          ...orders,
          {
            order_id: dataFromServer.order_display[0].order_id,
            date: dataFromServer.order_display[0].date,
            customer: dataFromServer.order_display[0].customer,
            method: dataFromServer.order_display[0].method,
            address: dataFromServer.order_display[0].address,
            phone_number: dataFromServer.order_display[0].phone_number,
            items: dataFromServer.order_display.map((i) => {
              return {
                item: i.item,
                quantity: i.quantity,
              };
            }),
          },
        ]);
      }
    };
  }, [orders]);

  useEffect(() => {
    console.log("orders ", orders);
  }, [orders]);

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Orders</h1>
      {orders.map((order) => {
        return (
          <div style={{ border: "1px dashed black" }}>
            <p>Order ID: {order.order_id}</p>
            <p>Date: {order.date}</p>
            <p>Customer: {order.customer}</p>
            <p>Method: {order.method}</p>
            <p>Address: {order.address}</p>
            <p>Phone Number: {order.phone_number}</p>
            {order.items.map((item) => {
              return (
                <div>
                  <p>{item.item}</p>
                  <p>{item.quantity}</p>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Orders;
