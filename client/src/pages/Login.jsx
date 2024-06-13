import React, { useEffect, useRef, useState } from 'react';
import LoginImg from "../assets/images/login-img.svg";
import "../pages/Register";
import { Link, useNavigate } from 'react-router-dom';
import LoadingSuccess from "../assets/images/loading-success.svg";
import Loading from "../assets/images/loading.svg"
import { useDispatch, useSelector } from 'react-redux';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { setLogin } from "../state/User/UserSlice";

function Login() {

    const apiUrl = useSelector((state) => state.MiscReducer.apiUrl);
    const apiPort = useSelector((state) => state.MiscReducer.apiPort);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [isShowingPassword, setIsShowingPassword] = useState("password");
    const [showPasswordButton, setShowPasswordButton] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    const [isLoading, setIsLoading] = useState(false);

    const showPassword = useRef(null)

    useEffect(() => {
        /* CLOSE WINDOW WHEN CLICK OUTSIDE */
        const handleClickOutside = (event) => {
            /* SHOW PASSWORD BUTTON */
            if (showPassword.current && !showPassword.current.contains(event.target)) {
                setShowPasswordButton(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };

    }, []);

    const handleShowPassword = () => {
        if (isShowingPassword == "password") {
            setIsShowingPassword("text")
        }
        else {
            setIsShowingPassword("password")
        }
    }

    const handleSubmitForm = async (e, values) => {
        e.preventDefault();


        const passRegex1 = new RegExp('[a-z]', 'g');
        const passRegex2 = new RegExp('[A-Z]', 'g');
        const passRegex3 = new RegExp('[0-9]', 'g');
        const passRegex4 = new RegExp('[^A-Za-z0-9]', 'g');

        const emailRegex = new RegExp('^(([^<>()[\\]\\\\.,;:\\s@\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\"]+)*)|(\\".+\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$');

        if ((email == "" || email == undefined) || (password == "" || password == undefined)) {
            setErrorMsg("Fill in all form fields");
        }
        else if (!emailRegex.test(email)) {
            setErrorMsg("Invalid email");
        }
        else if (password.length < 8) {
            setErrorMsg("Password too Short");
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
        else {

            setErrorMsg("");

            setIsLoading(true);

            const loggedUserResponse = await fetch(
                `${apiUrl}:${apiPort}/auth/login`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(values)
                }
            );
            const loggedUser = await loggedUserResponse.json();

            if (loggedUser) {
                if (loggedUser.status == 201) {
                    setIsLoading(false);

                    e.target.reset();

                    setSuccessMsg(`Logged Successfully. Redirecting to Home Page `);

                    console.log(loggedUser);

                    dispatch(
                        setLogin({
                            user: loggedUser.user,
                            token: loggedUser.token
                        })
                    )

                    setTimeout(() => {
                        navigate("/home");
                    }, 3000);
                    return;
                }
                else {
                    setErrorMsg(loggedUser.msg);
                }
            }
        }

        setIsLoading(false);
        setIsDisabled(false);
        return
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
                        <form className="register__form login__form" id='register__form ' onSubmit={(e) => handleSubmitForm(e, { email, password })}>
                            <input type="text" placeholder='Email:' className='register__input-email register__input login__input' onChange={(e) => setEmail(e.target.value)} />
                            <div className="password__field password__field--login" ref={showPassword}>
                                <input type={isShowingPassword} placeholder='Password:' className='register__input-password register__input login__input login__input-password' onChange={(e) => setPassword(e.target.value)} onClick={() => setShowPasswordButton(true)} />
                                <FaEye className='password__show' onClick={handleShowPassword} style={{ display: isShowingPassword == "text" ? "inline-block" : "none", visibility: showPasswordButton == true ? "visible" : "hidden" }} />
                                <FaEyeSlash className='password__show' onClick={handleShowPassword} style={{ display: isShowingPassword == "password" ? "inline-block" : "none", visibility: showPasswordButton == true ? "visible" : "hidden" }} />
                            </div>
                            <p className='register__alert' style={{ display: errorMsg.length > 0 ? "inline-block" : "none" }}>{errorMsg}</p>
                            <div className='register__alert__success' style={{ display: successMsg.length > 0 ? "flex" : "none" }} >
                                <p className='register__alert register__alert--success' style={{ display: successMsg.length > 0 ? "inline-block" : "none" }}>{successMsg}</p>
                                <img style={{ display: successMsg.length > 0 ? "inline-block" : "none" }} className='submit__loading submit__loading--success' src={LoadingSuccess} />
                            </div>
                            <img style={{ display: isLoading == true ? "inline-block" : "none" }} className='submit__loading' src={Loading} />
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
