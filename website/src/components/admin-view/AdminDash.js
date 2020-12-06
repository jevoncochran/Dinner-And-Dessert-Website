// Admin Dashboard component
import React, { useState, useEffect } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CurrencyFormatter from "currencyformatter.js";
import "../../styles/AdminDash.scss";

const AdminDash = () => {
  const [menu, setMenu] = useState({
    entrees: [],
    sides: [],
    dessert: [],
  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/menu")
      .then((res) => {
        // console.log(res);
        setMenu({
          entrees: res.data.filter((item) => item.category === "entree"),
          sides: res.data.filter((item) => item.category === "side"),
          extras: res.data.filter((item) => item.category === "extra"),
          dessert: res.data.filter(
            (item) => item.dinner_or_dessert === "dessert"
          ),
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const editDayAvailability = (newStatus, itemId) => {
    axios
      .patch(`http://localhost:5000/api/menu/item${itemId}`, newStatus)
      .then((res) => {
        console.log(res);
        axios.get("http://localhost:5000/api/menu").then((res) => {
          // console.log(res);
          setMenu({
            entrees: res.data.filter((item) => item.category === "entree"),
            sides: res.data.filter((item) => item.category === "side"),
            extras: res.data.filter((item) => item.category === "extra"),
            dessert: res.data.filter(
              (item) => item.dinner_or_dessert === "dessert"
            ),
          });
        });
      });
  };

  return (
    <div>
      <h1 className="ad-headline">Admin Dashboard</h1>
      <h2 style={{ textAlign: "center" }}>Menu Options</h2>
      {menu.entrees.length > 0 && (
        <div className="cur-menu-category-container">
          <h3 className="ad-menu-label">Entrees</h3>
          <Grid container spacing={2}>
            {menu.entrees.map((item) => (
              <Grid item xs={2}>
                <Card className="ad-menu-item-card" style={{ height: "40vh" }}>
                  <div className="ad-menu-item-deets-cont">
                    <div className="ad-avail-status-div">
                      <p
                        className={
                          item.available_today == 1
                            ? "ad-avail-green"
                            : "ad-avail-red"
                        }
                      >
                        AVAILABLE TODAY
                      </p>
                    </div>
                    <p className="ad-menu-item-name">{item.item}</p>
                    {/* <p className="cur-menu-item-description">
                      {item.description}
                    </p> */}
                    <p className="ad-menu-item-price">
                      {CurrencyFormatter.format(item.price, {
                        currency: "USD",
                      })}
                    </p>
                  </div>
                  <div className="ad-menu-item-img">
                    <object data={item.image} alt="pic of menu item" />
                  </div>
                  {!item.available_today && (
                    <div className="ad-avail-btn-div">
                      <button
                        className="ad-mark-avail-btn"
                        onClick={() =>
                          editDayAvailability(
                            { available_today: true },
                            item.id
                          )
                        }
                      >
                        +
                      </button>
                    </div>
                  )}
                  {item.available_today === 1 && (
                    <div className="ad-avail-btn-div">
                      <button
                        className="ad-mark-unavail-btn"
                        onClick={() =>
                          editDayAvailability(
                            { available_today: false },
                            item.id
                          )
                        }
                      >
                        -
                      </button>
                    </div>
                  )}
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      )}

      {menu.sides.length > 0 && (
        <div className="cur-menu-category-container">
          <h3 className="ad-menu-label">Sides</h3>
          <Grid container spacing={2}>
            {menu.sides.map((item) => (
              <Grid item xs={2}>
                <Card className="ad-menu-item-card" style={{ height: "40vh" }}>
                  <div className="ad-menu-item-deets-cont">
                    <div className="ad-avail-status-div">
                      <p
                        className={
                          item.available_today == 1
                            ? "ad-avail-green"
                            : "ad-avail-red"
                        }
                      >
                        AVAILABLE TODAY
                      </p>
                    </div>
                    <p className="ad-menu-item-name">{item.item}</p>
                    {/* <p className="cur-menu-item-description">
                      {item.description}
                    </p> */}
                    <p className="ad-menu-item-price">
                      {CurrencyFormatter.format(item.price, {
                        currency: "USD",
                      })}
                    </p>
                  </div>
                  <div className="ad-menu-item-img">
                    <object data={item.image} alt="pic of menu item" />
                  </div>
                  {!item.available_today && (
                    <div className="ad-avail-btn-div">
                      <button
                        className="ad-mark-avail-btn"
                        onClick={() =>
                          editDayAvailability(
                            { available_today: true },
                            item.id
                          )
                        }
                      >
                        +
                      </button>
                    </div>
                  )}
                  {item.available_today === 1 && (
                    <div className="ad-avail-btn-div">
                      <button
                        className="ad-mark-unavail-btn"
                        onClick={() =>
                          editDayAvailability(
                            { available_today: false },
                            item.id
                          )
                        }
                      >
                        -
                      </button>
                    </div>
                  )}
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      )}

      {menu.dessert.length > 0 && (
        <div className="cur-menu-category-container">
          <h3 className="ad-menu-label">Dessert</h3>
          <Grid container spacing={2}>
            {menu.dessert.map((item) => (
              <Grid item xs={2}>
                <Card className="ad-menu-item-card" style={{ height: "40vh" }}>
                  <div className="ad-menu-item-deets-cont">
                    <div className="ad-avail-status-div">
                      <p
                        className={
                          item.available_today == 1
                            ? "ad-avail-green"
                            : "ad-avail-red"
                        }
                      >
                        AVAILABLE TODAY
                      </p>
                    </div>
                    <p className="ad-menu-item-name">{item.item}</p>
                    {/* <p className="cur-menu-item-description">
                      {item.description}
                    </p> */}
                    <p className="ad-menu-item-price">
                      {CurrencyFormatter.format(item.price, {
                        currency: "USD",
                      })}
                    </p>
                  </div>
                  <div className="ad-menu-item-img">
                    <object data={item.image} alt="pic of menu item" />
                  </div>
                  {!item.available_today && (
                    <div className="ad-avail-btn-div">
                      <button
                        className="ad-mark-avail-btn"
                        onClick={() =>
                          editDayAvailability(
                            { available_today: true },
                            item.id
                          )
                        }
                      >
                        +
                      </button>
                    </div>
                  )}
                  {item.available_today === 1 && (
                    <div className="ad-avail-btn-div">
                      <button
                        className="ad-mark-unavail-btn"
                        onClick={() =>
                          editDayAvailability(
                            { available_today: false },
                            item.id
                          )
                        }
                      >
                        -
                      </button>
                    </div>
                  )}
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      )}
    </div>
  );
};

export default AdminDash;
