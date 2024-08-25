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
import { IoMdArrowDropup } from "react-icons/io";
import { MdModeEditOutline } from "react-icons/md";
import { FaCheck } from "react-icons/fa";

function ItemsCard({ option = 0 }) {

    const buttonRef = useRef(null);
    const filterRef = useRef(null);

    const initialFilterObj = {
        columns: {
            image: option != 2 ? true : option != 3 ? true : option != 4 ? true : option != 5 ? true : option != 7 ? true : false,
            number: option == 4 ? true : option == 5 ? true : option == 6 ? true : option == 7 ? true : false,
            username: option == 6 ? true : option == 7 ? true : false,
            permission: option == 6 ? true : false,
            creationDate: option == 4 ? true : option == 5 ? true : option == 6 ? true : false,
            lastAccess: option == 6 ? true : false,
            blocked: option == 6 ? true : false,
            productName: option == 1 ? true : option == 0 ? true : false,
            category: option == 1 ? true : option == 0 ? true : option == 2 ? true : option == 4 ? true : option == 5 ? true : false,
            supplier: option == 1 ? true : option == 3 ? true : option == 4 ? true : option == 5 ? true : false,
            code: option == 0 ? true : option == 1 ? true : false,
            quantity: option == 0 ? true : false,
            sellPrice: option == 0 ? true : option == 1 ? true : option == 5 ? true : false,
            buyPrice: option == 4 ? true : false,
            date: option == 7 ? true : false,
            description: option != 6 ? true : false,
            buttons: option == 6 ? true : option == 7 ? true : false,
            status: option == 1 ? true : false,
            order: option == 4 ? true : option == 5 ? true : false,
            delete: option != 7 ? true : false,
        },
        minPrice: 0,
        buyPrice: 0,
        minQnt: 0,
        permission: 0,
        status: 0,
        category: {},
        supplier: {},
        blocked: 0
    }

    const filterObj = {
        columns: {
            image: option != 2 ? true : option != 3 ? true : option != 4 ? true : option != 5 ? true : option != 7 ? true : false,
            number: option == 4 ? true : option == 5 ? true : option == 6 ? true : option == 7 ? true : false,
            username: option == 6 ? true : option == 7 ? true : false,
            permission: option == 6 ? true : false,
            creationDate: option == 4 ? true : option == 5 ? true : option == 6 ? true : false,
            lastAccess: option == 6 ? true : false,
            blocked: option == 6 ? true : false,
            productName: option == 1 ? true : option == 0 ? true : false,
            category: option == 1 ? true : option == 0 ? true : option == 2 ? true : option == 4 ? true : option == 5 ? true : false,
            supplier: option == 1 ? true : option == 3 ? true : option == 4 ? true : option == 5 ? true : false,
            code: option == 0 ? true : option == 1 ? true : false,
            quantity: option == 0 ? true : false,
            sellPrice: option == 0 ? true : option == 1 ? true : option == 5 ? true : false,
            buyPrice: option == 4 ? true : false,
            date: option == 7 ? true : false,
            description: option != 6 ? true : false,
            buttons: option == 6 ? true : option == 7 ? true : false,
            status: option == 1 ? true : false,
            order: option == 4 ? true : option == 5 ? true : false,
            delete: option != 7 ? true : false,
        },
        minPrice: 0,
        buyPrice: 0,
        minQnt: 0,
        permission: 0,
        status: 0,
        category: {},
        supplier: {},
        blocked: 0
    }

    const [chooseSelection, setChooseSelection] = useState('columns');
    const [filter, setFilter] = useState(filterObj)
    const [showFilterOptions, setShowFilterOptions] = useState(false);
    const [filterOptionsGrid, setFilterOptionsGrid] = useState(option == 0 ? 'min-content 65px 250px 100px 100px 50px 100px 1fr 100px' : option == 1 ? 'min-content 65px 200px 100px 100px 100px 80px 1fr 100px 100px' : option == 2 ? 'min-content 250px 1fr 100px' : option == 3 ? 'min-content 250px 1fr 100px' : option == 4 ? 'min-content 100px 100px 100px 100px 100px 1fr 100px 100px' : option == 5 ? 'min-content 100px 100px 100px 100px 100px 1fr 100px 100px' : option == 6 ? 'min-content 65px 50px 100px 100px 100px 100px 100px 1fr 100px' : option == 7 ? 'min-content 50px 100px 100px 1fr 100px' : 0)
    const [showButtonMoreOptions, setShowButtonMoreOptions] = useState(false);
    const [isAllItemsSelected, setIsAllItemsSelected] = useState(false);

    const [itemsSelected, setItemsSelected] = useState([]);

    const [sellPrice, setSellPrice] = useState(0);
    const [buyPrice, setBuyPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);

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

    const handleUncheckColumn = (column) => {
        switch (column) {
            case 'category':
                document.querySelectorAll('.filter__option-category').forEach((elem) => elem.classList.toggle('filter__option--selected'));

                document.querySelectorAll('.filter__option-category').forEach((elem) => {
                    if (elem.classList.contains('filter__option--selected')) {
                        filterObj.columns.category = false;
                    }
                    else {
                        filterObj.columns.category = true;
                    }
                })
                break;
            case 'image':
                document.querySelectorAll('.filter__option-img').forEach((elem) => elem.classList.toggle('filter__option--selected'));

                document.querySelectorAll('.filter__option-img').forEach((elem) => {
                    if (elem.classList.contains('filter__option--selected')) {
                        filterObj.columns.image = false;
                    }
                    else {
                        filterObj.columns.image = true;
                    }
                })
                break;
            case 'product-name':
                document.querySelectorAll('.filter__option-product-name').forEach((elem) => elem.classList.toggle('filter__option--selected'));

                document.querySelectorAll('.filter__option-product-name').forEach((elem) => {
                    if (elem.classList.contains('filter__option--selected')) {
                        filterObj.columns.productName = false;
                    }
                    else {
                        filterObj.columns.productName = true;
                    }
                })
                break;
            case 'supplier':
                document.querySelectorAll('.filter__option-supplier').forEach((elem) => elem.classList.toggle('filter__option--selected'));

                document.querySelectorAll('.filter__option-supplier').forEach((elem) => {
                    if (elem.classList.contains('filter__option--selected')) {
                        filterObj.columns.supplier = false;
                    }
                    else {
                        filterObj.columns.supplier = true;
                    }
                })
                break;
            case 'buy-price':
                document.querySelectorAll('.filter__option-buy-price').forEach((elem) => elem.classList.toggle('filter__option--selected'));

                document.querySelectorAll('.filter__option-buy-price').forEach((elem) => {
                    if (elem.classList.contains('filter__option--selected')) {
                        filterObj.columns.buyPrice = false;
                    }
                    else {
                        filterObj.columns.buyPrice = true;
                    }
                })
                break;
            case 'sell-price':
                document.querySelectorAll('.filter__option-sell-price').forEach((elem) => elem.classList.toggle('filter__option--selected'));

                document.querySelectorAll('.filter__option-sell-price').forEach((elem) => {
                    if (elem.classList.contains('filter__option--selected')) {
                        filterObj.columns.buyPrice = false;
                    }
                    else {
                        filterObj.columns.sellPrice = true;
                    }
                })
                break;
            case 'description':
                document.querySelectorAll('.filter__option-description').forEach((elem) => elem.classList.toggle('filter__option--selected'));

                document.querySelectorAll('.filter__option-description').forEach((elem) => {
                    if (elem.classList.contains('filter__option--selected')) {
                        filterObj.columns.description = false;
                    }
                    else {
                        filterObj.columns.description = true;
                    }
                })
                break;
            case 'status':
                document.querySelectorAll('.filter__option-status').forEach((elem) => elem.classList.toggle('filter__option--selected'));

                document.querySelectorAll('.filter__option-status').forEach((elem) => {
                    if (elem.classList.contains('filter__option--selected')) {
                        filterObj.columns.status = false;
                    }
                    else {
                        filterObj.columns.status = true;
                    }
                })
                break;
            case 'number':
                document.querySelectorAll('.filter__option-number').forEach((elem) => elem.classList.toggle('filter__option--selected'));

                document.querySelectorAll('.filter__option-number').forEach((elem) => {
                    if (elem.classList.contains('filter__option--selected')) {
                        filterObj.columns.number = false;
                    }
                    else {
                        filterObj.columns.number = true;
                    }
                })
                break;
            case 'creation-date':
                document.querySelectorAll('.filter__option-creation-date').forEach((elem) => elem.classList.toggle('filter__option--selected'));

                document.querySelectorAll('.filter__option-creation-date').forEach((elem) => {
                    if (elem.classList.contains('filter__option--selected')) {
                        filterObj.columns.creationDate = false;
                    }
                    else {
                        filterObj.columns.creationDate = true;
                    }
                })
                break;
            case 'order':
                document.querySelectorAll('.filter__option-order').forEach((elem) => elem.classList.toggle('filter__option--selected'));

                document.querySelectorAll('.filter__option-order').forEach((elem) => {
                    if (elem.classList.contains('filter__option--selected')) {
                        filterObj.columns.order = false;
                    }
                    else {
                        filterObj.columns.order = true;
                    }
                })
                break;
            case 'blocked':
                document.querySelectorAll('.filter__option-blocked').forEach((elem) => elem.classList.toggle('filter__option--selected'));

                document.querySelectorAll('.filter__option-blocked').forEach((elem) => {
                    if (elem.classList.contains('filter__option--selected')) {
                        filterObj.columns.blocked = false;
                    }
                    else {
                        filterObj.columns.blocked = true;
                    }
                })
                break;
            case 'username':
                document.querySelectorAll('.filter__option-username').forEach((elem) => elem.classList.toggle('filter__option--selected'));

                document.querySelectorAll('.filter__option-username').forEach((elem) => {
                    if (elem.classList.contains('filter__option--selected')) {
                        filterObj.columns.username = false;
                    }
                    else {
                        filterObj.columns.username = true;
                    }
                })
                break;
            case 'permission':
                document.querySelectorAll('.filter__option-permission').forEach((elem) => elem.classList.toggle('filter__option--selected'));

                document.querySelectorAll('.filter__option-permission').forEach((elem) => {
                    if (elem.classList.contains('filter__option--selected')) {
                        filterObj.columns.permission = false;
                    }
                    else {
                        filterObj.columns.permission = true;
                    }
                })
                break;
            case 'last-access':
                document.querySelectorAll('.filter__option-last-access').forEach((elem) => elem.classList.toggle('filter__option--selected'));

                document.querySelectorAll('.filter__option-last-access').forEach((elem) => {
                    if (elem.classList.contains('filter__option--selected')) {
                        filterObj.columns.lastAccess = false;
                    }
                    else {
                        filterObj.columns.lastAccess = true;
                    }
                })
                break;
            case 'date':
                document.querySelectorAll('.filter__option-date').forEach((elem) => elem.classList.toggle('filter__option--selected'));

                document.querySelectorAll('.filter__option-date').forEach((elem) => {
                    if (elem.classList.contains('filter__option--selected')) {
                        filterObj.columns.date = false;
                    }
                    else {
                        filterObj.columns.date = true;
                    }
                })
                break;
        }
    }

    const handleSelectFilter = (otherValue) => {

    }

    useEffect(() => {
        /* CLOSE WINDOW WHEN CLICK OUTSIDE */
        const handleClickOutside = (event) => {
            if (buttonRef.current && !buttonRef.current.contains(event.target)) {
                setShowButtonMoreOptions(false)
            }
            if (filterRef.current && !filterRef.current.contains(event.target)) {
                setShowFilterOptions(false)
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
                    <div className="stockmenu__options" >
                        <form className="stockmenu__search" onSubmit>
                            <IoSearch className='stockmenu__search-icon' />
                            <input type="text" className="stockmenu__searchinput" placeholder={option == 0 ? "Search Orders" : option == 1 ? "Search Products" : option == 2 ? 'Search Categories' : option == 3 ? 'Search Suppliers' : option == 4 ? 'Search Orders' : option == 5 ? 'Search Orders' : option == 6 ? 'Search Users' : 'Search Types'} />
                        </form>
                        <div className="stockmenu__filter" ref={filterRef} >
                            <div className="stockmenu__filter-button" onClick={() => setShowFilterOptions(!showFilterOptions)}>
                                <LuFilter className='stockmenu__filter-icon' />
                                <span>Filter</span>
                            </div>
                            <div className="stockmenu__filter-selection" style={{ display: showFilterOptions == true ? 'flex' : 'none' }}>
                                <IoMdArrowDropup className='stockmenu__filter-arrow' />
                                <h4>Filter options</h4>
                                <div className="filter__vr"></div>
                                <div className="filter_choose-selection">

                                    <div onClick={() => setChooseSelection('columns')} className={`${chooseSelection == 'columns' ? 'filter_choose-selection--selected' : ''}`}>Columns</div>
                                    {(option == 1 || option == 0 || option == 2 || option == 4 || option == 5) &&
                                        <div onClick={() => setChooseSelection('categories')} className={`${chooseSelection == 'categories' ? 'filter_choose-selection--selected' : ''}`}>Categories</div>
                                    }
                                    {(option == 1 || option == 3 || option == 4 || option == 5) &&
                                        <div onClick={() => setChooseSelection('suppliers')} className={`${chooseSelection == 'suppliers' ? 'filter_choose-selection--selected' : ''}`}>Suppliers</div>
                                    }
                                    {(option == 0 || option == 1 || option == 4 || option == 5) &&
                                        <div onClick={() => setChooseSelection('values')} className={`${chooseSelection == 'values' ? 'filter_choose-selection--selected' : ''}`} >Values</div>
                                    }
                                    {(option == 1 || option == 6) &&
                                        <div onClick={() => setChooseSelection('others')} className={`${chooseSelection == 'others' ? 'filter_choose-selection--selected' : ''}`} >Others</div>
                                    }
                                </div>
                                <div className="filter__options">
                                    {chooseSelection == 'columns' &&
                                        <div className="filter__options-columns">
                                            {(option != 2 && option != 3 && option != 4 && option != 5 && option != 7) &&
                                                <div className={`filter__option filter__option-img ${filter.columns.image == true ? 'filter__option--selected' : ''}`} onClick={() => handleUncheckColumn('image')}>
                                                    <div className="filter__option-checkbox">
                                                        <FaCheck className='filter__option-check filter__option--selected' />
                                                    </div>
                                                    <span>Image</span>
                                                </div>
                                            }
                                            {(option == 4 || option == 5 || option == 6 || option == 7) &&
                                                <div className={`filter__option filter__option-number ${filter.columns.number == true ? 'filter__option--selected' : ''}`} onClick={() => handleUncheckColumn('number')}>
                                                    <div className="filter__option-checkbox">
                                                        <FaCheck className='filter__option-check filter__option--selected' />
                                                    </div>
                                                    <span>Nº</span>
                                                </div>
                                            }
                                            {(option == 6 || option == 7) &&
                                                <div className={`filter__option filter__option-username ${filter.columns.username == true ? 'filter__option--selected' : ''}`} onClick={() => handleUncheckColumn('username')}>
                                                    <div className="filter__option-checkbox">
                                                        <FaCheck className='filter__option-check filter__option--selected' />
                                                    </div>
                                                    <span>Username</span>
                                                </div>
                                            }
                                            {option == 6 &&
                                                <div className={`filter__option filter__option-permission ${filter.columns.permission == true ? 'filter__option--selected' : ''}`} onClick={() => handleUncheckColumn('permission')}>
                                                    <div className="filter__option-checkbox">
                                                        <FaCheck className='filter__option-check filter__option--selected' />
                                                    </div>
                                                    <span>Permission</span>
                                                </div>
                                            }
                                            {(option == 4 || option == 5 || option == 6) &&
                                                <div className={`filter__option filter__option-creation-date ${filter.columns.creationDate == true ? 'filter__option--selected' : ''}`} onClick={() => handleUncheckColumn('creation-date')}>
                                                    <div className="filter__option-checkbox">
                                                        <FaCheck className='filter__option-check filter__option--selected' />
                                                    </div>
                                                    <span>Creation Date</span>
                                                </div>
                                            }
                                            {option == 6 &&
                                                <div className={`filter__option filter__option-last-access ${filter.columns.lastAccess == true ? 'filter__option--selected' : ''}`} onClick={() => handleUncheckColumn('last-access')}>
                                                    <div className="filter__option-checkbox">
                                                        <FaCheck className='filter__option-check filter__option--selected' />
                                                    </div>
                                                    <span>Last Access</span>
                                                </div>
                                            }
                                            {option == 6 &&
                                                <div className={`filter__option filter__option-blocked ${filter.columns.blocked == true ? 'filter__option--selected' : ''}`} onClick={() => handleUncheckColumn('blocked')}>
                                                    <div className="filter__option-checkbox">
                                                        <FaCheck className='filter__option-check filter__option--selected' />
                                                    </div>
                                                    <span>Blocked</span>
                                                </div>
                                            }
                                            {(option == 1 || option == 0) &&
                                                <div className={`filter__option filter__option-product-name ${filter.columns.productName == true ? 'filter__option--selected' : ''}`} onClick={() => handleUncheckColumn('product-name')}>
                                                    <div className="filter__option-checkbox">
                                                        <FaCheck className='filter__option-check filter__option--selected' />
                                                    </div>
                                                    <span>Product Name</span>
                                                </div>
                                            }
                                            {(option == 1 || option == 0 || option == 2 || option == 4 || option == 5) &&
                                                <div className={`filter__option filter__option-category ${filter.columns.category == true ? 'filter__option--selected' : ''}`} onClick={() => handleUncheckColumn('category')}>
                                                    <div className="filter__option-checkbox">
                                                        <FaCheck className='filter__option-check filter__option--selected' />
                                                    </div>
                                                    <span>Category</span>
                                                </div>
                                            }
                                            {(option == 1 || option == 3 || option == 4 || option == 5) &&
                                                <div className={`filter__option filter__option-supplier ${filter.columns.supplier == true ? 'filter__option--selected' : ''}`} onClick={() => handleUncheckColumn('supplier')}>
                                                    <div className="filter__option-checkbox">
                                                        <FaCheck className='filter__option-check filter__option--selected' />
                                                    </div>
                                                    <span>Supplier</span>
                                                </div>
                                            }
                                            {(option == 0 || option == 1) &&
                                                <div className={`filter__option filter__option-code ${filter.columns.code == true ? 'filter__option--selected' : ''}`} onClick={() => handleUncheckColumn('code')}>
                                                    <div className="filter__option-checkbox">
                                                        <FaCheck className='filter__option-check filter__option--selected' />
                                                    </div>
                                                    <span>Code</span>
                                                </div>
                                            }
                                            {option == 0 &&
                                                <div className={`filter__option filter__option-qnt ${filter.columns.quantity == true ? 'filter__option--selected' : ''}`} onClick={() => handleUncheckColumn('quantity')}>
                                                    <div className="filter__option-checkbox">
                                                        <FaCheck className='filter__option-check filter__option--selected' />
                                                    </div>
                                                    <span>Quantity</span>
                                                </div>
                                            }
                                            {(option == 0 || option == 1 || option == 5) &&
                                                <div className={`filter__option filter__option-sell-price ${filter.columns.sellPrice == true ? 'filter__option--selected' : ''}`} onClick={() => handleUncheckColumn('sell-price')}>
                                                    <div className="filter__option-checkbox">
                                                        <FaCheck className='filter__option-check filter__option--selected' />
                                                    </div>
                                                    <span>Sell Price</span>
                                                </div>

                                            }
                                            {(option == 4) &&
                                                <div className={`filter__option filter__option-buy-price ${filter.columns.buyPrice == true ? 'filter__option--selected' : ''}`} onClick={() => handleUncheckColumn('buy-price')}>
                                                    <div className="filter__option-checkbox">
                                                        <FaCheck className='filter__option-check filter__option--selected' />
                                                    </div>
                                                    <span>Buy Price</span>
                                                </div>

                                            }
                                            {option == 7 &&
                                                <div className={`filter__option filter__option-date ${filter.columns.date == true ? 'filter__option--selected' : ''}`} onClick={() => handleUncheckColumn('date')}>
                                                    <div className="filter__option-checkbox">
                                                        <FaCheck className='filter__option-check filter__option--selected' />
                                                    </div>
                                                    <span>Date</span>
                                                </div>
                                            }
                                            {option != 6 &&
                                                <div className={`filter__option filter__option-description ${filter.columns.description == true ? 'filter__option--selected' : ''}`} onClick={() => handleUncheckColumn('description')}>
                                                    <div className="filter__option-checkbox">
                                                        <FaCheck className='filter__option-check filter__option-check--selected' />
                                                    </div>
                                                    <span>Description</span>
                                                </div>
                                            }
                                            {(option == 1) &&
                                                <div className={`filter__option filter__option-status ${filter.columns.status == true ? 'filter__option--selected' : ''}`} onClick={() => handleUncheckColumn('status')}>
                                                    <div className="filter__option-checkbox">
                                                        <FaCheck className='filter__option-check filter__option--selected' />
                                                    </div>
                                                    <span>Status</span>
                                                </div>
                                            }
                                            {(option == 4 || option == 5) &&
                                                <div className={`filter__option filter__option-order ${filter.columns.order == true ? 'filter__option--selected' : ''}`} onClick={() => handleUncheckColumn('order')}>
                                                    <div className="filter__option-checkbox">
                                                        <FaCheck className='filter__option-check filter__option--selected' />
                                                    </div>
                                                    <span>Order</span>
                                                </div>
                                            }
                                        </div>
                                    }
                                    {chooseSelection == 'categories' &&
                                        <div className="filter__options-categories"></div>
                                    }
                                    {chooseSelection == 'suppliers' &&
                                        <div className="filter__options-suppliers"></div>
                                    }
                                    {chooseSelection == 'values' &&
                                        <div className="filter__options-values">
                                            {(option == 0 || option == 1 || option == 5) &&
                                                <div className="filter__option-value">
                                                    <span>Min Sell Price</span>
                                                    <div className="filter__option__input">
                                                        <input type="range" name="sell-price" id="sell-price" className='filter__option__range-input filter__option__sellprice-input' value={sellPrice} onChange={(e) => setSellPrice(e.target.value)} />
                                                        <span>{sellPrice}</span>
                                                    </div>
                                                </div>
                                            }
                                            {(option == 4) &&
                                                <div className="filter__option-value">
                                                    <span>Min Buy Price</span>
                                                    <div className="filter__option__input">
                                                        <input type="range" name="sell-price" id="sell-price" className='filter__option__range-input filter__option__buyprice-input' value={buyPrice} onChange={(e) => setBuyPrice(e.target.value)} />
                                                        <span>{buyPrice}</span>
                                                    </div>
                                                </div>
                                            }
                                            {(option == 0) &&
                                                <div className="filter__option-value">
                                                    <span>Min Quantity</span>
                                                    <div className="filter__option__input">
                                                        <input type="range" name="sell-price" id="sell-price" className='filter__option__range-input filter__option__quantity-input' value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                                                        <span>{quantity}</span>
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                    }
                                    {chooseSelection == 'others' &&
                                        <div className="filter__options-others">
                                            {(option == 1) &&
                                                <div className="filter__options-others-status">
                                                    <h4>Status</h4>
                                                    <div className="filter__option-others-status">
                                                        <div className={`filter__option-others filter__option-others-instock ${filter.columns.status == 0 ? 'filter__option-others--selected' : ''}`} onClick={() => handleSelectFilter('in-stock')}>
                                                            <div className="filter__option-radio">
                                                            </div>
                                                            <span>In Stock</span>
                                                        </div>
                                                        <div className={`filter__option-others filter__option-others-outstock ${filter.columns.status == 0 ? 'filter__option-others--selected' : ''}`} onClick={() => handleSelectFilter('out-stock')}>
                                                            <div className="filter__option-radio">
                                                            </div>
                                                            <span>Out of Stock</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                    }
                                </div>
                                <div className="filter__buttons">
                                    <div className="filter__button button button--outlined">Clear</div>
                                    <div className="filter__button button">Filter</div>
                                </div>
                            </div>
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
                        <div className="button stockmenu__button" style={{ display: option != 7 ? 'flex' : 'none' }}>{option == 0 ? "New Order" : option == 1 ? "New Product" : option == 2 ? 'New Category' : option == 3 ? 'New Supplier' : option == 4 ? 'New Order' : option == 5 ? 'New Order' : option == 6 ? 'New User' : 'New Type'}</div>
                    </div>
                </div>
                <div className="stock__container">
                    <div className="stock__info">
                        <div className="stock__tags">
                            <div className="stock__tag">
                                <span>Active, Out of Stock</span>
                                <div className="stock__vl"></div>
                                <HiOutlineXMark className='stock__tag-mark' />
                            </div>
                        </div>
                        <p className="stock__info__content">Total {option == 0 ? "Stock Items" : option == 1 ? "Products" : option == 2 ? 'Categories' : option == 3 ? 'Suppliers' : option == 4 ? 'Purchases' : option == 5 ? 'Sales' : option == 6 ? 'Users' : option == 7 ? 'Logs' : ''}: 67</p>
                    </div>
                    <div className="stock__items">
                        <div className="stockitems__header stock__item" style={{ gridTemplateColumns: filterOptionsGrid }}>
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
                            {(option == 1) &&
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
                            <div className="stock__item" style={{ gridTemplateColumns: option == 0 ? 'min-content 65px 250px 100px 100px 50px 100px 1fr 100px' : option == 1 ? 'min-content 65px 200px 100px 100px 100px 80px 1fr 100px 100px' : option == 2 ? 'min-content 250px 1fr 100px' : option == 3 ? 'min-content 250px 1fr 100px' : option == 4 ? 'min-content 100px 100px 100px 100px 100px 1fr 100px 100px' : option == 5 ? 'min-content 100px 100px 100px 100px 100px 1fr 100px 100px' : option == 6 ? 'min-content 65px 50px 100px 100px 100px 100px 100px 1fr 100px' : option == 7 ? 'min-content 50px 100px 100px 1fr 100px' : 0 }}>
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
                                {(option == 1) &&
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
