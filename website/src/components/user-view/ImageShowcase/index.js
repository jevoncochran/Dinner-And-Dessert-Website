import React from "react";
import dessert from "../../../assets/dessert.jpg";
import jerk_chicken from "../../../assets/jerk-chicken.jpg";
import lambChopDinner from "../../../assets/lamb-chop-dinner.jpg";
import macAndCheese from "../../../assets/mac-and-cheese.jpg";
import "../../../styles/ImageShowcase.scss";

const ImageShowcase = () => {
  return (
    <div className="img-showcase-container">
      <div className="img-showcase-img-container">
        <img src={macAndCheese} alt="food" className="img-showcase-img" />
        <p className="img-showcase-img-txt">
          And on the eighth day, God made mac and cheese and blessed us with the
          recipe...
        </p>
      </div>
      <div className="img-showcase-img-container">
        <img src={lambChopDinner} alt="food" className="img-showcase-img" />
        <p className="img-showcase-img-txt">
          No one does lamb chops like Dinner and Dessert!!!
        </p>
      </div>
      <div className="img-showcase-img-container">
        <img src={dessert} alt="food" className="img-showcase-img" />
        <p className="img-showcase-img-txt">
          We dare you to try our desserts and *not* get addicted...
        </p>
      </div>
      <div className="img-showcase-img-container">
        <img src={jerk_chicken} alt="food" className="img-showcase-img" />
        <p className="img-showcase-img-txt">
          The best bbq jerk chicken in the D!!!
        </p>
      </div>
    </div>
  );
};

export default ImageShowcase;
