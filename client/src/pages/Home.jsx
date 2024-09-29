import React, { useEffect, useRef, useState } from 'react'
import './Home.css';
import Logo from "../assets/images/favicon.png";
import { MdOutlineDashboard } from "react-icons/md";
import { FaDropbox } from "react-icons/fa";
import { MdOutlineContentPasteSearch } from "react-icons/md";
import { MdOutlineLocalShipping } from "react-icons/md";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { IoIosNotifications, IoMdArrowDropup } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { IoMdArrowDropdown } from "react-icons/io";
import DefaultView from '../components/DefaultView';
import NotificationItem from "../assets/images/notification_item.png";
import { useNavigate, useParams } from 'react-router-dom';
import { logout } from "../state/User/UserSlice.js";
import Dashboard from "../components/sections/Dashboard.jsx";
import Stock from "../components/sections/Stock.jsx";
import Products from "../components/sections/Products.jsx";
import Categories from "../components/sections/Categories.jsx";
import Suppliers from "../components/sections/Suppliers.jsx";
import Purchases from "../components/sections/Purchases.jsx";
import Sales from "../components/sections/Sales.jsx";
import Users from "../components/sections/Users.jsx";
import ActivitiesLog from "../components/sections/ActivitiesLog.jsx";
import EditDetails from "../components/sections/EditDetails.jsx";
import NewOrder from '../components/cards/NewOrder.jsx';
import EditProfile from '../components/cards/EditProfile.jsx';
import EditInventories from '../components/cards/EditInventories.jsx';
import CreateProducts from '../components/cards/CreateProducts.jsx';
import CreateSupplier from '../components/cards/CreateSupplier.jsx';
import CreateCategory from '../components/cards/CreateCategory.jsx';
import NewUser from '../components/cards/NewUser.jsx';
import RemoveItem from '../components/cards/RemoveItem.jsx';

function Home({ showToastMessage }) {

    const mainRef = useRef(null)

    const { choosenSection, choosenSubSection } = useParams();

    /* GET WINDOW DIMENSIONS */
    const { innerWidth: width, innerHeight: height } = window

    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isLoadingSection, setIsLoadingSection] = useState(false);
    const [isSidebarStopped, setIsSidebarStopped] = useState(true);

    const [sectionDisplay, setSectionDisplay] = useState(choosenSection ?? "dashboard");
    const [subSectionDisplay, setSubSectionDisplay] = useState(choosenSubSection ?? "");
    const [showNavbarOptions, setShowNavbarOptions] = useState(false);
    const [showNavbarNotifications, setShowNavbarNotifications] = useState(false);
    const [showSearchInput, setShowSearchInput] = useState(false);
    const [showModal, setShowModal] = useState('');
    const [itemInfo, setItemInfo] = useState({ item: '', option: -1, id: 0 });
    const [updateTrigger, setUpdateTrigger] = useState(false);

    const dispatch = useDispatch();
    const apiUrl = useSelector((state) => state.MiscReducer.apiUrl);
    const apiPort = useSelector((state) => state.MiscReducer.apiPort);

    const userInfo = useSelector((state) => state.UserReducer.user);

    const navigate = useNavigate();

    const imgPaths = `${apiUrl}:${apiPort}/assets/`;

    /* POPUPS */
    const triggerUpdate = () => {
        setUpdateTrigger(prev => !prev);
    };

    const handleCreateItem = (updateType, item, option, id, orderTypeParam = null) => {
        setShowModal(updateType);
        setItemInfo({ item: item, option: option, id: id, orderTypeParam: orderTypeParam });
    }

    const handleRemoveItem = (item, option, id) => {
        setShowModal('remove-item');
        setItemInfo({ item: item, option: option, id: id });
    }


    /* ASIDE */
    const handleChangeSection = (section) => {
        switch (section) {
            case 0:

                navigate("/home/dashboard");
                handleCloseMoreOptions("dashboard");
                setSectionDisplay("dashboard");
                setSubSectionDisplay("");
                break;
            case 1:
                navigate("/home/stock");
                handleCloseMoreOptions("stock");
                setSectionDisplay("stock");
                setSubSectionDisplay("");
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

    const handleOpenMoreOptions = (options, passCheck = 0) => {

        switch (options) {
            case 0:
                if ((isSidebarOpen == true && isSidebarStopped == true) || passCheck != 0) {
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
                } else {
                    handleCloseSideBar(0);
                }
                break;
            case 1:
                if ((isSidebarOpen == true && isSidebarStopped == true) || passCheck != 0) {
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
                } else {
                    handleCloseSideBar(1);
                }
                break;
            case 2:
                if ((isSidebarOpen == true && isSidebarStopped == true) || passCheck != 0) {
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
                } else {
                    handleCloseSideBar(2);
                }
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

    const handleCloseSideBar = (option) => {
        if (isSidebarStopped) {
            if (isSidebarOpen == true) {
                setIsSidebarStopped(false);
                setIsSidebarOpen(false)

                /* FIXED */
                document.querySelectorAll(".home__navbar").forEach((sidebar) => sidebar.classList.toggle("home__navbar-sidebar--open"))
                document.querySelectorAll(".home__section").forEach((sidebar) => sidebar.classList.toggle("home__section-sidebar--open"))
                /*  */
                document.querySelectorAll(".home").forEach((item) => {
                    item.classList.toggle("home__withoutsidebar");
                })
                document.querySelectorAll(".sidebar__moreoptions").forEach((item) => {
                    item.classList.toggle("hide__sidebar_2");
                })
                document.querySelectorAll(".sidebar__logo--title").forEach((item) => {
                    item.classList.toggle("hide__sidebar");
                })
                document.querySelectorAll(".sidebar__title").forEach((item) => {
                    item.classList.toggle("hide__sidebar");
                })
                document.querySelectorAll(".credits").forEach((item) => {
                    item.classList.toggle("hide__sidebar");
                })
                setTimeout(() => {
                    document.querySelectorAll(".credits").forEach((item) => {
                        item.classList.toggle("hide__sidebar_2");
                    })
                    document.querySelectorAll(".sidebar__title").forEach((item) => {
                        item.classList.toggle("hide__sidebar_2");
                    })
                    document.querySelectorAll(".sidebar__logo--title").forEach((item) => {
                        item.classList.toggle("hide__sidebar_2");
                    })
                }, 300);
                setTimeout(() => {
                    setIsSidebarStopped(true);
                }, 1000);
            } else {
                setIsSidebarOpen(true)
                setIsSidebarStopped(false);

                switch (option) {
                    case 0:
                        handleCloseMoreOptions("manage");
                        break;
                    case 1:
                        handleCloseMoreOptions("movement");
                        break;
                    case 2:
                        handleCloseMoreOptions("admin");
                        break;
                }

                /* FIXED */
                document.querySelectorAll(".home__navbar").forEach((sidebar) => sidebar.classList.remove("home__navbar-sidebar--open"))
                document.querySelectorAll(".home__section").forEach((sidebar) => sidebar.classList.remove("home__section-sidebar--open"))
                /*  */
                document.querySelectorAll(".home").forEach((item) => {
                    item.classList.remove("home__withoutsidebar");
                })
                setTimeout(() => {
                    document.querySelectorAll(".credits").forEach((item) => {
                        item.classList.remove("hide__sidebar_2");
                    })
                    document.querySelectorAll(".sidebar__title").forEach((item) => {
                        item.classList.remove("hide__sidebar_2");
                    })
                    document.querySelectorAll(".sidebar__logo--title").forEach((item) => {
                        item.classList.remove("hide__sidebar_2");
                    })
                    document.querySelectorAll(".sidebar__moreoptions").forEach((item) => {
                        item.classList.remove("hide__sidebar_2");
                    })
                    setTimeout(() => {
                        document.querySelectorAll(".credits").forEach((item) => {
                            item.classList.remove("hide__sidebar");
                        })
                        document.querySelectorAll(".sidebar__logo--title").forEach((item) => {
                            item.classList.remove("hide__sidebar");
                        })
                        document.querySelectorAll(".sidebar__title").forEach((item) => {
                            item.classList.remove("hide__sidebar");
                        })
                        document.querySelectorAll(".credits").forEach((item) => {
                            item.classList.add("show__sidebar");
                        })
                        document.querySelectorAll(".sidebar__logo--title").forEach((item) => {
                            item.classList.add("show__sidebar");
                        })
                        document.querySelectorAll(".sidebar__title").forEach((item) => {
                            item.classList.add("show__sidebar");
                        })
                    }, 100);
                    switch (option) {
                        case 0:

                            handleOpenMoreOptions(0, 1);

                            break;
                        case 1:

                            handleOpenMoreOptions(1, 1);

                            break;
                        case 2:

                            handleOpenMoreOptions(2, 1);

                            break;
                    }
                }, 300);
                setTimeout(() => {
                    setIsSidebarStopped(true);
                    document.querySelectorAll(".credits").forEach((item) => {
                        item.classList.remove("show__sidebar");
                    })
                    document.querySelectorAll(".sidebar__logo--title").forEach((item) => {
                        item.classList.remove("show__sidebar");
                    })
                    document.querySelectorAll(".sidebar__title").forEach((item) => {
                        item.classList.remove("show__sidebar");
                    })
                }, 1000);
            }
        }
    }


    /* NAVBAR */
    const handleShowProfileOptions = () => {
        setShowNavbarOptions(!showNavbarOptions);
    }

    const handleShowNotifications = () => {
        setShowNavbarNotifications(!showNavbarNotifications);
    }

    const handleShowSearchInput = () => {
        setShowSearchInput(!showSearchInput);
    }

    const handlePressKey = (e) => {
        const keyPress = e.key;

        if (keyPress == "Escape") {
            setShowModal('');
        }
    }

    const profileRef = useRef(null);
    const notificationRef = useRef(null);

    useEffect(() => {
        /* CLOSE WINDOW WHEN CLICK OUTSIDE */
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setShowNavbarOptions(false)
            }

            if (notificationRef.current && !notificationRef.current.contains(event.target)) {
                setShowNavbarNotifications(false)
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handlePressKey);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };

    }, []);

    const logoutUser = () => {
        dispatch(logout());
        navigate('/')
    }

    useEffect(() => {

        if (innerWidth <= 600) {
            const element = mainRef.current;

            if (element) {
                element.addEventListener('load', handleCloseSideBar());
            }

            // Cleanup: remover o event listener quando o componente for desmontado
            return () => {
                if (element) {
                    element.removeEventListener('load', handleCloseSideBar());
                }
            };
        }
    }, [])

    return (
        <>
            {userInfo != null ? (
                <main className='home' ref={mainRef}>
                    <div className="modal__window" style={{ display: showModal != '' ? 'flex' : 'none' }} >
                        {showModal == 'new-order' &&
                            <NewOrder closeWindow={() => setShowModal('')} item={itemInfo.item} option={itemInfo.option} id={itemInfo.id} orderTypeParam={itemInfo.orderTypeParam} showToastMessage={showToastMessage} setReload={triggerUpdate} handleOpenWindow={handleCreateItem} />
                        }
                        {showModal == 'edit-profile' &&
                            <EditProfile closeWindow={() => setShowModal('')} />
                        }
                        {showModal == 'edit-inventories' &&
                            <EditInventories closeWindow={() => setShowModal('')} />
                        }
                        {showModal == 'edit-inventorie' &&
                            <EditInventories closeWindow={() => setShowModal('')} showEditInv={false} showCreateInv={true} />
                        }
                        {showModal == 'create-products' &&
                            <CreateProducts closeWindow={() => setShowModal('')} item={itemInfo.item} option={itemInfo.option} id={itemInfo.id} showToastMessage={showToastMessage} setReload={triggerUpdate} />
                        }
                        {showModal == 'create-category' &&
                            <CreateCategory closeWindow={() => setShowModal('')} item={itemInfo.item} option={itemInfo.option} id={itemInfo.id} showToastMessage={showToastMessage} setReload={triggerUpdate} />
                        }
                        {showModal == 'create-supplier' &&
                            <CreateSupplier closeWindow={() => setShowModal('')} item={itemInfo.item} option={itemInfo.option} id={itemInfo.id} showToastMessage={showToastMessage} setReload={triggerUpdate} />
                        }
                        {showModal == 'new-user' &&
                            <NewUser closeWindow={() => setShowModal('')} />
                        }
                        {showModal == 'remove-item' &&
                            <RemoveItem closeWindow={() => setShowModal('')} item={itemInfo.item} option={itemInfo.option} id={itemInfo.id} showToastMessage={showToastMessage} setReload={triggerUpdate} />
                        }
                    </div>
                    <aside className='home__sidebar'>
                        <div className="sidebar__logo" onClick={handleCloseSideBar}>
                            <img src={Logo} alt="logo" />
                            <h2 className='sidebar__logo--title'>Managit</h2>
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
                        <p className="credits" >Created By <a href="https://github.com/Alan-Tomaz" target='_blank'>Alan Tomaz</a></p>
                    </aside>
                    <nav className='home__navbar' >
                        <div className="navbar__search" style={{ visibility: showSearchInput == true ? "visible" : "hidden", opacity: showSearchInput == true ? "1" : "0" }}>
                            <input type="text" name="" id="" placeholder='Search:' className="input__search" />
                        </div>
                        <div className="navbar__content">
                            <FaSearch className='navbar__icons ' onClick={handleShowSearchInput} />
                            <div className="navbar__notification" ref={notificationRef}>
                                <IoIosNotifications className='navbar__icons notification__icon' onClick={handleShowNotifications} />
                                <div className="notification__circle"></div>
                                <div className="notification__container" style={{ display: showNavbarNotifications == true ? "flex" : "none" }}>
                                    <div className="notification__item" >
                                        <img src={NotificationItem} alt="notification_item_img" className='notification__img' />
                                        <h3 className="notification__name">Example</h3>
                                        <span className="notification__time">3 min ago.</span>
                                    </div>
                                    <div className="notification__item" >
                                        <img src={NotificationItem} alt="notification_item_img" className='notification__img' />
                                        <h3 className="notification__name">Example</h3>
                                        <span className="notification__time">3 min ago.</span>
                                    </div>
                                    <div className="notification__item" >
                                        <img src={NotificationItem} alt="notification_item_img" className='notification__img' />
                                        <h3 className="notification__name">Example</h3>
                                        <span className="notification__time">3 min ago.</span>
                                    </div>
                                </div>
                            </div>
                            <div className="navbar__profile" onClick={handleShowProfileOptions} ref={profileRef}>
                                <div className="profile__container">
                                    <div className="profile__image" >
                                        <img src={`${imgPaths}${userInfo.picturePath}`} alt="profile-image" />
                                    </div>
                                    <span className='profile__name'>{userInfo.name}</span>
                                    <IoMdArrowDropdown className='profile__arrow' style={{ display: showNavbarOptions == false ? "flex" : "none" }} />
                                    <IoMdArrowDropup className='profile__arrow' style={{ display: showNavbarOptions == true ? "flex" : "none" }} />
                                </div>
                                <div className="profile__options" style={{ display: showNavbarOptions == true ? "flex" : "none" }}>
                                    <span className="profile__option profile__inventories" onClick={() => setShowModal('edit-inventories')} >Inventories</span>
                                    <span className="profile__option profile__edit" onClick={() => setShowModal('edit-profile')}>Edit Profile</span>
                                    <span className="profile__option profile__logout" onClick={logoutUser}>Logout</span>
                                    <IoMdArrowDropup className='profile__option__arrow' />
                                </div>
                            </div>
                        </div>
                    </nav>
                    <section className='home__section'>
                        <div className="section__display">
                            <div className="section__name" style={{ display: sectionDisplay == "dashboard" ? "flex" : "none" }}>
                                <MdOutlineDashboard className='section__icon' />
                                <span>Dashboard</span>
                            </div>
                            <div className="section__name" style={{ display: sectionDisplay == "stock" ? "flex" : "none" }}>
                                <FaDropbox className='section__icon' />
                                <span>Stock</span>
                            </div>
                            <div className="section__name" style={{ display: sectionDisplay == "manage" ? "flex" : "none" }}>
                                <MdOutlineContentPasteSearch className='section__icon' />
                                <span style={{ display: subSectionDisplay == "products" ? "initial" : "none" }}>Products</span>
                                <span style={{ display: subSectionDisplay == "categories" ? "initial" : "none" }}>Categories</span>
                                <span style={{ display: subSectionDisplay == "suppliers" ? "initial" : "none" }}>Suppliers</span>
                            </div>
                            <div className="section__name" style={{ display: sectionDisplay == "movement" ? "flex" : "none" }}>
                                <MdOutlineLocalShipping className='section__icon' />
                                <span style={{ display: subSectionDisplay == "purchases" ? "initial" : "none" }}>Purchases</span>
                                <span style={{ display: subSectionDisplay == "sales" ? "initial" : "none" }}>Sales</span>
                            </div>
                            <div className="section__name" style={{ display: sectionDisplay == "admin" ? "flex" : "none" }}>
                                <MdOutlineAdminPanelSettings className='section__icon' />
                                <span style={{ display: subSectionDisplay == "users" ? "initial" : "none" }}>Users</span>
                                <span style={{ display: subSectionDisplay == "log" ? "initial" : "none" }}>Activities Log</span>
                                <span style={{ display: subSectionDisplay == "details" ? "initial" : "none" }}>Edit Details</span>
                            </div>
                        </div>
                        <div className="section__content">
                            {sectionDisplay == "dashboard" ?
                                <Dashboard />
                                :
                                sectionDisplay == "stock" ?
                                    <Stock handleOpenWindow={() => setShowModal('new-order')} handleRemoveItem={() => setShowModal('remove-item')} />
                                    :
                                    subSectionDisplay == "products" ?
                                        <Products handleOpenWindow={handleCreateItem} handleRemoveItem={handleRemoveItem} reload={updateTrigger} />
                                        :
                                        subSectionDisplay == "categories" ?
                                            <Categories handleOpenWindow={handleCreateItem} handleRemoveItem={handleRemoveItem} reload={updateTrigger} />
                                            :
                                            subSectionDisplay == "suppliers" ?
                                                <Suppliers handleOpenWindow={handleCreateItem} handleRemoveItem={handleRemoveItem} reload={updateTrigger} />
                                                :
                                                subSectionDisplay == "purchases" ?
                                                    <Purchases handleOpenWindow={handleCreateItem} handleRemoveItem={handleRemoveItem} reload={updateTrigger} />
                                                    :
                                                    subSectionDisplay == "sales" ?
                                                        <Sales handleOpenWindow={() => setShowModal('new-order')} handleRemoveItem={() => setShowModal('remove-item')} />
                                                        :
                                                        subSectionDisplay == "users" ?
                                                            <Users handleOpenWindow={() => setShowModal('new-user')} handleRemoveItem={() => setShowModal('remove-item')} />
                                                            :
                                                            subSectionDisplay == "log" ?
                                                                <ActivitiesLog />
                                                                :
                                                                subSectionDisplay == "details" ?
                                                                    <EditDetails handleOpenWindow={() => setShowModal('edit-details')} />
                                                                    :
                                                                    <></>
                            }
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
