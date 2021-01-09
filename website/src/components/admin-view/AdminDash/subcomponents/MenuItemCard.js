import React from "react";
import CurrencyFormatter from "currencyformatter.js";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";

const MenuItemCard = (props) => {
  return (
    <Grid item xs={2}>
      <Card className="ad-menu-item-card" style={{ height: "40vh" }}>
        <div className="ad-menu-item-deets-cont">
          <div className="ad-avail-status-div">
            <p
              className={
                props.item.available_today === 1
                  ? "ad-avail-green"
                  : "ad-avail-red"
              }
            >
              AVAILABLE TODAY
            </p>
          </div>
          <p className="ad-menu-item-name">{props.item.item}</p>
          {/* <p className="cur-menu-item-description">
              {item.description}
            </p> */}
          <p className="ad-menu-item-price">
            {CurrencyFormatter.format(props.item.price, {
              currency: "USD",
            })}
          </p>
        </div>
        <div
          className="ad-menu-item-img"
          onClick={() => props.inputClick(props.item.id)}
        >
          {props.item.image && (
            <object data={props.item.image} alt="pic of menu item" aria-label="menu item image" />
          )}
          {!props.item.image && (
            <object
              data="https://via.placeholder.com/728x90.png?text=add+pic"
              alt="pic of menu item"
              aria-label="menu item image placeholder"
            />
          )}
          <p className="ad-menu-item-img-txt">Edit image</p>
        </div>
        {!props.item.available_today && (
          <div className="ad-avail-btn-div">
            <button
              className="ad-mark-avail-btn"
              onClick={() =>
                props.editDayAvailability(
                  { available_today: true },
                  props.item.id
                )
              }
            >
              +
            </button>
          </div>
        )}
        {props.item.available_today === 1 && (
          <div className="ad-avail-btn-div">
            <button
              className="ad-mark-unavail-btn"
              onClick={() =>
                props.editDayAvailability(
                  { available_today: false },
                  props.item.id
                )
              }
            >
              -
            </button>
          </div>
        )}
      </Card>
    </Grid>
  );
};

export default MenuItemCard;
