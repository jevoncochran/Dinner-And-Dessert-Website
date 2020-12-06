import React from "react";
import logo from "../../assets/dd-logo.jpg";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaShoppingBasket } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import "../../styles/NavBar.scss";
import { connect } from "react-redux";

import { openOrderCard } from "../../actions";

const NavBar = props => {
    return (
        <div className="navbar">
            <img src={logo} alt="Dinner and Dessert logo" className="nav-logo" />
            <div className="nav-link-container">
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/menus" className="nav-link">Menus</Link>
                <Link to="/contact" className="nav-link">Contact</Link>
            </div>
            <div className="nav-social-icons-container">
                <a href="https://www.instagram.com/dinneranddessertllc/" target="_blank" className="nav-social-link"><FaInstagram /></a>
                <a href="https://www.facebook.com/kendra.carpenter.7503" target="_blank" className="nav-social-link"><FaFacebook /></a>
                <a href="https://www.google.com" target="_blank" className="nav-social-link"><HiOutlineMail /></a>
            </div>
            {props.order.length > 0 && <div className="nav-order-icon" onClick={props.openOrderCard} >
                <FaShoppingBasket />
            </div>}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        order: state.customer.order
    }
}
export default connect(mapStateToProps, { openOrderCard })(NavBar);
  
