import React, { useEffect, useRef, useState } from 'react'
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

    const setLabels = [["0", "5", "10", "15", "20", "25", "30"], ["0", "10", "20", "30", "40", "50", "60", "70", "80", "90"], ["Jan", "Feb", "Mar", "Apr", "May", "Jun"], ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Set", "Oct", "Nov", "Dec"]]
    const setData = [[[7000, 2000, 10000, 13000, 9000, 4000, 8000], [7000, 10000, 9000, 5000, 3000, 13000, 15000, 7000, 19000], [9000, 13000, 19000, 7000, 13000, 17000], [9000, 13000, 19000, 7000, 13000, 17000, 4500, 14354, 17000, 18000, 12000, 16000, 10000]], [[3000, 700, 5000, 10000, 16000, 10000, 13000], [14000, 5000, 16000, 10000, 7000, 6000, 9000, 15000, 9000, 13000], [15000, 10000, 13000, 19000, 15600, 11000], [9000, 16000, 13000, 14000, 12000, 8000, 9000, 12000, 13000, 19000, 17000, 15000]]]

    const [chartFilter, setChartFilter] = useState(1);



    /* CONFIGURE CHART */
    const [chartData, setChartData] = useState({
        labels: setLabels[chartFilter - 1],
        datasets: [
            {
                label: "Purchases",
                data: setData[0][chartFilter - 1],
                backgroundColor: [
                    "rgba(252, 76, 135, 0.3)",
                ],
                borderColor: 'rgba(252, 76, 135, 1)',
                borderWidth: 3
            },
            {
                label: "Sales",
                data: setData[1][chartFilter - 1],
                backgroundColor: [
                    "rgba(59, 116, 247,0.3)",
                ],
                borderColor: "rgba(59, 116, 247, 1)",
                borderWidth: 3
            }
        ]
    })


    const handleChangeChart = (value) => {

        console.log(value)
        if (value > 0) {
            setChartFilter(value)

            setChartData({
                labels: setLabels[value - 1],
                datasets: [
                    {
                        label: "Purchases",
                        data: setData[0][value - 1],
                        backgroundColor: [
                            "rgba(252, 76, 135, 0.3)",
                        ],
                        borderColor: 'rgba(252, 76, 135, 1)',
                        borderWidth: 3
                    },
                    {
                        label: "Sales",
                        data: setData[1][value - 1],
                        backgroundColor: [
                            "rgba(59, 116, 247,0.3)",
                        ],
                        borderColor: "rgba(59, 116, 247, 1)",
                        borderWidth: 3
                    }
                ]
            })
        }
    }

    /* CREATE ARROWS SCROLLBAR MOVE */
    const scrollContainerRef1 = useRef(null);

    const scrollContainerRef2 = useRef(null);

    useEffect(() => {
        var x, i, j, l, ll, selElmnt, a, b, c;
        /*look for any elements with the class "custom-select":*/
        x = document.getElementsByClassName("chart__customselect");
        l = x.length;
        for (i = 0; i < l; i++) {
            if (x[i].classList.contains("initialized")) continue; // Skip already initialized selects

            x[i].classList.add("initialized"); // Mark as initialized

            selElmnt = x[i].getElementsByTagName("select")[0];
            ll = selElmnt.length;
            /*for each element, create a new DIV that will act as the selected item:*/
            a = document.createElement("DIV");
            a.setAttribute("class", "chart__select-selected");
            a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
            x[i].appendChild(a);
            /*for each element, create a new DIV that will contain the option list:*/
            b = document.createElement("DIV");
            b.setAttribute("class", "chart__select-items chart__select-hide");
            for (j = 1; j < ll; j++) {
                /*for each option in the original select element,
                create a new DIV that will act as an option item:*/
                c = document.createElement("DIV");
                c.innerHTML = selElmnt.options[j].innerHTML;
                c.addEventListener("click", function (e) {
                    /*when an item is clicked, update the original select box,
                    and the selected item:*/
                    var y, i, k, s, h, sl, yl;
                    s = this.parentNode.parentNode.getElementsByTagName("select")[0];
                    sl = s.length;
                    h = this.parentNode.previousSibling;
                    for (i = 0; i < sl; i++) {
                        if (s.options[i].innerHTML == this.innerHTML) {
                            /* Change Chart */
                            handleChangeChart(i)

                            s.selectedIndex = i;
                            h.innerHTML = this.innerHTML;
                            y = this.parentNode.getElementsByClassName("chart__same-as-selected");
                            yl = y.length;
                            for (k = 0; k < yl; k++) {
                                y[k].removeAttribute("class");
                            }
                            this.setAttribute("class", "chart__same-as-selected");
                            break;
                        }
                    }
                    h.click();
                });
                b.appendChild(c);
            }
            x[i].appendChild(b);
            a.addEventListener("click", function (e) {
                /*when the select box is clicked, close any other select boxes,
                and open/close the current select box:*/
                e.stopPropagation();
                closeAllSelect(this);
                this.nextSibling.classList.toggle("chart__select-hide");
                this.classList.toggle("chart__select-arrow-active");
            });
        }
        function closeAllSelect(elmnt) {
            /*a function that will close all select boxes in the document,
            except the current select box:*/
            var x, y, i, xl, yl, arrNo = [];
            x = document.getElementsByClassName("chart__select-items");
            y = document.getElementsByClassName("chart__select-selected");
            xl = x.length;
            yl = y.length;
            for (i = 0; i < yl; i++) {
                if (elmnt == y[i]) {
                    arrNo.push(i)
                } else {
                    y[i].classList.remove("chart__select-arrow-active");
                }
            }
            for (i = 0; i < xl; i++) {
                if (arrNo.indexOf(i)) {
                    x[i].classList.add("chart__select-hide");
                }
            }
        }
        /*if the user clicks anywhere outside the select box,
        then close all select boxes:*/
        document.addEventListener("click", closeAllSelect);
    }, [])

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
                <div className='chart-container'>
                    <div className="chart-container__title">
                        <h2>Sales and Purchase Statistics</h2>
                        <div className="chart__customselect">
                            <select className="chart__time">
                                <option value={chartFilter} selected={true}>{chartFilter == 1 ? "Last 30 Days" : chartFilter == 2 ? "Last 90 Days" : chartFilter == 3 ? "Last 6 Months" : chartFilter == 4 ? "Last Year" : "Select a Filter"}</option>
                                <option value={1}>Last 30 Days</option>
                                <option value={2}>Last 90 Days</option>
                                <option value={3}>Last 6 Months</option>
                                <option value={4}>Last Year</option>
                            </select>
                        </div>
                    </div>
                    <LineChartCard chartData={chartData} />
                </div>
            </div>
        </>
    )
}

export default Dashboard;
