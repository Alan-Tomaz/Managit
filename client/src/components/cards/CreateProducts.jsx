import React, { useEffect, useRef, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import './CreateProducts.css';
import ProductImg from '../../assets/images/product.png';
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
import { useSelector } from 'react-redux';
import Loading from '../../assets/images/loading.svg';
import axios from 'axios';

function CreateProducts({ closeWindow, item, option, id, showToastMessage, setReload }) {

    const [productName, setProductName] = useState(option == 1 ? item.productName : '');
    const [productDesc, setProductDesc] = useState(option == 1 ? item.description : '');
    const [productCategory, setProductCategory] = useState(option == 1 ? item.productCategory : '');
    const [productSupplier, setProductSupplier] = useState(option == 1 ? item.productSupplier : '');
    const [sellPrice, setSellPrice] = useState(option == 1 ? item.sellPrice : '');
    const [picturePath, setPicturePath] = useState(option == 1 ? item.picturePath : '');

    const [categories, setCategories] = useState([]);
    const [suppliers, setSuppliers] = useState([]);

    const [showCategories, setShowCategories] = useState(false);
    const [showEmployees, setShowEmployees] = useState(false);
    const [categoriesLoading, setCategoriesLoading] = useState(false);
    const [suppliersLoading, setSuppliersLoading] = useState(false);
    const [categoriesPage, setCategoriesPage] = useState(1);
    const [suppliersPage, setSuppliersPage] = useState(1);

    const categorySelectionRef = useRef(null);
    const employeeSelectionRef = useRef(null);

    const apiUrl = useSelector((state) => state.MiscReducer.apiUrl);
    const apiPort = useSelector((state) => state.MiscReducer.apiPort);

    const userInfo = useSelector((state) => state.UserReducer);

    const picture = picturePath != '' ? `${apiUrl}:${apiPort}/assets/${picturePath}` : ProductImg;

    const handleEditProduct = () => {
        document.getElementById('product__img').click();
    }

    const handleGetCategories = () => {
        setCategoriesLoading(true)

        const headers = {
            'Authorization': `Bearer ${userInfo.token}`
        }

        const filteringObj = {
            page: categoriesPage,
            limit: 10
        }

        const url = new URL(`${apiUrl}:${apiPort}/category/`);
        url.search = new URLSearchParams(filteringObj);

        axios.get(`${url}`, ({
            headers
        }))
            .then((data) => {
                setCategories(prev => [...prev, ...data.data.categoriesData]);
                if (!productCategory == '') {
                    setProductCategory(data.data.categoriesData.filter((elem => elem._id == productCategory)))
                } else {
                    setProductCategory(data.data.categoriesData[0])
                }
                setCategoriesLoading(false)
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const handleGetSuppliers = () => {
        setSuppliersLoading(true)

        const headers = {
            'Authorization': `Bearer ${userInfo.token}`
        }

        const filteringObj = {
            page: suppliersPage,
            limit: 10
        }

        const url = new URL(`${apiUrl}:${apiPort}/supplier/`);
        url.search = new URLSearchParams(filteringObj);

        axios.get(`${url}`, ({
            headers
        }))
            .then((data) => {
                setSuppliers(prev => [...prev, ...data.data.suppliersData]);
                if (!productSupplier == '') {
                    setProductSupplier(data.data.suppliersData.filter((elem => elem._id == productSupplier)))
                } else {
                    setProductSupplier(data.data.suppliersData[0])
                    console.log(data.data.suppliersData[0])
                }
                setSuppliersLoading(false)
            })
            .catch((err) => {
                console.log(err);
            })
    }

    useEffect(() => {
        handleGetCategories();
    }, [categoriesPage])

    useEffect(() => {
        handleGetSuppliers();
    }, [suppliersPage])

    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
                setPage(prevPage => prevPage + 1); // Load more items when at the bottom
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        /* CLOSE WINDOW WHEN CLICK OUTSIDE */
        const handleClickOutside = (event) => {
            if (categorySelectionRef.current && !categorySelectionRef.current.contains(event.target)) {
                setShowCategories(false)
            }

            if (employeeSelectionRef.current && !employeeSelectionRef.current.contains(event.target)) {
                setShowEmployees(false)
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };

    }, []);

    return (
        <>
            {(categories.length > 0 && suppliers.length > 0) ?
                <div className="create-products" >
                    <div className="create-products__container">
                        <div className="create-products__close">
                            <IoClose onClick={closeWindow} />
                        </div>
                        <h2>{option == 0 ? 'Create Product' : option == 1 ? `Update Product` : ''}</h2>
                        <div className="create-products__img-box">
                            <img src={picture} alt="" className="create-products__img" />
                            <FaRegEdit className='create-products__changeimg' onClick={handleEditProduct} />
                            <input type="file" name="product__img" id="product__img" className='create-products__img-input' />
                        </div>
                        <form className="create-products__form" onSubmit={(e) => option == 0 ? handleCreateProduct(e) : option == 1 ? handleUpdatProduct(e) : ''}>
                            <input type="text" name="product__name" id="product__name" className="create-products__input product__name" placeholder='Product Name:' onChange={(e) => setProductName(e.target.value)} value={productName} />
                            <div className="product__category" id='product__category' ref={categorySelectionRef} onClick={() => setShowCategories(!showCategories)}>
                                <span>{String(productCategory.categoryName).toUpperCase()}</span>
                                <IoMdArrowDropdown style={{ display: showCategories == false ? 'flex' : 'none' }} className='product__category-icon' />
                                <IoMdArrowDropup style={{ display: showCategories == true ? 'flex' : 'none' }} className='product__category-icon' />
                                <div className="product__category__options" style={{ display: showCategories == true ? 'flex' : 'none' }}>
                                    <div className="product__category__options-scroll">
                                        {categories.map((category, index) =>
                                            <p onClick={() => setProductCategory(category)} key={index}>{category.categoryName.toUpperCase()}</p>
                                        )}
                                    </div>
                                    <IoMdArrowDropup className='product__category__options-arrow' />
                                </div>
                            </div>
                            <div className="product__suppliers product__category" id='product__supplier' ref={employeeSelectionRef} onClick={() => setShowEmployees(!showEmployees)}>
                                <span>{String(productSupplier.supplierName).toUpperCase()}</span>
                                <IoMdArrowDropdown style={{ display: showEmployees == false ? 'flex' : 'none' }} className='product__category-icon' />
                                <IoMdArrowDropup style={{ display: showEmployees == true ? 'flex' : 'none' }} className='product__category-icon' />
                                <div className="product__suppliers__options product__category__options" style={{ display: showEmployees == true ? 'flex' : 'none' }}>
                                    {suppliers.map((supplier, index) =>
                                        <p onClick={() => setProductSupplier(supplier)} key={index}>{supplier.supplierName.toUpperCase()}</p>
                                    )}
                                    <IoMdArrowDropup className='product__category__options-arrow' />
                                </div>
                            </div>
                            <div className="product__vl"></div>
                            <input type="number" name="" id="product__sellprice" className="product__sellprice create-products__input" placeholder='Sell Price' onChange={(e) => setSellPrice(e.target.value)} value={sellPrice} />
                            <textarea name="product__description" id="product__description" className='create-products__input product__description' placeholder='Product Description' onChange={(e) => setProductDesc(e.target.value)}>{productDesc}</textarea>
                        </form>
                        <button className="button  create-products__button">{option == 0 ? "Create Product" : option == 1 ? "Update Product" : ''}</button>
                    </div>
                </div>
                :
                <img src={Loading} className='create-products__loading' />
            }
        </>
    )
}

export default CreateProducts
