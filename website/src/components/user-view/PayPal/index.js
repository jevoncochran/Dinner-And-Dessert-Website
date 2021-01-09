import React, { useRef, useEffect } from "react";
import "./PayPal.scss";
import { connect } from "react-redux";

import { addOrder } from "../../../actions";

const PayPal = ({ order_details, order }) => {
  const paypal = useRef();

  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions, err) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: "Dinner and Dessert",
                amount: {
                  currency_code: "USD",
                  value: order_details.total,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const newOrder = await actions.order.capture();
          console.log(newOrder);
          props.addOrder(order_details, order);
          props.history.push("/success");
        },
        onError: (err) => {
          console.log(err);
        },
      })
      .render(paypal.current);
  }, [order_details, order]);

  return (
    <div className="paypal">
      <div className="paypal-options" ref={paypal}></div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    order_details: state.customer.order_details,
    order: state.customer.order,
  };
};

export default connect(mapStateToProps, { addOrder })(PayPal);
