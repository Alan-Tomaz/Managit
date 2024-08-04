import React, { useEffect, useRef, useState } from 'react'
import './Stock.css';
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

function Stock() {

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
                    <div className="stockitems__header stock__item">
                        <div className="stockitem__select" onClick={handleSelectAllItems}></div>
                        <div className=""></div>
                        <p className="stockitem__productname stockitem__productname--header stockitem__product--header">Product Name</p>
                        <p className="stockitem__productcategory stockitem__productcategory--header stockitem__product--header ">Category</p>
                        <p className="stockitem__productcode stockitem__productcode--header stockitem__product--header">Code</p>
                        <p className="stockitem__productqnt stockitem__productqnt--header stockitem__product--header">Qnt</p>
                        <p className="stockitem__productsellprice stockitem__productsellprice--header stockitem__product--header">Sell Price</p>
                        <p className="stockitem__productdescription stockitem__productdescription--header stockitem__product--header">Description</p>
                        <p className="stockitem__productstatus--header stockitem__product--header">Status</p>
                        <div className="stockitem__productsdelete button" style={{ display: "none" }}>Delete</div>
                    </div>
                    <div className="stock__items-container">
                        <div className="stock__item">
                            <div className="stockitem__select" onClick={(e) => handleSelectItem(e)}></div>
                            <img src={Tshirt} className='stockitem__img' />
                            <p className="stockitem__productname">Example Example Example</p>
                            <p className="stockitem__productcategory">CATEGORY</p>
                            <p className="stockitem__productcode">Code</p>
                            <p className="stockitem__productqnt">17</p>
                            <p className="stockitem__productsellprice">$24.00</p>
                            <p className="stockitem__productdescription">{`Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus consequuntur praesentium animi quaerat quae perspiciatis, amet voluptates blanditiis corporis facilis eos natus nihil. Dolorem, reiciendis! Commodi, exercitationem nostrum veritatis suscipit et tempora consequuntur odit eaque totam dolorem enim aspernatur quasi fuga eius deleniti possimus dolores expedita aliquam rem ipsam maxime! Rem, accusantium odio quae dolorem expedita voluptatibus, dignissimos illo, reprehenderit numquam facere molestiae excepturi ullam fugiat quos omnis? Earum repellendus explicabo sint voluptatibus, illum ea magni qui laudantium neque doloribus maxime debitis nisi. Dolor deserunt maxime in alias architecto reiciendis doloribus. Incidunt, recusandae facere. Eius saepe iste optio deleniti nostrum.`.slice(0, 30)}...</p>
                            <div className="stockitem__productstatus stockitem__productstatus--active">Active</div>
                            <div className="stockitem__productoptions">
                                <div className="stockitem__productremove"><MdModeEditOutline /></div>
                                <div className="stockitem__productremove" ><MdRemove /></div>
                            </div>
                        </div>
                        <div className="stock__item">
                            <div className="stockitem__select" onClick={(e) => handleSelectItem(e)}></div>
                            <img src={Tshirt} className='stockitem__img' />
                            <p className="stockitem__productname">Example Example Example</p>
                            <p className="stockitem__productcategory">CATEGORY</p>
                            <p className="stockitem__productcode">Code</p>
                            <p className="stockitem__productqnt">17</p>
                            <p className="stockitem__productsellprice">$24.00</p>
                            <p className="stockitem__productdescription">{`Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus consequuntur praesentium animi quaerat quae perspiciatis, amet voluptates blanditiis corporis facilis eos natus nihil. Dolorem, reiciendis! Commodi, exercitationem nostrum veritatis suscipit et tempora consequuntur odit eaque totam dolorem enim aspernatur quasi fuga eius deleniti possimus dolores expedita aliquam rem ipsam maxime! Rem, accusantium odio quae dolorem expedita voluptatibus, dignissimos illo, reprehenderit numquam facere molestiae excepturi ullam fugiat quos omnis? Earum repellendus explicabo sint voluptatibus, illum ea magni qui laudantium neque doloribus maxime debitis nisi. Dolor deserunt maxime in alias architecto reiciendis doloribus. Incidunt, recusandae facere. Eius saepe iste optio deleniti nostrum.`.slice(0, 30)}...</p>
                            <div className="stockitem__productstatus stockitem__productstatus--active">Active</div>
                            <div className="stockitem__productoptions">
                                <div className="stockitem__productremove"><MdModeEditOutline /></div>
                                <div className="stockitem__productremove" ><MdRemove /></div>
                            </div>
                        </div>
                        <div className="stock__item">
                            <div className="stockitem__select" onClick={(e) => handleSelectItem(e)}></div>
                            <img src={Tshirt} className='stockitem__img' />
                            <p className="stockitem__productname">Example Example Example</p>
                            <p className="stockitem__productcategory">CATEGORY</p>
                            <p className="stockitem__productcode">Code</p>
                            <p className="stockitem__productqnt">17</p>
                            <p className="stockitem__productsellprice">$24.00</p>
                            <p className="stockitem__productdescription">{`Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus consequuntur praesentium animi quaerat quae perspiciatis, amet voluptates blanditiis corporis facilis eos natus nihil. Dolorem, reiciendis! Commodi, exercitationem nostrum veritatis suscipit et tempora consequuntur odit eaque totam dolorem enim aspernatur quasi fuga eius deleniti possimus dolores expedita aliquam rem ipsam maxime! Rem, accusantium odio quae dolorem expedita voluptatibus, dignissimos illo, reprehenderit numquam facere molestiae excepturi ullam fugiat quos omnis? Earum repellendus explicabo sint voluptatibus, illum ea magni qui laudantium neque doloribus maxime debitis nisi. Dolor deserunt maxime in alias architecto reiciendis doloribus. Incidunt, recusandae facere. Eius saepe iste optio deleniti nostrum.`.slice(0, 30)}...</p>
                            <div className="stockitem__productstatus stockitem__productstatus--active">Active</div>
                            <div className="stockitem__productoptions">
                                <div className="stockitem__productremove"><MdModeEditOutline /></div>
                                <div className="stockitem__productremove" ><MdRemove /></div>
                            </div>
                        </div>
                        <div className="stock__item">
                            <div className="stockitem__select" onClick={(e) => handleSelectItem(e)}></div>
                            <img src={Tshirt} className='stockitem__img' />
                            <p className="stockitem__productname">Example Example Example</p>
                            <p className="stockitem__productcategory">CATEGORY</p>
                            <p className="stockitem__productcode">Code</p>
                            <p className="stockitem__productqnt">17</p>
                            <p className="stockitem__productsellprice">$24.00</p>
                            <p className="stockitem__productdescription">{`Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus consequuntur praesentium animi quaerat quae perspiciatis, amet voluptates blanditiis corporis facilis eos natus nihil. Dolorem, reiciendis! Commodi, exercitationem nostrum veritatis suscipit et tempora consequuntur odit eaque totam dolorem enim aspernatur quasi fuga eius deleniti possimus dolores expedita aliquam rem ipsam maxime! Rem, accusantium odio quae dolorem expedita voluptatibus, dignissimos illo, reprehenderit numquam facere molestiae excepturi ullam fugiat quos omnis? Earum repellendus explicabo sint voluptatibus, illum ea magni qui laudantium neque doloribus maxime debitis nisi. Dolor deserunt maxime in alias architecto reiciendis doloribus. Incidunt, recusandae facere. Eius saepe iste optio deleniti nostrum.`.slice(0, 30)}...</p>
                            <div className="stockitem__productstatus stockitem__productstatus--active">Active</div>
                            <div className="stockitem__productoptions">
                                <div className="stockitem__productremove"><MdModeEditOutline /></div>
                                <div className="stockitem__productremove" ><MdRemove /></div>
                            </div>
                        </div>
                        <div className="stock__item">
                            <div className="stockitem__select" onClick={(e) => handleSelectItem(e)}></div>
                            <img src={Tshirt} className='stockitem__img' />
                            <p className="stockitem__productname">Example Example Example</p>
                            <p className="stockitem__productcategory">CATEGORY</p>
                            <p className="stockitem__productcode">Code</p>
                            <p className="stockitem__productqnt">17</p>
                            <p className="stockitem__productsellprice">$24.00</p>
                            <p className="stockitem__productdescription">{`Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus consequuntur praesentium animi quaerat quae perspiciatis, amet voluptates blanditiis corporis facilis eos natus nihil. Dolorem, reiciendis! Commodi, exercitationem nostrum veritatis suscipit et tempora consequuntur odit eaque totam dolorem enim aspernatur quasi fuga eius deleniti possimus dolores expedita aliquam rem ipsam maxime! Rem, accusantium odio quae dolorem expedita voluptatibus, dignissimos illo, reprehenderit numquam facere molestiae excepturi ullam fugiat quos omnis? Earum repellendus explicabo sint voluptatibus, illum ea magni qui laudantium neque doloribus maxime debitis nisi. Dolor deserunt maxime in alias architecto reiciendis doloribus. Incidunt, recusandae facere. Eius saepe iste optio deleniti nostrum.`.slice(0, 30)}...</p>
                            <div className="stockitem__productstatus stockitem__productstatus--active">Active</div>
                            <div className="stockitem__productoptions">
                                <div className="stockitem__productremove"><MdModeEditOutline /></div>
                                <div className="stockitem__productremove" ><MdRemove /></div>
                            </div>
                        </div>
                        <div className="stock__item">
                            <div className="stockitem__select" onClick={(e) => handleSelectItem(e)}></div>
                            <img src={Tshirt} className='stockitem__img' />
                            <p className="stockitem__productname">Example Example Example</p>
                            <p className="stockitem__productcategory">CATEGORY</p>
                            <p className="stockitem__productcode">Code</p>
                            <p className="stockitem__productqnt">17</p>
                            <p className="stockitem__productsellprice">$24.00</p>
                            <p className="stockitem__productdescription">{`Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus consequuntur praesentium animi quaerat quae perspiciatis, amet voluptates blanditiis corporis facilis eos natus nihil. Dolorem, reiciendis! Commodi, exercitationem nostrum veritatis suscipit et tempora consequuntur odit eaque totam dolorem enim aspernatur quasi fuga eius deleniti possimus dolores expedita aliquam rem ipsam maxime! Rem, accusantium odio quae dolorem expedita voluptatibus, dignissimos illo, reprehenderit numquam facere molestiae excepturi ullam fugiat quos omnis? Earum repellendus explicabo sint voluptatibus, illum ea magni qui laudantium neque doloribus maxime debitis nisi. Dolor deserunt maxime in alias architecto reiciendis doloribus. Incidunt, recusandae facere. Eius saepe iste optio deleniti nostrum.`.slice(0, 30)}...</p>
                            <div className="stockitem__productstatus stockitem__productstatus--active">Active</div>
                            <div className="stockitem__productoptions">
                                <div className="stockitem__productremove"><MdModeEditOutline /></div>
                                <div className="stockitem__productremove" ><MdRemove /></div>
                            </div>
                        </div>
                        <div className="stock__item">
                            <div className="stockitem__select" onClick={(e) => handleSelectItem(e)}></div>
                            <img src={Tshirt} className='stockitem__img' />
                            <p className="stockitem__productname">Example Example Example</p>
                            <p className="stockitem__productcategory">CATEGORY</p>
                            <p className="stockitem__productcode">Code</p>
                            <p className="stockitem__productqnt">17</p>
                            <p className="stockitem__productsellprice">$24.00</p>
                            <p className="stockitem__productdescription">{`Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus consequuntur praesentium animi quaerat quae perspiciatis, amet voluptates blanditiis corporis facilis eos natus nihil. Dolorem, reiciendis! Commodi, exercitationem nostrum veritatis suscipit et tempora consequuntur odit eaque totam dolorem enim aspernatur quasi fuga eius deleniti possimus dolores expedita aliquam rem ipsam maxime! Rem, accusantium odio quae dolorem expedita voluptatibus, dignissimos illo, reprehenderit numquam facere molestiae excepturi ullam fugiat quos omnis? Earum repellendus explicabo sint voluptatibus, illum ea magni qui laudantium neque doloribus maxime debitis nisi. Dolor deserunt maxime in alias architecto reiciendis doloribus. Incidunt, recusandae facere. Eius saepe iste optio deleniti nostrum.`.slice(0, 30)}...</p>
                            <div className="stockitem__productstatus stockitem__productstatus--active">Active</div>
                            <div className="stockitem__productoptions">
                                <div className="stockitem__productremove"><MdModeEditOutline /></div>
                                <div className="stockitem__productremove" ><MdRemove /></div>
                            </div>
                        </div>
                        <div className="stock__item">
                            <div className="stockitem__select" onClick={(e) => handleSelectItem(e)}></div>
                            <img src={Tshirt} className='stockitem__img' />
                            <p className="stockitem__productname">Example Example Example</p>
                            <p className="stockitem__productcategory">CATEGORY</p>
                            <p className="stockitem__productcode">Code</p>
                            <p className="stockitem__productqnt">17</p>
                            <p className="stockitem__productsellprice">$24.00</p>
                            <p className="stockitem__productdescription">{`Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus consequuntur praesentium animi quaerat quae perspiciatis, amet voluptates blanditiis corporis facilis eos natus nihil. Dolorem, reiciendis! Commodi, exercitationem nostrum veritatis suscipit et tempora consequuntur odit eaque totam dolorem enim aspernatur quasi fuga eius deleniti possimus dolores expedita aliquam rem ipsam maxime! Rem, accusantium odio quae dolorem expedita voluptatibus, dignissimos illo, reprehenderit numquam facere molestiae excepturi ullam fugiat quos omnis? Earum repellendus explicabo sint voluptatibus, illum ea magni qui laudantium neque doloribus maxime debitis nisi. Dolor deserunt maxime in alias architecto reiciendis doloribus. Incidunt, recusandae facere. Eius saepe iste optio deleniti nostrum.`.slice(0, 30)}...</p>
                            <div className="stockitem__productstatus stockitem__productstatus--active">Active</div>
                            <div className="stockitem__productoptions">
                                <div className="stockitem__productremove"><MdModeEditOutline /></div>
                                <div className="stockitem__productremove" ><MdRemove /></div>
                            </div>
                        </div>
                        <div className="stock__item">
                            <div className="stockitem__select" onClick={(e) => handleSelectItem(e)}></div>
                            <img src={Tshirt} className='stockitem__img' />
                            <p className="stockitem__productname">Example Example Example</p>
                            <p className="stockitem__productcategory">CATEGORY</p>
                            <p className="stockitem__productcode">Code</p>
                            <p className="stockitem__productqnt">17</p>
                            <p className="stockitem__productsellprice">$24.00</p>
                            <p className="stockitem__productdescription">{`Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus consequuntur praesentium animi quaerat quae perspiciatis, amet voluptates blanditiis corporis facilis eos natus nihil. Dolorem, reiciendis! Commodi, exercitationem nostrum veritatis suscipit et tempora consequuntur odit eaque totam dolorem enim aspernatur quasi fuga eius deleniti possimus dolores expedita aliquam rem ipsam maxime! Rem, accusantium odio quae dolorem expedita voluptatibus, dignissimos illo, reprehenderit numquam facere molestiae excepturi ullam fugiat quos omnis? Earum repellendus explicabo sint voluptatibus, illum ea magni qui laudantium neque doloribus maxime debitis nisi. Dolor deserunt maxime in alias architecto reiciendis doloribus. Incidunt, recusandae facere. Eius saepe iste optio deleniti nostrum.`.slice(0, 30)}...</p>
                            <div className="stockitem__productstatus stockitem__productstatus--active">Active</div>
                            <div className="stockitem__productoptions">
                                <div className="stockitem__productremove"><MdModeEditOutline /></div>
                                <div className="stockitem__productremove" ><MdRemove /></div>
                            </div>
                        </div>
                        <div className="stock__item">
                            <div className="stockitem__select" onClick={(e) => handleSelectItem(e)}></div>
                            <img src={Tshirt} className='stockitem__img' />
                            <p className="stockitem__productname">Example Example Example</p>
                            <p className="stockitem__productcategory">CATEGORY</p>
                            <p className="stockitem__productcode">Code</p>
                            <p className="stockitem__productqnt">17</p>
                            <p className="stockitem__productsellprice">$24.00</p>
                            <p className="stockitem__productdescription">{`Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus consequuntur praesentium animi quaerat quae perspiciatis, amet voluptates blanditiis corporis facilis eos natus nihil. Dolorem, reiciendis! Commodi, exercitationem nostrum veritatis suscipit et tempora consequuntur odit eaque totam dolorem enim aspernatur quasi fuga eius deleniti possimus dolores expedita aliquam rem ipsam maxime! Rem, accusantium odio quae dolorem expedita voluptatibus, dignissimos illo, reprehenderit numquam facere molestiae excepturi ullam fugiat quos omnis? Earum repellendus explicabo sint voluptatibus, illum ea magni qui laudantium neque doloribus maxime debitis nisi. Dolor deserunt maxime in alias architecto reiciendis doloribus. Incidunt, recusandae facere. Eius saepe iste optio deleniti nostrum.`.slice(0, 30)}...</p>
                            <div className="stockitem__productstatus stockitem__productstatus--active">Active</div>
                            <div className="stockitem__productoptions">
                                <div className="stockitem__productremove"><MdModeEditOutline /></div>
                                <div className="stockitem__productremove" ><MdRemove /></div>
                            </div>
                        </div>
                        <div className="stock__item">
                            <div className="stockitem__select" onClick={(e) => handleSelectItem(e)}></div>
                            <img src={Tshirt} className='stockitem__img' />
                            <p className="stockitem__productname">Example Example Example</p>
                            <p className="stockitem__productcategory">CATEGORY</p>
                            <p className="stockitem__productcode">Code</p>
                            <p className="stockitem__productqnt">17</p>
                            <p className="stockitem__productsellprice">$24.00</p>
                            <p className="stockitem__productdescription">{`Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus consequuntur praesentium animi quaerat quae perspiciatis, amet voluptates blanditiis corporis facilis eos natus nihil. Dolorem, reiciendis! Commodi, exercitationem nostrum veritatis suscipit et tempora consequuntur odit eaque totam dolorem enim aspernatur quasi fuga eius deleniti possimus dolores expedita aliquam rem ipsam maxime! Rem, accusantium odio quae dolorem expedita voluptatibus, dignissimos illo, reprehenderit numquam facere molestiae excepturi ullam fugiat quos omnis? Earum repellendus explicabo sint voluptatibus, illum ea magni qui laudantium neque doloribus maxime debitis nisi. Dolor deserunt maxime in alias architecto reiciendis doloribus. Incidunt, recusandae facere. Eius saepe iste optio deleniti nostrum.`.slice(0, 30)}...</p>
                            <div className="stockitem__productstatus stockitem__productstatus--active">Active</div>
                            <div className="stockitem__productoptions">
                                <div className="stockitem__productremove"><MdModeEditOutline /></div>
                                <div className="stockitem__productremove" ><MdRemove /></div>
                            </div>
                        </div>
                        <div className="stock__item">
                            <div className="stockitem__select" onClick={(e) => handleSelectItem(e)}></div>
                            <img src={Tshirt} className='stockitem__img' />
                            <p className="stockitem__productname">Example Example Example</p>
                            <p className="stockitem__productcategory">CATEGORY</p>
                            <p className="stockitem__productcode">Code</p>
                            <p className="stockitem__productqnt">17</p>
                            <p className="stockitem__productsellprice">$24.00</p>
                            <p className="stockitem__productdescription">{`Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus consequuntur praesentium animi quaerat quae perspiciatis, amet voluptates blanditiis corporis facilis eos natus nihil. Dolorem, reiciendis! Commodi, exercitationem nostrum veritatis suscipit et tempora consequuntur odit eaque totam dolorem enim aspernatur quasi fuga eius deleniti possimus dolores expedita aliquam rem ipsam maxime! Rem, accusantium odio quae dolorem expedita voluptatibus, dignissimos illo, reprehenderit numquam facere molestiae excepturi ullam fugiat quos omnis? Earum repellendus explicabo sint voluptatibus, illum ea magni qui laudantium neque doloribus maxime debitis nisi. Dolor deserunt maxime in alias architecto reiciendis doloribus. Incidunt, recusandae facere. Eius saepe iste optio deleniti nostrum.`.slice(0, 30)}...</p>
                            <div className="stockitem__productstatus stockitem__productstatus--active">Active</div>
                            <div className="stockitem__productoptions">
                                <div className="stockitem__productremove"><MdModeEditOutline /></div>
                                <div className="stockitem__productremove" ><MdRemove /></div>
                            </div>
                        </div>
                        <div className="stock__item">
                            <div className="stockitem__select" onClick={(e) => handleSelectItem(e)}></div>
                            <img src={Tshirt} className='stockitem__img' />
                            <p className="stockitem__productname">Example Example Example</p>
                            <p className="stockitem__productcategory">CATEGORY</p>
                            <p className="stockitem__productcode">Code</p>
                            <p className="stockitem__productqnt">17</p>
                            <p className="stockitem__productsellprice">$24.00</p>
                            <p className="stockitem__productdescription">{`Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus consequuntur praesentium animi quaerat quae perspiciatis, amet voluptates blanditiis corporis facilis eos natus nihil. Dolorem, reiciendis! Commodi, exercitationem nostrum veritatis suscipit et tempora consequuntur odit eaque totam dolorem enim aspernatur quasi fuga eius deleniti possimus dolores expedita aliquam rem ipsam maxime! Rem, accusantium odio quae dolorem expedita voluptatibus, dignissimos illo, reprehenderit numquam facere molestiae excepturi ullam fugiat quos omnis? Earum repellendus explicabo sint voluptatibus, illum ea magni qui laudantium neque doloribus maxime debitis nisi. Dolor deserunt maxime in alias architecto reiciendis doloribus. Incidunt, recusandae facere. Eius saepe iste optio deleniti nostrum.`.slice(0, 30)}...</p>
                            <div className="stockitem__productstatus stockitem__productstatus--active">Active</div>
                            <div className="stockitem__productoptions">
                                <div className="stockitem__productremove"><MdModeEditOutline /></div>
                                <div className="stockitem__productremove" ><MdRemove /></div>
                            </div>
                        </div>
                        <div className="stock__item">
                            <div className="stockitem__select" onClick={(e) => handleSelectItem(e)}></div>
                            <img src={Tshirt} className='stockitem__img' />
                            <p className="stockitem__productname">Example Example Example</p>
                            <p className="stockitem__productcategory">CATEGORY</p>
                            <p className="stockitem__productcode">Code</p>
                            <p className="stockitem__productqnt">17</p>
                            <p className="stockitem__productsellprice">$24.00</p>
                            <p className="stockitem__productdescription">{`Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus consequuntur praesentium animi quaerat quae perspiciatis, amet voluptates blanditiis corporis facilis eos natus nihil. Dolorem, reiciendis! Commodi, exercitationem nostrum veritatis suscipit et tempora consequuntur odit eaque totam dolorem enim aspernatur quasi fuga eius deleniti possimus dolores expedita aliquam rem ipsam maxime! Rem, accusantium odio quae dolorem expedita voluptatibus, dignissimos illo, reprehenderit numquam facere molestiae excepturi ullam fugiat quos omnis? Earum repellendus explicabo sint voluptatibus, illum ea magni qui laudantium neque doloribus maxime debitis nisi. Dolor deserunt maxime in alias architecto reiciendis doloribus. Incidunt, recusandae facere. Eius saepe iste optio deleniti nostrum.`.slice(0, 30)}...</p>
                            <div className="stockitem__productstatus stockitem__productstatus--active">Active</div>
                            <div className="stockitem__productoptions">
                                <div className="stockitem__productremove"><MdModeEditOutline /></div>
                                <div className="stockitem__productremove" ><MdRemove /></div>
                            </div>
                        </div>
                        <div className="stock__item">
                            <div className="stockitem__select" onClick={(e) => handleSelectItem(e)}></div>
                            <img src={Tshirt} className='stockitem__img' />
                            <p className="stockitem__productname">Example Example Example</p>
                            <p className="stockitem__productcategory">CATEGORY</p>
                            <p className="stockitem__productcode">Code</p>
                            <p className="stockitem__productqnt">17</p>
                            <p className="stockitem__productsellprice">$24.00</p>
                            <p className="stockitem__productdescription">{`Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus consequuntur praesentium animi quaerat quae perspiciatis, amet voluptates blanditiis corporis facilis eos natus nihil. Dolorem, reiciendis! Commodi, exercitationem nostrum veritatis suscipit et tempora consequuntur odit eaque totam dolorem enim aspernatur quasi fuga eius deleniti possimus dolores expedita aliquam rem ipsam maxime! Rem, accusantium odio quae dolorem expedita voluptatibus, dignissimos illo, reprehenderit numquam facere molestiae excepturi ullam fugiat quos omnis? Earum repellendus explicabo sint voluptatibus, illum ea magni qui laudantium neque doloribus maxime debitis nisi. Dolor deserunt maxime in alias architecto reiciendis doloribus. Incidunt, recusandae facere. Eius saepe iste optio deleniti nostrum.`.slice(0, 30)}...</p>
                            <div className="stockitem__productstatus stockitem__productstatus--active">Active</div>
                            <div className="stockitem__productoptions">
                                <div className="stockitem__productremove"><MdModeEditOutline /></div>
                                <div className="stockitem__productremove" ><MdRemove /></div>
                            </div>
                        </div>
                        <div className="stock__item">
                            <div className="stockitem__select" onClick={(e) => handleSelectItem(e)}></div>
                            <img src={Tshirt} className='stockitem__img' />
                            <p className="stockitem__productname">Example Example Example</p>
                            <p className="stockitem__productcategory">CATEGORY</p>
                            <p className="stockitem__productcode">Code</p>
                            <p className="stockitem__productqnt">17</p>
                            <p className="stockitem__productsellprice">$24.00</p>
                            <p className="stockitem__productdescription">{`Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus consequuntur praesentium animi quaerat quae perspiciatis, amet voluptates blanditiis corporis facilis eos natus nihil. Dolorem, reiciendis! Commodi, exercitationem nostrum veritatis suscipit et tempora consequuntur odit eaque totam dolorem enim aspernatur quasi fuga eius deleniti possimus dolores expedita aliquam rem ipsam maxime! Rem, accusantium odio quae dolorem expedita voluptatibus, dignissimos illo, reprehenderit numquam facere molestiae excepturi ullam fugiat quos omnis? Earum repellendus explicabo sint voluptatibus, illum ea magni qui laudantium neque doloribus maxime debitis nisi. Dolor deserunt maxime in alias architecto reiciendis doloribus. Incidunt, recusandae facere. Eius saepe iste optio deleniti nostrum.`.slice(0, 30)}...</p>
                            <div className="stockitem__productstatus stockitem__productstatus--active">Active</div>
                            <div className="stockitem__productoptions">
                                <div className="stockitem__productremove"><MdModeEditOutline /></div>
                                <div className="stockitem__productremove" ><MdRemove /></div>
                            </div>
                        </div>
                        <div className="stock__item">
                            <div className="stockitem__select" onClick={(e) => handleSelectItem(e)}></div>
                            <img src={Tshirt} className='stockitem__img' />
                            <p className="stockitem__productname">Example Example Example</p>
                            <p className="stockitem__productcategory">CATEGORY</p>
                            <p className="stockitem__productcode">Code</p>
                            <p className="stockitem__productqnt">17</p>
                            <p className="stockitem__productsellprice">$24.00</p>
                            <p className="stockitem__productdescription">{`Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus consequuntur praesentium animi quaerat quae perspiciatis, amet voluptates blanditiis corporis facilis eos natus nihil. Dolorem, reiciendis! Commodi, exercitationem nostrum veritatis suscipit et tempora consequuntur odit eaque totam dolorem enim aspernatur quasi fuga eius deleniti possimus dolores expedita aliquam rem ipsam maxime! Rem, accusantium odio quae dolorem expedita voluptatibus, dignissimos illo, reprehenderit numquam facere molestiae excepturi ullam fugiat quos omnis? Earum repellendus explicabo sint voluptatibus, illum ea magni qui laudantium neque doloribus maxime debitis nisi. Dolor deserunt maxime in alias architecto reiciendis doloribus. Incidunt, recusandae facere. Eius saepe iste optio deleniti nostrum.`.slice(0, 30)}...</p>
                            <div className="stockitem__productstatus stockitem__productstatus--active">Active</div>
                            <div className="stockitem__productoptions">
                                <div className="stockitem__productremove"><MdModeEditOutline /></div>
                                <div className="stockitem__productremove" ><MdRemove /></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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

export default Stock
