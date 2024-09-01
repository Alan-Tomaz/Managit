import React, { useEffect, useRef, useState } from 'react';
import './EditDetails.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function EditDetails() {

    const showPassword = useRef(null)
    const showConfirmPassword = useRef(null)

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
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
        <div className="edit-details">
            <h2>Edit Details</h2>
            <div className="edit-details__inventory-input-box edit-details__inventory-input-namebox">
                <span>Inventory Name:</span>
                <input type="text" name="edit-details__inventory-name" id="edit-details__inventory-name" className="edit-details__inventory-input edit-details__inventory-name" />
            </div>
            <div className="edit-details__inventory-input-box edit-details__inventory-input-passbox">
                <span>Inventory Password:</span>
                <div className="edit-details__password__field" ref={showPassword}>
                    <input type={passwordType} name="edit-details__inventory-pass" id="edit-details__inventory-pass" className="edit-details__inventory-input  edit-details__inventory-pass" onChange={(e) => setPassword(e.target.value)} onClick={() => setShowPasswordButton(true)} />
                    <FaEye className='edit-details__password__show' onClick={() => handleShowPassword(0)} style={{ display: passwordType == "text" ? "inline-block" : "none", visibility: showPasswordButton == true ? "visible" : "hidden" }} />
                    <FaEyeSlash className='edit-details__password__show' onClick={() => handleShowPassword(0)} style={{ display: passwordType == "password" ? "inline-block" : "none", visibility: showPasswordButton == true ? "visible" : "hidden" }} />
                </div>
            </div>
            <div className="edit-details__inventory-input-box edit-details__inventory-input-confirmpassbox">
                <span>Confirm Password:</span>
                <div className="edit-details__password__field" ref={showConfirmPassword}>
                    <input type={confirmPasswordType} name="edit-details__inventory-pass" id="edit-details__inventory-pass" className="edit-details__inventory-input  edit-details__inventory-pass" onChange={(e) => setConfirmPassword(e.target.value)} onClick={() => setShowConfirmPasswordButton(true)} />
                    <FaEye className='edit-details__password__show' onClick={() => handleShowPassword(1)} style={{ display: confirmPasswordType == "text" ? "inline-block" : "none", visibility: showConfirmPasswordButton == true ? "visible" : "hidden" }} />
                    <FaEyeSlash className='edit-details__password__show' onClick={() => handleShowPassword(1)} style={{ display: confirmPasswordType == "password" ? "inline-block" : "none", visibility: showConfirmPasswordButton == true ? "visible" : "hidden" }} />
                </div>
            </div>
            <button className="button  edit-details__button">Edit Inventory</button>
        </div>
    )
}

export default EditDetails
