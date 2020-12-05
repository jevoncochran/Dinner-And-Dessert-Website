import React, { useRef, useEffect } from "react";
import lambChopVid from "../../assets/dd-lamb-chop-video.mov";
import "../../styles/Home.scss";

// component imports
import CurrentMenu from "./CurrentMenu";
import Inquiry from "./Inquiry";
import ImageShowcase from "./ImageShowcase";
import NavBar from "./NavBar";

const Home = () => {
    
    // code to slow the video down
    let vid_ref = useRef(null);
    useEffect(() => {
        vid_ref.playbackRate = 0.7;
    }, [])

    return (
        <div>
            <NavBar />
            <div className="home-page-vid-container">
                <video width="100%" autoPlay loop muted playbackSpeed="0.1" className="home-page-vid" id="lamb-chop-vid" ref={ref => vid_ref = ref}>
                    <source src={lambChopVid} type="video/mp4"/>
                </video>
                <div className="home-page-slogan-container">
                    <div className="home-page-slogan-grouping">
                        <h3 className="home-page-slogan">Dinners</h3>
                        <h3 className="home-page-slogan">Private Chef</h3>
                    </div>
                    <div className="home-page-slogan-grouping">
                        <h3 className="home-page-slogan">Popup Shops</h3>
                        <h3 className="home-page-slogan">Catering Weekly</h3>
                    </div>
                </div>
            </div>
            <CurrentMenu />
            <Inquiry />
            <ImageShowcase />
        </div>
    )
}

export default Home;