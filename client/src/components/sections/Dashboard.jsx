import React, { useEffect, useRef, useState } from 'react'
import "./Dashboard.css";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { GrMoney } from "react-icons/gr";
import { LuBoxes } from "react-icons/lu";
import { DiDropbox } from "react-icons/di";
import { IoIosArrowBack, IoIosArrowForward, IoIosArrowDown, IoIosArrowUp, IoMdArrowDropup } from "react-icons/io";
import MdTopProducts from '../cards/MdTopProducts';
import Loading from '../../assets/images/loading.svg';
/* CHART */
import Chart from "chart.js/auto";
import { CategoryScale } from 'chart.js/auto';
import LineChartCard from '../cards/LineChartCard';
import NewOrder from '../cards/NewOrder';
import axios from 'axios';
import { useSelector } from 'react-redux';

/* CREATE CHART */

function Dashboard() {

    const { innerWidth: width, innerHeight: height } = window

    const apiUrl = useSelector((state) => state.MiscReducer.apiUrl);
    const apiPort = useSelector((state) => state.MiscReducer.apiPort);

    const userInfo = useSelector((state) => state.UserReducer);

    function getLastMonths(lastMonths) {
        const currentDate = new Date();
        const months = [];

        // Obter o mês atual e os 6 anteriores
        for (let i = 0; i < lastMonths; i++) {
            const month = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
            const monthName = month.toLocaleString('en-US', { month: 'short' });
            months.push(monthName);
        }

        return months.reverse(); // Inverter para que o mês atual fique no início
    }

    const setLabels = [["5", "10", "15", "20", "25", "30"], ["10", "20", "30", "40", "50", "60", "70", "80", "90"], getLastMonths(6), getLastMonths(12)]

    const [chartArr, setChartArr] = useState([[], []])

    const [lowStockProducts, setLowStockProducts] = useState(null);
    const [stockProducts, setStockProducts] = useState(null);
    const [buyOrdersPrice, setBuyOrdersPrice] = useState(null);
    const [saleOrdersPrice, setSaleOrdersPrice] = useState(null);
    const [chartFilter, setChartFilter] = useState(0);
    const [isShowingChartPopup, setIsShowingChartPopup] = useState(false);
    const [recentlyAddedProducts, setRecentlyAddedProducts] = useState([]);
    const [isLoadingChart, setIsLoadingChart] = useState(false);

    const handleGetLowStockProducts = () => {
        const headers = {
            'Authorization': `Bearer ${userInfo.token}`
        }

        const url = new URL(`${apiUrl}:${apiPort}/product/low-stock`);

        axios.get(`${url}`, ({
            headers
        }))
            .then((data) => {
                setLowStockProducts(data.data.productsData.length);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const handleGetStockProducts = () => {
        const headers = {
            'Authorization': `Bearer ${userInfo.token}`
        }

        const url = new URL(`${apiUrl}:${apiPort}/product/stock`);

        axios.get(`${url}`, ({
            headers
        }))
            .then((data) => {
                const requestedItems = data.data.productsData;

                let stockValue = 0;

                for (let i = 0; i < requestedItems.length; i++) {
                    stockValue += requestedItems[i].sellPrice * requestedItems[i].stock;
                }

                setStockProducts(stockValue);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const handleGetLast30DaysBuyOrders = () => {
        const headers = {
            'Authorization': `Bearer ${userInfo.token}`
        }

        const filteringObj = {
            type: "buy",
            time: 30
        }

        const url = new URL(`${apiUrl}:${apiPort}/order/time`);
        url.search = new URLSearchParams(filteringObj)

        axios.get(`${url}`, ({
            headers
        }))
            .then((data) => {
                const requestedItems = data.data.ordersData;

                let buyOrdersValue = 0;

                for (let i = 0; i < requestedItems.length; i++) {
                    buyOrdersValue += requestedItems[i].price;
                }

                setBuyOrdersPrice(buyOrdersValue);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const handleGetOrders = () => {
        setIsLoadingChart(true);

        const headers = {
            'Authorization': `Bearer ${userInfo.token}`
        }

        const filteringObj = {
            option: chartFilter
        }

        const url = new URL(`${apiUrl}:${apiPort}/order/period`);
        url.search = new URLSearchParams(filteringObj)

        axios.get(`${url}`, ({
            headers
        }))
            .then((data) => {
                setChartArr(data.data.values)
                setIsLoadingChart(false);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const handleGetLast30DaysSaleOrders = () => {
        const headers = {
            'Authorization': `Bearer ${userInfo.token}`
        }

        const filteringObj = {
            type: "sale",
            time: 30
        }

        const url = new URL(`${apiUrl}:${apiPort}/order/time`);
        url.search = new URLSearchParams(filteringObj)

        axios.get(`${url}`, ({
            headers
        }))
            .then((data) => {
                const requestedItems = data.data.ordersData;

                let saleOrdersValue = 0;

                for (let i = 0; i < requestedItems.length; i++) {
                    saleOrdersValue += requestedItems[i].price;
                }

                setSaleOrdersPrice(saleOrdersValue);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const handleGetRecentlyAddedProducts = () => {
        const headers = {
            'Authorization': `Bearer ${userInfo.token}`
        }

        const url = new URL(`${apiUrl}:${apiPort}/product/recently-added`);

        axios.get(`${url}`, ({
            headers
        }))
            .then((data) => {
                setRecentlyAddedProducts(data.data.productsData);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    function createRGBColor() {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        return `rgb(${r}, ${g}, ${b})`;
    }

    /* CONFIGURE CHART */
    const [chartData, setChartData] = useState({
        labels: setLabels[chartFilter],
        datasets: [
            {
                label: "Purchases",
                data: chartArr[0],
                backgroundColor: [
                    "rgba(252, 76, 135, 0.3)",
                ],
                borderColor: 'rgba(252, 76, 135, 1)',
                borderWidth: 3
            },
            {
                label: "Sales",
                data: chartArr[1],
                backgroundColor: [
                    "rgba(59, 116, 247,0.3)",
                ],
                borderColor: "rgba(59, 116, 247, 1)",
                borderWidth: 3
            }
        ]
    })


    const handleChangeChart = (value) => {

        setChartFilter(value)

        setIsShowingChartPopup(false)
    }

    /* CREATE ARROWS SCROLLBAR MOVE */
    const scrollContainerRef1 = useRef(null);

    const scrollContainerRef2 = useRef(null);

    const chartPopup = useRef(null);

    const handleMoveCard1 = (option) => {
        switch (option) {
            case 0:
                if (scrollContainerRef1.current) {
                    if (innerWidth > 400) {
                        scrollContainerRef1.current.scrollBy({ left: -300, behavior: 'smooth' });
                    } else {
                        scrollContainerRef1.current.scrollBy({ left: -120, behavior: 'smooth' });
                    }
                }
                break;
            case 1:
                if (scrollContainerRef1.current) {
                    if (innerWidth > 400) {
                        scrollContainerRef1.current.scrollBy({ left: 300, behavior: 'smooth' });
                    } else {
                        scrollContainerRef1.current.scrollBy({ left: 120, behavior: 'smooth' });
                    }
                }
                break;
        }
    }

    const handleMoveCard2 = (option) => {
        switch (option) {
            case 0:
                if (scrollContainerRef2.current) {
                    if (innerWidth > 400) {
                        scrollContainerRef2.current.scrollBy({ left: -300, behavior: 'smooth' });
                    } else {
                        scrollContainerRef2.current.scrollBy({ left: -120, behavior: 'smooth' });
                    }
                }
                break;
            case 1:
                if (scrollContainerRef2.current) {
                    if (innerWidth > 400) {
                        scrollContainerRef2.current.scrollBy({ left: 300, behavior: 'smooth' });
                    } else {
                        scrollContainerRef2.current.scrollBy({ left: 120, behavior: 'smooth' });
                    }
                }
                break;
        }
    }

    useEffect(() => {
        /* CLOSE WINDOW WHEN CLICK OUTSIDE */
        const handleClickOutside = (event) => {
            if (chartPopup.current && !chartPopup.current.contains(event.target)) {
                setIsShowingChartPopup(false)
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };

    }, []);

    useEffect(() => {
        handleGetLowStockProducts();
        handleGetStockProducts();
        handleGetLast30DaysBuyOrders();
        handleGetLast30DaysSaleOrders();
        handleGetRecentlyAddedProducts();
    }, [])

    useEffect(() => {
        handleGetOrders();
    }, [chartFilter])

    useEffect(() => {
        setChartData({
            labels: setLabels[chartFilter],
            datasets: [
                {
                    label: "Purchases",
                    data: chartArr[0],
                    backgroundColor: [
                        "rgba(252, 76, 135, 0.3)",
                    ],
                    borderColor: 'rgba(252, 76, 135, 1)',
                    borderWidth: 3
                },
                {
                    label: "Sales",
                    data: chartArr[1],
                    backgroundColor: [
                        "rgba(59, 116, 247,0.3)",
                    ],
                    borderColor: "rgba(59, 116, 247, 1)",
                    borderWidth: 3
                }
            ]
        })
    }, [chartArr])

    return (
        <>
            {(lowStockProducts != null && stockProducts != null && buyOrdersPrice != null && saleOrdersPrice != null && recentlyAddedProducts.length > 0 && chartArr[0].length > 0 && chartArr[1].length > 0)
                ?
                <>
                    <div className="card card--sm dashboard__card--sm totalsales__card">
                        <div className="dashboard__card--sm__img totalsales__img">
                            <RiMoneyDollarCircleLine />
                        </div>
                        <div className="dashboard__card--sm__txt ">
                            <p>${saleOrdersPrice.toFixed(2)}</p>
                            <span>Total Sales (Monthly)</span>
                        </div>
                    </div>
                    <div className="card card--sm dashboard__card--sm totalbuys__card">
                        <div className="dashboard__card--sm__img totalbuys__img">
                            <GrMoney />
                        </div>
                        <div className="dashboard__card--sm__txt ">
                            <p>${buyOrdersPrice.toFixed(2)}</p>
                            <span>Total Buys (Monthly)</span>
                        </div>
                    </div>
                    <div className="card card--sm dashboard__card--sm totalstock__card">
                        <div className="dashboard__card--sm__img totalstock__img">
                            <LuBoxes />
                        </div>
                        <div className="dashboard__card--sm__txt ">
                            <p>${stockProducts.toFixed(2)}</p>
                            <span>Stock Items</span>
                        </div>
                    </div>
                    <div className="card card--sm dashboard__card--sm totallowstock_card">
                        <div className="dashboard__card--sm__img totallowstock__img">
                            <DiDropbox />
                        </div>
                        <div className="dashboard__card--sm__txt ">
                            <p>{lowStockProducts}</p>
                            <span>Low Stock Items</span>
                        </div>
                    </div>

                    <div className="card card--md dashboard__card--md topseelling__card">
                        <div className="dashboard__topsellingprincipal topselling__principal">
                            <h4 className="topseelling__card__title">TOP SELLING ITEMS</h4>
                            <div className="dashboard__topsellingmove topseelling__card_move">
                                <IoIosArrowBack className='dashboard__topsellingarrow' onClick={() => handleMoveCard1(0)} />
                                <IoIosArrowForward className='dashboard__topsellingarrow' onClick={() => handleMoveCard1(1)} />
                            </div>
                        </div>
                        <hr />
                        <div className="dashboard__topproducts topselling__products" ref={scrollContainerRef1}>
                            <MdTopProducts isLast={false} />
                            <MdTopProducts isLast={false} />
                            <MdTopProducts isLast={false} />
                            <MdTopProducts isLast={false} />
                            <MdTopProducts isLast={false} />
                            <MdTopProducts isLast={false} />
                            <MdTopProducts isLast={false} />
                            <MdTopProducts isLast={false} />
                            <MdTopProducts isLast={false} />
                            <MdTopProducts isLast={false} />
                            <MdTopProducts isLast={false} />
                            <MdTopProducts isLast={true} />
                        </div>
                    </div>
                    <div className="card card--md dashboard__card--md recentlyadded__card">
                        <div className="dashboard__topsellingprincipal recentlyadded__principal">
                            <h4 className="recentlyadded__card__title">RECENTLY ADDED</h4>
                            <div className="dashboard__topsellingmove recentlyadded__card_move">
                                <IoIosArrowBack className='dashboard__topsellingarrow' onClick={() => handleMoveCard2(0)} />
                                <IoIosArrowForward className='dashboard__topsellingarrow' onClick={() => handleMoveCard2(1)} />
                            </div>
                        </div>
                        <hr />
                        <div className="dashboard__topproducts recentlyadded__products" ref={scrollContainerRef2}>
                            {recentlyAddedProducts.map((recentlyProduct, index) =>
                                <MdTopProducts isLast={index + 1 == recentlyAddedProducts.length ? true : false} text={recentlyProduct.productName} img={`${apiUrl}:${apiPort}/assets/${recentlyProduct.picturePath}`} unity={recentlyProduct.stock} />
                            )}
                        </div>
                    </div>
                    <div className="card card--bg dashboard__card--bg">
                        <div className='chart-container'>
                            <div className="chart-container__title">
                                <h2>Sales and Purchase Statistics</h2>
                                <div className="chart__customselect" ref={chartPopup}>
                                    <div className="chart-customselect__title" onClick={() => { setIsShowingChartPopup(!isShowingChartPopup) }}>
                                        <p > {chartFilter == 0 ? "Last 30 Days" : chartFilter == 1 ? "Last 90 Days" : chartFilter == 2 ? "Last 6 Months" : chartFilter == 3 ? "Last Year" : "Select a Filter"}</p>
                                        <IoIosArrowDown style={{ display: isShowingChartPopup == true ? "inline-block" : "none" }} />
                                        <IoIosArrowUp style={{ display: isShowingChartPopup == true ? "none" : "inline-block" }} />

                                    </div>
                                    <div className="chart__time" style={{ display: isShowingChartPopup == false ? "none" : "flex" }}>
                                        <p className='chart-time__options' onClick={() => handleChangeChart(0)}>Last 30 Days</p>
                                        <p className='chart-time__options' onClick={() => handleChangeChart(1)}>Last 90 Days</p>
                                        <p className='chart-time__options' onClick={() => handleChangeChart(2)}>Last 6 Months</p>
                                        <p className='chart-time__options' onClick={() => handleChangeChart(3)}>Last Year</p>
                                        <IoMdArrowDropup className='chart-time__arrow' />
                                    </div>
                                </div>
                            </div>
                            {isLoadingChart == false ?
                                <LineChartCard chartData={chartData} />
                                :
                                <img src={Loading} className='create-products__loading' />
                            }
                        </div>
                    </div>
                </>
                :
                <div className="stock__loading-box">
                    <img src={Loading} className='create-products__loading' />
                </div>
            }
        </>
    )
}

export default Dashboard;
