import React from 'react'
import './Stock.css';
import { IoIosSearch } from "react-icons/io";
import { CiFilter } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";
import { HiOutlineXMark } from "react-icons/hi2";

function Stock() {
    return (
        <>
            <div className='card card--bg card__stock'>
                <div className="stock__menu">
                    <div className="stockmenu__options">
                        <form className="stockmenu__search" onSubmit>
                            <IoIosSearch />
                            <input type="text" className="stockmenu__searchinput" placeholder='Search Products' />
                        </form>
                        <div className="stockmenu__filter">
                            <CiFilter />
                            <span>Filter</span>
                        </div>
                    </div>
                    <div className="stockmenu__buttons">
                        <div className="button button--outlined stockmenu__button">Export <IoIosArrowDown /></div>
                        <div className="button stockmenu__button">New Order</div>                    </div>
                </div>
                <div className="stock__tags">
                    <div className="stock__tag">
                        <span>Active, Out of Stock</span>
                        <div className="stock__vl"></div>
                        <HiOutlineXMark />
                    </div>
                </div>
                <div className="stock__items">
                    <div className="stockitems__header stock__item">
                        <div className="stockitem__select"></div>
                        <div className="stockitem__productname stockitem__productname--header">Product Name</div>
                        <div className=""></div>
                        <div className="stockitem__productcategory stockitem__productcategory--header">Category</div>
                        <div className="stockitem__productcode stockitem__productcode--header">Code</div>
                        <div className="stockitem__productqnt stockitem__productqnt--header">Category</div>
                        <div className="stockitem__productsellprice stockitem__productsellprice--header">Sell Price</div>
                        <div className="stockitem__productdescription stockitem__productdescription--header">Description</div>
                        <div className="stockitem__productstatus stockitem__productstatus--header">Status</div>
                    </div>
                </div>
            </div>
            <div className="stock__pages"></div>
        </>
    )
}

export default Stock
