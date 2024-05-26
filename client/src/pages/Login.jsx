import React, { useState } from 'react';
import LoginImg from "../assets/images/login-img.svg";
import "../pages/Register";
import { Link } from 'react-router-dom';

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [errorMsg, setErrorMsg] = useState("");

    const handleSubmitForm = () => {

    }

    return (
        <div className='register login'>
            <div className="register__container login__container" >
                <div className="register__image">
                    <img src={LoginImg} alt="" />
                </div>
                <div className="register__content login__content">
                    <div className="register__box login__box">
                        <h3 className='register__title'>Login in Your Account</h3>
                        <form className="register__form login__form" id='register__form ' onSubmit={handleSubmitForm}>
                            <input type="text" placeholder='Email:' className='register__input-email register__input login__input' onChange={(e) => setEmail(e.target.value)} />
                            <input type="password" placeholder='Password:' className='register__input-password register__input login__input' onChange={(e) => setPassword(e.target.value)} />
                            <p className='register__alert' style={{ display: errorMsg.length > 0 ? "inline-block" : "none" }}>{errorMsg}</p>
                            <input type="submit" value="Login" className='register__submit input__submit button' />
                        </form>
                        <p className='register__link login__link'>Don't have an account? <Link to="/register" className='register__link-purple'>Register</Link></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
