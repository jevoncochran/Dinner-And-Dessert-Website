import React, { useState, useEffect } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import "../../styles/CurrentMenu.scss";
import CurrencyFormatter from "currencyformatter.js";
import MenuItemModal from "./MenuItemModal";
import OrderCard from "./OrderCard";
import { connect } from "react-redux";

const CurrentMenu = props => {
    const [menu, setMenu] = useState({
        entrees: [],
        sides: [],
        dessert: [],
        extras: []
    })

    // user clicks on card for particular menu item
    // that menu item is captured in state
    // menu item state used to show that menu item when MenuItemModal is opened 
    const [menuItem, setMenuItem] = useState({
        id: '',
        name: '',
        description: '',
        image: '',
        price: ''
    })

    // determines whether or not MenuItemModal component is open
    const [openMode, setOpenMode] = useState(false);

    // sets modalOpen to true, thus openinng the menu item modal
    const openModal = () => {
        setOpenMode(true);
    } 

     // sets modalOpen to false, thus closing the menu item modal
     const closeModal = () => {
        setOpenMode(false);
    }



    useEffect(() => {
        axios
        .get('http://localhost:5000/api/menu/current')
        .then(res => {
            // console.log(res);
            setMenu({ 
                entrees: res.data.filter(item => item.category === 'entree'),
                sides: res.data.filter(item => item.category === 'side'),
                extras: res.data.filter(item => item.category === 'extra'),
                dessert: res.data.filter(item => item.dinner_or_dessert === 'dessert')
            });
        })
        .catch(err => {
            console.log(err);
        })
    }, [])

    // just to see menuItem being set
    // will take out
    useEffect(() => {
        console.log('menu item: ', menuItem)
    }, [menuItem]);

    return (
        <div className="cur-menu">
            <h1 className="cur-menu-header">Today's Menu</h1>
            {menu.entrees.length > 0 && (
                <div className="cur-menu-category-container">
                    <h3 className="cur-menu-label">Entrees</h3>
                        <Grid container spacing={2}>
                            {menu.entrees.map(item => (
                                    <Grid item xs={3} onClick={() => {
                                        setMenuItem({ id: item.id, name: item.item, description: item.description, image: item.image, price: item.price })
                                    }}>
                                        <Card className="cur-menu-card" onClick={openModal}>
                                            <div className="cur-menu-deets-cont">
                                                <p className="cur-menu-item-name">{item.item}</p>
                                                <p className="cur-menu-item-description">{item.description}</p>
                                                <p className="cur-menu-item-price">{CurrencyFormatter.format(item.price, { currency: 'USD' })}</p>
                                            </div>
                                            <div className="cur-menu-item-img">
                                                <object data={item.image} alt="pic of menu item" />
                                            </div>
                                        </Card>
                                    </Grid>
                            ))}
                        </Grid>
                        <MenuItemModal openMode={openMode} closeModal={closeModal} menuItem={menuItem} />
                </div>
            )}

            {menu.sides.length > 0 && (
                <div className="cur-menu-category-container">
                    <h3 className="cur-menu-label">Sides</h3>
                        <Grid container spacing={2}>
                            {menu.sides.map(item => (
                                    <Grid item xs={3} onClick={() => {
                                        setMenuItem({ id: item.id, name: item.item, description: item.description, image: item.image, price: item.price })
                                    }}>
                                        <Card className="cur-menu-card" onClick={openModal}>
                                            <div className="cur-menu-deets-cont">
                                                <p className="cur-menu-item-name">{item.item}</p>
                                                <p className="cur-menu-item-description">{item.description}</p>
                                                <p className="cur-menu-item-price">{CurrencyFormatter.format(item.price, { currency: 'USD' })}</p>
                                            </div>
                                            <div className="cur-menu-item-img">
                                                <object data={item.image} alt="pic of menu item" />
                                            </div>
                                        </Card>
                                    </Grid>
                            ))}
                        </Grid>
                        <MenuItemModal openMode={openMode} closeModal={closeModal} menuItem={menuItem} />
                </div>
            )}

            {menu.dessert.length > 0 && (
                <div className="cur-menu-category-container">
                    <h3 className="cur-menu-label">Dessert</h3>
                        <Grid container spacing={2}>
                            {menu.dessert.map(item => (
                                    <Grid item xs={3} onClick={() => {
                                        setMenuItem({ id: item.id, name: item.item, description: item.description, image: item.image, price: item.price })
                                    }}>
                                        <Card className="cur-menu-card" onClick={openModal}>
                                            <div className="cur-menu-deets-cont">
                                                <p className="cur-menu-item-name">{item.item}</p>
                                                <p className="cur-menu-item-description">{item.description}</p>
                                                <p className="cur-menu-item-price">{CurrencyFormatter.format(item.price, { currency: 'USD' })}</p>
                                            </div>
                                            <div className="cur-menu-item-img">
                                                <object data={item.image} alt="pic of menu item" />
                                            </div>
                                        </Card>
                                    </Grid>
                            ))}
                        </Grid>
                        <MenuItemModal openMode={openMode} closeModal={closeModal} menuItem={menuItem} />
                </div>
            )}

            {props.orderCardOpen && <OrderCard history={props.history} />}

        </div>
    )
}

const mapStateToProps = state => {
    return {
        orderCardOpen: state.orderCardOpen,
    }
}

export default connect(mapStateToProps, {})(CurrentMenu);