import React, { useEffect, useRef, useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp, IoMdArrowDropdown } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { IoMdArrowDropup } from "react-icons/io";
import './NewOrder.css';
import { FaPlus } from "react-icons/fa6";
import { MdRemove } from "react-icons/md";
import axios from 'axios';
import { useSelector } from 'react-redux';
import Loading from '../../assets/images/loading.svg';

function NewOrder({ handleOpenWindow, closeWindow, item, option, id, showToastMessage, setReload, orderTypeParam }) {

    const orderTypeRef = useRef(null);
    const orderStatusRef = useRef(null);
    const employeeSelectionRef = useRef(null);
    const suppliersDivRef = useRef(null);
    const productsDivRef = useRef(null);

    const apiUrl = useSelector((state) => state.MiscReducer.apiUrl);
    const apiPort = useSelector((state) => state.MiscReducer.apiPort);
    const userInfo = useSelector((state) => state.UserReducer);

    const [price, setPrice] = useState(item ? item.price : 0)
    const [search, setSearch] = useState("");
    const [description, setDescription] = useState(item ? item.description : '');
    const [showOrderTypes, setShowOrderTypes] = useState(false)
    const [showEmployees, setShowEmployees] = useState(false)
    const [showOrderStatus, setShowOrderStatus] = useState(false)
    const [orderStatus, setOrderStatus] = useState(item ? item.status : 'finished')
    const [suppliersLoading, setSuppliersLoading] = useState(false);
    const [productsLoading, setProductsLoading] = useState(false);
    const [orderSupplier, setOrderSupplier] = useState(item ? item.orderSupplier : '');
    const [choosedProducts, setChoosedProducts] = useState(item ? item.products.map(i => { return { product: i.product._id, quantity: i.quantity } }) : []);
    const [suppliers, setSuppliers] = useState([]);
    const [hasMoreProducts, setHasMoreProducts] = useState(false);
    const [products, setProducts] = useState([]);
    const [orderType, setOrderType] = useState(orderTypeParam == null ? "buy" : orderTypeParam);
    const [suppliersPage, setSuppliersPage] = useState(1);
    const [productsPage, setProductsPage] = useState(1);
    const [isHovered, setIsHovered] = useState(false);
    const [limit, setLimit] = useState(5);
    const [reqError, setReqError] = useState("");
    const [pageIsLoad, setPageIsLoad] = useState([])

    const handleDecreaseProduct = (index) => {
        const productsArr = [...products]
        if (productsArr[index].quantity > 0) {
            const choosedProductsArr = [...choosedProducts];
            const choosedProductArr = choosedProductsArr.find(choosedPro => choosedPro.product == productsArr[index]._id);

            if (choosedProductArr != undefined) {
                if (choosedProductArr.quantity - 1 == 0) {
                    const choosedProductIndex = choosedProductsArr.indexOf(choosedProductArr);
                    const removedChoosedProductsArr = choosedProductsArr.splice(choosedProductIndex, 1);
                    setChoosedProducts(choosedProductsArr);
                } else {
                    const choosedProductIndex = choosedProductsArr.indexOf(choosedProductArr);
                    choosedProductsArr[choosedProductIndex].quantity -= 1;
                    setChoosedProducts(choosedProductsArr);
                }
            }

            if (orderType == "buy") {
                if (price >= 0) {
                    if (parseFloat(price) - productsArr[index].sellPrice > 0) {
                        setPrice(prev => {
                            const newPrice = parseFloat(productsArr[index].sellPrice);
                            const updatedPrice = prev - newPrice;
                            return parseFloat(updatedPrice.toFixed(2));
                        })
                    } else {
                        setPrice(0);
                    }
                } else {
                    setPrice(0);
                }
            }

            if (orderType == "sale") {
                if (price >= 0) {
                    if (parseFloat(price) - productsArr[index].sellPrice > 0) {
                        setPrice(prev => {
                            const newPrice = parseFloat(productsArr[index].sellPrice);
                            const updatedPrice = prev - (newPrice * 1.2);
                            return parseFloat(updatedPrice.toFixed(2));
                        })
                    } else {
                        setPrice(0);
                    }
                } else {
                    setPrice(0);
                }
            }


            productsArr[index].quantity -= 1;
            setProducts(productsArr);
        }
    }

    const handleIncreaseProduct = (index) => {
        const productsArr = [...products]

        const choosedProductsArr = [...choosedProducts];
        const choosedProductArr = choosedProductsArr.find(choosedPro => choosedPro.product == productsArr[index]._id);
        if (choosedProductArr != undefined) {
            const choosedProductIndex = choosedProductsArr.indexOf(choosedProductArr);
            choosedProductsArr[choosedProductIndex].quantity += 1;
            setChoosedProducts(choosedProductsArr);
        } else {
            choosedProductsArr.push({ product: productsArr[index]._id, quantity: 1 });
            setChoosedProducts(choosedProductsArr);
        }

        if (orderType == "buy") {
            if (price >= 0) {
                setPrice(prev => {
                    const newPrice = parseFloat(productsArr[index].sellPrice);
                    const updatedPrice = prev + newPrice;
                    return parseFloat(updatedPrice.toFixed(2));
                })
            } else {
                setPrice(prev => {
                    const newPrice = parseFloat(productsArr[index].sellPrice);
                    return parseFloat(newPrice.toFixed(2));
                })
            }
        }

        if (orderType == "sale") {
            if (price >= 0) {
                setPrice(prev => {
                    const newPrice = parseFloat(productsArr[index].sellPrice);
                    const updatedPrice = prev + (newPrice * 1.2);
                    return parseFloat(updatedPrice.toFixed(2));
                })
            } else {
                setPrice(prev => {
                    const newPrice = parseFloat(productsArr[index].sellPrice);
                    return parseFloat((newPrice * 1.2).toFixed(2));
                })
            }
        }

        productsArr[index].quantity += 1;
        setProducts(productsArr);
    }

    const handleSearch = (e) => {
        e.preventDefault();
        setProductsPage(1);
        handleGetProducts(1, true);
    }

    const handleGetSuppliers = () => {
        if (suppliersLoading) return; // Avoid multiple requests

        setSuppliersLoading(true)

        const headers = {
            'Authorization': `Bearer ${userInfo.token}`
        }

        const filteringObj = {
            page: suppliersPage,
            limit
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
                if (orderSupplier && orderSupplier._id) {
                    const selectedSupplier = newSuppliers.find((elem => elem._id === orderSupplier._id))
                    if (selectedSupplier) {
                        setOrderSupplier(selectedSupplier)
                    }
                } else {
                    setOrderSupplier(newSuppliers[0])
                }

                setSuppliersLoading(false)
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const handleGetProducts = (page, reload) => {
        if (productsLoading) return; // Avoid multiple requests

        setProductsLoading(true)

        const headers = {
            'Authorization': `Bearer ${userInfo.token}`
        }

        const filteringObj = {
            search: search,
            page: page == undefined ? productsPage : page,
            limit
        }

        const url = new URL(`${apiUrl}:${apiPort}/product/`);
        url.search = new URLSearchParams(filteringObj);

        axios.get(`${url}`, ({
            headers
        }))
            .then((data) => {
                const productsData = data.data.productsData;

                let newProducts = [];

                for (let i = 0; i < productsData.length; i++) {
                    let newProduct;
                    if (item) {
                        newProduct = item.products.find((choosedProduct => choosedProduct.product._id == productsData[i]._id))
                    }
                    if (newProduct == undefined) {
                        productsData[i].quantity = 0;
                        newProducts.push(productsData[i]);
                    } else {
                        productsData[i].quantity = newProduct.quantity;
                        newProducts.push(productsData[i]);
                    }
                }
                setPageIsLoad(prevPageIsLoad => {
                    if (prevPageIsLoad.indexOf("product") == -1) {
                        return [...prevPageIsLoad, 'product']
                    } else {
                        return [...prevPageIsLoad]
                    }
                });

                if (reload) {
                    setProducts(newProducts)
                } else {
                    setProducts(prevProducts => {
                        const uniqueProducts = newProducts.filter(product =>
                            !prevProducts.some(prev => prev._id === product._id)
                        );
                        return [...prevProducts, ...uniqueProducts]
                    });
                }

                if (Math.ceil(data.data.totalProducts / limit) == productsPage) {
                    setHasMoreProducts(false);
                } else {
                    setHasMoreProducts(true);
                }

                setProductsLoading(false)
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const handleScrollSuppliers = () => {
        if (suppliersDivRef.current && !suppliersLoading) {
            const { scrollTop, scrollHeight, clientHeight } = suppliersDivRef.current;
            if (scrollTop + clientHeight >= scrollHeight) {
                // Quando o scroll atinge o fim da div, carrega mais itens
                setSuppliersPage(prevPage => prevPage + 1);
            }
        }
    };

    const handleScrollProducts = () => {
        if (productsDivRef.current && !productsLoading) {
            const { scrollTop, scrollHeight, clientHeight } = productsDivRef.current;
            if ((scrollTop + clientHeight >= scrollHeight) && hasMoreProducts) {
                // Quando o scroll atinge o fim da div, carrega mais itens
                setProductsPage(prevPage => prevPage + 1);
            }
        }
    };

    const handleCreateOrder = () => {

        setReqError(<img src={Loading} />);

        const headers = {
            'Authorization': `Bearer ${userInfo.token}`
        }

        const data = {
            type: orderType,
            price,
            status: orderStatus,
            orderSupplier,
            description,
            products: choosedProducts
        }

        axios.post(`${apiUrl}:${apiPort}/order/add`, data, {
            headers
        })
            .then((data) => {
                console.log(data);
                showToastMessage('success', 'Order Created Successfully');
                setReload();
                closeWindow();
            })
            .catch((err) => {
                console.log(err);
                setReqError(err.response.data.error);
            })
    }

    const handleUpdateOrder = () => {

        setReqError(<img src={Loading} />);

        const headers = {
            'Authorization': `Bearer ${userInfo.token}`
        }


        console.log(choosedProducts);
        const data = {
            type: orderType,
            price,
            status: orderStatus,
            orderSupplier,
            description,
            products: choosedProducts
        }

        axios.put(`${apiUrl}:${apiPort}/order/update/${id}`, data, {
            headers
        })
            .then((data) => {
                console.log(data);
                showToastMessage('success', 'Order Updated Successfully');
                setReload();
                closeWindow();
            })
            .catch((err) => {
                console.log(err);
                setReqError(err.response.data.error);
            })
    }

    const handleChangePrice = (e) => {
        const newPrice = parseFloat(e.target.value);
        setPrice(newPrice);
    }

    useEffect(() => {
        /* CLOSE WINDOW WHEN CLICK OUTSIDE */
        const handleClickOutside = (event) => {
            if (orderTypeRef.current && !orderTypeRef.current.contains(event.target)) {
                setShowOrderTypes(false)
            }

            if (orderStatusRef.current && !orderStatusRef.current.contains(event.target)) {
                setShowOrderStatus(false)
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

    useEffect(() => {
        handleGetSuppliers();
    }, [suppliersPage])

    useEffect(() => {
        handleGetProducts();
    }, [productsPage])


    return (
        <>
            {((pageIsLoad[0] === 'product' && pageIsLoad[1] === 'supplier') || (pageIsLoad[0] === 'supplier' && pageIsLoad[1] === 'product')) ?
                <div className='new-order new-item'>
                    <div className="new-type__first-row">
                        <h4>{option == 0 ? "New" : option == 1 ? "Update" : ""} Order</h4>
                        <IoMdClose className='new-type__close' onClick={closeWindow} />
                    </div>
                    <div className={"new-order__type new-item__type" + ' ' + (orderType == 'buy' ? 'new-order__type--buy' : 'new-order__type--sale')} ref={orderTypeRef} style={{ cursor: option == 1 && "initial" }} onClick={() => option == 0 ? setShowOrderTypes(!showOrderTypes) : ""}>
                        <p>{orderType == 'sale' ? (<>SALE</>) : (<>BUY</>)}</p>
                        {option == 0 &&
                            <>
                                <IoIosArrowDown style={{ display: showOrderTypes == false ? 'inline-block' : 'none' }} />
                                <IoIosArrowUp style={{ display: showOrderTypes == true ? 'inline-block' : 'none' }} />
                            </>
                        }
                        <div className="new-order__type-selection" style={{ display: showOrderTypes == true ? 'flex' : 'none' }} >
                            <p className='new-order__type-selection__buy' onClick={() => setOrderType('buy')}>BUY</p>
                            <IoMdArrowDropup className='new-order__type-arrow' style={{ display: showOrderTypes == true ? 'flex' : 'none' }} />
                            <p className='new-order__type-selection__sale' onClick={() => setOrderType('sale')}>SALE</p>
                        </div>
                    </div>


                    <div className="new-order__container new-type__container">
                        <div className="new-order__form new-type__form">
                            <div className="new-order__buyprice new-type__inputbox" id='new-type__input1'>
                                <span>{orderType == 'buy' ? 'Buy Price' : 'Sale Price'}</span>
                                <input type="number" className='new-type__inputbox__input' value={price} onChange={(e) => handleChangePrice(e)} />
                            </div>
                            <div className="new-order__buyprice new-type__inputbox" id='new-type__input2'>
                                <span>Status</span>
                                <div className="new-order__status" ref={orderStatusRef} onClick={() => setShowOrderStatus(!showOrderStatus)}>
                                    <span>{orderStatus == "finished" ? "Finished" : orderStatus == "in progress" ? "In Progress" : orderStatus == "cancelled" ? "Cancelled" : ""}</span>
                                    <IoMdArrowDropdown style={{ display: showOrderStatus == true ? 'none' : 'inline-block' }} className='new-order__status__arr' />
                                    <IoMdArrowDropup style={{ display: showOrderStatus == false ? 'none' : 'inline-block' }} className='new-order__status__arr' />
                                    <div className="new-order__status-selection" style={{ display: showOrderStatus == true ? 'flex' : 'none' }} >
                                        <p onClick={() => setOrderStatus('finished')}>Finished</p>
                                        <p onClick={() => setOrderStatus('in progress')}>In Progress</p>
                                        <p onClick={() => setOrderStatus('cancelled')}>Cancelled</p>
                                        <IoMdArrowDropup className='new-order__status__arrow' style={{ display: showOrderStatus == true ? 'flex' : 'none' }} />
                                    </div>
                                </div>
                            </div>
                            <div className="new-order__buyprice new-type__inputbox" id='new-type__input3'>
                                <span>Supplier</span>
                                <div className="new-order__status new-order__employee" ref={employeeSelectionRef} onClick={() => setShowEmployees(!showEmployees)}>
                                    {orderSupplier == null
                                        ?
                                        <>
                                            <span>No Suppliers</span>
                                        </>
                                        :
                                        <>
                                            <span>{String(orderSupplier.supplierName).toUpperCase()}</span>
                                            <IoMdArrowDropdown style={{ display: showEmployees == true ? 'none' : 'inline-block' }} className='new-order__status__arr' />
                                            <IoMdArrowDropup style={{ display: showEmployees == false ? 'none' : 'inline-block' }} className='new-order__status__arr' />
                                            <div className="new-order__status-selection" style={{ display: showEmployees == true ? 'flex' : 'none' }} >
                                                <div className="order-supplier__options-scroll" ref={suppliersDivRef} onScroll={handleScrollSuppliers}>
                                                    {suppliers.map((supplier, index) =>
                                                        <p onClick={() => setOrderSupplier(supplier)} key={index} onMouseEnter={() => index === 0 && setIsHovered(true)} onMouseLeave={() => index === 0 && setIsHovered(false)}>{String(supplier.supplierName).toUpperCase()}</p>
                                                    )}
                                                    {suppliersLoading == true &&
                                                        <p className='product__category__options-scroll__loading' ><img src={Loading} /></p>
                                                    }
                                                </div>
                                                <IoMdArrowDropup className='new-order__status__arrow' style={{ color: isHovered ? 'rgb(219, 219, 219)' : 'rgba(88, 88, 88, 0.1)' }} />
                                            </div>
                                        </>
                                    }
                                </div>
                            </div>
                            <div className="new-order__buyprice__textarea new-type__inputbox" id='new-type__input4'>
                                <span>Description</span>
                                <textarea className='new-type__inputbox__input' onChange={(e) => setDescription(e.target.value)}>{description}</textarea >
                            </div>
                        </div>
                        <div className="new-type__vl"></div>
                        <div className="new-type__products">
                            <div className="new-type__header">
                                <h4>Products</h4>
                                <div className="new-type__header--right">
                                    <form onSubmit={(e) => handleSearch(e)}>
                                        <input type="text" className='order__search-products' name="order__search-products" id="order__search-products" onChange={(e) => setSearch(e.target.value)} value={search} placeholder='Search:' />
                                    </form>
                                    <div className="new-type__add" onClick={() => handleOpenWindow('create-products', '', 0, '')}>
                                        <FaPlus />
                                    </div>
                                </div>
                            </div>
                            <div className="new-type__products__list" ref={productsDivRef} onScroll={handleScrollProducts}>
                                {products.length > 0 ?
                                    <>
                                        {products.map((product, index) => (
                                            <div className="new-type__products-item" key={product._id} id={product._id}>
                                                <img src={`${apiUrl}:${apiPort}/assets/${product.picturePath}`} alt="product-img" className='new-type__product-img' />
                                                <p className='new-type__product-name'>{product.productName.length > 50 ? product.productName.slice(0, 50) + "..." : product.productName}</p>
                                                <p className='new-type__product-qnt'>{product.quantity}</p>
                                                <div className="new-type__product-remove new-type__product-button" onClick={() => handleDecreaseProduct(index)}>
                                                    <MdRemove />
                                                </div>
                                                <div className="new-type__product-add new-type__product-button" onClick={() => handleIncreaseProduct(index)}>
                                                    <FaPlus />
                                                </div>
                                            </div>
                                        ))}
                                        {productsLoading && <img src={Loading} className='new-type__product__loading' />}
                                    </>
                                    :
                                    <div className='products-warning'>
                                        No Products
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="create-products__error">
                        {reqError == '' ? '' : reqError}
                    </div>
                    <div className="button new-order__button new-type__button" onClick={() => { option == 0 ? handleCreateOrder() : option == 1 ? handleUpdateOrder() : "" }}>{option == 0 ? "Add" : option == 1 ? "Update" : ""} Order</div>
                </div >
                :
                <img src={Loading} className='create-products__loading' />
            }
        </>
    )
}

export default NewOrder
