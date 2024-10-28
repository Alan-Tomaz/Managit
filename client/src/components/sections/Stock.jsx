import React, { useEffect, useState } from 'react'
import './Stock.css';
import ItemsCard from '../cards/ItemsCard';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import DoughnutChartCard from '../cards/DoughnutChartCard';
import { useSelector } from 'react-redux';
import Loading from '../../assets/images/loading.svg';
import axios from 'axios';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

function Stock({ handleOpenWindow, handleRemoveItem, reload }) {

    const apiUrl = useSelector((state) => state.MiscReducer.apiUrl);
    const apiPort = useSelector((state) => state.MiscReducer.apiPort);

    const userInfo = useSelector((state) => state.UserReducer);

    const colors = ["rgba(0, 43, 73, 1)", "rgba(0, 103, 160, 1)", "rgba(83, 217, 217, 1)"];
    const colors1 = ["rgb(153, 61 ,78)", "rgb(224, 202, 8)", "rgb(83, 101, 132)"];
    const colors2 = ["rgb(44, 42, 163)", "rgb(244, 112, 141)", "rgb(77, 155, 116)"];
    const colors3 = ["rgb(242, 133, 50)", "rgb(149, 216, 195)", "rgb(106, 186, 127)"];

    const [categories, setCategories] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [productsCategory, setProductsCategory] = useState([]);
    const [productsSupplier, setProductsSupplier] = useState([]);
    const [productsSupplierStock, setProductsSupplierStock] = useState([]);
    const [productsCategoryStock, setProductsCategoryStock] = useState([]);

    const handleGetCategories = () => {

        const headers = {
            'Authorization': `Bearer ${userInfo.token}`
        }

        const filteringObj = {
            page: 1,
            limit: 100
        }

        const url = new URL(`${apiUrl}:${apiPort}/category/`);
        url.search = new URLSearchParams(filteringObj)

        axios.get(`${url}`, ({
            headers
        }))
            .then((data) => {

                setCategories(data.data.categoriesData);

            })
            .catch((err) => {
                console.log(err);
            })
    }
    const handleGetSuppliers = () => {

        const headers = {
            'Authorization': `Bearer ${userInfo.token}`
        }

        const filteringObj = {
            page: 1,
            limit: 100
        }


        const url = new URL(`${apiUrl}:${apiPort}/supplier/`);
        url.search = new URLSearchParams(filteringObj)

        axios.get(`${url}`, ({
            headers
        }))
            .then((data) => {

                setSuppliers(data.data.suppliersData);

            })
            .catch((err) => {
                console.log(err);
            })
    }

    const handleGetCategoryProducts = (categoriesData) => {

        const headers = {
            'Authorization': `Bearer ${userInfo.token}`
        }

        for (let i = 0; i < categoriesData.length; i++) {

            const existingCategory = productsCategory.some(itemCategory => itemCategory.category === categoriesData[i].categoryName);


            if (!existingCategory) {
                const productCategoriesObj = {
                    category: categoriesData[i].categoryName,
                    id: categoriesData[i]._id,
                    categoryData: []
                }

                const filteringObj = {
                    page: 1,
                    limit: 100,
                    searchBy: "category",
                    id: categoriesData[i]._id
                }


                const url = new URL(`${apiUrl}:${apiPort}/product/`);
                url.search = new URLSearchParams(filteringObj)

                axios.get(`${url}`, ({
                    headers
                }))
                    .then((data) => {
                        if (data.data.productsData.length > 0) {
                            productCategoriesObj.categoryData = data.data.productsData;
                            setProductsCategory(prev =>
                                prev.some(item => item.category === categoriesData[i].categoryName)
                                    ? prev
                                    : [...prev, productCategoriesObj]
                            );

                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            }
        }
    }

    const handleGetCategoryProductsStock = (categoriesData) => {

        const headers = {
            'Authorization': `Bearer ${userInfo.token}`
        }

        for (let i = 0; i < categoriesData.length; i++) {

            const existingCategoryStock = productsCategoryStock.some(itemCategory => itemCategory.category === categoriesData[i].categoryName);


            if (!existingCategoryStock) {
                const productCategoriesStockObj = {
                    category: categoriesData[i].categoryName,
                    id: categoriesData[i]._id,
                    categoryData: [],
                    quantity: 0
                }

                const filteringObj = {
                    page: 1,
                    limit: 100,
                    searchBy: "stock-category",
                    id: categoriesData[i]._id
                }


                const url = new URL(`${apiUrl}:${apiPort}/product/`);
                url.search = new URLSearchParams(filteringObj)

                axios.get(`${url}`, ({
                    headers
                }))
                    .then((data) => {
                        if (data.data.productsData.length > 0) {
                            productCategoriesStockObj.categoryData = data.data.productsData;
                            for (let j = 0; j < data.data.productsData.length; j++) {
                                productCategoriesStockObj.quantity += data.data.productsData[j].stock;
                            }
                            setProductsCategoryStock(prev =>
                                prev.some(item => item.category === categoriesData[i].categoryName)
                                    ? prev
                                    : [...prev, productCategoriesStockObj]
                            );

                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            }
        }
    }

    const handleGetSupplierProducts = (suppliersData) => {

        const headers = {
            'Authorization': `Bearer ${userInfo.token}`
        }

        for (let i = 0; i < suppliersData.length; i++) {

            const existingSupplier = productsSupplier.some(itemSupplier => itemSupplier.supplier === suppliersData[i].supplierName);

            if (!existingSupplier) {

                const productsSuppliersObj = {
                    supplier: suppliersData[i].supplierName,
                    id: suppliersData[i]._id,
                    supplierData: []
                }

                const filteringObj = {
                    page: 1,
                    limit: 100,
                    searchBy: "supplier",
                    id: suppliersData[i]._id
                }


                const url = new URL(`${apiUrl}:${apiPort}/product/`);
                url.search = new URLSearchParams(filteringObj)

                axios.get(`${url}`, ({
                    headers
                }))
                    .then((data) => {
                        if (data.data.productsData.length > 0) {
                            productsSuppliersObj.supplierData = data.data.productsData;
                            setProductsSupplier(prev =>
                                prev.some(item => item.supplier === suppliersData[i].supplierName)
                                    ? prev
                                    : [...prev, productsSuppliersObj]
                            );
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            }
        }
    }

    const handleGetSupplierProductsStock = (suppliersData) => {

        const headers = {
            'Authorization': `Bearer ${userInfo.token}`
        }

        for (let i = 0; i < suppliersData.length; i++) {

            const existingSupplierStock = productsSupplierStock.some(itemSupplier => itemSupplier.supplier === suppliersData[i].supplierName);


            if (!existingSupplierStock) {
                const productsSuppliersStockObj = {
                    supplier: suppliersData[i].supplierName,
                    id: suppliersData[i]._id,
                    supplierData: [],
                    quantity: 0
                }

                const filteringObj = {
                    page: 1,
                    limit: 100,
                    searchBy: "stock-supplier",
                    id: suppliersData[i]._id
                }


                const url = new URL(`${apiUrl}:${apiPort}/product/`);
                url.search = new URLSearchParams(filteringObj)

                axios.get(`${url}`, ({
                    headers
                }))
                    .then((data) => {
                        if (data.data.productsData.length > 0) {
                            productsSuppliersStockObj.supplierData = data.data.productsData;
                            for (let j = 0; j < data.data.productsData.length; j++) {
                                productsSuppliersStockObj.quantity += data.data.productsData[j].stock;
                            }
                            setProductsSupplierStock(prev =>
                                prev.some(item => item.supplier === suppliersData[i].supplierName)
                                    ? prev
                                    : [...prev, productsSuppliersStockObj]
                            );

                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            }
        }
    }

    function createRGBColor() {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        return `rgb(${r}, ${g}, ${b})`;
    }

    const dataCategory = productsCategory.map((productCategory, index) => {
        return {
            label: productCategory.category,
            value: productCategory.categoryData.length,
            color: colors[index] == undefined ? createRGBColor() : colors[index],
            cutout: "50%",
        }
    })

    const dataCategoryStock = productsCategoryStock.map((productCategory, index) => {
        return {
            label: productCategory.category,
            value: productCategory.quantity,
            color: colors1[index] == undefined ? createRGBColor() : colors1[index],
            cutout: "50%",
        }
    })

    const dataSupplier = productsSupplier.map((productSupplier, index) => {
        return {
            label: productSupplier.supplier,
            value: productSupplier.supplierData.length,
            color: colors2[index] == undefined ? createRGBColor() : colors2[index],
            cutout: "50%",
        }
    })

    const dataSupplierStock = productsSupplierStock.map((productSupplier, index) => {
        return {
            label: productSupplier.supplier,
            value: productSupplier.quantity,
            color: colors3[index] == undefined ? createRGBColor() : colors3[index],
            cutout: "50%",
        }
    })

    const optionsCategory = {
        plugins: {
            legend: {
                position: 'top'
            },
            datalabels: {
                formatter: function (value) {
                    let val = Math.round(value);
                    return new Intl.NumberFormat("tr-TR").format(val); //for number format
                },
                color: "white",
                font: {
                    weight: 'bold',
                    size: 14,
                    family: 'Open Sans',
                }
            },
            responsive: true,
        },
        cutout: dataCategory.map((item) => item.cutout),
    };

    const optionsCategoryStock = {
        plugins: {
            legend: {
                position: 'top'
            },
            datalabels: {
                formatter: function (value) {
                    let val = Math.round(value);
                    return new Intl.NumberFormat("tr-TR").format(val); //for number format
                },
                color: "white",
                font: {
                    weight: 'bold',
                    size: 14,
                    family: 'Open Sans',
                }
            },
            responsive: true,
        },
        cutout: dataCategoryStock.map((item) => item.cutout),
    };

    const optionsSupplier = {
        plugins: {
            legend: {
                position: 'top'
            },
            datalabels: {
                formatter: function (value) {
                    let val = Math.round(value);
                    return new Intl.NumberFormat("tr-TR").format(val); //for number format
                },
                color: "white",
                font: {
                    weight: 'bold',
                    size: 14,
                    family: 'Open Sans',
                }
            },
            responsive: true,
        },
        cutout: dataSupplier.map((item) => item.cutout),
    };

    const optionsSupplierStock = {
        plugins: {
            legend: {
                position: 'top'
            },
            datalabels: {
                formatter: function (value) {
                    let val = Math.round(value);
                    return new Intl.NumberFormat("tr-TR").format(val); //for number format
                },
                color: "white",
                font: {
                    weight: 'bold',
                    size: 14,
                    family: 'Open Sans',
                }
            },
            responsive: true,
        },
        cutout: dataSupplierStock.map((item) => item.cutout),
    };


    const finalDataCategory = {
        labels: dataCategory.map((item) => item.label),
        datasets: [
            {
                data: dataCategory.map((item) => Math.round(item.value)),
                backgroundColor: dataCategory.map((item) => item.color),
                borderColor: dataCategory.map((item) => item.color),
                borderWidth: 1,
                dataVisibility: new Array(dataCategory.length).fill(true),
            },
        ],
    };

    const finalDataCategoryStock = {
        labels: dataCategoryStock.map((item) => item.label),
        datasets: [
            {
                data: dataCategoryStock.map((item) => Math.round(item.value)),
                backgroundColor: dataCategoryStock.map((item) => item.color),
                borderColor: dataCategoryStock.map((item) => item.color),
                borderWidth: 1,
                dataVisibility: new Array(dataCategoryStock.length).fill(true),
            },
        ],
    };

    const finalDataSupplierStock = {
        labels: dataSupplierStock.map((item) => item.label),
        datasets: [
            {
                data: dataSupplierStock.map((item) => Math.round(item.value)),
                backgroundColor: dataSupplierStock.map((item) => item.color),
                borderColor: dataSupplierStock.map((item) => item.color),
                borderWidth: 1,
                dataVisibility: new Array(dataSupplierStock.length).fill(true),
            },
        ],
    };

    const finalDataSupplier = {
        labels: dataSupplier.map((item) => item.label),
        datasets: [
            {
                data: dataSupplier.map((item) => Math.round(item.value)),
                backgroundColor: dataSupplier.map((item) => item.color),
                borderColor: dataSupplier.map((item) => item.color),
                borderWidth: 1,
                dataVisibility: new Array(dataSupplier.length).fill(true),
            },
        ],
    };

    useEffect(() => {
        handleGetCategories();
        handleGetSuppliers();
    }, [])

    useEffect(() => {
        handleGetCategoryProducts(categories)
        handleGetCategoryProductsStock(categories)
    }, [categories])

    useEffect(() => {
        handleGetSupplierProducts(suppliers)
        handleGetSupplierProductsStock(suppliers)
    }, [suppliers])

    /*     useEffect(() => {
            console.log(productsCategory)
            console.log(productsCategoryStock)
            console.log(productsSupplier)
            console.log(productsSupplierStock)
        }, [productsCategory, productsCategoryStock, productsSupplier, productsSupplierStock]) */


    return (
        <>
            {(productsCategory.length > 0 && productsCategoryStock.length > 0 && productsSupplier.length > 0 && productsSupplierStock.length > 0)
                ?
                <>
                    <div className="card card--sm doughnut-chart__info">
                        <h3>Product Info (Per Supplier)</h3>
                        <DoughnutChartCard options={optionsSupplier} finalData={finalDataSupplier} />
                    </div>
                    <div className="card card--sm doughnut-chart__info">
                        <h3>Stock Info (Per Supplier)</h3>
                        <DoughnutChartCard options={optionsSupplierStock} finalData={finalDataSupplierStock} />
                    </div>
                    {/*  <div className="card card--xsm stock-info__card">
                <div className="stock-info__range">
                    <FaBoxOpen />
                </div>
                <h3>Stock Items</h3>
                <h2>137</h2>
                <h2>US$1700.43</h2>
            </div> */}
                    <div className="card card--sm doughnut-chart__info">
                        <h3>Product Info (Per Category)</h3>
                        <DoughnutChartCard options={optionsCategory} finalData={finalDataCategory} />
                    </div>
                    <div className="card card--sm doughnut-chart__info">
                        <h3>Stock Info (Per Category)</h3>
                        <DoughnutChartCard options={optionsCategoryStock} finalData={finalDataCategoryStock} />
                    </div>
                    <ItemsCard option={0} handleOpenWindow={handleOpenWindow} handleRemoveItem={handleRemoveItem} reload={reload} />
                </>
                :
                <div className="stock__loading-box">
                    <img src={Loading} className='create-products__loading' />
                </div>
            }
        </>
    )
}

export default Stock
