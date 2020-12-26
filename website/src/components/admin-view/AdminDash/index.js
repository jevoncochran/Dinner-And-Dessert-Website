// Admin Dashboard component
import React, { useState, useEffect } from "react";
import "./AdminDash.scss";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import NewItemModal from "./subcomponents/NewItemModal";
import { getAllMenuItems } from "./functions/getAllMenuItems.js";
import { changeItemPic } from "./functions/changeItemPic";
// import { editDayAvailability } from "./functions/editDayAvailability";
import MenuCategorySection from "./subcomponents/MenuCategorySection";
import axios from "axios";

const client = new W3CWebSocket("ws://127.0.0.1:8000");

const AdminDash = (props) => {
  const [menu, setMenu] = useState({
    entrees: [],
    sides: [],
    dessert: [],
  });

  const [newItemImage, setNewItemImage] = useState(null);

  const [imageToChange, setImageToChange] = useState(null);

  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setNewItemImage(e.target.files[0]);
    }
  };

  const editDayAvailability = (newStatus, itemId) => {
    axios
      .patch(`http://localhost:5000/api/menu/item${itemId}`, newStatus)
      .then(() => {
        getAllMenuItems().then((res) => {
          setMenu({
            entrees: res.entrees,
            sides: res.sides,
            dessert: res.dessert,
          });
        });
      });
  };

  let inputFile = "";
  const inputClick = (imageId) => {
    setImageToChange(imageId);
    inputFile.click();
  };

  useEffect(() => {
    if (newItemImage) {
      changeItemPic(newItemImage, imageToChange);
    }
  }, [newItemImage]);

  useEffect(() => {
    getAllMenuItems().then((res) => {
      setMenu({
        entrees: res.entrees,
        sides: res.sides,
        dessert: res.dessert,
      });
    });
  }, [newItemImage]);

  useEffect(() => {
    client.onopen = () => {
      console.log("WebSocket Client connected");
    };

    client.onmessage = (message) => {
      const dataFromServer = JSON.parse(message.data);
      console.log("got order! ", dataFromServer);
    };
  });

  return (
    <div>
      <h1 className="ad-headline">Admin Dashboard</h1>
      <button onClick={() => props.history.push("/admin/orders")}>
        Go To Orders
      </button>
      <h2 style={{ textAlign: "center" }}>Menu Options</h2>
      <MenuCategorySection
        title="Entrees"
        openModal={openModal}
        category={menu.entrees}
        editDayAvailability={editDayAvailability}
        inputClick={inputClick}
      />

      <MenuCategorySection
        title="Sides"
        openModal={openModal}
        category={menu.sides}
        editDayAvailability={editDayAvailability}
        inputClick={inputClick}
      />

      <MenuCategorySection
        title="Dessert"
        openModal={openModal}
        category={menu.dessert}
        editDayAvailability={editDayAvailability}
        inputClick={inputClick}
      />

      <input
        className="ad-change-image-input"
        type="file"
        id="menu-item-img-file"
        name="menu-item-img-file"
        placeholder="test"
        onChange={handleFileChange}
        ref={(input) => (inputFile = input)}
      />

      {showModal && (
        <NewItemModal openModal={openModal} closeModal={closeModal} />
      )}
    </div>
  );
};

export default AdminDash;
