import React, { useEffect, useRef, useState } from 'react'
import "./ItemsCard.css";
import { IoSearch } from "react-icons/io5";
import { LuFilter } from "react-icons/lu";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { HiOutlineXMark } from "react-icons/hi2";
import Tshirt from "../../assets/images/t-shirt.png";
import LargeWidthImg from "../../assets/images/img_width.jpg";
import LargeHeightImg from "../../assets/images/img_height.jpg";
import { MdRemove } from "react-icons/md";
import { MdArrowDropUp } from "react-icons/md";
import { MdModeEditOutline } from "react-icons/md";

function ItemsCard({ option = 0 }) {

    const buttonRef = useRef(null);

    const [showButtonMoreOptions, setShowButtonMoreOptions] = useState(false);
    const [isAllItemsSelected, setIsAllItemsSelected] = useState(false);

    const [itemsSelected, setItemsSelected] = useState([]);

    const handleExportFile = () => {
        setShowButtonMoreOptions(false)
    }

    const handleSelectAllItems = () => {
        if (isAllItemsSelected == false) {
            const allItems = document.querySelectorAll('.stockitem__select').forEach((item) => {
                item.classList.add("stockitem__select--selected")
            })

            setIsAllItemsSelected(true)
        } else {
            const allItems = document.querySelectorAll('.stockitem__select').forEach((item) => {
                item.classList.remove("stockitem__select--selected")
            })

            setIsAllItemsSelected(false)
        }
    }

    const handleSelectItem = (e) => {
        const target = e.target;


        target.classList.toggle('stockitem__select--selected');
    }

    useEffect(() => {
        /* CLOSE WINDOW WHEN CLICK OUTSIDE */
        const handleClickOutside = (event) => {
            if (buttonRef.current && !buttonRef.current.contains(event.target)) {
                setShowButtonMoreOptions(false)
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };

    }, []);

    return (
        <>
            <div className='card card--bg card__stock'>
                <div className="stock__menu">
                    <div className="stockmenu__options">
                        <form className="stockmenu__search" onSubmit>
                            <IoSearch className='stockmenu__search-icon' />
                            <input type="text" className="stockmenu__searchinput" placeholder='Search Products' />
                        </form>
                        <div className="stockmenu__filter">
                            <LuFilter className='stockmenu__filter-icon' />
                            <span>Filter</span>
                        </div>
                    </div>
                    <div className="stockmenu__buttons">
                        <div className="stockmenu__button-export" ref={buttonRef}>
                            <div className="button button--outlined stockmenu__button" onClick={() => setShowButtonMoreOptions(!showButtonMoreOptions)}>Export <IoIosArrowDown className='stockmenu__button--outlined-icon' style={{ display: showButtonMoreOptions == false ? "inline-block" : "none" }} /><IoIosArrowUp className='stockmenu__button--outlined-icon' style={{ display: showButtonMoreOptions == true ? "inline-block" : "none" }} /></div>
                            <MdArrowDropUp className='stockmenu__button-export-icon' style={{ display: showButtonMoreOptions == true ? "flex" : "none" }} />
                            <div className="stockmenu__button-export__info" style={{ display: showButtonMoreOptions == true ? "flex" : "none" }}>
                                <div className="stockmenu__button-export__info-png button" onClick={handleExportFile}>PNG</div>
                                <div className="stockmenu__button-export__info-png button" onClick={handleExportFile}>XLSX</div>
                            </div>
                        </div>
                        <div className="button stockmenu__button">New Order</div>
                    </div>
                </div>
                <div className="stock__tags">
                    <div className="stock__tag">
                        <span>Active, Out of Stock</span>
                        <div className="stock__vl"></div>
                        <HiOutlineXMark className='stock__tag-mark' />
                    </div>
                </div>
                <div className="stock__items">
                    <div className="stockitems__header stock__item" style={{ gridTemplateColumns: option == 0 ? 'min-content 65px 250px 100px 100px 50px 100px 1fr 100px 100px' : option == 1 ? 'min-content 65px 250px 100px 100px 100px 100px 1fr 100px' : option == 2 ? 'min-content 250px 1fr 100px' : option == 3 ? 'min-content 250px 1fr 100px' : option == 4 ? 'min-content 100px 100px 100px 100px 100px 1fr 100px 100px' : option == 5 ? 'min-content 100px 100px 100px 100px 100px 1fr 100px 100px' : option == 6 ? 'min-content 65px 50px 100px 100px 100px 100px 100px 1fr 100px' : option == 7 ? 'min-content 50px 100px 100px 1fr 100px' : 0 }}>
                        <div className="stockitem__select" onClick={handleSelectAllItems}></div>
                        {(option != 2 && option != 3 && option != 4 && option != 5 && option != 7) &&
                            <div className=""></div>
                        }
                        {(option == 4 || option == 5 || option == 6 || option == 7) &&
                            <p className="stockitem__productnumber stockitem__productnumber--header stockitem__product--header">Nº</p>
                        }
                        {(option == 6 || option == 7) &&
                            <p className="stockitem__productusername stockitem__username--header stockitem__product--header">Username</p>
                        }
                        {option == 6 &&
                            <p className="stockitem__userpermission stockitem__userpermission--header stockitem__product--header">Permission</p>
                        }
                        {(option == 4 || option == 5 || option == 6) &&
                            <p className="stockitem__productcreationdate stockitem__productcreationdate--header stockitem__product--header">Creation Date</p>
                        }
                        {option == 6 &&
                            <p className="stockitem__userlastaccess stockitem__userlastaccess--header stockitem__product--header">Last Access</p>
                        }
                        {option == 6 &&
                            <p className="stockitem__userblocked stockitem__userblocked--header stockitem__product--header">Blocked</p>
                        }
                        {(option == 1 || option == 0) &&
                            <p className="stockitem__productname stockitem__productname--header stockitem__product--header">Product Name</p>
                        }
                        {(option == 1 || option == 0 || option == 2 || option == 4 || option == 5) &&
                            <p className="stockitem__productcategory stockitem__productcategory--header stockitem__product--header ">Category</p>
                        }
                        {(option == 1 || option == 3 || option == 4 || option == 5) &&
                            <p className="stockitem__productsupplier stockitem__productsupplier--header stockitem__product--header ">Supplier</p>
                        }
                        {(option == 0 || option == 1) &&
                            <p className="stockitem__productcode stockitem__productcode--header stockitem__product--header">Code</p>
                        }
                        {option == 0 &&
                            <p className="stockitem__productqnt stockitem__productqnt--header stockitem__product--header">Qnt</p>
                        }
                        {(option == 0 || option == 1 || option == 5) &&
                            < p className="stockitem__productsellprice stockitem__productsellprice--header stockitem__product--header">Sell Price</p>
                        }
                        {(option == 4) &&
                            < p className="stockitem__productbuyprice stockitem__productbuyprice--header stockitem__product--header">Buy Price</p>
                        }
                        {option == 7 &&
                            <p className="stockitem__logdate stockitem__logdate--header stockitem__product--header">Date</p>
                        }
                        {option != 6 &&
                            <p className="stockitem__productdescription stockitem__productdescription--header stockitem__product--header">Description</p>
                        }
                        {(option == 6 || option == 7) &&
                            <div></div>
                        }
                        {option == 0 &&
                            <p className="stockitem__productstatus--header stockitem__product--header">Status</p>
                        }
                        {(option == 4 || option == 5) &&
                            <p className="stockitem__productorder--header stockitem__product--header">Order</p>
                        }
                        {(option != 7) &&
                            <div className="stockitem__productsdelete button" style={{ display: "none" }}>Delete</div>
                        }
                    </div>
                    <div className="stock__items-container">
                        <div className="stock__item" style={{ gridTemplateColumns: option == 0 ? 'min-content 65px 250px 100px 100px 50px 100px 1fr 100px 100px' : option == 1 ? 'min-content 65px 250px 100px 100px 100px 100px 1fr 100px' : option == 2 ? 'min-content 250px 1fr 100px' : option == 3 ? 'min-content 250px 1fr 100px' : option == 4 ? 'min-content 100px 100px 100px 100px 100px 1fr 100px 100px' : option == 5 ? 'min-content 100px 100px 100px 100px 100px 1fr 100px 100px' : option == 6 ? 'min-content 65px 50px 100px 100px 100px 100px 100px 1fr 100px' : option == 7 ? 'min-content 50px 100px 100px 1fr 100px' : 0 }}>
                            <div className="stockitem__select" onClick={(e) => handleSelectItem(e)}></div>
                            {(option != 2 && option != 3 && option != 4 && option != 5 && option != 7) &&
                                < img src={Tshirt} className='stockitem__img' />
                            }
                            {(option == 4 || option == 5 || option == 6 || option == 7) &&
                                <p className="stockitem__productnumber">1</p>
                            }
                            {(option == 6 || option == 7) &&
                                <p className="stockitem__username">John Roger</p>
                            }
                            {option == 6 &&
                                <p className="stockitem__userpermission">Administrator</p>
                            }
                            {(option == 4 || option == 5 || option == 6) &&
                                <p className="stockitem__productcreationdate">July 1, 2024</p>
                            }
                            {(option == 1 || option == 0) &&
                                <p className="stockitem__productname">Example Example Example</p>
                            }
                            {(option == 1 || option == 0 || option == 2 || option == 4 || option == 5) &&
                                <p className="stockitem__productcategory">CATEGORY</p>
                            }
                            {option == 7 &&
                                <p className="stockitem__logdate">July 1, 2024</p>
                            }
                            {(option == 1 || option == 3 || option == 4 || option == 5) &&
                                < div className="stockitem__productsupplier stockitem__productsupplier--active">Dress Store</div>
                            }
                            {(option == 0 || option == 1) &&
                                <p className="stockitem__productcode">Code</p>
                            }
                            {option == 0 &&
                                <p className="stockitem__productqnt">17</p>
                            }
                            {option == 6 &&
                                <p className="stockitem__userlastaccess">July 6, 2024</p>
                            }
                            {option == 6 &&
                                <p className="stockitem__userblocked">Yes</p>
                            }
                            {(option == 0 || option == 1 || option == 5) &&
                                <p className="stockitem__productsellprice">$24.00</p>
                            }
                            {(option == 4) &&
                                <p className="stockitem__productbuyprice">$24.00</p>
                            }
                            {option != 6 &&
                                <p className="stockitem__productdescription">{`Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus consequuntur praesentium animi quaerat quae perspiciatis, amet voluptates blanditiis corporis facilis eos natus nihil. Dolorem, reiciendis! Commodi, exercitationem nostrum veritatis suscipit et tempora consequuntur odit eaque totam dolorem enim aspernatur quasi fuga eius deleniti possimus dolores expedita aliquam rem ipsam maxime! Rem, accusantium odio quae dolorem expedita voluptatibus, dignissimos illo, reprehenderit numquam facere molestiae excepturi ullam fugiat quos omnis? Earum repellendus explicabo sint voluptatibus, illum ea magni qui laudantium neque doloribus maxime debitis nisi. Dolor deserunt maxime in alias architecto reiciendis doloribus. Incidunt, recusandae facere. Eius saepe iste optio deleniti nostrum.`.slice(0, 30)}...</p>
                            }
                            {option == 0 &&
                                <div className="stockitem__productstatus stockitem__productstatus--active">Active</div>
                            }
                            {(option == 4 || option == 5) &&
                                <div className="stockitem__productorder stockitem__productorder"></div>
                            }
                            {(option == 6 || option == 7) &&
                                <div></div>
                            }
                            {(option != 7) &&
                                <div className="stockitem__productoptions">
                                    <div className="stockitem__productremove"><MdModeEditOutline /></div>
                                    <div className="stockitem__productremove" ><MdRemove /></div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div >
            <div className="stock__pages card--bg">
                <div className="stock__page stock__page-back"><IoIosArrowBack /></div>
                <div className="stock__page button">1</div>
                <div className="stock__page button">2</div>
                <div className="stock__page button">3</div>
                <div className="stock__page stock__page-next"><IoIosArrowForward /></div>
            </div>
        </>
    )
}

export default ItemsCard
