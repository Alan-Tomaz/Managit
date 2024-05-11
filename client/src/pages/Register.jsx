import React, { useEffect, useRef, useState } from 'react'
import "./Register.css";
import RegisterImg from "../assets/images/register-img.svg";
import { useSelector } from 'react-redux';
import UserImg from "../assets/images/user.png";
import Image from "../assets/images/image.png";
import { Link } from "react-router-dom";
import { US, BR } from "country-flag-icons/react/3x2";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";


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
    const [countryCode, setCountryCode] = useState(1);


    const [isFocusingPhoneInput, setIsFocusingPhoneInput] = useState(false);
    const [isCountryListOpen, setIsCountryListOpen] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [birthInputType, setBirthInputType] = useState("text");
    const [previewImg, setPreviewImg] = useState(UserImg);

    const [countries, setCountries] = useState([<li key={1} id='country-item-1' className='register__input__contry-item' onClick={() => handleChangeCountry(1)}><div className="register__input__contry-img"><US className='register__input__country-flag' /><span className='register__input__country-text' id='country-1'>United States</span></div><span className='register__input__country-text'>+1</span></li>, <li key={2} className='register__input__contry-item' id='country-item-2' onClick={() => handleChangeCountry(55)}><div className="register__input__contry-img"><BR className='register__input__country-flag' /><span className='register__input__country-text' id='country-2'>Brazil</span></div><span className='register__input__country-text'>+55</span></li>]);

    const countryListRef = useRef(null);

    useEffect(() => {
        /* CLOSE WINDOW WHEN CLICK OUTSIDE */
        const handleClickOutside = (event) => {
            if (countryListRef.current && !countryListRef.current.contains(event.target)) {
                setIsCountryListOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handlePhoneNumber = (e) => {
        /* FORMATTING PHONE NUMBER */
        const newPhoneNumber = e.target.value.replace(/[^\d]/g, '');
        const phoneNumberLength = newPhoneNumber.length;
        switch (countryCode) {
            case 1:
                if (phoneNumberLength < 4) {
                    setPhoneNumber(newPhoneNumber);
                }
                else if (phoneNumberLength < 7) {
                    setPhoneNumber(`(${newPhoneNumber.slice(0, 3)}) ${newPhoneNumber.slice(3)}`);
                }
                else {
                    setPhoneNumber(`(${newPhoneNumber.slice(0, 3)}) ${newPhoneNumber.slice(3, 6)}-${newPhoneNumber.slice(6, 10)}`);
                }
                break;
            case 55:
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
                break;
        }
    }


    const handleChangeCountry = (code) => {
        setCountryCode(code);
        setIsCountryListOpen(false);
        setPhoneNumber("");
    }

    const handleSearchCountry = (e) => {
        const searchValue = e.target.value.toLowerCase();

        countries.map((country, index) => {
            const countryName = document.getElementById(`country-${index + 1}`).innerHTML.toLowerCase();
            const countryItem = document.getElementById(`country-item-${index + 1}`);
            const isMatched = countryName.includes(searchValue)
            countryItem.classList.toggle('hide', !isMatched)
        })

    }

    const handleChangePhoneInputBackground = () => {
        const isFocusing = isFocusingPhoneInput;
        setIsFocusingPhoneInput(!isFocusing);
    }

    const handleChangeDateInput = (e, type) => {
        const input = e.target;

        switch (type) {
            case "focus":
                setBirthInputType("date");
                break;
            case "blur":
                if (input.value.length == 0) {
                    setBirthInputType("text");
                }
                break;
            case "double_click":
                input.showPicker();
                break;
        }

    }

    const handlePreviewImage = (e) => {
        const inputTarget = e.target;
        const file = inputTarget.files[0];

        const fileType = file.name.split('.')[1];
        const fileSize = (file.size / 1024);

        const supportedFiles = ['jpeg', 'png', 'jpg'];

        if (file && fileSize < 2048 && supportedFiles.includes(fileType)) {
            const reader = new FileReader();

            reader.addEventListener('load', (e) => {
                const readerTarget = e.target;
                setPreviewImg(readerTarget.result);
            })

            reader.readAsDataURL(file);
        }
    }

    const handleSubmitForm = (e) => {
        e.preventDefault();

        setErrorMsg("AAA");
    }

    return (
        <div className='register'>
            <div className="register__container" >
                <div className="register__image">
                    <img src={RegisterImg} alt="" />
                </div>
                <div className="register__content">
                    <div className="register__box">
                        <h3 className='register__title'>Create an Account</h3>
                        <div className="register__user">
                            <img src={previewImg} alt="User Picture" className='register__user-img' />
                            <img src={Image} alt="" className='register__img' onClick={() => document.getElementById("register__file").click()} />
                            <input type="file" name="register__file" id="register__file" className='register__file' onChange={handlePreviewImage} />
                        </div>
                        <form className="register__form" id='register__form' onSubmit={handleSubmitForm}>
                            <input type="text" placeholder='Name:' className='register__input-name register__input' onChange={(e) => setName(e.target.value)} />
                            <input type="text" placeholder='Email:' className='register__input-email register__input' onChange={(e) => setEmail(e.target.value)} />
                            <div className="register__input-phonenumber" style={{ backgroundColor: isFocusingPhoneInput === true ? "#e0e0e0" : "var(--bg-color)" }} ref={countryListRef} >
                                <div className="register__input__country-selected" onClick={() => setIsCountryListOpen(!isCountryListOpen)}>
                                    <US style={{ display: countryCode == "1" ? "flex" : "none" }} className='register__input__country-flag' />
                                    <BR style={{ display: countryCode == "55" ? "flex" : "none" }} className='register__input__country-flag' />
                                    <IoIosArrowDown className='register__input__country-arrow' style={{ display: isCountryListOpen ? "none" : "inline-block" }} />
                                    <IoIosArrowUp className='register__input__country-arrow' style={{ display: isCountryListOpen ? "inline-block" : "none" }} />
                                </div>
                                <input type="text" placeholder='Phone Number:' className='register__input__phone-input register__input' id='input__phone-number' onChange={(e) => handlePhoneNumber(e)} value={phoneNumber} onFocus={handleChangePhoneInputBackground} onBlur={handleChangePhoneInputBackground} />
                                <div className="register__input__countries" style={{ visibility: isCountryListOpen ? "visible" : "hidden", opacity: isCountryListOpen ? "1" : "0" }}>
                                    <input type="text" className='register__input__country-search register__input' onChange={handleSearchCountry} />
                                    <ul className="register__input__contry-list">
                                        {countries}
                                    </ul>
                                </div>
                            </div>
                            <input type={birthInputType} placeholder='Birth Date:' className='register__input-birthdate register__input' id='input__birth-date' onChange={(e) => setBirthDate(e.target.value)} onFocus={(e) => handleChangeDateInput(e, "focus")} onBlur={(e) => handleChangeDateInput(e, "blur")} onDoubleClick={(e) => handleChangeDateInput(e, "double_click")} />
                            <input type="text" placeholder='Location:' className='register__input-location register__input' onChange={(e) => setLocation(e.target.value)} />
                            <textarea type="text" placeholder='Description:' className='register__input-description register__input' onChange={(e) => setDescription(e.target.value)}></textarea>
                            <input type="password" placeholder='Password:' className='register__input-password register__input' onChange={(e) => setPassword(e.target.value)} />
                            <input type="password" placeholder='Confirm Your Password:' className='register__input-password register__input' onChange={(e) => setConfirmPassword(e.target.value)} />
                            <p className='register__alert' style={{ display: errorMsg.length > 0 ? "inline-block" : "none" }}>{errorMsg}</p>
                            <input type="submit" value="Create Account" className='register__submit button' />
                        </form>
                        <p className='register__link'>Already Have an Account? <Link to="/login" className='register__link-purple'>Login</Link></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register;
