import React from 'react'
import { Line } from "react-chartjs-2";

function LineChartCard({ chartData }) {

    return (
        <>
            <Line
                data={chartData}
                options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        datalabels: {
                            display: false
                        },
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
        </>
    )
}

export default LineChartCard
