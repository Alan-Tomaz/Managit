import React, { useState } from 'react'
import "./Register.css";
import RegisterImg from "../assets/images/register-img.svg";
import { useSelector } from 'react-redux';
import UserImg from "../assets/images/user.png";
import Image from "../assets/images/image.png";
import { Link } from "react-router-dom";
import { US, BR } from "country-flag-icons/react/3x2";


function Register() {
    const apiUrl = useSelector((state) => state.MiscReducer.apiUrl);
    const apiPort = useSelector((state) => state.MiscReducer.apiPort);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handlePhoneNumber = (e) => {

        const newPhoneNumber = e.target.value.replace(/[^\d]/g, '');

        const phoneNumberLength = newPhoneNumber.length;

        if (phoneNumberLength < 3) {
            setPhoneNumber(newPhoneNumber);
        }
        else if (phoneNumberLength < 4) {
            setPhoneNumber(`(${newPhoneNumber.slice(0, 2)}) ${newPhoneNumber.slice(2, 3)}`);
        }
        else if (phoneNumberLength < 8) {
            setPhoneNumber(`(${newPhoneNumber.slice(0, 2)}) ${newPhoneNumber.slice(2, 3)} ${newPhoneNumber.slice(3)}`);
        }
        else {
            setPhoneNumber(`(${newPhoneNumber.slice(0, 2)}) ${newPhoneNumber.slice(2, 3)} ${newPhoneNumber.slice(3, 7)}-${newPhoneNumber.slice(7, 11)}`);
        }

    }

    const handleSubmitForm = (e) => {
        e.preventDefault();
    }

    return (
        <div className='register'>
            <div className="register__container">
                <div className="register__image">
                    <img src={RegisterImg} alt="" />
                </div>
                <div className="register__content">
                    <div className="register__box">
                        <h3 className='register__title'>Create an Account</h3>
                        <div className="register__user">
                            <img src={UserImg} alt="" className='register__user-img' />
                            <img src={Image} alt="" className='register__img' />
                        </div>
                        <form className="register__form" id='register__form' onSubmit={() => handleSubmitForm()}>
                            <input type="text" placeholder='Name:' className='register__input-name register__input' onChange={(e) => setName(e.target.value)} />
                            <input type="text" placeholder='Email:' className='register__input-email register__input' onChange={(e) => setEmail(e.target.value)} />
                            <input type="text" placeholder='Phone Number:' className='register__input-phonenumber register__input' id='input__phone-number' onChange={(e) => handlePhoneNumber(e)} value={phoneNumber} />
                            <input type="date" placeholder='Birth Date:' className='register__input-birthdate register__input' id='input__birth-date' onChange={(e) => setBirthDate(e.target.value)} />
                            <input type="text" placeholder='Location:' className='register__input-location register__input' onChange={(e) => setLocation(e.target.value)} />
                            <textarea type="text" placeholder='Description:' className='register__input-description register__input' onChange={(e) => setDescription(e.target.value)}></textarea>
                            <input type="password" placeholder='Password:' className='register__input-password register__input' onChange={(e) => setPassword(e.target.value)} />
                            <input type="password" placeholder='Confirm Your Password:' className='register__input-password register__input' onChange={(e) => setConfirmPassword(e.target.value)} />
                            <input type="submit" value="Create Account" className='register__submit button' />
                        </form>
                        <p className='register__link'>Already Have an Account? <Link to="/login" className='register__link-purple'>Login</Link></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register
