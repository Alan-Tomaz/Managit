import React from 'react'
import "./HeroSection.css";
import WorkerMan from "../assets/images/worker-man.svg";

function HeroSection() {
    return (
        <div className='hero-section'>
            <div className="hero-section__container">
                <div className="hero-section__text">
                    <h1 className="hero-section__title">Manage your <span className='hero-section__title--colored'>inventory</span> like never before.</h1>
                    <h4 className='hero-section__subtitle'>Managit will help you organize your company's stock in the best way.</h4>
                    <div className="hero-section__buttons">
                        <button className='hero-section__button button'>Start Managit</button>
                        <button className='hero-section__button button button--outlined'>Create an Account</button>
                    </div>
                </div>
                <img src={WorkerMan} className='worker-man' />

            </div>
        </div>
    )
}

export default HeroSection
