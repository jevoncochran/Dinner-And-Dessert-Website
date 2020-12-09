import React, { useState } from "react";
import CurrencyFormatter from "currencyformatter.js";
import { connect } from "react-redux";
import NavBar from "./NavBar";
import "../../styles/Checkout.scss";

const Checkout = (props) => {
  // order subtotal derived from sum of (each item x item count)
  const orderSubtotal = props.order.reduce(function (prev, cur) {
    return prev + cur.total;
  }, 0);

  // tip percentage and tip amount
  const [tipVal, setTipVal] = useState({
    tipPerc: 0,
    tip: 0,
  });

  // holds value for custom tip only when user types into custom input in tip div
  const [customTip, setCustomTip] = useState(null);

  const [delivery, setDelivery] = useState(false);

  // calculates tip from percentage radio buttons in tip div
  // triggered by onclick on percentage radio buttons
  const getSuggestedTip = () => {
    let tipRadios = document.getElementsByName("tip");

    tipRadios.forEach((ele) => {
      if (ele.checked) {
        setTipVal({
          tipPerc: ele.value,
          tip: orderSubtotal * ele.value,
        });
      }
    });
  };

  // calculates tip from user input in tip div
  // triggered by onclick on custom radio button
  const getCustomTip = () => {
    let custTipRad = document.getElementById("custom-tip");

    setTipVal({
      tip: custTipRad.value,
      tipPerc: null,
    });
  };

  const handleCustTipClick = () => {
    let custTipRad = document.getElementById("custom-tip");
    custTipRad.clicked = true;
  };

  // updates tip amount per value user types into input in tip div
  const handleCustTipChange = (e) => {
    // let custTipFormatted = CurrencyFormatter.format(e.target.value, { currency: 'USD' });
    setCustomTip(e.target.value);
    setTipVal({
      tip: e.target.value,
      tipPerc: null,
    });
  };

  return (
    <div>
      <NavBar />
      <div className="checkout">
        <h1 className="checkout-headline">Checkout</h1>
        <div className="checkout-main-container">
          <div className="checkout-sub-container">
            <div className="checkout-cust-info-div">
              <div className="checkout-name-and-phone">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  className="checkout-cust-info-input"
                />
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone Number"
                  className="checkout-cust-info-input"
                />
              </div>
              <br />
              <input
                type="text"
                name="address"
                placeholder="Delivery address"
                className="checkout-cust-info-input"
              />
            </div>

            <div className="checkout-method-div">
              <h3>Method</h3>
              <input
                type="radio"
                id="pickup"
                name="order_method"
                value="pickup"
                className="checkout-method-input"
                onClick={() => setDelivery(false)}
              />
              <label htmlFor="pickup">Pickup</label>
              <br />
              <input
                type="radio"
                id="delivery"
                name="order_method"
                value="delivery"
                className="checkout-method-input"
                onClick={() => setDelivery(true)}
              />
              <label htmlFor="female">Delivery</label>
            </div>
          </div>

          <div className="checkout-sub-container">
            <div className="checkout-order-summary-div">
              <h3>Order Summary</h3>
              {props.order.map((item) => (
                <div key={item.id} className="checkout-order-item-div">
                  <i
                    class="fas fa-times-circle"
                    style={{ width: "10%" }}
                    onClick={null}
                  ></i>
                  <p className="checkout-order-item-count">
                    <input
                      className="checkout-order-item-count-input"
                      type="number"
                      value={item.count}
                      onChange={null}
                    />
                  </p>
                  <p className="checkout-order-item-name">{item.item}</p>
                  <p className="checkout-order-item-total">
                    {CurrencyFormatter.format(item.total, { currency: "USD" })}
                  </p>
                </div>
              ))}
              <label htmlFor="special-instr-input">Special instructions</label>
              <br />
              <input
                className="checkout-order-note-input"
                type="text"
                id="special-instr-input"
              />
              <hr />
              <div className="checkout-amount-div">
                <p className="checkout-amount-text">Subtotal</p>
                <p className="checkout-amount-text">
                  {CurrencyFormatter.format(orderSubtotal, { currency: "USD" })}
                </p>
              </div>
              <div className="checkout-amount-div">
                <p className="checkout-amount-text">Tax</p>
                <p className="checkout-amount-text">
                  {CurrencyFormatter.format(orderSubtotal * 0.06, {
                    currency: "USD",
                  })}
                </p>
              </div>
              {delivery && (
                <div className="checkout-amount-div">
                  <p className="checkout-amount-text">Delivery fee</p>
                  <p className="checkout-amount-text">
                    {CurrencyFormatter.format(5.0, { currency: "USD" })}
                  </p>
                </div>
              )}
              <div className="checkout-tip-div">
                <p className="checkout-tip-label">Add tip</p>
                <div className="checkout-tip-calc-div">
                  <form className="checkout-tip-amount-div">
                    <span className="checkout-tip-radio-span">
                      <input
                        type="radio"
                        id="tip1"
                        name="tip"
                        value={0.05}
                        className="checkout-tip-radio"
                        onClick={getSuggestedTip}
                      />
                      <label for="tip1">5%</label>
                    </span>
                    <span className="checkout-tip-radio-span">
                      <input
                        type="radio"
                        id="tip2"
                        name="tip"
                        value={0.1}
                        className="checkout-tip-radio"
                        onClick={getSuggestedTip}
                      />
                      <label for="tip2">10%</label>
                    </span>
                    <span className="checkout-tip-radio-span">
                      <input
                        type="radio"
                        id="tip3"
                        name="tip"
                        value={0.15}
                        className="checkout-tip-radio"
                        onClick={getSuggestedTip}
                      />
                      <label for="tip3">15%</label>
                    </span>
                    <span className="checkout-tip-radio-span">
                      <input
                        type="radio"
                        id="custom-tip"
                        name="tip"
                        value={null}
                        className="checkout-tip-radio"
                        onClick={getCustomTip}
                      />
                      {/* <label for="custom-tip" style={{ fontSize: '0.8rem'}}>other</label> */}
                      <input
                        type="number"
                        value={customTip}
                        min="0.50"
                        step="0.50"
                        onClick={handleCustTipClick}
                        onChange={handleCustTipChange}
                        className="checkout-custom-tip-input"
                      />
                    </span>
                  </form>
                  <div className="tip-total-div">
                    <p>
                      {CurrencyFormatter.format(tipVal.tip, {
                        currency: "USD",
                      })}
                    </p>
                  </div>
                </div>
              </div>
              <hr />
              <div className="checkout-amount-div">
                <p
                  className="checkout-amount-text"
                  style={{ fontWeight: "bold" }}
                >
                  Total
                </p>
                <p className="checkout-amount-text">
                  {delivery ? CurrencyFormatter.format(
                    orderSubtotal + orderSubtotal * 0.06 + tipVal.tip + 5,
                    { currency: "USD" }
                  ) : CurrencyFormatter.format(
                    orderSubtotal + orderSubtotal * 0.06 + tipVal.tip,
                    { currency: "USD" }
                  )}
                </p>
              </div>
            </div>
            <button className="checkout-confirm-btn">Confirm Order</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    order: state.customer.order,
  };
};

export default connect(mapStateToProps, {})(Checkout);
