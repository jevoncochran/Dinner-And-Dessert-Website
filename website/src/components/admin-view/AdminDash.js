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

  return (
    <div>
      <h1 className="ad-headline">Admin Dashboard</h1>
      <h2>Menu Options</h2>
      {menu.entrees.length > 0 && (
        <div className="cur-menu-category-container">
          <h3 className="cur-menu-label">Entrees</h3>
          <Grid container spacing={2}>
            {menu.entrees.map((item) => (
              <Grid item xs={2}>
                <Card className="cur-menu-card">
                  <div className="cur-menu-deets-cont">
                    <p className="cur-menu-item-name">{item.item}</p>
                    <p className="cur-menu-item-description">
                      {item.description}
                    </p>
                    <p className="cur-menu-item-price">
                      {CurrencyFormatter.format(item.price, {
                        currency: "USD",
                      })}
                    </p>
                  </div>
                  <div className="cur-menu-item-img">
                    <object data={item.image} alt="pic of menu item" />
                  </div>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      )}

      {menu.sides.length > 0 && (
        <div className="cur-menu-category-container">
          <h3 className="cur-menu-label">Sides</h3>
          <Grid container spacing={2}>
            {menu.sides.map((item) => (
              <Grid item xs={3}>
                <Card className="cur-menu-card">
                  <div className="cur-menu-deets-cont">
                    <p className="cur-menu-item-name">{item.item}</p>
                    <p className="cur-menu-item-description">
                      {item.description}
                    </p>
                    <p className="cur-menu-item-price">
                      {CurrencyFormatter.format(item.price, {
                        currency: "USD",
                      })}
                    </p>
                  </div>
                  <div className="cur-menu-item-img">
                    <object data={item.image} alt="pic of menu item" />
                  </div>
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
