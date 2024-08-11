import React, { useState } from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { MdEditSquare } from "react-icons/md";
import { FaRegCircleCheck } from "react-icons/fa6";
import { FaCheckCircle } from "react-icons/fa";
import { useSelector } from 'react-redux';
import Loading from '../../assets/images/loading.svg';
import LoadingWhite from '../../assets/images/loading-white.svg';
import './EditProfile.css';

function EditProfile({ closeWindow }) {

    const apiUrl = useSelector((state) => state.MiscReducer.apiUrl);
    const apiPort = useSelector((state) => state.MiscReducer.apiPort);
    const userInfo = useSelector((state) => state.UserReducer.user);
    const imgPaths = `${apiUrl}:${apiPort}/assets/`;

    const [showSaveButton1, setShowSaveButton1] = useState(false)
    const [showSaveButton2, setShowSaveButton2] = useState(false)
    const [showSaveButton3, setShowSaveButton3] = useState(false)
    const [showSaveButton4, setShowSaveButton4] = useState(false)
    const [showSaveButton5, setShowSaveButton5] = useState(false)
    const [showSaveButton6, setShowSaveButton6] = useState(false)
    const [showSaveButton7, setShowSaveButton7] = useState(false)
    const [showSaveButton8, setShowSaveButton8] = useState(false)

    const handleSelectFile = () => {
        document.getElementById('editprofile__input__file').click();
        setShowSaveButton1(true);
    }

    return (
        <div className="edit-profile">
            <IoClose className='edit-profile__close-window' onClick={closeWindow} />
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
                        <input type="text" name="editprofile__name" id="editprofile__name" className="editprofile__input editprofile__name" />
                    </div>
                    <div className="editprofile__inputbox">
                        <div className="editprofile__labelbox">
                            <span className='editprofile__label'>Phone Number:</span>
                            <FaRegEdit className='editprofile__edit' onClick={() => setShowSaveButton3(true)} style={{ display: showSaveButton3 === false ? 'inline-block' : 'none' }} />
                            <img src={Loading} className='editprofile__loading' style={{ display: showSaveButton3 == 'loading' ? 'inline-block' : 'none' }} />
                            <FaRegCircleCheck className='editprofile__edit' style={{ display: showSaveButton3 == true ? 'inline-block' : 'none' }} onClick={() => setShowSaveButton3(false)} />
                        </div>
                        <input type="text" name="editprofile__phonenumber" id="editprofile__phonenumber" className="editprofile__input editprofile__phonenumber" />
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
                        <input type="text" name="editprofile__email" id="editprofile__email" className="editprofile__input editprofile__email" />
                    </div>
                    <div className="editprofile__inputbox">
                        <div className="editprofile__labelbox">
                            <span className='editprofile__label'>Birth Date:</span>
                            <FaRegEdit className='editprofile__edit' onClick={() => setShowSaveButton5(true)} style={{ display: showSaveButton5 === false ? 'inline-block' : 'none' }} />
                            <img src={Loading} className='editprofile__loading' style={{ display: showSaveButton5 == 'loading' ? 'inline-block' : 'none' }} />
                            <FaRegCircleCheck className='editprofile__edit' style={{ display: showSaveButton5 == true ? 'inline-block' : 'none' }} onClick={() => setShowSaveButton5(false)} />
                        </div>
                        <input type="date" name="editprofile__birthdate" id="editprofile__birthdate" className="editprofile__input editprofile__birthdate" />
                    </div>
                </div>
                <div className="editprofile__inputbox edit-profile__inputbox__location">
                    <div className="editprofile__labelbox">
                        <span className='editprofile__label'>Location:</span>
                        <FaRegEdit className='editprofile__edit' onClick={() => setShowSaveButton6(true)} style={{ display: showSaveButton6 === false ? 'inline-block' : 'none' }} />
                        <img src={Loading} className='editprofile__loading' style={{ display: showSaveButton6 == 'loading' ? 'inline-block' : 'none' }} />
                        <FaRegCircleCheck className='editprofile__edit' style={{ display: showSaveButton6 == true ? 'inline-block' : 'none' }} onClick={() => setShowSaveButton6(false)} />
                    </div>
                    <input type="text" name="editprofile__location" id="editprofile__location" className="editprofile__input editprofile__location" />
                </div>
                <div className="editprofile__inputbox edit-profile__inputbox__biography">
                    <div className="editprofile__labelbox">
                        <span className='editprofile__label'>Biography:</span>
                        <FaRegEdit className='editprofile__edit' onClick={() => setShowSaveButton7(true)} style={{ display: showSaveButton7 === false ? 'inline-block' : 'none' }} />
                        <img src={Loading} className='editprofile__loading' style={{ display: showSaveButton7 == 'loading' ? 'inline-block' : 'none' }} />
                        <FaRegCircleCheck className='editprofile__edit' style={{ display: showSaveButton7 == true ? 'inline-block' : 'none' }} onClick={() => setShowSaveButton7(false)} />
                    </div>
                    <textarea name="editprofile__biography" id="editprofile__biography" className="editprofile__input editprofile__biography" ></textarea>
                </div>
                <div className="editprofile__inputbox edit-profile__inputbox__password">
                    <div className="editprofile__labelbox">
                        <span className='editprofile__label'>Password:</span>
                        <FaRegEdit className='editprofile__edit' onClick={() => setShowSaveButton8(true)} style={{ display: showSaveButton8 == false ? 'inline-block' : 'none' }} />
                        <img src={Loading} className='editprofile__loading' style={{ display: showSaveButton8 == 'loading' ? 'inline-block' : 'none' }} />
                        <FaRegCircleCheck className='editprofile__edit' style={{ display: showSaveButton8 == true ? 'inline-block' : 'none' }} onClick={() => setShowSaveButton8(false)} />
                    </div>
                    <input type="password" name="editprofile__password" id="editprofile__password" className="editprofile__input editprofile__password" />
                </div>
            </div>
        </div>
    )
}

export default EditProfile
