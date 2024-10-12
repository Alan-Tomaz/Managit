import React, { useEffect, useRef, useState } from 'react';
import { FaEye, FaEyeSlash, FaRegEdit } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { MdEditSquare } from "react-icons/md";
import Loading from '../../assets/images/loading.svg';
import LoadingWhite from '../../assets/images/loading-white.svg';
import { US, BR } from "country-flag-icons/react/3x2";
import UserImg from '../../assets/images/user.png';
import './EditProfile.css';
import './NewUser.css';
import { IoIosArrowDown, IoIosArrowUp, IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';
import { useSelector } from 'react-redux';

function NewUser({ closeWindow, item, option, id, showToastMessage, setReload }) {

    const apiUrl = useSelector((state) => state.MiscReducer.apiUrl);
    const apiPort = useSelector((state) => state.MiscReducer.apiPort);
    const userInfo = useSelector((state) => state.UserReducer);

    const showPassword = useRef(null)
    const showConfirmPassword = useRef(null)
    const countryListRef = useRef(null);
    const permissionRef = useRef(null);
    const blockedRef = useRef(null);

    const [showPasswordButton, setShowPasswordButton] = useState(false);
    const [showConfirmPasswordButton, setShowConfirmPasswordButton] = useState(false);
    const [isCountryListOpen, setIsCountryListOpen] = useState(false);
    const [passwordType, setPasswordType] = useState('password');
    const [countryCode, setCountryCode] = useState(1);
    const [countries, setCountries] = useState([<li key={1} id='newuser__country-item-1' className='register__input__contry-item newuser__input__contry-item' onClick={() => handleChangeCountry(1)}><div className="register__input__contry-img newuser__input__contry-img"><US className='register__input__country-flag newuser__input__country-flag' /><span className='register__input__country-text newuser__input__country-text' id='newuser__country-1'>United States</span></div><span className='register__input__country-text newuser__input__country-text'>+1</span></li>, <li key={2} className='register__input__contry-item newuser__input__contry-item' id='newuser__country-item-2' onClick={() => handleChangeCountry(55)}><div className="register__input__contry-img newuser__input__contry-img"><BR className='register__input__country-flag newuser__input__country-flag' /><span className='register__input__country-text newuser__input__country-text' id='newuser__country-2'>Brazil</span></div><span className='register__input__country-text newuser__input__country-text'>+55</span></li>]);
    const [confirmPasswordType, setConfirmPasswordType] = useState('password');
    const [birthInputType, setBirthInputType] = useState('text');
    const [picturePath, setPicturePath] = useState(option == 1 ? item.picturePath : '');
    const [picture, setPicture] = useState()
    const [picturePreview, setPicturePreview] = useState(picturePath != '' ? `${apiUrl}:${apiPort}/assets/${picturePath}` : UserImg);
    const [permission, setPermission] = useState(-1);
    const [showPermissions, setShowPermissions] = useState(false);
    const [blocked, setBlocked] = useState(-1);
    const [showBlockedList, setShowBlockedList] = useState(false);


    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [location, setLocation] = useState('');
    const [biography, setBiography] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

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
        const inputTarget = e.target;
        const file = inputTarget.files[0];

        let fileType = file.name.split('.');
        fileType = fileType[fileType.length - 1]
        const fileSize = (file.size / 1024);

        console.log(fileType);

        const supportedFiles = ['jpeg', 'png', 'jpg'];

        if (file && fileSize < 2048 && supportedFiles.includes(fileType)) {
            const reader = new FileReader();

            reader.addEventListener('load', (e) => {
                const readerTarget = e.target;
                setPicturePreview(readerTarget.result);
                setPicture(file);
            })

            reader.readAsDataURL(file);
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
            const countryName = document.getElementById(`newuser__country-${index + 1}`).innerHTML.toLowerCase();
            const countryItem = document.getElementById(`newuser__country-item-${index + 1}`);
            const isMatched = countryName.includes(searchValue)
            countryItem.classList.toggle('hide', !isMatched)
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



    const handleSelectFile = () => {
        document.getElementById('editprofile__input__file').click();
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
            if (permissionRef.current && !permissionRef.current.contains(event.target)) {
                setShowPermissions(false);
            }
            if (blockedRef.current && !blockedRef.current.contains(event.target)) {
                setShowBlockedList(false);
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
            <h2 className='edit-profile__title new-user__title'>New User</h2>
            <div className="editprofile__imgbox__container">
                <div className="editprofile__imgbox newuser__imgbox">
                    <img className='editprofile__img newuser__img' src={picturePreview} alt="profile_img" />
                    <MdEditSquare className='editprofile__edit editprofile__edit__img newuser__edit__img' onClick={handleSelectFile} />
                </div>
                <input type="file" style={{ visibility: 'hidden' }} id='editprofile__input__file' className='editprofile__input__file' onChange={(e) => handlePreviewImage(e)} />
            </div>
            <div className="editprofile__inputbox-container newuser__inputbox-container">
                <div className="editprofile__box newuser__box">
                    <div className="editprofile__inputbox ">
                        <input type="text" name="editprofile__name" id="editprofile__name" className="editprofile__input newuser__input editprofile__name" value={name} onChange={(e) => setName(e.target.value)} placeholder='Name:' />
                    </div>
                    <div className="editprofile__inputbox ">
                        <div className="register__input-phonenumber newuser__input-phonenumber" ref={countryListRef} >
                            <div className="register__input__country-selected newuser__input__country-selected" onClick={() => setIsCountryListOpen(!isCountryListOpen)}>
                                <US style={{ display: countryCode == "1" ? "flex" : "none" }} className='register__input__country-flag newuser__country-flag' />
                                <BR style={{ display: countryCode == "55" ? "flex" : "none" }} className='register__input__country-flag newuser__country-flag' />
                                <IoIosArrowDown className='register__input__country-arrow newuser__input__country-arrow' style={{ display: isCountryListOpen ? "none" : "inline-block" }} />
                                <IoIosArrowUp className='register__input__country-arrow newuser__input__country-arrow' style={{ display: isCountryListOpen ? "inline-block" : "none" }} />
                            </div>
                            <input type="text" name="editprofile__phonenumber" id="editprofile__phonenumber" className="editprofile__input newuser__input editprofile__phonenumber" value={phoneNumber} onChange={(e) => handlePhoneNumber(e)} placeholder='Phone Number:' />
                            <div className="register__input__countries newuser__input__countries" style={{ visibility: isCountryListOpen ? "visible" : "hidden", opacity: isCountryListOpen ? "1" : "0" }}>
                                <input type="text" className='register__input__country-search register__input newuser__input__country-search' onChange={handleSearchCountry} />
                                <ul className="register__input__contry-list newuser__input__contry-list">
                                    {countries}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="editprofile__row"></div>
                <div className="editprofile__box newuser__box">
                    <div className="editprofile__inputbox ">
                        <input type="text" name="editprofile__email" id="editprofile__email" className="editprofile__input newuser__input editprofile__email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email:' />
                    </div>
                    <div className="editprofile__inputbox ">
                        <input type={birthInputType} name="editprofile__birthdate" id="editprofile__birthdate" className="editprofile__input newuser__input editprofile__birthdate" placeholder='Birth Date:' onClick={(e) => handleChangeDateInput(e, 'focus')} onBlur={(e) => handleChangeDateInput(e, 'blur')} onDoubleClick={(e) => handleChangeDateInput(e, 'double_click')} />
                    </div>
                </div>
                <div className="editprofile__inputbox edit-profile__inputbox__location">
                    <input type="text" name="editprofile__location" id="editprofile__location" className="editprofile__input newuser__input editprofile__location" value={location} onChange={(e) => setLocation(e.target.value)} placeholder='Location' />
                </div>
                <div className="editprofile__inputbox edit-profile__inputbox__biography">
                    <textarea name="editprofile__biography" id="editprofile__biography" className="editprofile__input newuser__input editprofile__biography newuser__biography" placeholder='Description:' onChange={(e) => setBiography(e.target.value)}>{biography}</textarea>
                </div>
                <div className="editprofile__inputbox edit-profile__inputbox__password new-user__inputbox__password newuser__box">
                    <div className="new-order__buyprice new-type__inputbox" id='new-type__input2'>
                        <div className="new-order__status new-user__item" ref={permissionRef} onClick={() => setShowPermissions(!showPermissions)}>
                            <span className={`${permission != -1 && "new-order__status__permission"}`}>{permission == -1 ? "Permission:" : permission == 0 ? "User" : permission == 1 ? "Administrator" : ""}</span>
                            <IoMdArrowDropdown style={{ display: showPermissions == true ? 'none' : 'inline-block' }} className='new-order__status__arr' />
                            <IoMdArrowDropup style={{ display: showPermissions == false ? 'none' : 'inline-block' }} className='new-order__status__arr' />
                            <div className="new-order__status-selection new-user__selection" style={{ display: showPermissions == true ? 'flex' : 'none' }} >
                                <p onClick={() => setPermission(0)}>User</p>
                                <p onClick={() => setPermission(1)}>Administrator</p>
                                <IoMdArrowDropup className='new-order__status__arrow' style={{ display: showPermissions == true ? 'flex' : 'none' }} />
                            </div>
                        </div>
                    </div>
                    <div className="editprofile__passbox">
                        <div className="editprofile__password__field" ref={showPassword}>
                            <input type={passwordType} name="newuser__password" id="newuser__password" className="editprofile__input newuser__input editprofile__password newuser__password" onChange={(e) => setPassword(e.target.value)} onClick={() => setShowPasswordButton(true)} placeholder='Password:' />
                            <FaEye className='editprofile__password__show newuser__password__show' onClick={() => handleShowPassword(0)} style={{ display: passwordType == "text" ? "inline-block" : "none", visibility: showPasswordButton == true ? "visible" : "hidden" }} />
                            <FaEyeSlash className='editprofile__password__show newuser__password__show' onClick={() => handleShowPassword(0)} style={{ display: passwordType == "password" ? "inline-block" : "none", visibility: showPasswordButton == true ? "visible" : "hidden" }} />
                        </div>
                    </div>
                </div>
                <div className="editprofile__row"></div>
                <div className="editprofile__inputbox edit-profile__inputbox__password new-user__inputbox__password newuser__box">
                    <div className="new-order__buyprice new-type__inputbox" id='new-type__input2'>
                        <div className="new-order__status new-user__item" ref={blockedRef} onClick={() => setShowBlockedList(!showBlockedList)}>
                            <span className={`${blocked != -1 && "new-order__status__permission"}`}>{blocked == -1 ? "Blocked:" : blocked == 0 ? "No" : blocked == 1 ? "Yes" : ""}</span>
                            <IoMdArrowDropdown style={{ display: showBlockedList == true ? 'none' : 'inline-block' }} className='new-order__status__arr' />
                            <IoMdArrowDropup style={{ display: showBlockedList == false ? 'none' : 'inline-block' }} className='new-order__status__arr' />
                            <div className="new-order__status-selection new-user__selection new-user__selection--right" style={{ display: showBlockedList == true ? 'flex' : 'none' }} >
                                <p onClick={() => setBlocked(0)}>No</p>
                                <p onClick={() => setBlocked(1)}>Yes</p>
                                <IoMdArrowDropup className='new-order__status__arrow' style={{ display: showBlockedList == true ? 'flex' : 'none' }} />
                            </div>
                        </div>
                    </div>
                    <div className="editprofile__passbox">
                        <div className="editprofile__password__field" ref={showConfirmPassword}>
                            <input type={confirmPasswordType} name="newuser__confirmpassword" id="newuser__confirmpassword" className="editprofile__input newuser__input editprofile__password newuser__password" onChange={(e) => setConfirmPassword(e.target.value)} onClick={() => setShowConfirmPasswordButton(true)} placeholder='Confirm Password:' />
                            <FaEye className='editprofile__password__show newuser__password__show' onClick={() => handleShowPassword(1)} style={{ display: confirmPasswordType == "text" ? "inline-block" : 'none', visibility: showConfirmPasswordButton == true ? "visible" : "hidden" }} />
                            <FaEyeSlash className='editprofile__password__show newuser__password__show' onClick={() => handleShowPassword(1)} style={{ display: confirmPasswordType == "password" ? "inline-block" : "none", visibility: showConfirmPasswordButton == true ? "visible" : 'hidden' }} />
                        </div>
                    </div>
                </div>
            </div>
            <button className="button  newuser__button">Create User</button>
        </div>
    )
}

export default NewUser
