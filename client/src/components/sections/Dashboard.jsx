import React, { useRef, useState } from 'react'
import "./Dashboard.css";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { GrMoney } from "react-icons/gr";
import { LuBoxes } from "react-icons/lu";
import { DiDropbox } from "react-icons/di";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import MdTopProducts from '../cards/MdTopProducts';
/* CHART */
import Chart from "chart.js/auto";
import { CategoryScale } from 'chart.js/auto';
import LineChartCard from '../cards/LineChartCard';

/* CREATE CHART */
Chart.register(CategoryScale);

function Dashboard() {

    const dummyData = [
    ];

    /* CONFIGURE CHART */
    const [chartData, setChartData] = useState({
        labels: ["Jan", "Feb", "Mar", "Apr", "May"],
        datasets: [
            {
                label: "Purchases",
                data: [7000, 2000, 10000, 13000, 9000],
                backgroundColor: [
                    "rgba(252, 76, 135, 0.3)",
                ],
                borderColor: 'rgba(252, 76, 135, 1)',
                borderWidth: 3
            },
            {
                label: "Sales",
                data: [2000, 4000, 1000, 2000, 17000],
                backgroundColor: [
                    "rgba(59, 116, 247,0.3)",
                ],
                borderColor: "rgba(59, 116, 247, 1)",
                borderWidth: 3
            }
        ]
    })


    /* CREATE ARROWS SCROLLBAR MOVE */
    const scrollContainerRef1 = useRef(null);

    const scrollContainerRef2 = useRef(null);

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
                <LineChartCard chartData={chartData} />
            </div>
        </>
    )
}

export default Dashboard;
