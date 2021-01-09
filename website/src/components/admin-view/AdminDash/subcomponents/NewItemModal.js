import React, { useState } from "react";
import Modal from "@material-ui/core/Modal";
import { connect } from "react-redux";
import { addMenuItem } from "../../../../actions";

const NewItemModal = (props) => {
  const [newItem, setNewItem] = useState({
    item: "",
    price: "",
    dinner_or_dessert: "",
    category: "",
  });

  const handleChanges = (e) => {
    setNewItem({
      ...newItem,
      [e.target.name]: e.target.value,
    });
  };

  const addToMenuAndClose = (e) => {
    e.preventDefault();
    props.addMenuItem(newItem);
    props.closeModal();
  };

  return (
    <div>
      <Modal
        open={props.openModal}
        onClose={props.closeModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className="ad-new-item-modal">
          <h1 className="ad-new-item-modal-headline">New Menu Item</h1>
          <form onSubmit={addToMenuAndClose}>
            <div className="ad-new-item-modal-text-input-div">
              <label htmlFor="item">Item</label>
              <input
                className="login-cred-input"
                type="text"
                name="item"
                onChange={handleChanges}
              />
              <label htmlFor="price">Price</label>
              <input
                className="login-cred-input"
                type="number"
                name="price"
                onChange={handleChanges}
              />
            </div>
            <div className="ad-new-item-modal-dd-div">
              <div className="ad-new-item-modal-radio-div">
                <input
                  type="radio"
                  id="dinner"
                  name="dinner_or_dessert"
                  value="dinner"
                  className="ad-new-item-modal-radio"
                  onClick={handleChanges}
                />
                <label
                  htmlFor="dinner"
                  className="ad-new-item-modal-radio-label"
                >
                  Dinner
                </label>
              </div>
              <div className="ad-new-item-modal-radio-div">
                <input
                  type="radio"
                  id="dessert"
                  name="dinner_or_dessert"
                  value="dessert"
                  className="ad-new-item-modal-radio"
                  onClick={handleChanges}
                />
                <label
                  htmlFor="dessert"
                  className="ad-new-item-modal-radio-label"
                >
                  Dessert
                </label>
              </div>
            </div>
            <br />
            <div className="ad-new-item-modal-dd-div">
              <div className="ad-new-item-modal-radio-div">
                <input
                  type="radio"
                  id="entree"
                  name="category"
                  value="entree"
                  className="ad-new-item-modal-radio"
                  onClick={handleChanges}
                />
                <label
                  htmlFor="entree"
                  className="ad-new-item-modal-radio-label"
                >
                  Entree
                </label>
              </div>
              <div className="ad-new-item-modal-radio-div">
                <input
                  type="radio"
                  id="side"
                  name="category"
                  value="side"
                  className="ad-new-item-modal-radio"
                  onClick={handleChanges}
                />
                <label htmlFor="side" className="ad-new-item-modal-radio-label">
                  Side
                </label>
              </div>
            </div>
            <button>Submit</button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default connect(null, { addMenuItem })(NewItemModal);
