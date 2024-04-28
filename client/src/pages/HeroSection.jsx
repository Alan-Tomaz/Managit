import React from 'react'
import "./HeroSection.css";
import WorkerMan from "../assets/images/worker-man.svg";
import { Link } from "react-router-dom";


function HeroSection() {

    const screenWidth = window.screen.width;

    return (
        <div className='hero-section'>
            <div className="hero-section__text">
                <h1 className="hero-section__title">
                    Manage your
                    <span className='hero-section__title--colored'> inventory</span>
                    <br />
                    like never before.
                </h1>
                <h4 className='hero-section__subtitle'>
                    Managit will help you organize your company's stock in {screenWidth > 600 && <br />} the best way.
                </h4>
                <div className="hero-section__buttons">
                    <Link to="/home" className='hero-section__button button'>Start Managit</Link>
                    <Link to="/register" className='hero-section__button button button--outlined'>Create an Account</Link>
                </div>
            </div>
            <div className="hero-section__image">
                <img src={WorkerMan} className='' />
                <div className="hero-section__circle" id='circle-1'></div>
                <div className="hero-section__circle" id='circle-2'></div>
                <div className="hero-section__circle" id='circle-3'></div>
            </div>
        </div>
    )
}

export default HeroSection
