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
    const [dataCategory, setDataCategory] = useState()
    const [dataSupplier, setDataSupplier] = useState()
    const [dataCategoryStock, setDataCategoryStock] = useState()
    const [dataSupplierStock, setDataSupplierStock] = useState()
    const [pageIsLoad, setPageIsLoad] = useState({ items: [], quantity: 0 })
    const [optionsCategory, setOptionsCategory] = useState({
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
                    size: 0,
                    family: 'Open Sans',
                }
            },
            responsive: true,
        },
        cutout: "50%",
    });
    const [optionsSupplier, setOptionsSupplier] = useState({
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
                    size: 0,
                    family: 'Open Sans',
                }
            },
            responsive: true,
        },
        cutout: "50%",
    });
    const [optionsCategoryStock, setOptionsCategoryStock] = useState({
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
                    size: 0,
                    family: 'Open Sans',
                }
            },
            responsive: true,
        },
        cutout: "50%",
    });
    const [optionsSupplierStock, setOptionsSupplierStock] = useState({
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
                    size: 0,
                    family: 'Open Sans',
                }
            },
            responsive: true,
        },
        cutout: "50%",
    });
    const [finalDataCategory, setFinalDataCategory] = useState({
        labels: ["No Data"],
        datasets: [
            {
                data: [0.000000001],
                backgroundColor: colors[0],
                borderColor: colors[0],
                borderWidth: 1,
                dataVisibility: [true],
            },
        ],
    })
    const [finalDataCategoryStock, setFinalDataCategoryStock] = useState({
        labels: ["No Data"],
        datasets: [
            {
                data: [0.000000001],
                backgroundColor: colors[0],
                borderColor: colors[0],
                borderWidth: 1,
                dataVisibility: [true],
            },
        ],
    })
    const [finalDataSupplier, setFinalDataSupplier] = useState({
        labels: ["No Data"],
        datasets: [
            {
                data: [0.000000001],
                backgroundColor: colors[0],
                borderColor: colors[0],
                borderWidth: 1,
                dataVisibility: [true],
            },
        ],
    })
    const [finalDataSupplierStock, setFinalDataSupplierStock] = useState({
        labels: ["No Data"],
        datasets: [
            {
                data: [0.000000001],
                backgroundColor: colors[0],
                borderColor: colors[0],
                borderWidth: 1,
                dataVisibility: [true],
            },
        ],
    })


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

        if (categoriesData.length > 0) {
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
                                setProductsCategory(prev => {
                                    let newProdCat;
                                    prev.some(item => item.category === categoriesData[i].categoryName)
                                        ? newProdCat = prev
                                        : newProdCat = [...prev, productCategoriesObj]

                                    updateDataChart1(newProdCat)

                                    return newProdCat
                                }
                                );
                                setPageIsLoad(prevPageIsLoad => {
                                    if (prevPageIsLoad.items.indexOf("category") == -1) {
                                        return {
                                            items: [...prevPageIsLoad.items, 'category'],
                                            quantity: prevPageIsLoad.quantity + 1

                                        }
                                    } else {
                                        return { ...prevPageIsLoad }
                                    }
                                });
                            } else {
                                setPageIsLoad(prevPageIsLoad => {
                                    if (prevPageIsLoad.items.indexOf("category") == -1) {
                                        return {
                                            items: [...prevPageIsLoad.items, 'category'],
                                            quantity: prevPageIsLoad.quantity + 1

                                        }
                                    } else {
                                        return { ...prevPageIsLoad }
                                    }
                                });
                            }
                        })
                        .catch((err) => {
                            console.log(err);
                        })
                }
            }
        } else {
            setPageIsLoad(prevPageIsLoad => {
                if (prevPageIsLoad.items.indexOf("category") == -1) {
                    return {
                        items: [...prevPageIsLoad.items, 'category'],
                        quantity: prevPageIsLoad.quantity + 1

                    }
                } else {
                    return { ...prevPageIsLoad }
                }
            });
        }
    }

    const handleGetCategoryProductsStock = (categoriesData) => {

        const headers = {
            'Authorization': `Bearer ${userInfo.token}`
        }

        if (categoriesData.length > 0) {
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
                                setProductsCategoryStock(prev => {
                                    let newProdCatStock;

                                    prev.some(item => item.category === categoriesData[i].categoryName)
                                        ? newProdCatStock = prev
                                        : newProdCatStock = [...prev, productCategoriesStockObj]


                                    updateDataChart2(newProdCatStock)

                                    return newProdCatStock
                                }
                                );
                                setPageIsLoad(prevPageIsLoad => {
                                    if (prevPageIsLoad.items.indexOf("category-stock") == -1) {
                                        return {
                                            items: [...prevPageIsLoad.items, 'category-stock'],
                                            quantity: prevPageIsLoad.quantity + 1

                                        }
                                    } else {
                                        return { ...prevPageIsLoad }
                                    }
                                });
                            } else {
                                setPageIsLoad(prevPageIsLoad => {
                                    if (prevPageIsLoad.items.indexOf("category-stock") == -1) {
                                        return {
                                            items: [...prevPageIsLoad.items, 'category-stock'],
                                            quantity: prevPageIsLoad.quantity + 1

                                        }
                                    } else {
                                        return { ...prevPageIsLoad }
                                    }
                                });
                            }
                        })
                        .catch((err) => {
                            console.log(err);
                        })
                }
            }
        } else {
            setPageIsLoad(prevPageIsLoad => {
                if (prevPageIsLoad.items.indexOf("category-stock") == -1) {
                    return {
                        items: [...prevPageIsLoad.items, 'category-stock'],
                        quantity: prevPageIsLoad.quantity + 1

                    }
                } else {
                    return { ...prevPageIsLoad }
                }
            });
        }
    }

    const handleGetSupplierProducts = (suppliersData) => {

        const headers = {
            'Authorization': `Bearer ${userInfo.token}`
        }

        if (suppliersData.length > 0) {
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
                                setProductsSupplier(prev => {
                                    let newProdSup;

                                    prev.some(item => item.supplier === suppliersData[i].supplierName)
                                        ? newProdSup = prev
                                        : newProdSup = [...prev, productsSuppliersObj]

                                    updateDataChart3(newProdSup)

                                    return newProdSup
                                }
                                );
                                setPageIsLoad(prevPageIsLoad => {
                                    if (prevPageIsLoad.items.indexOf("supplier") == -1) {
                                        return {
                                            items: [...prevPageIsLoad.items, 'supplier'],
                                            quantity: prevPageIsLoad.quantity + 1

                                        }
                                    } else {
                                        return { ...prevPageIsLoad }
                                    }
                                });
                            } else {
                                setPageIsLoad(prevPageIsLoad => {
                                    if (prevPageIsLoad.items.indexOf("supplier") == -1) {
                                        return {
                                            items: [...prevPageIsLoad.items, 'supplier'],
                                            quantity: prevPageIsLoad.quantity + 1

                                        }
                                    } else {
                                        return { ...prevPageIsLoad }
                                    }
                                });
                            }
                        })
                        .catch((err) => {
                            console.log(err);
                        })
                }
            }
        } else {
            setPageIsLoad(prevPageIsLoad => {
                if (prevPageIsLoad.items.indexOf("supplier") == -1) {
                    return {
                        items: [...prevPageIsLoad.items, 'supplier'],
                        quantity: prevPageIsLoad.quantity + 1

                    }
                } else {
                    return { ...prevPageIsLoad }
                }
            });
        }
    }

    const handleGetSupplierProductsStock = (suppliersData) => {

        const headers = {
            'Authorization': `Bearer ${userInfo.token}`
        }

        if (suppliersData.length > 0) {
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
                                setProductsSupplierStock(prev => {
                                    let newProdSupStock;

                                    prev.some(item => item.supplier === suppliersData[i].supplierName)
                                        ? newProdSupStock = prev
                                        : newProdSupStock = [...prev, productsSuppliersStockObj]

                                    updateDataChart4(newProdSupStock)

                                    return newProdSupStock
                                }
                                );
                                setPageIsLoad(prevPageIsLoad => {
                                    if (prevPageIsLoad.items.indexOf("supplier-stock") == -1) {
                                        return {
                                            items: [...prevPageIsLoad.items, 'supplier-stock'],
                                            quantity: prevPageIsLoad.quantity + 1

                                        }
                                    } else {
                                        return { ...prevPageIsLoad }
                                    }
                                });
                            } else {
                                setPageIsLoad(prevPageIsLoad => {
                                    if (prevPageIsLoad.items.indexOf("supplier-stock") == -1) {
                                        return {
                                            items: [...prevPageIsLoad.items, 'supplier-stock'],
                                            quantity: prevPageIsLoad.quantity + 1

                                        }
                                    } else {
                                        return { ...prevPageIsLoad }
                                    }
                                });
                            }
                        })
                        .catch((err) => {
                            console.log(err);
                        })
                }
            }
        } else {
            setPageIsLoad(prevPageIsLoad => {
                if (prevPageIsLoad.items.indexOf("supplier-stock") == -1) {
                    return {
                        items: [...prevPageIsLoad.items, 'supplier-stock'],
                        quantity: prevPageIsLoad.quantity + 1

                    }
                } else {
                    return { ...prevPageIsLoad }
                }
            });
        }
    }

    function createRGBColor() {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        return `rgb(${r}, ${g}, ${b})`;
    }

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

    const updateDataChart1 = (chartData1) => {
        setDataCategory(prev => {
            const dataChartObj = chartData1.map((productCategory, index) => {
                return {
                    label: productCategory.category,
                    value: productCategory.categoryData.length,
                    color: colors[index] == undefined ? createRGBColor() : colors[index],
                    cutout: "50%",
                }
            })


            updateChartConfig1(dataChartObj)

            return dataChartObj
        })
    }

    const updateChartConfig1 = (chartConfig1) => {
        setOptionsCategory({
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
            cutout: chartConfig1.map((item) => item.cutout),
        })
        setFinalDataCategory({
            labels: chartConfig1.map((item) => item.label),
            datasets: [
                {
                    data: chartConfig1.map((item) => Math.round(item.value)),
                    backgroundColor: chartConfig1.map((item) => item.color),
                    borderColor: chartConfig1.map((item) => item.color),
                    borderWidth: 1,
                    dataVisibility: new Array(chartConfig1.length).fill(true),
                },
            ],
        })
    }

    const updateDataChart2 = (chartData2) => {
        setDataCategoryStock(prev => {
            const dataChartObj = chartData2.map((productCategory, index) => {
                return {
                    label: productCategory.category,
                    value: productCategory.quantity,
                    color: colors1[index] == undefined ? createRGBColor() : colors1[index],
                    cutout: "50%",
                }
            })

            updateChartConfig2(dataChartObj)

            return dataChartObj
        })
    }

    const updateChartConfig2 = (chartConfig2) => {
        setOptionsCategoryStock(
            {
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
                cutout: chartConfig2.map((item) => item.cutout),
            }
        )
        setFinalDataCategoryStock({
            labels: chartConfig2.map((item) => item.label),
            datasets: [
                {
                    data: chartConfig2.map((item) => Math.round(item.value)),
                    backgroundColor: chartConfig2.map((item) => item.color),
                    borderColor: chartConfig2.map((item) => item.color),
                    borderWidth: 1,
                    dataVisibility: new Array(chartConfig2.length).fill(true),
                },
            ],
        })
    }

    const updateDataChart3 = (chartData3) => {
        setDataSupplier(prev => {
            const dataChartObj = chartData3.map((productSupplier, index) => {
                return {
                    label: productSupplier.supplier,
                    value: productSupplier.supplierData.length,
                    color: colors2[index] == undefined ? createRGBColor() : colors2[index],
                    cutout: "50%",
                }
            })

            updateChartConfig3(dataChartObj)

            return dataChartObj
        })
    }

    const updateChartConfig3 = (chartConfig3) => {
        setOptionsSupplier(
            {
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
                cutout: chartConfig3.map((item) => item.cutout),
            }
        )
        setFinalDataSupplier({
            labels: chartConfig3.map((item) => item.label),
            datasets: [
                {
                    data: chartConfig3.map((item) => Math.round(item.value)),
                    backgroundColor: chartConfig3.map((item) => item.color),
                    borderColor: chartConfig3.map((item) => item.color),
                    borderWidth: 1,
                    dataVisibility: new Array(chartConfig3.length).fill(true),
                },
            ],
        })
    }

    const updateDataChart4 = (chartData4) => {
        setDataSupplierStock(prev => {
            const dataChartObj = chartData4.map((productSupplier, index) => {
                return {
                    label: productSupplier.supplier,
                    value: productSupplier.quantity,
                    color: colors3[index] == undefined ? createRGBColor() : colors3[index],
                    cutout: "50%",
                }
            })

            updateChartConfig4(dataChartObj)

            return dataChartObj
        })
    }

    const updateChartConfig4 = (chartConfig4) => {
        setOptionsSupplierStock(
            {
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
                cutout: chartConfig4.map((item) => item.cutout),
            }
        )
        setFinalDataSupplierStock({
            labels: chartConfig4.map((item) => item.label),
            datasets: [
                {
                    data: chartConfig4.map((item) => Math.round(item.value)),
                    backgroundColor: chartConfig4.map((item) => item.color),
                    borderColor: chartConfig4.map((item) => item.color),
                    borderWidth: 1,
                    dataVisibility: new Array(chartConfig4.length).fill(true),
                },
            ],
        })
    }

    /*     useEffect(() => {
            console.log(productsCategory)
            console.log(productsCategoryStock)
            console.log(productsSupplier)
            console.log(productsSupplierStock)
        }, [productsCategory, productsCategoryStock, productsSupplier, productsSupplierStock]) */


    return (
        <>
            {(pageIsLoad.quantity == 4)
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
