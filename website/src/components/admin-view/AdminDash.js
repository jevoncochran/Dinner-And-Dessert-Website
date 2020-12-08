// Admin Dashboard component
import React, { useState, useEffect } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CurrencyFormatter from "currencyformatter.js";
import "../../styles/AdminDash.scss";
import { storage } from "../../firebase";

const AdminDash = () => {
  const [menu, setMenu] = useState({
    entrees: [],
    sides: [],
    dessert: [],
  });

  const [newItemImage, setNewItemImage] = useState(null);

  const [uploadProgress, setUploadProgress] = useState(0);

  const [imageToChange, setImageToChange] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setNewItemImage(e.target.files[0]);
    }
  };

  let inputFile = "";
  const inputClick = (imageId) => {
    setImageToChange(imageId);
    inputFile.click();
  };

  useEffect(() => {
    if (newItemImage) {
      const uploadTask = storage
        .ref(`menu-pics/${newItemImage.name}`)
        .put(newItemImage);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setUploadProgress(progress);
        },
        (error) => {
          console.log(error);
        },
        () => {
          storage
            .ref("menu-pics")
            .child(newItemImage.name)
            .getDownloadURL()
            .then((url) => {
              console.log(url);
              // setProfilePicUrl(url);
              axios
                .patch(`http://localhost:5000/api/menu/item${imageToChange}`, {
                  image: url,
                })
                .then((res) => {
                  console.log(res);
                  axios.get("http://localhost:5000/api/menu").then((res) => {
                    // console.log(res);
                    setMenu({
                      entrees: res.data.filter(
                        (item) => item.category === "entree"
                      ),
                      sides: res.data.filter(
                        (item) => item.category === "side"
                      ),
                      extras: res.data.filter(
                        (item) => item.category === "extra"
                      ),
                      dessert: res.data.filter(
                        (item) => item.dinner_or_dessert === "dessert"
                      ),
                    });
                  });
                });
            });
        }
      );
    }
  }, [newItemImage]);

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
                  <div
                    className="ad-menu-item-img"
                    onClick={() => inputClick(item.id)}
                  >
                    {item.image && (
                      <object data={item.image} alt="pic of menu item" />
                    )}
                    {!item.image && (
                      <object
                        data="https://via.placeholder.com/728x90.png?text=add+pic"
                        alt="pic of menu item"
                      />
                    )}
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
                  <div className="ad-menu-item-img" onClick={inputClick}>
                    {item.image && (
                      <object data={item.image} alt="pic of menu item" />
                    )}
                    {!item.image && (
                      <object
                        data="https://via.placeholder.com/728x90.png?text=add+pic"
                        alt="pic of menu item"
                      />
                    )}
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
                  <div className="ad-menu-item-img" onClick={inputClick}>
                    {item.image && (
                      <object data={item.image} alt="pic of menu item" />
                    )}
                    {!item.image && (
                      <object
                        data="https://via.placeholder.com/728x90.png?text=add+pic"
                        alt="pic of menu item"
                      />
                    )}
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

      <input
        className="ad-change-image-input"
        type="file"
        id="menu-item-img-file"
        name="menu-item-img-file"
        placeholder="test"
        onChange={handleFileChange}
        ref={(input) => (inputFile = input)}
      />
    </div>
  );
};

export default AdminDash;
