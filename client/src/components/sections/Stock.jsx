import React, { useEffect, useRef, useState } from 'react'
import './Stock.css';
import ItemsCard from '../cards/ItemsCard';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import DoughnutChartCard from '../cards/DoughnutChartCard';
import { FaBoxOpen } from "react-icons/fa6";
import { FaMoneyBill1 } from "react-icons/fa6";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

function Stock({ handleOpenWindow, handleRemoveItem, reload }) {

    const data = [
        {
            label: "Label 1",
            value: 55,
            color: "rgba(0, 43, 73, 1)",
            cutout: "50%",
        },
        {
            label: "Label 2",
            value: 15,
            color: "rgba(0, 103, 160, 1)",
            cutout: "50%",
        },
        {
            label: "Label 3",
            value: 80,
            color: "rgba(83, 217, 217, 1)",
            cutout: "50%",
        },
    ]

    const options = {
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
        cutout: data.map((item) => item.cutout),
    };


    const finalData = {
        labels: data.map((item) => item.label),
        datasets: [
            {
                data: data.map((item) => Math.round(item.value)),
                backgroundColor: data.map((item) => item.color),
                borderColor: data.map((item) => item.color),
                borderWidth: 1,
                dataVisibility: new Array(data.length).fill(true),
            },
        ],
    };


    return (
        <>
            <div className="card card--md doughnut-chart__info">
                <h3>Stock Info (Per Supplier)</h3>
                <DoughnutChartCard options={options} finalData={finalData} />
            </div>
            {/*  <div className="card card--xsm stock-info__card">
                <div className="stock-info__range">
                    <FaBoxOpen />
                </div>
                <h3>Stock Items</h3>
                <h2>137</h2>
                <h2>US$1700.43</h2>
            </div> */}
            <div className="card card--md doughnut-chart__info">
                <h3>Stock Info (Per Category)</h3>
                <DoughnutChartCard options={options} finalData={finalData} />
            </div>
            <ItemsCard option={0} handleOpenWindow={handleOpenWindow} handleRemoveItem={handleRemoveItem} reload={reload} />
        </>
    )
}

export default Stock
