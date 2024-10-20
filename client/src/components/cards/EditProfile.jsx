import React, { useEffect, useRef, useState } from 'react';
import { FaEye, FaEyeSlash, FaRegEdit } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { MdEditSquare } from "react-icons/md";
import { FaRegCircleCheck } from "react-icons/fa6";
import { FaCheckCircle } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import UserImg from '../../assets/images/user.png';
import Loading from '../../assets/images/loading.svg';
import LoadingWhite from '../../assets/images/loading-white.svg';
import { US, BR } from "country-flag-icons/react/3x2";
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import './EditProfile.css';
import axios from 'axios';
import { setData } from '../../state/User/UserSlice';

function EditProfile({ closeWindow, showToastMessage }) {

    const showPassword = useRef(null);
    const showConfirmPassword = useRef(null);
    const countryListRef = useRef(null);

    const [showPasswordButton, setShowPasswordButton] = useState(false);
    const [showConfirmPasswordButton, setShowConfirmPasswordButton] = useState(false);
    const [passwordType, setPasswordType] = useState('password');
    const [confirmPasswordType, setConfirmPasswordType] = useState('password');

    const apiUrl = useSelector((state) => state.MiscReducer.apiUrl);
    const apiPort = useSelector((state) => state.MiscReducer.apiPort);
    const userInfo = useSelector((state) => state.UserReducer);
    const imgPaths = `${apiUrl}:${apiPort}/assets/`;

    const [userData, setUserData] = useState({});

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [location, setLocation] = useState('');
    const [biography, setBiography] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [countryCode, setCountryCode] = useState(1);
    const [isCountryListOpen, setIsCountryListOpen] = useState(false);
    const [countries, setCountries] = useState([<li key={1} id='editprofile__country-item-1' className='register__input__contry-item editprofile__input__contry-item' onClick={() => handleChangeCountry(1)}><div className="register__input__contry-img editprofile__input__contry-img"><US className='register__input__country-flag editprofile__input__country-flag' /><span className='register__input__country-text editprofile__input__country-text' id='editprofile__country-1'>United States</span></div><span className='register__input__country-text editprofile__input__country-text'>+1</span></li>, <li key={2} className='register__input__contry-item editprofile__input__contry-item' id='editprofile__country-item-2' onClick={() => handleChangeCountry(55)}><div className="register__input__contry-img editprofile__input__contry-img"><BR className='register__input__country-flag editprofile__input__country-flag' /><span className='register__input__country-text editprofile__input__country-text' id='editprofile__country-2'>Brazil</span></div><span className='register__input__country-text editprofile__input__country-text'>+55</span></li>]);

    const [picturePath, setPicturePath] = useState('');
    const [picture, setPicture] = useState("")
    const [picturePreview, setPicturePreview] = useState(UserImg);

    const [reqError, setReqError] = useState("");
    const [disabled, setDisabled] = useState(false);
    const dispatch = useDispatch();


    const [showSaveButton1, setShowSaveButton1] = useState(false)
    const [showSaveButton2, setShowSaveButton2] = useState(false)
    const [showSaveButton3, setShowSaveButton3] = useState(false)
    const [showSaveButton4, setShowSaveButton4] = useState(false)
    const [showSaveButton5, setShowSaveButton5] = useState(false)
    const [showSaveButton6, setShowSaveButton6] = useState(false)
    const [showSaveButton7, setShowSaveButton7] = useState(false)
    const [showSaveButton8, setShowSaveButton8] = useState(false)

    const getYourProfile = () => {
        const headers = {
            'Authorization': `Bearer ${userInfo.token}`
        }

        axios.get(`${apiUrl}:${apiPort}/user/me`, ({
            headers
        }))
            .then((data) => {


                const yourUserData = data.data.userData;

                const date = new Date(yourUserData.birthDate);

                setName(yourUserData.name);
                setEmail(yourUserData.email);
                setLocation(yourUserData.location);
                setBirthDate(`${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`);
                setCountryCode(Number(yourUserData.phoneNumber.split(" ")[0].slice(1)));
                setPhoneNumber(yourUserData.phoneNumber.slice(4));
                setPicturePath(yourUserData.picturePath)
                setPicturePreview(`${apiUrl}:${apiPort}/assets/${yourUserData.picturePath}`);
                setBiography(yourUserData.description);
                setUserData(yourUserData);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const handleShowPassword = (passwordTypeNum) => {
        switch (passwordTypeNum) {
            case 0:
                if (passwordType == "password") {
                    setPasswordType("text")
                }
                else {
                    setPasswordType("password")
                }
                break;
            case 1:
                if (confirmPasswordType == "password") {
                    setConfirmPasswordType("text")
                }
                else {
                    setConfirmPasswordType("password")
                }
                break;
        }
    }

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

    const handlePreviewImage = (e) => {
        if (!disabled) {
            const inputTarget = e.target;
            const file = inputTarget.files[0];

            let fileType = file.name.split('.');
            fileType = fileType[fileType.length - 1]
            const fileSize = (file.size / 1024);

            const supportedFiles = ['jpeg', 'png', 'jpg'];

            if (file && fileSize < 2048 && supportedFiles.includes(fileType)) {
                const reader = new FileReader();

                reader.addEventListener('load', (e) => {
                    const readerTarget = e.target;
                    setPicturePreview(readerTarget.result);
                    setPicture(file);
                })

                reader.readAsDataURL(file);
                setShowSaveButton1(true);
            }
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
            const countryName = document.getElementById(`editprofile__country-${index + 1}`).innerHTML.toLowerCase();
            const countryItem = document.getElementById(`editprofile__country-item-${index + 1}`);
            const isMatched = countryName.includes(searchValue)
            countryItem.classList.toggle('hide', !isMatched)
        })

    }

    const handleSelectFile = () => {
        document.getElementById('editprofile__input__file').click();
    }

    const handleSaveUser = async (choice) => {
        if (disabled == false) {
            setDisabled(true);

            const headers = {
                'Authorization': `Bearer ${userInfo.token}`
            }

            const formData = new FormData();


            switch (choice) {
                case 1:
                    setShowSaveButton1("loading");
                    if (picture == "" || picture == undefined) {
                        setDisabled(false);
                        setShowSaveButton1(false);
                        return setReqError("Please Insert a Image");
                    }
                    formData.append("picture", picture)
                    break;
                case 2:
                    setShowSaveButton2("loading");
                    if (name == "" || name == undefined) {
                        setDisabled(false);
                        setShowSaveButton2(false);
                        return setReqError("The Field Cannot be Blank");
                    }

                    if (name.length > 15) {
                        setDisabled(false);
                        setShowSaveButton2(false);
                        return setReqError("Name too Large");
                    }
                    formData.append("name", name)
                    break;
                case 3:
                    /* USA FORMAT */
                    const phoneRegex1 = new RegExp('\\(?([0-9]{3})\\)?([ .-]?)([0-9]{3})-([0-9]{4})');
                    /* BRAZIL FORMAT */
                    const phoneRegex2 = new RegExp('\\(?([0-9]{2})\\)?([ .-]?)9?([ .-]?)([0-9]{4})([ .-]?)([0-9]{4})');

                    setShowSaveButton3("loading");
                    if ((phoneNumber == "" || phoneNumber == undefined) || (countryCode == "" || countryCode == undefined)) {
                        setDisabled(false);
                        setShowSaveButton3(false);
                        return setReqError("The Field Cannot be Blank");
                    }

                    if (!phoneRegex1.test(phoneNumber) && !phoneRegex2.test(phoneNumber)) {
                        setDisabled(false);
                        setShowSaveButton3(false);
                        return setReqError("Incorret Phone Number");
                    }

                    formData.append("phoneNumber", phoneNumber)
                    formData.append("countryCode", countryCode)
                    break;
                case 4:
                    const emailRegex = new RegExp('^(([^<>()[\\]\\\\.,;:\\s@\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\"]+)*)|(\\".+\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$');

                    setShowSaveButton4("loading");
                    if (email == "" || email == undefined) {
                        setDisabled(false);
                        setShowSaveButton4(false);
                        return setReqError("The Field Cannot be Blank");
                    }

                    if (!emailRegex.test(email)) {
                        setDisabled(false);
                        setShowSaveButton4(false);
                        return setReqError("Invalid email");
                    }

                    formData.append("email", email)
                    break;
                case 5:
                    const birthRegex = new RegExp('^\\d{4}(-)(((0)[0-9])|((1)[0-2]))(-)([0-2^([0-2][0-9]|(3)[0-1])$');

                    setShowSaveButton5("loading");
                    if (birthDate == "" || birthDate == undefined) {
                        setDisabled(false);
                        setShowSaveButton5(false);
                        return setReqError("The Field Cannot be Blank");
                    }

                    if (!birthRegex.test(birthDate)) {
                        setDisabled(false);
                        setShowSaveButton5(false);
                        return setReqError("Birth Date Format Incorret");
                    }

                    formData.append("birthDate", birthDate)
                    break;
                case 6:

                    setShowSaveButton6("loading");
                    if (location == "" || location == undefined) {
                        setDisabled(false);
                        setShowSaveButton6(false);
                        return setReqError("The Field Cannot be Blank");
                    }

                    if (location.length < 8) {
                        setDisabled(false);
                        setShowSaveButton6(false);
                        return setReqError("Location too Short");
                    }

                    formData.append("location", location)
                    break;
                case 7:
                    setShowSaveButton7("loading");
                    if (biography == "" || biography == undefined) {
                        setDisabled(false);
                        setShowSaveButton7(false);
                        return setReqError("The Field Cannot be Blank");
                    }

                    if (biography.length < 8) {
                        setDisabled(false);
                        setShowSaveButton7(false);
                        return setReqError("Description too Short");
                    }

                    formData.append("description", biography)
                    break;
                case 8:

                    const passRegex1 = new RegExp('[a-z]', 'g');
                    const passRegex2 = new RegExp('[A-Z]', 'g');
                    const passRegex3 = new RegExp('[0-9]', 'g');
                    const passRegex4 = new RegExp('[^A-Za-z0-9]', 'g');

                    setShowSaveButton8("loading");
                    if (password == "" || password == undefined) {
                        setDisabled(false);
                        setShowSaveButton8(false);
                        return setReqError("The Password Field Cannot be Blank");
                    }

                    if (confirmPassword == "" || confirmPassword == undefined) {
                        setDisabled(false);
                        setShowSaveButton8(false);
                        return setReqError("The Confirm Password Field Cannot be Blank");
                    }

                    if (password.length < 8) {
                        setDisabled(false);
                        setShowSaveButton8(false);
                        return setReqError("Password too Short");
                    }
                    if (confirmPassword.length < 8) {
                        setDisabled(false);
                        setShowSaveButton8(false);
                        return setReqError("Password Confirm too Short");
                    }
                    if (!passRegex1.test(password)) {
                        setDisabled(false);
                        setShowSaveButton8(false);
                        return setReqError("The password must contain at least one lowercase letter");
                    }

                    if (!passRegex2.test(password)) {
                        setDisabled(false);
                        setShowSaveButton8(false);
                        return setReqError("The password must contain at least one uppercase letter");
                    }

                    if (!passRegex3.test(password)) {
                        setDisabled(false);
                        setShowSaveButton8(false);
                        return setReqError("The password must contain at least one number");
                    }

                    if (!passRegex4.test(password)) {
                        setDisabled(false);
                        setShowSaveButton8(false);
                        return setReqError("The password must contain at least one special symbol");
                    }

                    if (password != confirmPassword) {
                        setDisabled(false);
                        setShowSaveButton8(false);
                        return setReqError("Passwords don't match");
                    }

                    formData.append("password", password)
                    break;
            }

            axios.patch(`${apiUrl}:${apiPort}/user/update/me/${userData._id}`, formData, {
                headers
            })
                .then((data) => {

                    const newUserData = data.data.result;

                    dispatch(
                        setData({
                            user: newUserData,
                        })
                    )

                    setReqError("");

                    switch (choice) {
                        case 1:
                            setUserData(prev => {
                                return {
                                    ...prev,
                                    picturePath: newUserData.picturePath
                                }
                            });
                            setDisabled(false);
                            setShowSaveButton1(false);
                            break;
                        case 2:
                            setDisabled(false);
                            setShowSaveButton2(false);
                            break;
                        case 3:
                            setDisabled(false);
                            setShowSaveButton3(false);
                            break;
                        case 4:
                            setDisabled(false);
                            setShowSaveButton4(false);
                            break;
                        case 5:
                            setDisabled(false);
                            setShowSaveButton5(false);
                            break;
                        case 6:
                            setDisabled(false);
                            setShowSaveButton6(false);
                            break;
                        case 7:
                            setDisabled(false);
                            setShowSaveButton7(false);
                            break;
                        case 8:
                            setDisabled(false);
                            setShowSaveButton8(false);
                            break;
                    }

                    showToastMessage('success', 'User Updated Successfully');
                })
                .catch((err) => {
                    console.log(err);
                    setReqError(err.response.data.error);
                })
        }
    }

    useEffect(() => {
        /* CLOSE WINDOW WHEN CLICK OUTSIDE */
        const handleClickOutside = (event) => {
            /* SHOW PASSWORD BUTTON */
            if (showPassword.current && !showPassword.current.contains(event.target)) {
                setShowPasswordButton(false);
            }
            if (showConfirmPassword.current && !showConfirmPassword.current.contains(event.target)) {
                setShowConfirmPasswordButton(false);
            }
            if (countryListRef.current && !countryListRef.current.contains(event.target)) {
                setIsCountryListOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };

    }, []);

    useEffect(() => {
        getYourProfile();
    }, [])

    return (
        <>
            {userData._id != undefined ?
                <div className="edit-profile">
                    <div className="edit-profile__close-window">
                        <IoClose onClick={closeWindow} />
                    </div>
                    <h2 className='edit-profile__title'>Profile</h2>
                    <div className="editprofile__imgbox__container">
                        <div className="editprofile__imgbox">
                            <img className='editprofile__img' src={picturePreview} alt="profile_img" />
                            <MdEditSquare className='editprofile__edit editprofile__edit__img' onClick={handleSelectFile} style={{ visibility: showSaveButton1 === false ? 'visible' : 'hidden' }} />
                            <img src={LoadingWhite} className='editprofile__loading__img' style={{ visibility: showSaveButton1 === 'loading' ? 'visible' : 'hidden' }} />
                            <FaCheckCircle className='editprofile__edit editprofile__edit__img' style={{ visibility: showSaveButton1 === true ? 'visible' : 'hidden' }} onClick={() => handleSaveUser(1)} />
                        </div>
                        <input type="file" style={{ visibility: 'hidden' }} id='editprofile__input__file' className='editprofile__input__file' onChange={(e) => handlePreviewImage(e)} />
                    </div>
                    <div className="editprofile__inputbox-container">
                        <div className="editprofile__box">
                            <div className="editprofile__inputbox">
                                <div className="editprofile__labelbox">
                                    <span className='editprofile__label'>Name</span>
                                    <FaRegEdit className='editprofile__edit' onClick={() => disabled == false && setShowSaveButton2(true)} style={{ display: showSaveButton2 === false ? 'inline-block' : 'none' }} />
                                    <img src={Loading} className='editprofile__loading' style={{ display: showSaveButton2 == 'loading' ? 'inline-bloc' : 'none' }} />
                                    <FaRegCircleCheck className='editprofile__edit' style={{ display: showSaveButton2 == true ? 'inline-block' : 'none' }} onClick={() => handleSaveUser(2)} />
                                </div>
                                <input type="text" name="editprofile__name" id="editprofile__name" className="editprofile__input editprofile__name" disabled={showSaveButton2 == true ? '' : 'disabled'} value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className="editprofile__inputbox">
                                <div className="editprofile__labelbox">
                                    <span className='editprofile__label'>Phone Number:</span>
                                    <FaRegEdit className='editprofile__edit' onClick={() => disabled == false && setShowSaveButton3(true)} style={{ display: showSaveButton3 === false ? 'inline-block' : 'none' }} />
                                    <img src={Loading} className='editprofile__loading' style={{ display: showSaveButton3 == 'loading' ? 'inline-block' : 'none' }} />
                                    <FaRegCircleCheck className='editprofile__edit' style={{ display: showSaveButton3 == true ? 'inline-block' : 'none' }} onClick={() => handleSaveUser(3)} />
                                </div>
                                <div className='register__input-phonenumber editprofile__input-phonenumber' ref={countryListRef} >
                                    <div className={`register__input__country-selected editprofile__input__country-selected ${showSaveButton3 == false ? 'editprofile__input__country--enabled' : ''}`} onClick={showSaveButton3 == true ? () => setIsCountryListOpen(!isCountryListOpen) : (e) => e.target.value}>
                                        <US style={{ display: countryCode == "1" ? "flex" : "none" }} className='register__input__country-flag editprofile__country-flag' />
                                        <BR style={{ display: countryCode == "55" ? "flex" : "none" }} className='register__input__country-flag editprofile__country-flag' />
                                        <IoIosArrowDown className='register__input__country-arrow editprofile__input__country-arrow' style={{ display: isCountryListOpen ? "none" : "inline-block" }} />
                                        <IoIosArrowUp className='register__input__country-arrow editprofile__input__country-arrow' style={{ display: isCountryListOpen ? "inline-block" : "none" }} />
                                    </div>
                                    <input type="text" name="editprofile__phonenumber" id="editprofile__phonenumber" className="editprofile__input editprofile__phonenumber" disabled={showSaveButton3 == true ? '' : 'disabled'} value={phoneNumber} onChange={(e) => handlePhoneNumber(e)} />
                                    <div className="register__input__countries editprofile__input__countries" style={{ visibility: isCountryListOpen ? "visible" : "hidden", opacity: isCountryListOpen ? "1" : "0" }}>
                                        <input type="text" className='register__input__country-search register__input editprofile__input__country-search' onChange={handleSearchCountry} />
                                        <ul className="register__input__contry-list editprofile__input__contry-list">
                                            {countries}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="editprofile__row"></div>
                        <div className="editprofile__box">
                            <div className="editprofile__inputbox">
                                <div className="editprofile__labelbox">
                                    <span className='editprofile__label'>Email:</span>
                                    <FaRegEdit className='editprofile__edit' onClick={() => disabled == false && setShowSaveButton4(true)} style={{ display: showSaveButton4 === false ? 'inline-block' : 'none' }} />
                                    <img src={Loading} className='editprofile__loading' style={{ display: showSaveButton4 == 'loading' ? 'inline-block' : 'none' }} />
                                    <FaRegCircleCheck className='editprofile__edit' style={{ display: showSaveButton4 == true ? 'inline-block' : 'none' }} onClick={() => handleSaveUser(4)} />
                                </div>
                                <input type="text" name="editprofile__email" id="editprofile__email" className="editprofile__input editprofile__email" disabled={showSaveButton4 == true ? '' : 'disabled'} value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="editprofile__inputbox">
                                <div className="editprofile__labelbox">
                                    <span className='editprofile__label'>Birth Date:</span>
                                    <FaRegEdit className='editprofile__edit' onClick={() => disabled == false && setShowSaveButton5(true)} style={{ display: showSaveButton5 === false ? 'inline-block' : 'none' }} />
                                    <img src={Loading} className='editprofile__loading' style={{ display: showSaveButton5 == 'loading' ? 'inline-block' : 'none' }} />
                                    <FaRegCircleCheck className='editprofile__edit' style={{ display: showSaveButton5 == true ? 'inline-block' : 'none' }} onClick={() => handleSaveUser(5)} />
                                </div>
                                <input type="date" name="editprofile__birthdate" id="editprofile__birthdate" className="editprofile__input editprofile__birthdate" disabled={showSaveButton5 == true ? '' : 'disabled'} value={birthDate} onChange={(e) => setBirthDate(e.target.value)} onDoubleClick={(e) => e.target.showPicker()} />
                            </div>
                        </div>
                        <div className="editprofile__inputbox edit-profile__inputbox__location">
                            <div className="editprofile__labelbox">
                                <span className='editprofile__label'>Location:</span>
                                <FaRegEdit className='editprofile__edit' onClick={() => disabled == false && setShowSaveButton6(true)} style={{ display: showSaveButton6 === false ? 'inline-block' : 'none' }} />
                                <img src={Loading} className='editprofile__loading' style={{ display: showSaveButton6 == 'loading' ? 'inline-block' : 'none' }} />
                                <FaRegCircleCheck className='editprofile__edit' style={{ display: showSaveButton6 == true ? 'inline-block' : 'none' }} onClick={() => handleSaveUser(6)} />
                            </div>
                            <input type="text" name="editprofile__location" id="editprofile__location" className="editprofile__input editprofile__location" disabled={showSaveButton6 == true ? '' : 'disabled'} value={location} onChange={(e) => setLocation(e.target.value)} />
                        </div>
                        <div className="editprofile__inputbox edit-profile__inputbox__biography">
                            <div className="editprofile__labelbox">
                                <span className='editprofile__label'>Description:</span>
                                <FaRegEdit className='editprofile__edit' onClick={() => disabled == false && setShowSaveButton7(true)} style={{ display: showSaveButton7 === false ? 'inline-block' : 'none' }} />
                                <img src={Loading} className='editprofile__loading' style={{ display: showSaveButton7 == 'loading' ? 'inline-block' : 'none' }} />
                                <FaRegCircleCheck className='editprofile__edit' style={{ display: showSaveButton7 == true ? 'inline-block' : 'none' }} onClick={() => handleSaveUser(7)} />
                            </div>
                            <textarea name="editprofile__biography" id="editprofile__biography" className="editprofile__input editprofile__biography" disabled={showSaveButton7 == true ? '' : 'disabled'} onChange={(e) => setBiography(e.target.value)}>{biography}</textarea>
                        </div>
                        <div className="editprofile__inputbox edit-profile__inputbox__password">
                            <div className="editprofile__labelbox">
                                <span className='editprofile__label'>Password:</span>
                                <FaRegEdit className='editprofile__edit' onClick={() => setShowSaveButton8(true)} style={{ display: showSaveButton8 == false ? 'inline-block' : 'none' }} />
                                <img src={Loading} className='editprofile__loading' style={{ display: showSaveButton8 == 'loading' ? 'inline-block' : 'none' }} />
                                <FaRegCircleCheck className='editprofile__edit' style={{ display: showSaveButton8 == true ? 'inline-block' : 'none' }} onClick={() => handleSaveUser(8)} />
                            </div>
                            <div className="editprofile__passbox__container">
                                <div className="editprofile__passbox">
                                    <div className="editprofile__password__field" ref={showPassword}>
                                        <input type={passwordType} name="editprofile__password" id="editprofile__password" className="editprofile__input editprofile__password" onChange={(e) => setPassword(e.target.value)} onClick={() => setShowPasswordButton(true)} placeholder='Password:' disabled={showSaveButton8 == true ? '' : 'disabled'} />
                                        <FaEye className='editprofile__password__show' onClick={() => handleShowPassword(0)} style={{ display: passwordType == "text" ? showSaveButton8 == true ? "inline-block" : 'none' : "none", visibility: showPasswordButton == true ? showSaveButton8 == true ? "visible" : "hidden" : "hidden" }} />
                                        <FaEyeSlash className='editprofile__password__show' onClick={() => handleShowPassword(0)} style={{ display: passwordType == "password" ? showSaveButton8 == true ? "inline-block" : 'none' : "none", visibility: showPasswordButton == true ? showSaveButton8 == true ? "visible" : 'hidden' : "hidden" }} />
                                    </div>
                                </div>
                                <div className="editprofile__row"></div>
                                <div className="editprofile__passbox">
                                    <div className="editprofile__password__field" ref={showConfirmPassword}>
                                        <input type={confirmPasswordType} name="editprofile__confirmpassword" id="editprofile__confirmpassword" className="editprofile__input editprofile__password" onChange={(e) => setConfirmPassword(e.target.value)} onClick={() => setShowConfirmPasswordButton(true)} placeholder='Confirm Password:' disabled={showSaveButton8 == true ? '' : 'disabled'} />
                                        <FaEye className='editprofile__password__show' onClick={() => handleShowPassword(1)} style={{ display: confirmPasswordType == "text" ? showSaveButton8 == true ? "inline-block" : 'none' : "none", visibility: showConfirmPasswordButton == true ? showSaveButton8 == true ? "visible" : "hidden" : "hidden" }} />
                                        <FaEyeSlash className='editprofile__password__show' onClick={() => handleShowPassword(1)} style={{ display: confirmPasswordType == "password" ? showSaveButton8 == true ? "inline-block" : 'none' : "none", visibility: showConfirmPasswordButton == true ? showSaveButton8 == true ? "visible" : 'hidden' : "hidden" }} />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="create-products__error">
                        {reqError == '' ? '' : reqError}
                    </div>
                </div>
                :
                <img src={Loading} className='create-products__loading' />
            }
        </>
    )
}

export default EditProfile
