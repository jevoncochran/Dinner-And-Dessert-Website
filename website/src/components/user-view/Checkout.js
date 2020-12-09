import React from "react";
import CurrencyFormatter from "currencyformatter.js";
import { connect } from "react-redux";
import NavBar from "./NavBar";
import "../../styles/Checkout.scss";

const Checkout = (props) => {
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
              />
              <label htmlFor="pickup">Pickup</label>
              <br />
              <input
                type="radio"
                id="delivery"
                name="order_method"
                value="delivery"
                className="checkout-method-input"
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
                <p className="checkout-amount-text">$10.70</p>
              </div>
              <div className="checkout-amount-div">
                <p className="checkout-amount-text">Tax</p>
                <p className="checkout-amount-text">$0.99</p>
              </div>
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
                        onClick={null}
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
                        onClick={null}
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
                        onClick={null}
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
                        onClick={null}
                      />
                      {/* <label for="custom-tip" style={{ fontSize: '0.8rem'}}>other</label> */}
                      <input
                        type="number"
                        value={null}
                        min="0.50"
                        step="0.50"
                        onClick={null}
                        onChange={null}
                        className="checkout-custom-tip-input"
                      />
                    </span>
                  </form>
                  <div className="tip-total-div">
                    <p>{CurrencyFormatter.format(3.0, { currency: "USD" })}</p>
                  </div>
                </div>
              </div>
              <hr />
              <div className="checkout-amount-div">
                <p className="checkout-amount-text">Total</p>
                <p className="checkout-amount-text">$11.69</p>
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
