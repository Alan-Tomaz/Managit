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

function ItemsCard({ option = 0, handleOpenWindow }) {

    const buttonRef = useRef(null);
    const filterRef = useRef(null);

    const initialFilterObj = {
        columns: {
            image: option == 2 ? false : option == 3 ? false : option == 4 ? false : option == 5 ? false : option == 7 ? false : true,
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
            delete: option == 7 ? false : true,
        },
        orderFilter: {
            number: true,
            username: true,
            permission: true,
            creationDate: true,
            lastAccess: true,
            blocked: true,
            productName: true,
            category: true,
            supplier: true,
            code: true,
            quantity: true,
            sellPrice: true,
            buyPrice: true,
            date: true,
            description: true,
            onFiltering: '',
            onFilteringVar: ''
        },
        filteringColumns: [],
        search: '',
        minSellPrice: 0,
        minBuyPrice: 0,
        minQnt: 0,
        permission: 0,
        status: 0,
        category: [{ name: 't-shirt', isShow: true }, { name: 'shoes', isShow: true }, { name: 'jeans', isShow: true }],
        supplier: [{ name: 'abc-outfits', isShow: true }, { name: '007-shoes', isShow: true }, { name: 'planet', isShow: true }],
        blocked: 0,
        option0: 'min-content 65px 250px 100px 100px 80px 100px 1fr 100px',
        option1: 'min-content 65px 200px 100px 100px 100px 100px 1fr 100px 100px',
        option2: 'min-content 250px 1fr 100px',
        option3: 'min-content 250px 1fr 100px',
        option4: 'min-content 50px 150px 100px 100px 80px 1fr 100px 100px',
        option5: 'min-content 50px 150px 100px 100px 80px 1fr 100px 100px',
        option6: 'min-content 65px 50px 150px 150px 150px 150px 100px 1fr 100px',
        option7: 'min-content 50px 150px 150px 1fr 100px'
    }



    const [filteringColumn, setFilteringColumn] = useState([]);
    const [chooseSelection, setChooseSelection] = useState('columns');
    const [filter, setFilter] = useState({ ...initialFilterObj })
    const [renderFilter, setRenderFilter] = useState({ ...initialFilterObj })
    const [renderSupplier, setRenderSupplier] = useState([]);
    const [suppliers, setSuppliers] = useState([{ name: 'abc-outfits', isShow: true }, { name: '007-shoes', isShow: true }, { name: 'planet', isShow: true }]);
    const [showFilterOptions, setShowFilterOptions] = useState(false);
    const [filterOptionsGrid, setFilterOptionsGrid] = useState(option == 0 ? renderFilter.option0 : option == 1 ? renderFilter.option1 : option == 2 ? renderFilter.option2 : option == 3 ? renderFilter.option3 : option == 4 ? renderFilter.option4 : option == 5 ? renderFilter.option5 : option == 6 ? renderFilter.option6 : option == 7 ? renderFilter.option7 : 0)
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

    const handleRemoveTag = (tag) => {

    }

    const handleSelectItem = (e) => {
        const target = e.target;
        target.classList.toggle('stockitem__select--selected');
    }

    const handleSearch = (e) => {
        e.preventDefault();
        /* setRenderFilter({ ...filter }); */
    }

    const handleClearFilter = () => {
        setFilter({ ...initialFilterObj });

/*         setShowFilterOptions(false);
 */    }

    const handleFilter = () => {
        const newColumns = `min-content ${filter.columns.image == true ? '65px ' : ''}${filter.columns.number == true ? '50px ' : ''}${filter.columns.username == true ? '150px ' : ''}${filter.columns.permission == true ? '150px ' : ''}${filter.columns.productName == true ? '200px ' : ''}${filter.columns.creationDate == true ? '150px ' : ''}${filter.columns.lastAccess == true ? '150px ' : ''}${option == 2 ? filter.columns.category == true ? '250px ' : '' : filter.columns.category == true ? '100px ' : ''}${option == 3 ? filter.columns.supplier == true ? '250px ' : '' : filter.columns.supplier == true ? '100px ' : ''}${filter.columns.code == true ? '100px ' : ''}${filter.columns.quantity == true ? '80px ' : ''}${filter.columns.sellPrice == true ? '80px ' : ''}${filter.columns.buyPrice == true ? '80px ' : ''}${filter.columns.blocked == true ? '100px ' : ''}${filter.columns.date == true ? '150px ' : ''}${filter.columns.description == true ? '1fr ' : ''}${filter.columns.description == false ? '1fr ' : ''}${filter.columns.order == true ? '100px ' : ''}${filter.columns.status == true ? '100px ' : ''}100px`;
        setFilter({ ...filter, [`option${option}`]: newColumns });
        const updatedFilteringColumn = []
        if ((option != 2 && option != 3 && option != 4 && option != 5 && option != 7) && filter.columns.image == false) {
            updatedFilteringColumn.push('image');
        }
        if ((option == 4 && option == 5 && option == 6 && option == 7) && filter.columns.number == false) {
            updatedFilteringColumn.push('number');
        }
        if ((option == 6 || option == 7) && filter.columns.username == false) {
            updatedFilteringColumn.push('username');
        }
        if ((option == 6) && filter.columns.permission == false) {
            updatedFilteringColumn.push('permission');
        }
        if ((option == 4 || option == 5 || option == 6) && filter.columns.creationDate == false) {
            updatedFilteringColumn.push('creation-date');
        }
        if ((option == 6) && filter.columns.lastAccess == false) {
            updatedFilteringColumn.push('last-access');
        }
        if ((option == 6) && filter.columns.blocked == false) {
            updatedFilteringColumn.push('blocked');
        }
        if ((option == 0 || option == 1) && filter.columns.productName == false) {
            updatedFilteringColumn.push('product-name');
        }
        if ((option == 0 || option == 1 || option == 2 || option == 4) && filter.columns.category == false) {
            updatedFilteringColumn.push('category');
        }
        if ((option == 1 || option == 3 || option == 4 || option == 5) && filter.columns.supplier == false) {
            updatedFilteringColumn.push('supplier');
        }
        if ((option == 0 || option == 1) && filter.columns.code == false) {
            updatedFilteringColumn.push('code');
        }
        if ((option == 0) && filter.columns.quantity == false) {
            updatedFilteringColumn.push('quantity');
        }
        if ((option == 0 || option == 1 || option == 5) && filter.columns.sellPrice == false) {
            updatedFilteringColumn.push('sell-price');
        }
        if ((option == 4) && filter.columns.buyPrice == false) {
            updatedFilteringColumn.push('buy-price');
        }
        if ((option == 7) && filter.columns.date == false) {
            updatedFilteringColumn.push('date');
        }
        if ((option != 6) && filter.columns.description == false) {
            updatedFilteringColumn.push('description');
        }
        if ((option == 4 || option == 5) && filter.columns.status == false) {
            updatedFilteringColumn.push('status');
        }
        if ((option == 4 || option == 5) && filter.columns.order == false) {
            updatedFilteringColumn.push('order');
        }
        setFilteringColumn(updatedFilteringColumn)

        const updatedSuppliers = [...suppliers];

        setRenderSupplier([...updatedSuppliers]);
        setRenderFilter({ ...filter, [`option${option}`]: newColumns, filteringColumns: updatedFilteringColumn })
        setFilterOptionsGrid(newColumns);
    }

    const handleChangeOrder = (header) => {
        switch (header) {
            case 'product-name':
                setFilter({ ...filter, orderFilter: { ...initialFilterObj.orderFilter, productName: !filter.orderFilter.productName, onFiltering: 'Product Name', onFilteringVar: 'productName' } });
                break;
            case 'category':
                setFilter({ ...filter, orderFilter: { ...initialFilterObj.orderFilter, category: !filter.orderFilter.category, onFiltering: 'Category', onFilteringVar: 'category' } });
                break;
            case 'number':
                setFilter({ ...filter, orderFilter: { ...initialFilterObj.orderFilter, number: !filter.orderFilter.number, onFiltering: 'Number', onFilteringVar: 'number' } });
                break;
            case 'code':
                setFilter({ ...filter, orderFilter: { ...initialFilterObj.orderFilter, code: !filter.orderFilter.code, onFiltering: 'Code', onFilteringVar: 'code' } });
                break;
            case 'blocked':
                setFilter({ ...filter, orderFilter: { ...initialFilterObj.orderFilter, blocked: !filter.orderFilter.blocked, onFiltering: 'Blocked', onFilteringVar: 'blocked' } });
                break;
            case 'last-access':
                setFilter({ ...filter, orderFilter: { ...initialFilterObj.orderFilter, lastAccess: !filter.orderFilter.lastAccess, onFiltering: 'Last Access', onFilteringVar: 'lastAccess' } });
                break;
            case 'supplier':
                setFilter({ ...filter, orderFilter: { ...initialFilterObj.orderFilter, supplier: !filter.orderFilter.supplier, onFiltering: 'Supplier', onFilteringVar: 'supplier' } });
                break;
            case 'username':
                setFilter({ ...filter, orderFilter: { ...initialFilterObj.orderFilter, username: !filter.orderFilter.username, onFiltering: 'Username', onFilteringVar: 'username' } });
                break;
            case 'permission':
                setFilter({ ...filter, orderFilter: { ...initialFilterObj.orderFilter, permission: !filter.orderFilter.permission, onFiltering: 'Permission', onFilteringVar: 'permission' } });
                break;
            case 'quantity':
                setFilter({ ...filter, orderFilter: { ...initialFilterObj.orderFilter, quantity: !filter.orderFilter.quantity, onFiltering: 'Quantity', onFilteringVar: 'quantity' } });
                break;
            case 'buy-price':
                setFilter({ ...filter, orderFilter: { ...initialFilterObj.orderFilter, buyPrice: !filter.orderFilter.buyPrice, onFiltering: 'Buy Price', onFilteringVar: 'buyPrice' } });
                break;
            case 'sell-price':
                setFilter({ ...filter, orderFilter: { ...initialFilterObj.orderFilter, sellPrice: !filter.orderFilter.sellPrice, onFiltering: 'Sell Price', onFilteringVar: 'sellPrice' } });
                break;
            case 'date':
                setFilter({ ...filter, orderFilter: { ...initialFilterObj.orderFilter, date: !filter.orderFilter.date, onFiltering: 'Date', onFilteringVar: 'date' } });
                break;
            case 'creation-date':
                setFilter({ ...filter, orderFilter: { ...initialFilterObj.orderFilter, creationDate: !filter.orderFilter.creationDate, onFiltering: 'Creation Date', onFilteringVar: 'creationDate' } });
                break;
            case 'description':
                setFilter({ ...filter, orderFilter: { ...initialFilterObj.orderFilter, description: !filter.orderFilter.description, onFiltering: 'Description', onFilteringVar: 'description' } });
                break;
        }
    }

    const handleUncheckCategory = (index) => {
        /*    const updatedFilter = { ...filter };
           updatedFilter.category[index].isShow = !updatedFilter.category[index].isShow;
           setFilter({ ...updatedFilter }); */
    }

    const handleUncheckSupplier = (index) => {
        const updatedSuppliers = [];
        for (let i = 0; i < suppliers.length; i++) {
            updatedSuppliers.push(suppliers[i]);

        }
        updatedSuppliers[index].isShow = !updatedSuppliers[index].isShow
        setSuppliers(updatedSuppliers);
    }

    const handleUncheckColumn = (column) => {
        const updatedFilteringColumn = [];
        switch (column) {
            case 'category':

                document.querySelectorAll('.filter__option-category').forEach((elem) => {
                    if (elem.classList.contains('filter__option--selected')) {
                        /*                         for (let i = 0; i < filteringColumn.length; i++) {
                                                    updatedFilteringColumn.push(filteringColumn[i]);
                        
                                                }
                                                updatedFilteringColumn.push(column)
                                                setFilteringColumn(updatedFilteringColumn); */
                        setFilter({ ...filter, columns: { ...filter.columns, category: false } }); /*  */
                    }
                    else {
                        /*        for (let i = 0; i < filteringColumn.length; i++) {
                                   updatedFilteringColumn.push(filteringColumn[i]);
                               }
                               const index = updatedFilteringColumn.indexOf(column)
                               updatedFilteringColumn.splice(index, 1)
                               setFilteringColumn(updatedFilteringColumn) */
                        setFilter({ ...filter, columns: { ...filter.columns, category: true } }); /*  */
                    }
                })
                break;
            case 'image':
                document.querySelectorAll('.filter__option-img').forEach((elem) => {
                    if (elem.classList.contains('filter__option--selected')) {
                        setFilter({ ...filter, columns: { ...filter.columns, image: false } });
                    }
                    else {
                        setFilter({ ...filter, columns: { ...filter.columns, image: true } });
                    }
                })
                break;
            case 'product-name':

                document.querySelectorAll('.filter__option-product-name').forEach((elem) => {
                    if (elem.classList.contains('filter__option--selected')) {
                        setFilter({ ...filter, columns: { ...filter.columns, productName: false } });
                    }
                    else {
                        setFilter({ ...filter, columns: { ...filter.columns, productName: true } });
                    }
                })
                break;
            case 'supplier':

                document.querySelectorAll('.filter__option-supplier').forEach((elem) => {
                    if (elem.classList.contains('filter__option--selected')) {
                        setFilter({ ...filter, columns: { ...filter.columns, supplier: false } });
                    }
                    else {
                        setFilter({ ...filter, columns: { ...filter.columns, supplier: true } });
                    }
                })
                break;
            case 'buy-price':

                document.querySelectorAll('.filter__option-buy-price').forEach((elem) => {
                    if (elem.classList.contains('filter__option--selected')) {
                        setFilter({ ...filter, columns: { ...filter.columns, buyPrice: false } });
                    }
                    else {
                        setFilter({ ...filter, columns: { ...filter.columns, buyPrice: true } });
                    }
                })
                break;
            case 'sell-price':

                document.querySelectorAll('.filter__option-sell-price').forEach((elem) => {
                    if (elem.classList.contains('filter__option--selected')) {
                        setFilter({ ...filter, columns: { ...filter.columns, sellPrice: false } });
                    }
                    else {
                        setFilter({ ...filter, columns: { ...filter.columns, sellPrice: true } });
                    }
                })
                break;
            case 'description':

                document.querySelectorAll('.filter__option-description').forEach((elem) => {
                    if (elem.classList.contains('filter__option--selected')) {
                        setFilter({ ...filter, columns: { ...filter.columns, description: false } });
                    }
                    else {
                        setFilter({ ...filter, columns: { ...filter.columns, description: true } });
                    }
                })
                break;
            case 'status':

                document.querySelectorAll('.filter__option-status').forEach((elem) => {
                    if (elem.classList.contains('filter__option--selected')) {
                        setFilter({ ...filter, columns: { ...filter.columns, status: false } });
                    }
                    else {
                        setFilter({ ...filter, columns: { ...filter.columns, status: true } });
                    }
                })
                break;
            case 'number':

                document.querySelectorAll('.filter__option-number').forEach((elem) => {
                    if (elem.classList.contains('filter__option--selected')) {
                        setFilter({ ...filter, columns: { ...filter.columns, number: false } });
                    }
                    else {
                        setFilter({ ...filter, columns: { ...filter.columns, number: true } });
                    }
                })
                break;
            case 'creation-date':

                document.querySelectorAll('.filter__option-creation-date').forEach((elem) => {
                    if (elem.classList.contains('filter__option--selected')) {
                        setFilter({ ...filter, columns: { ...filter.columns, creationDate: false } });
                    }
                    else {
                        setFilter({ ...filter, columns: { ...filter.columns, creationDate: true } });
                    }
                })
                break;
            case 'order':

                document.querySelectorAll('.filter__option-order').forEach((elem) => {
                    if (elem.classList.contains('filter__option--selected')) {
                        setFilter({ ...filter, columns: { ...filter.columns, order: false } });
                    }
                    else {
                        setFilter({ ...filter, columns: { ...filter.columns, order: true } });
                    }
                })
                break;
            case 'blocked':

                document.querySelectorAll('.filter__option-blocked').forEach((elem) => {
                    if (elem.classList.contains('filter__option--selected')) {
                        setFilter({ ...filter, columns: { ...filter.columns, blocked: false } });
                    }
                    else {
                        setFilter({ ...filter, columns: { ...filter.columns, blocked: true } });
                    }
                })
                break;
            case 'username':

                document.querySelectorAll('.filter__option-username').forEach((elem) => {
                    if (elem.classList.contains('filter__option--selected')) {
                        setFilter({ ...filter, columns: { ...filter.columns, username: false } });
                    }
                    else {
                        setFilter({ ...filter, columns: { ...filter.columns, username: true } });
                    }
                })
                break;
            case 'permission':

                document.querySelectorAll('.filter__option-permission').forEach((elem) => {
                    if (elem.classList.contains('filter__option--selected')) {
                        setFilter({ ...filter, columns: { ...filter.columns, permission: false } });
                    }
                    else {
                        setFilter({ ...filter, columns: { ...filter.columns, permission: true } });
                    }
                })
                break;
            case 'last-access':

                document.querySelectorAll('.filter__option-last-access').forEach((elem) => {
                    if (elem.classList.contains('filter__option--selected')) {
                        setFilter({ ...filter, columns: { ...filter.columns, lastAccess: false } });
                    }
                    else {
                        setFilter({ ...filter, columns: { ...filter.columns, lastAccess: true } });

                    }
                })
                break;
            case 'date':

                document.querySelectorAll('.filter__option-date').forEach((elem) => {
                    if (elem.classList.contains('filter__option--selected')) {
                        setFilter({ ...filter, columns: { ...filter.columns, date: false } });

                    }
                    else {
                        setFilter({ ...filter, columns: { ...filter.columns, date: true } });

                    }
                })
                break;
            case 'quantity':

                document.querySelectorAll('.filter__option-qnt').forEach((elem) => {
                    if (elem.classList.contains('filter__option--selected')) {
                        setFilter({ ...filter, columns: { ...filter.columns, quantity: false } });

                    }
                    else {
                        setFilter({ ...filter, columns: { ...filter.columns, quantity: true } });

                    }
                })
                break;
            case 'code':

                document.querySelectorAll('.filter__option-code').forEach((elem) => {
                    if (elem.classList.contains('filter__option--selected')) {
                        setFilter({ ...filter, columns: { ...filter.columns, code: false } });

                    }
                    else {
                        setFilter({ ...filter, columns: { ...filter.columns, code: true } });

                    }
                })
                break;
        }
    }

    const handleSelectFilter = (otherValue) => {
        switch (otherValue) {
            case 'all-permissions':
                setFilter({ ...filter, permission: 0 });
                break;
            case 'admin':
                setFilter({ ...filter, permission: 1 });
                break;
            case 'user':
                setFilter({ ...filter, permission: 2 });
                break;
            case 'all-stocks':
                setFilter({ ...filter, status: 0 });
                break;
            case 'in-stock':
                setFilter({ ...filter, status: 1 });
                break;
            case 'out-stock':
                setFilter({ ...filter, status: 2 });
                break;
            case 'all-blockeds':
                setFilter({ ...filter, blocked: 0 });
                break;
            case 'blocked':
                setFilter({ ...filter, blocked: 1 });
                break;
            case 'no-blocked':
                setFilter({ ...filter, blocked: 2 });
                break;
        }
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
                        <form className="stockmenu__search" onSubmit={(e) => handleSearch(e)}>
                            <IoSearch className='stockmenu__search-icon' />
                            <input type="text" className="stockmenu__searchinput" placeholder={option == 0 ? "Search Orders" : option == 1 ? "Search Products" : option == 2 ? 'Search Categories' : option == 3 ? 'Search Suppliers' : option == 4 ? 'Search Orders' : option == 5 ? 'Search Orders' : option == 6 ? 'Search Users' : 'Search Types'} value={filter.search} onChange={(e) => setFilter({ ...filter, search: e.target.value })} />
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
                                        <div className="filter__options-columns filter__options-categories">
                                            {filter.category.map((elem, index) => (
                                                <>
                                                    <div className={`filter__option filter__option-category-${elem.name} ${elem.isShow == true ? 'filter__option--selected' : ''}`} onClick={() => handleUncheckCategory(index)}>
                                                        <div className="filter__option-checkbox">
                                                            <FaCheck className='filter__option-check filter__option-category-check filter__option-category--selected' />
                                                        </div>
                                                        <span>{elem.name.toUpperCase()}</span>
                                                    </div>
                                                </>
                                            ))}
                                        </div>
                                    }
                                    {chooseSelection == 'suppliers' &&
                                        <div className="filter__options-columns filter__options-suppliers">
                                            {suppliers.map((elem, index) => (
                                                <>
                                                    <div className={`filter__option filter__option-supplier-${elem.name} ${elem.isShow == true ? 'filter__option--selected' : ''}`} onClick={() => handleUncheckSupplier(index)}>
                                                        <div className="filter__option-checkbox">
                                                            <FaCheck className='filter__option-check filter__option-supplier-check filter__option-supplier--selected' />
                                                        </div>
                                                        <span>{elem.name.toUpperCase()}</span>
                                                    </div>
                                                </>
                                            ))}
                                        </div>
                                    }
                                    {chooseSelection == 'values' &&
                                        <div className="filter__options-values">
                                            {(option == 0 || option == 1 || option == 5) &&
                                                <div className="filter__option-value">
                                                    <span>Min Sell Price</span>
                                                    <div className="filter__option__input">
                                                        <input type="range" name="sell-price" id="sell-price" className='filter__option__range-input filter__option__sellprice-input' value={filter.minSellPrice} onChange={(e) => setFilter({ ...filter, minSellPrice: e.target.value })} min='0' max='110' />
                                                        <span>{filter.minSellPrice}</span>
                                                    </div>
                                                </div>
                                            }
                                            {(option == 4) &&
                                                <div className="filter__option-value">
                                                    <span>Min Buy Price</span>
                                                    <div className="filter__option__input">
                                                        <input type="range" name="sell-price" id="sell-price" className='filter__option__range-input filter__option__buyprice-input' value={filter.minBuyPrice} onChange={(e) => setFilter({ ...filter, minBuyPrice: e.target.value })} min='0' max='110' />
                                                        <span>{filter.minBuyPrice}</span>
                                                    </div>
                                                </div>
                                            }
                                            {(option == 0) &&
                                                <div className="filter__option-value">
                                                    <span>Min Quantity</span>
                                                    <div className="filter__option__input">
                                                        <input type="range" name="sell-price" id="sell-price" className='filter__option__range-input filter__option__quantity-input' value={filter.minQnt} onChange={(e) => setFilter({ ...filter, minQnt: e.target.value })} min='0' max='110' />
                                                        <span>{filter.minQnt}</span>
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
                                                        <div className={`filter__option-others filter__option-others-status-op filter__option-others-allstock ${filter.status == 0 ? 'filter__option-others--selected' : ''}`} onClick={() => handleSelectFilter('all-stocks')}>
                                                            <div className="filter__option-radio">
                                                            </div>
                                                            <span>All</span>
                                                        </div>
                                                        <div className={`filter__option-others filter__option-others-status-op filter__option-others-instock ${filter.status == 1 ? 'filter__option-others--selected' : ''}`} onClick={() => handleSelectFilter('in-stock')}>
                                                            <div className="filter__option-radio">
                                                            </div>
                                                            <span>In Stock</span>
                                                        </div>
                                                        <div className={`filter__option-others filter__option-others-status-op filter__option-others-outstock ${filter.status == 2 ? 'filter__option-others--selected' : ''}`} onClick={() => handleSelectFilter('out-stock')}>
                                                            <div className="filter__option-radio">
                                                            </div>
                                                            <span>Out of Stock</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            }
                                            {(option == 6) &&
                                                <div className="filter__options-others-status filter__options-others-permission">
                                                    <h4>Permission</h4>
                                                    <div className="filter__option-others-status filter__option-others-permission">
                                                        <div className={`filter__option-others filter__option-others-permissions filter__option-others-all ${filter.permission == 0 ? 'filter__option-others--selected' : ''}`} onClick={() => handleSelectFilter('all-permissions')}>
                                                            <div className="filter__option-radio">
                                                            </div>
                                                            <span>All</span>
                                                        </div>
                                                        <div className={`filter__option-others filter__option-others-permissions filter__option-others-admin ${filter.permission == 1 ? 'filter__option-others--selected' : ''}`} onClick={() => handleSelectFilter('admin')}>
                                                            <div className="filter__option-radio">
                                                            </div>
                                                            <span>Admin</span>
                                                        </div>
                                                        <div className={`filter__option-others filter__option-others-permissions filter__option-others-user ${filter.permission == 2 ? 'filter__option-others--selected' : ''}`} onClick={() => handleSelectFilter('user')}>
                                                            <div className="filter__option-radio">
                                                            </div>
                                                            <span>User</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            }
                                            {(option == 6) &&
                                                <div className="filter__options-others-status filter__options-others-blocked">
                                                    <h4>Blocked</h4>
                                                    <div className="filter__option-others-status filter__option-others-blocked">
                                                        <div className={`filter__option-others filter__option-others-isblocked filter__option-others-all ${filter.blocked == 0 ? 'filter__option-others--selected' : ''}`} onClick={() => handleSelectFilter('all-blockeds')}>
                                                            <div className="filter__option-radio">
                                                            </div>
                                                            <span>All</span>
                                                        </div>
                                                        <div className={`filter__option-others filter__option-others-isblocked filter__option-others-has-blocked ${filter.blocked == 1 ? 'filter__option-others--selected' : ''}`} onClick={() => handleSelectFilter('blocked')}>
                                                            <div className="filter__option-radio">
                                                            </div>
                                                            <span>Yes</span>
                                                        </div>
                                                        <div className={`filter__option-others filter__option-others-isblocked filter__option-others-no-blocked ${filter.blocked == 2 ? 'filter__option-others--selected' : ''}`} onClick={() => handleSelectFilter('no-blocked')}>
                                                            <div className="filter__option-radio">
                                                            </div>
                                                            <span>No</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                    }
                                </div>
                                <div className="filter__buttons">
                                    <div className="filter__button button button--outlined" onClick={handleClearFilter}>Clear</div>
                                    <div className="filter__button button" onClick={handleFilter}>Filter</div>
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
                        <div className="button stockmenu__button" style={{ display: option != 7 ? 'flex' : 'none' }} onClick={handleOpenWindow}>{option == 0 ? "der" : option == 1 ? "New Product" : option == 2 ? 'New Category' : option == 3 ? 'New Supplier' : option == 4 ? 'New Order' : option == 5 ? 'New Order' : option == 6 ? 'New User' : 'New Type'}</div>
                    </div>
                </div>
                <div className="stock__container">
                    <div className="stock__info">
                        <div className="stock__tags">
                            {renderFilter.search != '' &&
                                <div className="stock__tag">
                                    <span>Search: {renderFilter.search}</span>
                                    <div className="stock__vl"></div>
                                    <HiOutlineXMark className='stock__tag-mark' onClick={handleRemoveTag('search')} />
                                </div>
                            }
                            {filter.orderFilter.onFiltering != '' &&
                                <div className="stock__tag">
                                    <span>{filter.orderFilter.onFiltering}: {filter.orderFilter[filter.orderFilter.onFilteringVar] == true ? 'Ascending' : 'Descending'}</span>
                                    <div className="stock__vl"></div>
                                    <HiOutlineXMark className='stock__tag-mark' onClick={handleRemoveTag('order')} />
                                </div>
                            }
                            {renderFilter.filteringColumns.length != 0 &&
                                <div className="stock__tag">
                                    <span>Not Show Columns: {`${renderFilter.filteringColumns.map((elem) => elem.charAt(0).toUpperCase() + elem.slice(1).replace('-', ' ') + '')}`}</span>
                                    <div className="stock__vl"></div>
                                    <HiOutlineXMark className='stock__tag-mark' onClick={handleRemoveTag('order')} />
                                </div>
                            }
                            {
                                <div className="stock__tag">
                                    <span>Not Show Suppliers: {`${renderSupplier.map((elem) => { if (elem.isShow == false) { return elem.name.replace('-', ' ').toUpperCase() + '' } })}`}</span>
                                    <div className="stock__vl"></div>
                                    <HiOutlineXMark className='stock__tag-mark' onClick={handleRemoveTag('supplier')} />
                                </div>
                            }
                            {renderFilter.minSellPrice != 0 &&
                                <div className="stock__tag">
                                    <span>Min Sell Price: US${renderFilter.minSellPrice}</span>
                                    <div className="stock__vl"></div>
                                    <HiOutlineXMark className='stock__tag-mark' onClick={handleRemoveTag('sell-price')} />
                                </div>
                            }
                            {renderFilter.minBuyPrice != 0 &&
                                <div className="stock__tag">
                                    <span>Min Buy Price: US${renderFilter.minBuyPrice}</span>
                                    <div className="stock__vl"></div>
                                    <HiOutlineXMark className='stock__tag-mark' onClick={handleRemoveTag('buy-price')} />
                                </div>
                            }
                            {renderFilter.minQnt != 0 &&
                                <div className="stock__tag">
                                    <span>Min Quantity: {renderFilter.minQnt}</span>
                                    <div className="stock__vl"></div>
                                    <HiOutlineXMark className='stock__tag-mark' onClick={handleRemoveTag('quantity')} />
                                </div>
                            }
                            {renderFilter.status != 0 &&
                                <div className="stock__tag">
                                    <span>Status: {renderFilter.status == 1 ? 'In Stock' : 'Out of Stock'}</span>
                                    <div className="stock__vl"></div>
                                    <HiOutlineXMark className='stock__tag-mark' onClick={handleRemoveTag('status')} />
                                </div>
                            }
                            {renderFilter.permission != 0 &&
                                <div className="stock__tag">
                                    <span>Permission: {renderFilter.permission == 1 ? 'Admin' : 'User'}</span>
                                    <div className="stock__vl"></div>
                                    <HiOutlineXMark className='stock__tag-mark' onClick={handleRemoveTag('permission')} />
                                </div>
                            }
                            {renderFilter.blocked != 0 &&
                                <div className="stock__tag">
                                    <span>Block: {renderFilter.blocked == 1 ? 'Blocked' : 'No Blocked'}</span>
                                    <div className="stock__vl"></div>
                                    <HiOutlineXMark className='stock__tag-mark' onClick={handleRemoveTag('blocked')} />
                                </div>
                            }

                        </div>
                        <p className="stock__info__content">Total {option == 0 ? "Stock Items" : option == 1 ? "Products" : option == 2 ? 'Categories' : option == 3 ? 'Suppliers' : option == 4 ? 'Purchases' : option == 5 ? 'Sales' : option == 6 ? 'Users' : option == 7 ? 'Logs' : ''}: 67</p>
                    </div>
                    <div className="stock__items">
                        <div className="stockitems__header stock__item" style={{ gridTemplateColumns: filterOptionsGrid }}>
                            <div className="stockitem__select" onClick={handleSelectAllItems}></div>
                            {((option != 2 && option != 3 && option != 4 && option != 5 && option != 7) && renderFilter.columns.image != false) &&
                                <div className=""></div>
                            }
                            {((option == 4 || option == 5 || option == 6 || option == 7) && renderFilter.columns.number == true) &&
                                <div className="stockitem__productnumber stockitem__productnumber--header stockitem__product--header" onClick={() => handleChangeOrder('number')}>
                                    <span>Nº</span>
                                    <IoIosArrowDown className={`stockitem__product--header__arrow ${filter.orderFilter.number == true ? 'stockitem__product--header__arrow--show' : ''}`} />
                                    <IoIosArrowUp className={`stockitem__product--header__arrow ${filter.orderFilter.number == false ? 'stockitem__product--header__arrow--show' : ''}`} />
                                </div>
                            }
                            {((option == 6 || option == 7) && renderFilter.columns.username == true) &&
                                <div className="stockitem__productusername stockitem__username--header stockitem__product--header" onClick={() => handleChangeOrder('username')}>
                                    <span>Username</span>
                                    <IoIosArrowDown className={`stockitem__product--header__arrow ${filter.orderFilter.username == true ? 'stockitem__product--header__arrow--show' : ''}`} />
                                    <IoIosArrowUp className={`stockitem__product--header__arrow ${filter.orderFilter.username == false ? 'stockitem__product--header__arrow--show' : ''}`} />
                                </div>
                            }
                            {((option == 6) && renderFilter.columns.permission == true) &&
                                <div className="stockitem__userpermission stockitem__userpermission--header stockitem__product--header" onClick={() => handleChangeOrder('permission')}>
                                    <span>Permission</span>
                                    <IoIosArrowDown className={`stockitem__product--header__arrow ${filter.orderFilter.permission == true ? 'stockitem__product--header__arrow--show' : ''}`} />
                                    <IoIosArrowUp className={`stockitem__product--header__arrow ${filter.orderFilter.permission == false ? 'stockitem__product--header__arrow--show' : ''}`} />
                                </div>
                            }
                            {((option == 4 || option == 5 || option == 6) && renderFilter.columns.creationDate == true) &&
                                <div className="stockitem__productcreationdate stockitem__productcreationdate--header stockitem__product--header" onClick={() => handleChangeOrder('creation-date')}>
                                    <span>Creation Date</span>
                                    <IoIosArrowDown className={`stockitem__product--header__arrow ${filter.orderFilter.creationDate == true ? 'stockitem__product--header__arrow--show' : ''}`} />
                                    <IoIosArrowUp className={`stockitem__product--header__arrow ${filter.orderFilter.creationDate == false ? 'stockitem__product--header__arrow--show' : ''}`} />
                                </div>
                            }
                            {((option == 6) && renderFilter.columns.lastAccess == true) &&
                                <div className="stockitem__userlastaccess stockitem__userlastaccess--header stockitem__product--header" onClick={() => handleChangeOrder('last-access')}>
                                    <span>Last Access</span>
                                    <IoIosArrowDown className={`stockitem__product--header__arrow ${filter.orderFilter.lastAccess == true ? 'stockitem__product--header__arrow--show' : ''}`} />
                                    <IoIosArrowUp className={`stockitem__product--header__arrow ${filter.orderFilter.lastAccess == false ? 'stockitem__product--header__arrow--show' : ''}`} />
                                </div>
                            }
                            {((option == 6) && renderFilter.columns.blocked == true) &&
                                <div className="stockitem__userblocked stockitem__userblocked--header stockitem__product--header" onClick={() => handleChangeOrder('blocked')}>
                                    <span>Blocked</span>
                                    <IoIosArrowDown className={`stockitem__product--header__arrow ${filter.orderFilter.blocked == true ? 'stockitem__product--header__arrow--show' : ''}`} />
                                    <IoIosArrowUp className={`stockitem__product--header__arrow ${filter.orderFilter.blocked == false ? 'stockitem__product--header__arrow--show' : ''}`} />
                                </div>
                            }
                            {((option == 0 || option == 1) && renderFilter.columns.productName == true) &&
                                <div className="stockitem__productname stockitem__productname--header stockitem__product--header" onClick={() => handleChangeOrder('product-name')}>
                                    <span>Product Name</span>
                                    <IoIosArrowDown className={`stockitem__product--header__arrow ${filter.orderFilter.productName == true ? 'stockitem__product--header__arrow--show' : ''}`} />
                                    <IoIosArrowUp className={`stockitem__product--header__arrow ${filter.orderFilter.productName == false ? 'stockitem__product--header__arrow--show' : ''}`} />
                                </div>
                            }
                            {((option == 1 || option == 0 || option == 2 || option == 4 || option == 5) && renderFilter.columns.category == true) &&
                                <div className="stockitem__productcategory stockitem__productcategory--header stockitem__product--header " onClick={() => handleChangeOrder('category')}>
                                    <span>Category</span>
                                    <IoIosArrowDown className={`stockitem__product--header__arrow ${filter.orderFilter.category == true ? 'stockitem__product--header__arrow--show' : ''}`} />
                                    <IoIosArrowUp className={`stockitem__product--header__arrow ${filter.orderFilter.category == false ? 'stockitem__product--header__arrow--show' : ''}`} />
                                </div>
                            }
                            {((option == 1 || option == 3 || option == 4 || option == 5) && renderFilter.columns.supplier == true) &&
                                <div className="stockitem__productsupplier stockitem__productsupplier--header stockitem__product--header " onClick={() => handleChangeOrder('supplier')}>
                                    <span>Supplier</span>
                                    <IoIosArrowDown className={`stockitem__product--header__arrow ${filter.orderFilter.supplier == true ? 'stockitem__product--header__arrow--show' : ''}`} />
                                    <IoIosArrowUp className={`stockitem__product--header__arrow ${filter.orderFilter.supplier == false ? 'stockitem__product--header__arrow--show' : ''}`} />
                                </div>
                            }
                            {((option == 0 || option == 1) && renderFilter.columns.code == true) &&
                                <div className="stockitem__productcode stockitem__productcode--header stockitem__product--header" onClick={() => handleChangeOrder('code')}>
                                    <span>Code</span>
                                    <IoIosArrowDown className={`stockitem__product--header__arrow ${filter.orderFilter.code == true ? 'stockitem__product--header__arrow--show' : ''}`} />
                                    <IoIosArrowUp className={`stockitem__product--header__arrow ${filter.orderFilter.code == false ? 'stockitem__product--header__arrow--show' : ''}`} />
                                </div>
                            }
                            {((option == 0) && renderFilter.columns.quantity == true) &&
                                <div className="stockitem__productqnt stockitem__productqnt--header stockitem__product--header" onClick={() => handleChangeOrder('quantity')}>
                                    <span>Qnt</span>
                                    <IoIosArrowDown className={`stockitem__product--header__arrow ${filter.orderFilter.quantity == true ? 'stockitem__product--header__arrow--show' : ''}`} />
                                    <IoIosArrowUp className={`stockitem__product--header__arrow ${filter.orderFilter.quantity == false ? 'stockitem__product--header__arrow--show' : ''}`} />
                                </div>
                            }
                            {((option == 0 || option == 1 || option == 5) && renderFilter.columns.sellPrice == true) &&
                                < div className="stockitem__productsellprice stockitem__productsellprice--header stockitem__product--header" onClick={() => handleChangeOrder('sell-price')}>
                                    <span>Sell Price</span>
                                    <IoIosArrowDown className={`stockitem__product--header__arrow ${filter.orderFilter.sellPrice == true ? 'stockitem__product--header__arrow--show' : ''}`} />
                                    <IoIosArrowUp className={`stockitem__product--header__arrow ${filter.orderFilter.sellPrice == false ? 'stockitem__product--header__arrow--show' : ''}`} />
                                </div>
                            }
                            {((option == 4) && renderFilter.columns.buyPrice == true) &&
                                <div className="stockitem__productbuyprice stockitem__productbuyprice--header stockitem__product--header" onClick={() => handleChangeOrder('buy-price')}>
                                    <span>Buy Price</span>
                                    <IoIosArrowDown className={`stockitem__product--header__arrow ${filter.orderFilter.buyPrice == true ? 'stockitem__product--header__arrow--show' : ''}`} />
                                    <IoIosArrowUp className={`stockitem__product--header__arrow ${filter.orderFilter.buyPrice == false ? 'stockitem__product--header__arrow--show' : ''}`} />
                                </div>
                            }
                            {((option == 7) && renderFilter.columns.date == true) &&
                                <div className="stockitem__logdate stockitem__logdate--header stockitem__product--header" onClick={() => handleChangeOrder('date')}>
                                    <span>Date</span>
                                    <IoIosArrowDown className={`stockitem__product--header__arrow ${filter.orderFilter.date == true ? 'stockitem__product--header__arrow--show' : ''}`} />
                                    <IoIosArrowUp className={`stockitem__product--header__arrow ${filter.orderFilter.date == false ? 'stockitem__product--header__arrow--show' : ''}`} />
                                </div>
                            }
                            {((option != 6) && renderFilter.columns.description == true) &&
                                <p className="stockitem__productdescription stockitem__productdescription--header stockitem__product--header" onClick={() => handleChangeOrder('description')}>
                                    <span>Description</span>
                                    <IoIosArrowDown className={`stockitem__product--header__arrow ${filter.orderFilter.description == true ? 'stockitem__product--header__arrow--show' : ''}`} />
                                    <IoIosArrowUp className={`stockitem__product--header__arrow ${filter.orderFilter.description == false ? 'stockitem__product--header__arrow--show' : ''}`} />
                                </p>
                            }
                            {/*  */}
                            {((option == 6 || option == 7) || renderFilter.columns.description == false) &&
                                <div></div>
                            }
                            {/*  */}
                            {((option == 1) && renderFilter.columns.status == true) &&
                                <p className="stockitem__productstatus--header stockitem__product--header">Status</p>
                            }
                            {((option == 4 || option == 5) && renderFilter.columns.order == true) &&
                                <p className="stockitem__productorder--header stockitem__product--header">Order</p>
                            }

                            <div className="stockitem__productsdelete button" style={{ display: "none" }}>Delete</div>

                        </div>
                        <div className="stock__items-container">
                            <div className="stock__item" style={{ gridTemplateColumns: filterOptionsGrid }}>
                                <div className="stockitem__select" onClick={(e) => handleSelectItem(e)}></div>
                                {((option != 2 && option != 3 && option != 4 && option != 5 && option != 7) && renderFilter.columns.image != false) &&
                                    < img src={Tshirt} className='stockitem__img' />
                                }
                                {((option == 4 || option == 5 || option == 6 || option == 7) && renderFilter.columns.number == true) &&
                                    <p className="stockitem__productnumber">1</p>
                                }
                                {((option == 6 || option == 7) && renderFilter.columns.username == true) &&
                                    <p className="stockitem__username">John Roger</p>
                                }
                                {((option == 6) && renderFilter.columns.permission == true) &&
                                    <p className="stockitem__userpermission">Administrator</p>
                                }
                                {((option == 4 || option == 5 || option == 6) && renderFilter.columns.creationDate == true) &&
                                    <p className="stockitem__productcreationdate">July 1, 2024</p>
                                }
                                {((option == 1 || option == 0) && renderFilter.columns.productName == true) &&
                                    <p className="stockitem__productname">Example Example Example</p>
                                }
                                {((option == 1 || option == 0 || option == 2 || option == 4 || option == 5) && renderFilter.columns.category == true) &&
                                    <p className="stockitem__productcategory">CATEGORY</p>
                                }
                                {((option == 7) && renderFilter.columns.date == true) &&
                                    <p className="stockitem__logdate">July 1, 2024</p>
                                }
                                {((option == 1 || option == 3 || option == 4 || option == 5) && renderFilter.columns.supplier == true) &&
                                    < div className="stockitem__productsupplier stockitem__productsupplier--active">Dress Store</div>
                                }
                                {((option == 0 || option == 1) && renderFilter.columns.code == true) &&
                                    <p className="stockitem__productcode">Code</p>
                                }
                                {((option == 0) && renderFilter.columns.quantity == true) &&
                                    <p className="stockitem__productqnt">17</p>
                                }
                                {((option == 6) && renderFilter.columns.lastAccess == true) &&
                                    <p className="stockitem__userlastaccess">July 6, 2024</p>
                                }
                                {((option == 6) && renderFilter.columns.blocked == true) &&
                                    <p className="stockitem__userblocked">Yes</p>
                                }
                                {((option == 0 || option == 1 || option == 5) && renderFilter.columns.sellPrice == true) &&
                                    <p className="stockitem__productsellprice">$24.00</p>
                                }
                                {((option == 4) && renderFilter.columns.buyPrice == true) &&
                                    <p className="stockitem__productbuyprice">$24.00</p>
                                }
                                {((option != 6) && renderFilter.columns.description == true) &&
                                    <p className="stockitem__productdescription">{`Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus consequuntur praesentium animi quaerat quae perspiciatis, amet voluptates blanditiis corporis facilis eos natus nihil. Dolorem, reiciendis! Commodi, exercitationem nostrum veritatis suscipit et tempora consequuntur odit eaque totam dolorem enim aspernatur quasi fuga eius deleniti possimus dolores expedita aliquam rem ipsam maxime! Rem, accusantium odio quae dolorem expedita voluptatibus, dignissimos illo, reprehenderit numquam facere molestiae excepturi ullam fugiat quos omnis? Earum repellendus explicabo sint voluptatibus, illum ea magni qui laudantium neque doloribus maxime debitis nisi. Dolor deserunt maxime in alias architecto reiciendis doloribus. Incidunt, recusandae facere. Eius saepe iste optio deleniti nostrum.`.slice(0, 30)}...</p>
                                }
                                {/*  */}
                                {((option == 6 || option == 7) || renderFilter.columns.description == false) &&
                                    <div></div>
                                }
                                {/*  */}
                                {((option == 1) && renderFilter.columns.status == true) &&
                                    <div className="stockitem__productstatus stockitem__productstatus--active">Active</div>
                                }
                                {((option == 4 || option == 5) && renderFilter.columns.order == true) &&
                                    <div className="stockitem__productorder stockitem__productorder"></div>
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