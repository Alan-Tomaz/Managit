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
