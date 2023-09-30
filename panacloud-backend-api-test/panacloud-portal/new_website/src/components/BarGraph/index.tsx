// https://www.chartjs.org/docs/latest/charts/bar.html
// https://github.com/bradtraversy/reactcharts/blob/master/src/components/Chart.js
// https://www.chartjs.org/docs/latest/axes/cartesian/linear.html
import React, { FC } from 'react';
import { Bar } from 'react-chartjs-2';
import { ChartOptions, ChartData } from 'chart.js';

export interface Props {

}

const BarChard: FC<Props> = ({ }) => {
    return (
        <div>
            <Bar
                options={options}
                data={data}
            />
        </div>
    )
}

export default BarChard;

const options: ChartOptions = {
    // title: { display: true, fontSize: 25, text: "AWS Cloud Spending Summary" },
    legend: { display: false },
    scales: { yAxes: [{ ticks: { beginAtZero: true } }] }
    
}

const data: ChartData = {
    labels: [
        "Last Month (February 2021)",
        "Month-to-Date (March 2021)",
        "Forecast (March 2021)"
    ],
    datasets: [
        {
            label: 'Dataset 1',
            backgroundColor: ["#9b18cf", "#1867cf", "#0faf0f"],
            data: [22.65, 96.82, 108.09],
            maxBarThickness: 60,
            minBarLength: 0
        },
    ]
}