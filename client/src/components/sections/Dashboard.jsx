import React from 'react'
import "./Dashboard.css";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { GrMoney } from "react-icons/gr";
import { LuBoxes } from "react-icons/lu";
import { DiDropbox } from "react-icons/di";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import MdTopProducts from '../cards/MdTopProducts';

function Dashboard() {
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
                <div className="topselling__principal">
                    <p className="topseelling__card__title">TOP SELLING ITEMS</p>
                    <div className="topseelling__card_move">
                        <IoIosArrowBack />
                        <IoIosArrowForward />
                    </div>
                </div>
                <hr />
                <div className="topselling__products">
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
        </>
    )
}

export default Dashboard;
