import React, { useState, useEffect } from "react";
import "../styles/Inquiry.scss";
import { connect } from "react-redux";

import { submitInquiry } from "../actions";

const Inquiry = props => {
    const [inquiry, setInquiry] = useState({
        name: '',
        email: '',
        phone_number: '',
        contents: '',
        date: ''
    })

    const handleInputChange = e => {
        let column = e.target.name
        setInquiry({
            ...inquiry,
            [column]: e.target.value
        })
    }

    useEffect(() => {
        console.log('inquiry: ', inquiry);
    }, [inquiry])

    const generateDate = () => {
        let d = new Date();
        
        var month = (1 + d.getMonth()).toString();
        month = month.length > 1 ? month : '0' + month;

        var day = d.getDate().toString();
        day = day.length > 1 ? day : '0' + day;
        
        var year = d.getFullYear();
        
        return month + '/' + day + '/' + year;
    }

    const generateTime = () => {
        let d = new Date();

        let hour = d.getHours();
        let minute = d.getMinutes();

        let time = `${hour}:${minute}`;
        
        return time
    }

    const handleInquirySubmit = e => {
        e.preventDefault();
        if (!inquiry.email && !inquiry.phone_number) {
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 4000);
        } else {
            props.submitInquiry({
                ...inquiry,
                date: generateDate(),
                time: generateTime()
            })
        }
    }

    const [showAlert, setShowAlert] = useState(false);

    // const runAlert = () => {
    //     setShowAlert(false);
    // }

    // useEffect(() => {
    //     if (showAlert) {
    //         setTimeout(setShowAlert(false), 5000);
    //     }
    // }, [showAlert])

    return (
        <div className="inq-container">
            <h1 className="inq-headline">At Your Service</h1>
            <h3 className="inq-sub">Dinneranddessert@yahoo.com</h3>
            <div className="inq-grip-line">
                <i class="fas fa-grip-lines" style={{ width: '30%' }}></i>
            </div>
            <p className="inq-sub inq-pitch">Tell me a little about your event so I can begin the creation process</p>
            {showAlert && <p className="inq-alert">Please provide email or phone number</p>}
            <form className="inq-form">
                <label>
                    Name:
                    <br />
                    <input type="text" name="name" className="inq-input" onChange={handleInputChange} />
                </label>
                <label>
                    Email:
                    <br />
                    <input type="text" name="email" className="inq-input" onChange={handleInputChange} />
                </label>
                <label>
                    Phone Number:
                    <br />
                    <input type="text" name="phone_number" className="inq-input" onChange={handleInputChange} />
                </label>
                <label>
                    Message:
                    <br />
                    <input type="text" name="contents" className="inq-input inq-msg-input" onChange={handleInputChange} />
                </label>
                <button type="submit" className="inq-submit-btn" onClick={handleInquirySubmit}>Submit</button>
            </form>
        </div>
    )
}

// const mapStateToProps = state => {
//     return {

//     }
// }

export default connect(null, { submitInquiry })(Inquiry);