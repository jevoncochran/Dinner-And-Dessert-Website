import React, { useState, useEffect } from "react";
import "../../../styles/Inquiry.scss";
import { connect } from "react-redux";
import emailjs from "emailjs-com";

import { submitInquiry } from "../../../actions";

const Inquiry = (props) => {
  const [inquiry, setInquiry] = useState({
    name: "",
    email: "",
    phone_number: "",
    contents: "",
    date: "",
  });

  const handleInputChange = (e) => {
    let column = e.target.name;
    setInquiry({
      ...inquiry,
      [column]: e.target.value,
    });
  };

  const handleInquirySubmit = (e) => {
    e.preventDefault();
    if (!inquiry.email && !inquiry.phone_number) {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 4000);
    } else {
      e.preventDefault();

      emailjs
        .sendForm(
          "service_cv3upmr",
          "template_85bjdlq",
          e.target,
          "user_gcST2H5scnEqWsdWxVu4s"
        )
        .then(
          (result) => {
            console.log(result.text);
          },
          (error) => {
            console.log(error.text);
          }
        );
      e.target.reset();
    }
  };

  const [showAlert, setShowAlert] = useState(false);

  return (
    <div className="inq-container">
      <h1 className="inq-headline">At Your Service</h1>
      <h3 className="inq-sub">Dinneranddessert@yahoo.com</h3>
      <div className="inq-grip-line">
        <i class="fas fa-grip-lines" style={{ width: "30%" }}></i>
      </div>
      <p className="inq-sub inq-pitch">
        Tell me a little about your event so I can begin the creation process
      </p>
      {showAlert && (
        <p className="inq-alert">Please provide email or phone number</p>
      )}
      <form className="inq-form" onSubmit={handleInquirySubmit}>
        <label>
          Name:
          <br />
          <input
            type="text"
            name="name"
            className="inq-input"
            onChange={handleInputChange}
          />
        </label>
        <label>
          Email:
          <br />
          <input
            type="text"
            name="email"
            className="inq-input"
            onChange={handleInputChange}
          />
        </label>
        <label>
          Phone Number:
          <br />
          <input
            type="text"
            name="phone_number"
            className="inq-input"
            onChange={handleInputChange}
          />
        </label>
        <label>
          Message:
          <br />
          <input
            type="text"
            name="contents"
            className="inq-input inq-msg-input"
            onChange={handleInputChange}
          />
        </label>
        <button type="submit" className="inq-submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default connect(null, { submitInquiry })(Inquiry);
