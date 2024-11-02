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

    const apiUrl = useSelector((state) => state.MiscReducer.apiUrl);
    const apiPort = useSelector((state) => state.MiscReducer.apiPort);
    const userInfo = useSelector((state) => state.UserReducer);

    const [productName, setProductName] = useState(option == 1 ? item.productName : '');
    const [description, setDescription] = useState(option == 1 ? item.description : '');
    const [productCategory, setProductCategory] = useState(option == 1 ? item.productCategory : null);
    const [productSupplier, setProductSupplier] = useState(option == 1 ? item.productSupplier : null);
    const [sellPrice, setSellPrice] = useState(option == 1 ? item.sellPrice : '');
    const [picturePath, setPicturePath] = useState(option == 1 ? item.picturePath : '');
    const [picture, setPicture] = useState()

    const [pageIsLoad, setPageIsLoad] = useState([])
    const [categories, setCategories] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [isHovered, setIsHovered] = useState(false);

    const [showCategories, setShowCategories] = useState(false);
    const [showEmployees, setShowEmployees] = useState(false);
    const [categoriesLoading, setCategoriesLoading] = useState(false);
    const [suppliersLoading, setSuppliersLoading] = useState(false);
    const [categoriesPage, setCategoriesPage] = useState(1);
    const [suppliersPage, setSuppliersPage] = useState(1);
    const [reqError, setReqError] = useState("");

    const categorySelectionRef = useRef(null);
    const employeeSelectionRef = useRef(null);
    const suppliersDivRef = useRef(null);
    const categoriesDivRef = useRef(null);

    const [picturePreview, setPicturePreview] = useState(picturePath != '' ? `${apiUrl}:${apiPort}/assets/${picturePath}` : ProductImg);

    const handleEditProduct = () => {
        document.getElementById('product__img').click();
    }

    const handleGetCategories = () => {
        if (categoriesLoading) return; // Avoid multiple requests

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
                const newCategories = data.data.categoriesData;

                setCategories(prevCategories => {

                    const uniqueCategories = newCategories.filter(category =>
                        !prevCategories.some(prev => prev._id === category._id)
                    );
                    return [...prevCategories, ...uniqueCategories]
                });
                setPageIsLoad(prevPageIsLoad => {
                    if (prevPageIsLoad.indexOf("category") == -1) {
                        return [...prevPageIsLoad, 'category']
                    } else {
                        return [...prevPageIsLoad]
                    }
                });
                if (productCategory && productCategory._id) {
                    const selectedCategory = newCategories.find((elem => elem._id === productCategory._id))
                    if (selectedCategory) {
                        setProductCategory(selectedCategory)
                    }
                } else {
                    setProductCategory(newCategories[0])
                }
                setCategoriesLoading(false)
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const handleGetSuppliers = () => {
        if (suppliersLoading) return; // Avoid multiple requests

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
                const newSuppliers = data.data.suppliersData;

                setSuppliers(prevSuppliers => {

                    const uniqueSuppliers = newSuppliers.filter(supplier =>
                        !prevSuppliers.some(prev => prev._id === supplier._id)
                    );
                    return [...prevSuppliers, ...uniqueSuppliers]
                });
                setPageIsLoad(prevPageIsLoad => {
                    if (prevPageIsLoad.indexOf("supplier") == -1) {
                        return [...prevPageIsLoad, 'supplier']
                    } else {
                        return [...prevPageIsLoad]
                    }
                });
                if (productSupplier && productSupplier._id) {
                    const selectedSupplier = newSuppliers.find((elem => elem._id === productSupplier._id))
                    if (selectedSupplier) {
                        setProductSupplier(selectedSupplier)
                    }
                } else {
                    setProductSupplier(newSuppliers[0])
                }

                setSuppliersLoading(false)
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const handlePreviewImage = (e) => {
        const inputTarget = e.target;
        const file = inputTarget.files[0];

        let fileType = file.name.split('.');
        fileType = fileType[fileType.length - 1]
        const fileSize = (file.size / 1024);

        console.log(fileType);

        const supportedFiles = ['jpeg', 'png', 'jpg'];

        if (file && fileSize < 2048 && supportedFiles.includes(fileType)) {
            const reader = new FileReader();

            reader.addEventListener('load', (e) => {
                const readerTarget = e.target;
                setPicturePreview(readerTarget.result);
                setPicture(file);
            })

            reader.readAsDataURL(file);
        }
    }

    const handleCreateProduct = async (e, values) => {
        e.preventDefault();

        setReqError(<img src={Loading} />);

        const headers = {
            'Authorization': `Bearer ${userInfo.token}`
        }


        if (productCategory == undefined) {
            setReqError("Please Select a Category");
        } else if (productSupplier == undefined) {
            setReqError("Please Select a Supplier");
        } else {

            const formData = new FormData();
            for (let value in values) {
                formData.append(value, values[value]);
            }

            formData.append("productSupplier", productSupplier._id);
            formData.append("productCategory", productCategory._id);

            axios.post(`${apiUrl}:${apiPort}/product/add`, formData, {
                headers
            })
                .then((data) => {
                    console.log(data);
                    showToastMessage('success', 'Product Created Successfully');
                    setReload();
                    closeWindow();
                })
                .catch((err) => {
                    console.log(err);
                    setReqError(err.response.data.error);
                })
        }
    }

    const handleUpdateProduct = async (e, values) => {
        e.preventDefault();

        setReqError(<img src={Loading} />);

        const headers = {
            'Authorization': `Bearer ${userInfo.token}`
        }

        const formData = new FormData();
        for (let value in values) {
            formData.append(value, values[value]);
        }

        formData.append("productSupplier", productSupplier._id);
        formData.append("productCategory", productCategory._id);

        axios.put(`${apiUrl}:${apiPort}/product/update/${id}`, formData, {
            headers
        })
            .then((data) => {
                console.log(data);
                showToastMessage('success', 'Product Updated Successfully');
                setReload();
                closeWindow();
            })
            .catch((err) => {
                console.log(err);
                setReqError(err.response.data.error);
            })
    }

    useEffect(() => {
        handleGetCategories();
    }, [categoriesPage])

    useEffect(() => {
        handleGetSuppliers();
    }, [suppliersPage])

    const handleScrollCategories = () => {
        if (categoriesDivRef.current && !categoriesLoading) {
            const { scrollTop, scrollHeight, clientHeight } = categoriesDivRef.current;
            if (scrollTop + clientHeight >= scrollHeight) {
                // Quando o scroll atinge o fim da div, carrega mais itens
                setCategoriesPage(prevPage => prevPage + 1);
            }
        }
    };

    const handleScrollSuppliers = () => {
        if (suppliersDivRef.current && !suppliersLoading) {
            const { scrollTop, scrollHeight, clientHeight } = suppliersDivRef.current;
            if (scrollTop + clientHeight >= scrollHeight) {
                // Quando o scroll atinge o fim da div, carrega mais itens
                setSuppliersPage(prevPage => prevPage + 1);
            }
        }
    };

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
            {((pageIsLoad[0] === 'category' && pageIsLoad[1] === 'supplier') || (pageIsLoad[0] === 'supplier' && pageIsLoad[1] === 'category')) ?
                <div className="create-products" >
                    <div className="create-products__container">
                        <div className="create-products__close">
                            <IoClose onClick={closeWindow} />
                        </div>
                        <h2>{option == 0 ? 'Create Product' : option == 1 ? `Update Product` : ''}</h2>
                        <div className="create-products__img-box">
                            <img src={picturePreview} alt="" className="create-products__img" />
                            <FaRegEdit className='create-products__changeimg' onClick={handleEditProduct} />
                            <input type="file" name="product__img" id="product__img" className='create-products__img-input' onChange={(e) => handlePreviewImage(e)} />
                        </div>
                        <form className="create-products__form" onSubmit={(e) => option == 0 ? handleCreateProduct(e, { productName, sellPrice, description, picture }) : option == 1 ? handleUpdateProduct(e, { productName, sellPrice, description, picture }) : ''}>
                            <input type="text" name="product__name" id="product__name" className="create-products__input product__name" placeholder='Product Name:' onChange={(e) => setProductName(e.target.value)} value={productName} />
                            <div className="product__category" id='product__category' ref={categorySelectionRef} onClick={() => setShowCategories(!showCategories)}>
                                {productCategory == null
                                    ?
                                    <>
                                        <span>No Categories</span>
                                    </>
                                    :
                                    <>
                                        <span>{String(productCategory.categoryName).toUpperCase()}</span>
                                        <IoMdArrowDropdown style={{ display: showCategories == false ? 'flex' : 'none' }} className='product__category-icon' />
                                        <IoMdArrowDropup style={{ display: showCategories == true ? 'flex' : 'none' }} className='product__category-icon' />
                                        <div className="product__category__options" style={{ display: showCategories == true ? 'flex' : 'none' }}>
                                            <div className="product__category__options-scroll" ref={categoriesDivRef} onScroll={handleScrollCategories}>
                                                {categories.map((category, index) =>
                                                    <p onClick={() => setProductCategory(category)} key={index} onMouseEnter={() => index === 0 && setIsHovered(true)} onMouseLeave={() => index === 0 && setIsHovered(false)}>{category.categoryName.toUpperCase()}</p>
                                                )}
                                                {categoriesLoading == true &&
                                                    <p className='product__category__options-scroll__loading'><img src={Loading} /></p>
                                                }
                                            </div>
                                            <IoMdArrowDropup className='product__category__options-arrow' style={{ color: isHovered ? 'rgb(219, 219, 219)' : 'rgba(88, 88, 88, 0.1)' }} />
                                        </div>
                                    </>
                                }
                            </div>
                            <div className="product__suppliers product__category" id='product__supplier' ref={employeeSelectionRef} onClick={() => setShowEmployees(!showEmployees)}>
                                {productSupplier == null
                                    ?
                                    <>
                                        <span>No Suppliers</span>
                                    </>
                                    :
                                    <>
                                        <span>{String(productSupplier.supplierName).toUpperCase()}</span>
                                        <IoMdArrowDropdown style={{ display: showEmployees == false ? 'flex' : 'none' }} className='product__category-icon' />
                                        <IoMdArrowDropup style={{ display: showEmployees == true ? 'flex' : 'none' }} className='product__category-icon' />
                                        <div className="product__suppliers__options product__category__options" style={{ display: showEmployees == true ? 'flex' : 'none' }}>
                                            <div className="product__category__options-scroll" ref={suppliersDivRef} onScroll={handleScrollSuppliers}>
                                                {suppliers.map((supplier, index) =>
                                                    <p onClick={() => setProductSupplier(supplier)} key={index} onMouseEnter={() => index === 0 && setIsHovered(true)} onMouseLeave={() => index === 0 && setIsHovered(false)} >{supplier.supplierName.toUpperCase()}</p>
                                                )}
                                                {suppliersLoading == true &&
                                                    <p className='product__category__options-scroll__loading' ><img src={Loading} /></p>
                                                }
                                            </div>
                                            <IoMdArrowDropup className='product__category__options-arrow' style={{ color: isHovered ? 'rgb(219, 219, 219)' : 'rgba(88, 88, 88, 0.1)' }} />
                                        </div>
                                    </>
                                }
                            </div>
                            <div className="product__vl"></div>
                            <input type="number" name="" id="product__sellprice" className="product__sellprice create-products__input" placeholder='Sell Price' onChange={(e) => setSellPrice(e.target.value)} value={sellPrice} />
                            <textarea name="product__description" id="product__description" className='create-products__input product__description' placeholder='Product Description' onChange={(e) => setDescription(e.target.value)}>{description}</textarea>
                        </form>
                        <div className="create-products__error">
                            {reqError == '' ? '' : reqError}
                        </div>
                        <button className="button  create-products__button" onClick={(e) => option == 0 ? handleCreateProduct(e, { productName, sellPrice, description, picture }) : option == 1 ? handleUpdateProduct(e, { productName, sellPrice, description, picture }) : ''}>{option == 0 ? "Create Product" : option == 1 ? "Update Product" : ''}</button>
                    </div>
                </div>
                :
                <img src={Loading} className='create-products__loading' />
            }
        </>
    )
}

export default CreateProducts
