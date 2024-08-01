import React from 'react'
import { Line } from "react-chartjs-2";
import "./LineChartCard.css";
import { IoIosArrowDown } from "react-icons/io";

function LineChartCard({ chartData }) {
    return (
        <div className='chart-container'>
            <div className="chart-container__title">
                <h2>Sales and Purchase Statistics</h2>
                <div className="chart__time">
                    <p>Last Month</p>
                    <IoIosArrowDown />
                </div>
            </div>
            <Line
                data={chartData}
                options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        title: {
                            display: false,
                        },
                        legend: {
                            position: 'top',
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }}
            />
        </div>
    )
}

export default LineChartCard
