import React, { useRef, useEffect } from "react";
import "./PayPal.scss";
import { connect } from "react-redux";

import { addOrder } from "../../../actions";

const PayPal = (props) => {
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
                  value: props.order_details.total,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          console.log(order);
          props.addOrder(props.order_details, props.order);
          props.history.push("/success");
        },
        onError: (err) => {
          console.log(err);
        },
      })
      .render(paypal.current);
  }, [props]);

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
