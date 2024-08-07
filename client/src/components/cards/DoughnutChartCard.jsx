import React from 'react'
import { Doughnut } from "react-chartjs-2";

function DoughnutChartCard({ finalData, options }) {
    return (
        <>
            <Doughnut
                data={finalData}
                options={options}
            />
        </>
    )
}

export default DoughnutChartCard
