import React, { useEffect, useRef, useState } from 'react';
import { FaEye, FaEyeSlash, FaRegEdit } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { MdEditSquare } from "react-icons/md";
import { FaRegCircleCheck } from "react-icons/fa6";
import { FaCheckCircle } from "react-icons/fa";
import Loading from '../../assets/images/loading.svg';
import LoadingWhite from '../../assets/images/loading-white.svg';
import UserImg from '../../assets/images/user.png';
import './EditProfile.css';
import './NewUser.css';

function NewUser({ closeWindow }) {

    const showPassword = useRef(null)
    const showConfirmPassword = useRef(null)

    const [showPasswordButton, setShowPasswordButton] = useState(false);
    const [showConfirmPasswordButton, setShowConfirmPasswordButton] = useState(false);
    const [passwordType, setPasswordType] = useState('password');
    const [confirmPasswordType, setConfirmPasswordType] = useState('password');


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


    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [location, setLocation] = useState('');
    const [biography, setBiography] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

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
                    <img className='editprofile__img newuser__img' src={UserImg} alt="profile_img" />
                    <MdEditSquare className='editprofile__edit editprofile__edit__img newuser__edit__img' onClick={handleSelectFile} />
                </div>
                <input type="file" style={{ visibility: 'hidden' }} id='editprofile__input__file' className='editprofile__input__file' />
            </div>
            <div className="editprofile__inputbox-container newuser__inputbox-container">
                <div className="editprofile__box newuser__box">
                    <div className="editprofile__inputbox">
                        <input type="text" name="editprofile__name" id="editprofile__name" className="editprofile__input newuser__input editprofile__name" value={name} onChange={(e) => setName(e.target.value)} placeholder='Name:' />
                    </div>
                    <div className="editprofile__inputbox newuser__box">
                        <input type="text" name="editprofile__phonenumber" id="editprofile__phonenumber" className="editprofile__input newuser__input editprofile__phonenumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder='Phone Number:' />
                    </div>
                </div>
                <div className="editprofile__row"></div>
                <div className="editprofile__box">
                    <div className="editprofile__inputbox newuser__box">
                        <input type="text" name="editprofile__email" id="editprofile__email" className="editprofile__input newuser__input editprofile__email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email:' />
                    </div>
                    <div className="editprofile__inputbox newuser__box">
                        <input type="date" name="editprofile__birthdate" id="editprofile__birthdate" className="editprofile__input newuser__input editprofile__birthdate" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />
                    </div>
                </div>
                <div className="editprofile__inputbox edit-profile__inputbox__location">
                    <input type="text" name="editprofile__location" id="editprofile__location" className="editprofile__input newuser__input editprofile__location" value={location} onChange={(e) => setLocation(e.target.value)} placeholder='Location' />
                </div>
                <div className="editprofile__inputbox edit-profile__inputbox__biography">
                    <textarea name="editprofile__biography" id="editprofile__biography" className="editprofile__input newuser__input editprofile__biography" placeholder='Description:' onChange={(e) => setBiography(e.target.value)}>{biography}</textarea>
                </div>
                <div className="editprofile__inputbox edit-profile__inputbox__password new-user__inputbox__password">
                    <div className="editprofile__passbox">
                        <div className="editprofile__password__field" ref={showPassword}>
                            <input type={passwordType} name="newuser__password" id="newuser__password" className="editprofile__input newuser__input editprofile__password newuser__password" onChange={(e) => setPassword(e.target.value)} onClick={() => setShowPasswordButton(true)} placeholder='Password:' />
                            <FaEye className='editprofile__password__show newuser__password__show' onClick={() => handleShowPassword(0)} style={{ display: passwordType == "text" ? "inline-block" : "none", visibility: showPasswordButton == true ? "visible" : "hidden" }} />
                            <FaEyeSlash className='editprofile__password__show newuser__password__show' onClick={() => handleShowPassword(0)} style={{ display: passwordType == "password" ? "inline-block" : "none", visibility: showPasswordButton == true ? "visible" : "hidden" }} />
                        </div>
                    </div>
                </div>
                <div className="editprofile__row"></div>
                <div className="editprofile__inputbox edit-profile__inputbox__password new-user__inputbox__password">
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
