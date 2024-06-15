import React, { useEffect, useRef, useState } from 'react'
import "./Register.css";
import RegisterImg from "../assets/images/register-img.svg";
import { useSelector } from 'react-redux';
import UserImg from "../assets/images/user.png";
import Image from "../assets/images/image.png";
import LoadingSuccess from "../assets/images/loading-success.svg";
import Loading from "../assets/images/loading.svg"
import { Link, useNavigate } from "react-router-dom";
import { US, BR } from "country-flag-icons/react/3x2";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { FaEye, FaEyeSlash } from "react-icons/fa";


function Register() {
    const apiUrl = useSelector((state) => state.MiscReducer.apiUrl);
    const apiPort = useSelector((state) => state.MiscReducer.apiPort);

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [countryCode, setCountryCode] = useState(1);
    const [picture, setPicture] = useState("");

    const [isShowingPassword, setIsShowingPassword] = useState("password");
    const [isShowingConfirmPassword, setIsShowingConfirmPassword] = useState("password");
    const [isLoading, setIsLoading] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    const [isFocusingPhoneInput, setIsFocusingPhoneInput] = useState(false);
    const [isCountryListOpen, setIsCountryListOpen] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const [showPasswordButton, setShowPasswordButton] = useState(false);
    const [showConfirmPasswordButton, setShowConfirmPasswordButton] = useState(false);
    const [birthInputType, setBirthInputType] = useState("text");
    const [previewImg, setPreviewImg] = useState(UserImg);

    const [countries, setCountries] = useState([<li key={1} id='country-item-1' className='register__input__contry-item' onClick={() => handleChangeCountry(1)}><div className="register__input__contry-img"><US className='register__input__country-flag' /><span className='register__input__country-text' id='country-1'>United States</span></div><span className='register__input__country-text'>+1</span></li>, <li key={2} className='register__input__contry-item' id='country-item-2' onClick={() => handleChangeCountry(55)}><div className="register__input__contry-img"><BR className='register__input__country-flag' /><span className='register__input__country-text' id='country-2'>Brazil</span></div><span className='register__input__country-text'>+55</span></li>]);

    const showPassword = useRef(null)
    const showConfirmPassword = useRef(null)
    const countryListRef = useRef(null);

    useEffect(() => {
        /* CLOSE WINDOW WHEN CLICK OUTSIDE */
        const handleClickOutside = (event) => {
            /* CLOSE PHONE NUMBER SEARCH WINDOW */
            if (countryListRef.current && !countryListRef.current.contains(event.target)) {
                setIsCountryListOpen(false);
            }
            /* SHOW PASSWORD BUTTON */
            if (showPassword.current && !showPassword.current.contains(event.target)) {
                setShowPasswordButton(false);
            }
            if (showConfirmPassword.current && !showConfirmPassword.current.contains(event.target)) {
                setShowConfirmPasswordButton(false);
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

    const handleShowPassword = (passwordType) => {
        switch (passwordType) {
            case 0:
                if (isShowingPassword == "password") {
                    setIsShowingPassword("text")
                }
                else {
                    setIsShowingPassword("password")
                }
                break;
            case 1:
                if (isShowingConfirmPassword == "password") {
                    setIsShowingConfirmPassword("text")
                }
                else {
                    setIsShowingConfirmPassword("password")
                }
                break;
        }
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
                setPicture(file);
            })

            reader.readAsDataURL(file);
        }
    }

    const handleSubmitForm = async (e, values) => {
        e.preventDefault();

        if (isDisabled == true) {
            return;
        }

        setIsDisabled(true);

        setErrorMsg("");

        const birthRegex = new RegExp('^\\d{4}(-)(((0)[0-9])|((1)[0-2]))(-)([0-2^([0-2][0-9]|(3)[0-1])$');

        /* USA FORMAT */
        const phoneRegex1 = new RegExp('\\(?([0-9]{3})\\)?([ .-]?)([0-9]{3})-([0-9]{4})');
        /* BRAZIL FORMAT */
        const phoneRegex2 = new RegExp('\\(?([0-9]{2})\\)?([ .-]?)9?([ .-]?)([0-9]{4})([ .-]?)([0-9]{4})');

        const passRegex1 = new RegExp('[a-z]', 'g');
        const passRegex2 = new RegExp('[A-Z]', 'g');
        const passRegex3 = new RegExp('[0-9]', 'g');
        const passRegex4 = new RegExp('[^A-Za-z0-9]', 'g');

        const emailRegex = new RegExp('^(([^<>()[\\]\\\\.,;:\\s@\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\"]+)*)|(\\".+\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$');

        /* FORM VALIDATION */

        if ((name == "" || name == undefined) || (email == "" || email == undefined) || (phoneNumber == "" || phoneNumber == undefined) || (birthDate == "" || birthDate == undefined) || (location == "" || location == undefined) || (description == "" || description == undefined) || (password == "" || password == undefined) || (confirmPassword == "" || confirmPassword == undefined)) {
            setErrorMsg("Fill in all form fields");
        }

        else if (!emailRegex.test(email)) {
            setErrorMsg("Invalid email");
        }

        else if (!phoneRegex1.test(phoneNumber) && !phoneRegex2.test(phoneNumber)) {
            setErrorMsg("Incorret Phone Number");
        }

        else if (name.length > 15) {
            setErrorMsg("Name too Large");
        }

        else if (location.length < 8) {
            setErrorMsg("Location too Short");
        }

        else if (description.length < 8) {
            setErrorMsg("Description too Short");
        }

        else if (password.length < 8) {
            setErrorMsg("Password too Short");
        }

        else if (confirmPassword.length < 8) {
            setErrorMsg("Password Confirm too Short");
        }

        else if (!birthRegex.test(birthDate)) {
            setErrorMsg("Birth Date Format Incorret");
        }

        else if (!passRegex1.test(password)) {
            setErrorMsg("The password must contain at least one lowercase letter");
        }

        else if (!passRegex2.test(password)) {
            setErrorMsg("The password must contain at least one uppercase letter");
        }

        else if (!passRegex3.test(password)) {
            setErrorMsg("The password must contain at least one number");
        }

        else if (!passRegex4.test(password)) {
            setErrorMsg("The password must contain at least one special symbol");
        }

        else if (password != confirmPassword) {
            setErrorMsg("Passwords don't match");
        }

        else if (picture == "") {
            setErrorMsg("Please Insert a Profile Image");
        }

        else {
            // this allows us to send form info with image
            const formData = new FormData();
            for (let value in values) {
                formData.append(value, values[value]);
            }

            /* SEND COUNTRY CODE FOR PHONE NUMBER */
            formData.append("countryCode", countryCode);

            setIsLoading(true);

            const savedUserResponse = await fetch(
                `${apiUrl}:${apiPort}/auth/register`,
                {
                    method: "POST",
                    body: formData,
                }
            );
            const savedUser = await savedUserResponse.json();

            if (savedUser) {
                if (savedUser.status == 201) {
                    setIsLoading(false);

                    e.target.reset();
                    setPhoneNumber("");

                    setSuccessMsg(`Account Created Successfully. Redirecting to Login Page `);
                    setTimeout(() => {
                        navigate("/login");
                    }, 3000);
                    return;
                }
                else {
                    setErrorMsg(savedUser.msg);
                }
            }
        }

        setIsLoading(false);
        setIsDisabled(false);
        return

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
                        <form className="register__form" id='register__form' onSubmit={(e) => handleSubmitForm(e, { name, phoneNumber, email, picture, birthDate, location, description, password })}>
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
                            <div className="password__field" ref={showPassword}>
                                <input type={isShowingPassword} placeholder='Password:' className='register__input-password register__input' onChange={(e) => setPassword(e.target.value)} onClick={() => setShowPasswordButton(true)} />
                                <FaEye className='password__show' onClick={() => handleShowPassword(0)} style={{ display: isShowingPassword == "text" ? "inline-block" : "none", visibility: showPasswordButton == true ? "visible" : "hidden" }} />
                                <FaEyeSlash className='password__show' onClick={() => handleShowPassword(0)} style={{ display: isShowingPassword == "password" ? "inline-block" : "none", visibility: showPasswordButton == true ? "visible" : "hidden" }} />
                            </div>
                            <div className="password__field" ref={showConfirmPassword}>
                                <input type={isShowingConfirmPassword} placeholder='Confirm Your Password:' className='register__input-password register__input' onChange={(e) => setConfirmPassword(e.target.value)} onClick={() => setShowConfirmPasswordButton(true)} />
                                <FaEye className='password__show' onClick={() => handleShowPassword(1)} style={{ display: isShowingConfirmPassword == "text" ? "inline-block" : "none", visibility: showConfirmPasswordButton == true ? "visible" : "hidden" }} />
                                <FaEyeSlash className='password__show' onClick={() => handleShowPassword(1)} style={{ display: isShowingConfirmPassword == "password" ? "inline-block" : "none", visibility: showConfirmPasswordButton == true ? "visible" : "hidden" }} />
                            </div>
                            <p className='register__alert' style={{ display: errorMsg.length > 0 ? "inline-block" : "none" }}>{errorMsg}</p>
                            <div className='register__alert__success' style={{ display: successMsg.length > 0 ? "flex" : "none" }} >
                                <p className='register__alert register__alert--success' style={{ display: successMsg.length > 0 ? "inline-block" : "none" }}>{successMsg}</p>
                                <img style={{ display: successMsg.length > 0 ? "inline-block" : "none" }} className='submit__loading submit__loading--success' src={LoadingSuccess} />
                            </div>
                            <img style={{ display: isLoading == true ? "inline-block" : "none" }} className='submit__loading' src={Loading} />
                            <input type="submit" value="Create Account" id='register__submit' className='register__submit button' style={{ backgroundColor: isDisabled == true ? "var(--color-primary-variant)" : "" }} />
                        </form>
                        <p className='register__link'>Already Have an Account? <Link to="/login" className='register__link-purple'>Login</Link></p>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Register;
