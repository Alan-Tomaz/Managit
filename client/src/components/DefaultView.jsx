import React from 'react';
import './DefaultView.css';
import Logo from "../assets/images/favicon_2.png";
import { Link } from "react-router-dom";

function DefaultView() {
    return (
        <div className='defaultview'>
            <div className="defaultview__trace" id='defaultview__trace--1'></div>
            <div className="defaultview__trace" id='defaultview__trace--2'></div>
            <div className="defaultview__content">
                <h1>Managit</h1>
                <img src={Logo} alt='defaultview' />
                <p>You must be logged in to use the site.</p>
                <div className="defaultview__buttons">
                    <Link to='/login' className='button defaultview__button'>Login</Link>
                    <Link to='/register' className='button defaultview__button button--outlined'>Register Account</Link>
                </div>
            </div>
        </div>
    )
}

export default DefaultView
