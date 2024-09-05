import React, { useEffect, useRef, useState } from 'react';
import { FaEye, FaEyeSlash, FaRegEdit } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { MdEditSquare } from "react-icons/md";
import { FaRegCircleCheck } from "react-icons/fa6";
import { FaCheckCircle } from "react-icons/fa";
import { useSelector } from 'react-redux';
import Loading from '../../assets/images/loading.svg';
import LoadingWhite from '../../assets/images/loading-white.svg';
import { US, BR } from "country-flag-icons/react/3x2";
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import './EditProfile.css';

function EditProfile({ closeWindow }) {

    const showPassword = useRef(null);
    const showConfirmPassword = useRef(null);
    const countryListRef = useRef(null);

    const [showPasswordButton, setShowPasswordButton] = useState(false);
    const [showConfirmPasswordButton, setShowConfirmPasswordButton] = useState(false);
    const [passwordType, setPasswordType] = useState('password');
    const [confirmPasswordType, setConfirmPasswordType] = useState('password');

    const apiUrl = useSelector((state) => state.MiscReducer.apiUrl);
    const apiPort = useSelector((state) => state.MiscReducer.apiPort);
    const userInfo = useSelector((state) => state.UserReducer.user);
    const imgPaths = `${apiUrl}:${apiPort}/assets/`;

    const [name, setName] = useState('alan');
    const [email, setEmail] = useState('alan4tomaz8@gmail.com');
    const [phoneNumber, setPhoneNumber] = useState('31988709707');
    const [birthDate, setBirthDate] = useState('');
    const [location, setLocation] = useState('Teste');
    const [biography, setBiography] = useState('Teste');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [countryCode, setCountryCode] = useState(1);
    const [isCountryListOpen, setIsCountryListOpen] = useState(false);
    const [countries, setCountries] = useState([<li key={1} id='editprofile__country-item-1' className='register__input__contry-item editprofile__input__contry-item' onClick={() => handleChangeCountry(1)}><div className="register__input__contry-img editprofile__input__contry-img"><US className='register__input__country-flag editprofile__input__country-flag' /><span className='register__input__country-text editprofile__input__country-text' id='editprofile__country-1'>United States</span></div><span className='register__input__country-text editprofile__input__country-text'>+1</span></li>, <li key={2} className='register__input__contry-item editprofile__input__contry-item' id='editprofile__country-item-2' onClick={() => handleChangeCountry(55)}><div className="register__input__contry-img editprofile__input__contry-img"><BR className='register__input__country-flag editprofile__input__country-flag' /><span className='register__input__country-text editprofile__input__country-text' id='editprofile__country-2'>Brazil</span></div><span className='register__input__country-text editprofile__input__country-text'>+55</span></li>]);


    const [showSaveButton1, setShowSaveButton1] = useState(false)
    const [showSaveButton2, setShowSaveButton2] = useState(false)
    const [showSaveButton3, setShowSaveButton3] = useState(false)
    const [showSaveButton4, setShowSaveButton4] = useState(false)
    const [showSaveButton5, setShowSaveButton5] = useState(false)
    const [showSaveButton6, setShowSaveButton6] = useState(false)
    const [showSaveButton7, setShowSaveButton7] = useState(false)
    const [showSaveButton8, setShowSaveButton8] = useState(false)

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
        setShowSaveButton1(true);
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
    return (
        <div className="edit-profile">
            <div className="edit-profile__close-window">
                <IoClose onClick={closeWindow} />
            </div>
            <h2 className='edit-profile__title'>Profile</h2>
            <div className="editprofile__imgbox__container">
                <div className="editprofile__imgbox">
                    <img className='editprofile__img' src={`${imgPaths}${userInfo.picturePath}`} alt="profile_img" />
                    <MdEditSquare className='editprofile__edit editprofile__edit__img' onClick={handleSelectFile} style={{ visibility: showSaveButton1 === false ? 'visible' : 'hidden' }} />
                    <img src={LoadingWhite} className='editprofile__loading__img' style={{ visibility: showSaveButton1 === 'loading' ? 'visible' : 'hidden' }} />
                    <FaCheckCircle className='editprofile__edit editprofile__edit__img' style={{ visibility: showSaveButton1 === true ? 'visible' : 'hidden' }} onClick={() => setShowSaveButton1(false)} />
                </div>
                <input type="file" style={{ visibility: 'hidden' }} id='editprofile__input__file' className='editprofile__input__file' />
            </div>
            <div className="editprofile__inputbox-container">
                <div className="editprofile__box">
                    <div className="editprofile__inputbox">
                        <div className="editprofile__labelbox">
                            <span className='editprofile__label'>Name</span>
                            <FaRegEdit className='editprofile__edit' onClick={() => setShowSaveButton2(true)} style={{ display: showSaveButton2 === false ? 'inline-block' : 'none' }} />
                            <img src={Loading} className='editprofile__loading' style={{ display: showSaveButton2 == 'loading' ? 'inline-bloc' : 'none' }} />
                            <FaRegCircleCheck className='editprofile__edit' style={{ display: showSaveButton2 == true ? 'inline-block' : 'none' }} onClick={() => setShowSaveButton2(false)} />
                        </div>
                        <input type="text" name="editprofile__name" id="editprofile__name" className="editprofile__input editprofile__name" disabled={showSaveButton2 == true ? '' : 'disabled'} value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="editprofile__inputbox">
                        <div className="editprofile__labelbox">
                            <span className='editprofile__label'>Phone Number:</span>
                            <FaRegEdit className='editprofile__edit' onClick={() => setShowSaveButton3(true)} style={{ display: showSaveButton3 === false ? 'inline-block' : 'none' }} />
                            <img src={Loading} className='editprofile__loading' style={{ display: showSaveButton3 == 'loading' ? 'inline-block' : 'none' }} />
                            <FaRegCircleCheck className='editprofile__edit' style={{ display: showSaveButton3 == true ? 'inline-block' : 'none' }} onClick={() => setShowSaveButton3(false)} />
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
                            <FaRegEdit className='editprofile__edit' onClick={() => setShowSaveButton4(true)} style={{ display: showSaveButton4 === false ? 'inline-block' : 'none' }} />
                            <img src={Loading} className='editprofile__loading' style={{ display: showSaveButton4 == 'loading' ? 'inline-block' : 'none' }} />
                            <FaRegCircleCheck className='editprofile__edit' style={{ display: showSaveButton4 == true ? 'inline-block' : 'none' }} onClick={() => setShowSaveButton4(false)} />
                        </div>
                        <input type="text" name="editprofile__email" id="editprofile__email" className="editprofile__input editprofile__email" disabled={showSaveButton4 == true ? '' : 'disabled'} value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="editprofile__inputbox">
                        <div className="editprofile__labelbox">
                            <span className='editprofile__label'>Birth Date:</span>
                            <FaRegEdit className='editprofile__edit' onClick={() => setShowSaveButton5(true)} style={{ display: showSaveButton5 === false ? 'inline-block' : 'none' }} />
                            <img src={Loading} className='editprofile__loading' style={{ display: showSaveButton5 == 'loading' ? 'inline-block' : 'none' }} />
                            <FaRegCircleCheck className='editprofile__edit' style={{ display: showSaveButton5 == true ? 'inline-block' : 'none' }} onClick={() => setShowSaveButton5(false)} />
                        </div>
                        <input type="date" name="editprofile__birthdate" id="editprofile__birthdate" className="editprofile__input editprofile__birthdate" disabled={showSaveButton5 == true ? '' : 'disabled'} value={birthDate} onChange={(e) => setBirthDate(e.target.value)} onDoubleClick={(e) => e.target.showPicker()} />
                    </div>
                </div>
                <div className="editprofile__inputbox edit-profile__inputbox__location">
                    <div className="editprofile__labelbox">
                        <span className='editprofile__label'>Location:</span>
                        <FaRegEdit className='editprofile__edit' onClick={() => setShowSaveButton6(true)} style={{ display: showSaveButton6 === false ? 'inline-block' : 'none' }} />
                        <img src={Loading} className='editprofile__loading' style={{ display: showSaveButton6 == 'loading' ? 'inline-block' : 'none' }} />
                        <FaRegCircleCheck className='editprofile__edit' style={{ display: showSaveButton6 == true ? 'inline-block' : 'none' }} onClick={() => setShowSaveButton6(false)} />
                    </div>
                    <input type="text" name="editprofile__location" id="editprofile__location" className="editprofile__input editprofile__location" disabled={showSaveButton6 == true ? '' : 'disabled'} value={location} onChange={(e) => setLocation(e.target.value)} />
                </div>
                <div className="editprofile__inputbox edit-profile__inputbox__biography">
                    <div className="editprofile__labelbox">
                        <span className='editprofile__label'>Biography:</span>
                        <FaRegEdit className='editprofile__edit' onClick={() => setShowSaveButton7(true)} style={{ display: showSaveButton7 === false ? 'inline-block' : 'none' }} />
                        <img src={Loading} className='editprofile__loading' style={{ display: showSaveButton7 == 'loading' ? 'inline-block' : 'none' }} />
                        <FaRegCircleCheck className='editprofile__edit' style={{ display: showSaveButton7 == true ? 'inline-block' : 'none' }} onClick={() => setShowSaveButton7(false)} />
                    </div>
                    <textarea name="editprofile__biography" id="editprofile__biography" className="editprofile__input editprofile__biography" disabled={showSaveButton7 == true ? '' : 'disabled'} onChange={(e) => setBiography(e.target.value)}>{biography}</textarea>
                </div>
                <div className="editprofile__inputbox edit-profile__inputbox__password">
                    <div className="editprofile__labelbox">
                        <span className='editprofile__label'>Password:</span>
                        <FaRegEdit className='editprofile__edit' onClick={() => setShowSaveButton8(true)} style={{ display: showSaveButton8 == false ? 'inline-block' : 'none' }} />
                        <img src={Loading} className='editprofile__loading' style={{ display: showSaveButton8 == 'loading' ? 'inline-block' : 'none' }} />
                        <FaRegCircleCheck className='editprofile__edit' style={{ display: showSaveButton8 == true ? 'inline-block' : 'none' }} onClick={() => setShowSaveButton8(false)} />
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
        </div>
    )
}

export default EditProfile
