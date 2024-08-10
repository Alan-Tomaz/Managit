import React, { useEffect, useRef, useState } from 'react'
import "./Dashboard.css";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { GrMoney } from "react-icons/gr";
import { LuBoxes } from "react-icons/lu";
import { DiDropbox } from "react-icons/di";
import { IoIosArrowBack, IoIosArrowForward, IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import MdTopProducts from '../cards/MdTopProducts';
/* CHART */
import Chart from "chart.js/auto";
import { CategoryScale } from 'chart.js/auto';
import LineChartCard from '../cards/LineChartCard';
import NewOrder from '../cards/NewOrder';

/* CREATE CHART */

function Dashboard() {

    const setLabels = [["0", "5", "10", "15", "20", "25", "30"], ["0", "10", "20", "30", "40", "50", "60", "70", "80", "90"], ["Jan", "Feb", "Mar", "Apr", "May", "Jun"], ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Set", "Oct", "Nov", "Dec"]]
    const setData = [[[7000, 2000, 10000, 13000, 9000, 4000, 8000], [7000, 10000, 9000, 5000, 3000, 13000, 15000, 7000, 19000, 18000], [9000, 13000, 19000, 7000, 13000, 17000], [9000, 13000, 19000, 7000, 13000, 17000, 4500, 14354, 17000, 18000, 12000, 16000, 10000]], [[3000, 700, 5000, 10000, 16000, 10000, 13000], [14000, 5000, 16000, 10000, 7000, 6000, 9000, 15000, 9000, 13000], [15000, 10000, 13000, 19000, 15600, 11000], [9000, 16000, 13000, 14000, 12000, 8000, 9000, 12000, 13000, 19000, 17000, 15000]]]

    const [chartFilter, setChartFilter] = useState(0);
    const [isShowingChartPopup, setIsShowingChartPopup] = useState(false);


    /* CONFIGURE CHART */
    const [chartData, setChartData] = useState({
        labels: setLabels[chartFilter],
        datasets: [
            {
                label: "Purchases",
                data: setData[0][chartFilter],
                backgroundColor: [
                    "rgba(252, 76, 135, 0.3)",
                ],
                borderColor: 'rgba(252, 76, 135, 1)',
                borderWidth: 3
            },
            {
                label: "Sales",
                data: setData[1][chartFilter],
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

        setChartData({
            labels: setLabels[value],
            datasets: [
                {
                    label: "Purchases",
                    data: setData[0][value],
                    backgroundColor: [
                        "rgba(252, 76, 135, 0.3)",
                    ],
                    borderColor: 'rgba(252, 76, 135, 1)',
                    borderWidth: 3
                },
                {
                    label: "Sales",
                    data: setData[1][value],
                    backgroundColor: [
                        "rgba(59, 116, 247,0.3)",
                    ],
                    borderColor: "rgba(59, 116, 247, 1)",
                    borderWidth: 3
                }
            ]
        })

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
                    scrollContainerRef1.current.scrollBy({ left: -300, behavior: 'smooth' });
                }
                break;
            case 1:
                if (scrollContainerRef1.current) {
                    scrollContainerRef1.current.scrollBy({ left: 300, behavior: 'smooth' });
                }
                break;
        }
    }

    const handleMoveCard2 = (option) => {
        switch (option) {
            case 0:
                if (scrollContainerRef2.current) {
                    scrollContainerRef2.current.scrollBy({ left: -300, behavior: 'smooth' });
                }
                break;
            case 1:
                if (scrollContainerRef2.current) {
                    scrollContainerRef2.current.scrollBy({ left: 300, behavior: 'smooth' });
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

    return (
        <>
            <div className="card card--sm dashboard__card--sm totalsales__card">
                <div className="dashboard__card--sm__img totalsales__img">
                    <RiMoneyDollarCircleLine />
                </div>
                <div className="dashboard__card--sm__txt ">
                    <p>$5700.00</p>
                    <span>Total Sales (Monthly)</span>
                </div>
            </div>
            <div className="card card--sm dashboard__card--sm totalbuys__card">
                <div className="dashboard__card--sm__img totalbuys__img">
                    <GrMoney />
                </div>
                <div className="dashboard__card--sm__txt ">
                    <p>$5700.00</p>
                    <span>Total Buys (Monthly)</span>
                </div>
            </div>
            <div className="card card--sm dashboard__card--sm totalstock__card">
                <div className="dashboard__card--sm__img totalstock__img">
                    <LuBoxes />
                </div>
                <div className="dashboard__card--sm__txt ">
                    <p>$5700.00</p>
                    <span>Stock Items</span>
                </div>
            </div>
            <div className="card card--sm dashboard__card--sm totallowstock_card">
                <div className="dashboard__card--sm__img totallowstock__img">
                    <DiDropbox />
                </div>
                <div className="dashboard__card--sm__txt ">
                    <p>17</p>
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
                                <div className='chart-time__options' onClick={() => handleChangeChart(0)}>Last 30 Days</div>
                                <div className='chart-time__options' onClick={() => handleChangeChart(1)}>Last 90 Days</div>
                                <div className='chart-time__options' onClick={() => handleChangeChart(2)}>Last 6 Months</div>
                                <div className='chart-time__options' onClick={() => handleChangeChart(3)}>Last Year</div>
                            </div>
                        </div>
                    </div>
                    <LineChartCard chartData={chartData} />
                </div>
            </div>
        </>
    )
}

export default Dashboard;
