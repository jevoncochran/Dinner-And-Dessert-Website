import React from "react";
import Card from "@material-ui/core/Card";
import { ClickAwayListener } from "@material-ui/core";
import "../../../styles/OrderCard.scss";
import CurrencyFormatter from "currencyformatter.js";
import { connect } from "react-redux";

import { closeOrderCard, removeFromOrder, updateCount } from "../../../actions";

const OrderCard = (props) => {
  const orderCount = props.order.reduce(function (prev, cur) {
    return prev + cur.count;
  }, 0);

  return (
    <ClickAwayListener onClickAway={() => props.closeOrderCard()}>
      <Card className="order-card-main">
        <i
          class="far fa-times-circle"
          style={{
            position: "relative",
            left: "-10px",
            textAlign: "left",
            width: "100%",
            marginTop: "3%",
            fontSize: "1.5rem",
          }}
          onClick={() => props.closeOrderCard()}
        ></i>

        <h1 className="order-card-title">Your Order</h1>

        <div className="order-items-cont">
          {props.order.map((item) => (
            <div key={item.id} className="order-item-div">
              <div className="order-items-cont-txt order-item-remove">
                <i
                  class="fas fa-times-circle order-items-cont-txt"
                  style={{ width: "10%" }}
                  onClick={() => props.removeFromOrder(item.id)}
                ></i>
              </div>
              <p className="order-item-count order-items-cont-txt">
                <input
                  type="number"
                  value={item.count}
                  onChange={(e) =>
                    props.updateCount(Number(e.target.value), item.id)
                  }
                  className="order-item-count-input"
                />
              </p>
              <p className="order-item-name order-items-cont-txt">
                {item.item}
              </p>
              <p className="order-item-total order-items-cont-txt">
                {CurrencyFormatter.format(item.total, { currency: "USD" })}
              </p>
              <hr />
            </div>
          ))}
        </div>

        <input
          className="order-note-input"
          type="text"
          placeholder="Special instructions..."
        />

        <button
          className="pay-button"
          onClick={() => props.history.push("/checkout")}
        >
          <div className="pay-btn-contents-container">
            <p className="total-items-count">{orderCount}</p>
            <p className="pay-btn-txt">Next step: pay</p>
            <p className="pay-btn-txt">
              {CurrencyFormatter.format(
                props.order.reduce(function (prev, cur) {
                  return prev + cur.total;
                }, 0),
                { currency: "USD" }
              )}
            </p>
          </div>
        </button>
      </Card>
    </ClickAwayListener>
  );
};

const mapStateToProps = (state) => {
  return {
    order: state.customer.order,
  };
};

export default connect(mapStateToProps, {
  closeOrderCard,
  removeFromOrder,
  updateCount,
})(OrderCard);
