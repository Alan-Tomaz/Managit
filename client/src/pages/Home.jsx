import React, { useState } from 'react'
import './Home.css';
import Logo from "../assets/images/favicon.png";
import { MdDashboard } from "react-icons/md";
import { MdOutlineDashboard } from "react-icons/md";
import { FaBox } from "react-icons/fa";
import { FaDropbox } from "react-icons/fa";
import { MdOutlineContentPasteSearch } from "react-icons/md";
import { MdContentPasteSearch } from "react-icons/md";
import { MdLocalShipping } from "react-icons/md";
import { MdOutlineLocalShipping } from "react-icons/md";
import { MdAdminPanelSettings } from "react-icons/md";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { IoMdArrowDropdown } from "react-icons/io";
import DefaultView from '../components/DefaultView';
import { useNavigate, useParams } from 'react-router-dom';

function Home() {

    const { choosenSection, choosenSubSection } = useParams();

    const [sectionDisplay, setSectionDisplay] = useState(choosenSection ?? "dashboard");
    const [subSectionDisplay, setSubSectionDisplay] = useState(choosenSubSection ?? "");

    const dispatch = useDispatch();
    const apiUrl = useSelector((state) => state.MiscReducer.apiUrl);
    const apiPort = useSelector((state) => state.MiscReducer.apiPort);

    const userInfo = useSelector((state) => state.UserReducer.user);

    const navigate = useNavigate();

    const imgPaths = `${apiUrl}:${apiPort}/assets/`;

    const handleChangeSection = (section) => {
        switch (section) {
            case 0:
                navigate("/home/dashboard");
                handleCloseMoreOptions("dashboard");
                setSectionDisplay("dashboard");
                break;
            case 1:
                navigate("/home/stock");
                handleCloseMoreOptions("stock");
                setSectionDisplay("stock");
                break;
            case 2:
                navigate("/home/manage/products");
                handleCloseMoreOptions("manage");
                setSectionDisplay("manage");
                setSubSectionDisplay("products");
                break;
            case 2:
                navigate("/home/manage/products");
                handleCloseMoreOptions("manage");
                setSectionDisplay("manage");
                setSubSectionDisplay("products");
                break;
            case 3:
                navigate("/home/manage/categories");
                handleCloseMoreOptions("manage");
                setSectionDisplay("manage");
                setSubSectionDisplay("categories");
                break;
            case 4:
                navigate("/home/manage/suppliers");
                handleCloseMoreOptions("manage");
                setSectionDisplay("manage");
                setSubSectionDisplay("suppliers");
                break;
            case 5:
                navigate("/home/movement/purchases");
                handleCloseMoreOptions("movement");
                setSectionDisplay("movement");
                setSubSectionDisplay("purchases");
                break;
            case 6:
                navigate("/home/movement/sales");
                handleCloseMoreOptions("movement");
                setSectionDisplay("movement");
                setSubSectionDisplay("sales");
                break;
            case 7:
                navigate("/home/admin/users");
                handleCloseMoreOptions("admin");
                setSectionDisplay("admin");
                setSubSectionDisplay("users");
                break;
            case 8:
                navigate("/home/admin/log");
                handleCloseMoreOptions("admin");
                setSectionDisplay("admin");
                setSubSectionDisplay("log");
                break;
            case 9:
                navigate("/home/admin/details");
                handleCloseMoreOptions("admin");
                setSectionDisplay("admin");
                setSubSectionDisplay("details");
                break;
        }
    }

    const handleOpenMoreOptions = (options) => {
        switch (options) {
            case 0:
                handleCloseMoreOptions("manage");
                document.querySelectorAll(".sidebar__manage").forEach((sidebar) => {
                    if (!sidebar.classList.contains("sidebar__manage--open")) {
                        sidebar.classList.toggle("sidebar__manage--open")
                        document.querySelectorAll(".moreoptions__manage").forEach((sidebar) => sidebar.classList.toggle
                            ("moreoptions__manage--open"))
                        document.querySelectorAll(".manage__option1").forEach((sidebar) => sidebar.classList.toggle("manage__option1--open"))
                    }
                })
                setTimeout(() => {
                    document.querySelectorAll(".manage__option1").forEach((sidebar) => {
                        if (!sidebar.classList.contains("manage__option1--open2")) {
                            sidebar.classList.toggle("manage__option1--open2")
                            document.querySelectorAll(".manage__option2").forEach((sidebar) => sidebar.classList.toggle("manage__option2--open"))
                        }
                    })
                }, 250)
                setTimeout(() => {
                    document.querySelectorAll(".manage__option2").forEach((sidebar) => {
                        if (!sidebar.classList.contains("manage__option2--open2")) {
                            sidebar.classList.toggle("manage__option2--open2")
                            document.querySelectorAll(".manage__option3").forEach((sidebar) => sidebar.classList.toggle("manage__option3--open"))
                        }
                    })
                }, 500)
                setTimeout(() => {
                    document.querySelectorAll(".manage__option3").forEach((sidebar) => {
                        if (!sidebar.classList.contains("manage__option3--open2")) {
                            sidebar.classList.toggle("manage__option3--open2")
                        }
                    })
                }, 750)
                break;
            case 1:
                handleCloseMoreOptions("movement");
                document.querySelectorAll(".sidebar__movement").forEach((sidebar) => {
                    if (!sidebar.classList.contains("sidebar__movement--open")) {
                        sidebar.classList.toggle("sidebar__movement--open")
                        document.querySelectorAll(".moreoptions__movement").forEach((sidebar) => sidebar.classList.toggle
                            ("moreoptions__movement--open"))
                        document.querySelectorAll(".movement__option1").forEach((sidebar) => sidebar.classList.toggle("movement__option1--open"))
                    }
                })
                setTimeout(() => {
                    document.querySelectorAll(".movement__option1").forEach((sidebar) => {
                        if (!sidebar.classList.contains("movement__option1--open2")) {
                            sidebar.classList.toggle("movement__option1--open2")
                            document.querySelectorAll(".movement__option2").forEach((sidebar) => sidebar.classList.toggle("movement__option2--open"))
                        }
                    })
                }, 250)
                setTimeout(() => {
                    document.querySelectorAll(".movement__option2").forEach((sidebar) => {
                        if (!sidebar.classList.contains("movement__option2--open2")) {
                            sidebar.classList.toggle("movement__option2--open2")
                        }
                    })
                }, 500)
                break;
            case 2:
                handleCloseMoreOptions("admin");
                document.querySelectorAll(".sidebar__admin").forEach((sidebar) => {
                    if (!sidebar.classList.contains("sidebar__admin--open")) {
                        sidebar.classList.toggle("sidebar__admin--open")
                        document.querySelectorAll(".moreoptions__admin").forEach((sidebar) => sidebar.classList.toggle
                            ("moreoptions__admin--open"))
                        document.querySelectorAll(".admin__option1").forEach((sidebar) => sidebar.classList.toggle("admin__option1--open"))
                    }
                })
                setTimeout(() => {
                    document.querySelectorAll(".admin__option1").forEach((sidebar) => {
                        if (!sidebar.classList.contains("admin__option1--open2")) {
                            sidebar.classList.toggle("admin__option1--open2")
                            document.querySelectorAll(".admin__option2").forEach((sidebar) => sidebar.classList.toggle("admin__option2--open"))
                        }
                    })
                }, 250)
                setTimeout(() => {
                    document.querySelectorAll(".admin__option2").forEach((sidebar) => {
                        if (!sidebar.classList.contains("admin__option2--open2")) {
                            sidebar.classList.toggle("admin__option2--open2")
                            document.querySelectorAll(".admin__option3").forEach((sidebar) => sidebar.classList.toggle("admin__option3--open"))
                        }
                    })
                }, 500)
                setTimeout(() => {
                    document.querySelectorAll(".admin__option3").forEach((sidebar) => {
                        if (!sidebar.classList.contains("admin__option3--open2")) {
                            sidebar.classList.toggle("admin__option3--open2")
                        }
                    })
                }, 750)
                break;
        }
    }

    const handleCloseMoreOptions = (option) => {

        if (option != "manage") {
            document.querySelectorAll(".sidebar__manage").forEach((sidebar) => {
                if (sidebar.classList.contains("sidebar__manage--open")) {
                    sidebar.classList.remove("sidebar__manage--open")
                    document.querySelectorAll(".moreoptions__manage").forEach((sidebar) => sidebar.classList.remove("moreoptions__manage--open"))
                    document.querySelectorAll(".manage__option1").forEach((sidebar) => sidebar.classList.remove("manage__option1--open"))
                    document.querySelectorAll(".manage__option1").forEach((sidebar) => sidebar.classList.remove("manage__option1--open2"))
                    document.querySelectorAll(".manage__option2").forEach((sidebar) => sidebar.classList.remove("manage__option2--open"))
                    document.querySelectorAll(".manage__option2").forEach((sidebar) => sidebar.classList.remove("manage__option2--open2"))
                    document.querySelectorAll(".manage__option3").forEach((sidebar) => sidebar.classList.remove("manage__option3--open"))
                    document.querySelectorAll(".manage__option3").forEach((sidebar) => sidebar.classList.remove("manage__option3--open2"))
                }
            })
        }
        if (option != "movement") {
            document.querySelectorAll(".sidebar__movement").forEach((sidebar) => {
                if (sidebar.classList.contains("sidebar__movement--open")) {
                    sidebar.classList.remove("sidebar__movement--open")
                    document.querySelectorAll(".moreoptions__movement").forEach((sidebar) => sidebar.classList.remove
                        ("moreoptions__movement--open"))
                    document.querySelectorAll(".movement__option1").forEach((sidebar) => sidebar.classList.remove("movement__option1--open"))
                    document.querySelectorAll(".movement__option1").forEach((sidebar) => sidebar.classList.remove("movement__option1--open2"))
                    document.querySelectorAll(".movement__option2").forEach((sidebar) => sidebar.classList.remove("movement__option2--open"))
                    document.querySelectorAll(".movement__option2").forEach((sidebar) => sidebar.classList.remove("movement__option2--open2"))

                }
            })
        }
        if (option != "admin") {
            document.querySelectorAll(".sidebar__admin").forEach((sidebar) => {
                if (sidebar.classList.contains("sidebar__admin--open")) {
                    sidebar.classList.remove("sidebar__admin--open")
                    document.querySelectorAll(".moreoptions__admin").forEach((sidebar) => sidebar.classList.remove("moreoptions__admin--open"))
                    document.querySelectorAll(".admin__option1").forEach((sidebar) => sidebar.classList.remove("admin__option1--open"))
                    document.querySelectorAll(".admin__option1").forEach((sidebar) => sidebar.classList.remove("admin__option1--open2"))
                    document.querySelectorAll(".admin__option2").forEach((sidebar) => sidebar.classList.remove("admin__option2--open"))
                    document.querySelectorAll(".admin__option2").forEach((sidebar) => sidebar.classList.remove("admin__option2--open2"))
                    document.querySelectorAll(".admin__option3").forEach((sidebar) => sidebar.classList.remove("admin__option3--open"))
                    document.querySelectorAll(".admin__option3").forEach((sidebar) => sidebar.classList.remove("admin__option3--open2"))
                }
            })
        }
    }

    const handleCloseSideBar = () => {

    }

    return (
        <>
            {userInfo != null ? (
                <main className='home'>
                    <aside className='home__sidebar'>
                        <div className="sidebar__logo" onClick={handleCloseSideBar}>
                            <img src={Logo} alt="logo" />
                            <h2>Managit</h2>
                        </div>
                        <div className="sidebar__option sidebar__dashboard" onClick={() => handleChangeSection(0)} >
                            <div className="sidebar__trace" style={{ opacity: sectionDisplay == "dashboard" ? "1" : "0" }}></div>
                            <MdOutlineDashboard className='sidebar__icon' />
                            <span className='sidebar__title'>Dashboard</span>
                        </div>
                        <div className="sidebar__option sidebar__stock" onClick={() => handleChangeSection(1)}>
                            <div className="sidebar__trace" style={{ opacity: sectionDisplay == "stock" ? "1" : "0" }}></div>
                            <FaDropbox className='sidebar__icon' />
                            <span className='sidebar__title'>Stock</span>
                        </div>
                        <div className={`sidebar__option sidebar__manage ${(sectionDisplay == "manage" ? "sidebar__manage--open" : "")}`} onClick={() => handleOpenMoreOptions(0)}>
                            <div className="sidebar__trace " style={{ opacity: sectionDisplay == "manage" ? "1" : "0" }}></div>
                            <MdOutlineContentPasteSearch className='sidebar__icon' />
                            <span className='sidebar__title'>Manage</span>
                        </div>
                        <div className={`sidebar__moreoptions moreoptions__manage  ${(sectionDisplay == "manage" ? "moreoptions__manage--open" : "")}`} >
                            <span className={`manage__option manage__option1 ${subSectionDisplay == "products" ? "moreoptions__option--open" : ""} ${sectionDisplay == "manage" ? "manage__option1--open manage__option1--open2" : ""}`} onClick={() => handleChangeSection(2)}>Products</span>
                            <span className={`manage__option manage__option2 ${subSectionDisplay == "categories" ? "moreoptions__option--open" : ""} ${sectionDisplay == "manage" ? "manage__option2--open manage__option2--open2" : ""}`} onClick={() => handleChangeSection(3)}>Categories</span>
                            <span className={`manage__option manage__option3 ${subSectionDisplay == "suppliers" ? "moreoptions__option--open" : ""} ${sectionDisplay == "manage" ? "manage__option3--open manage__option3--open2" : ""}`} onClick={() => handleChangeSection(4)}>Suppliers</span>
                        </div>
                        <div className={`sidebar__option sidebar__movement ${(sectionDisplay == "movement" ? "sidebar__movement--open" : "")}`} onClick={() => handleOpenMoreOptions(1)}>
                            <div className="sidebar__trace" style={{ opacity: sectionDisplay == "movement" ? "1" : "0" }}></div>
                            <MdOutlineLocalShipping className='sidebar__icon' />
                            <span className='sidebar__title'>Movement</span>
                        </div>
                        <div className={`sidebar__moreoptions moreoptions__movement  ${(sectionDisplay == "movement" ? "moreoptions__movement--open" : "")}`} >
                            <span className={`movement__option movement__option1 ${subSectionDisplay == "purchases" ? "moreoptions__option--open" : ""} ${sectionDisplay == "movement" ? "movement__option1--open movement__option1--open2" : ""}`} onClick={() => handleChangeSection(5)}>Purchases</span>
                            <span className={`movement__option movement__option2 ${subSectionDisplay == "sales" ? "moreoptions__option--open" : ""} ${sectionDisplay == "movement" ? "movement__option2--open movement__option2--open2" : ""}`} onClick={() => handleChangeSection(6)}>Sales</span>
                        </div>
                        {userInfo.adminLevel > 0 && (
                            <>
                                <div className={`sidebar__option sidebar__admin ${(sectionDisplay == "admin" ? "sidebar__admin--open" : "")}`} onClick={() => handleOpenMoreOptions(2)}>
                                    <div className="sidebar__trace" style={{ opacity: sectionDisplay == "admin" ? "1" : "0" }}></div>
                                    <MdOutlineAdminPanelSettings className='sidebar__icon' />
                                    <span className='sidebar__title'>Admin</span>
                                </div>
                                <div className={`sidebar__moreoptions moreoptions__admin ${(sectionDisplay == "admin" ? "moreoptions__admin--open" : "")}`}>
                                    <span className={`admin__option admin__option1 ${subSectionDisplay == "users" ? "moreoptions__option--open" : ""} ${sectionDisplay == "admin" ? "admin__option1--open admin__option1--open2" : ""}`} onClick={() => handleChangeSection(7)}>Users</span>
                                    <span className={`admin__option admin__option2 ${subSectionDisplay == "log" ? "moreoptions__option--open" : ""} ${sectionDisplay == "admin" ? "admin__option2--open admin__option2--open2" : ""}`} onClick={() => handleChangeSection(8)}>Activities Log</span>
                                    <span className={`admin__option admin__option3 ${subSectionDisplay == "details" ? "moreoptions__option--open" : ""} ${sectionDisplay == "admin" ? "admin__option3--open admin__option3--open2" : ""}`} onClick={() => handleChangeSection(9)}>Edit Details</span>
                                </div>
                            </>
                        )}
                    </aside>
                    <nav className='home__navbar'>
                        <div className="navbar__content">
                            <FaSearch className='navbar__icons' />
                            <IoIosNotifications className='navbar__icons' />
                            <div className="navbar__profile">
                                <div className="profile__container">
                                    <div className="profile__image">
                                        <img src={`${imgPaths}${userInfo.picturePath}`} alt="profile-image" />
                                    </div>
                                    <span className='profile__name'>{userInfo.name}</span>
                                    <IoMdArrowDropdown className='profile__arrow' />
                                </div>
                                <div className="profile__options">
                                    <span className="profile__option profile__logout">Logout</span>
                                </div>
                            </div>
                        </div>
                    </nav>
                    <section className='home__section'>
                        <div className="section__display">
                            <MdDashboard />
                            <span>Dashboard</span>
                        </div>
                        <div className="section__content">

                        </div>
                    </section>
                </main >
            ) :
                <DefaultView />
            }
        </>
    )
}

export default Home
