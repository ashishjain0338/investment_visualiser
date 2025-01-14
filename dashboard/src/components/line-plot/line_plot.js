import { Line } from "react-chartjs-2";
// Chart is imported to avoid error "category is not a registered scale"
import Chart from "chart.js/auto";

const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [
        {
            label: 'Rainfall',
            data: [65, 59, 80, 81, 56, 101, 121, 102, 72, 59, 21, 14],
            lineTension: 0.5, // 0 for Straight line, Increase it to make line curve
            fill: true,// Area under curve is highlighted
            borderWidth: 2,
            pointBorderWidth: 8,
            pointHoverRadius: 8,
            pointHoverBorderWidth: 3,
            pointRadius: 3,
        }
    ]
}
const options = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
        position: "none"
    },

}

function TrendPlot() {
    return (
        <div>
            <h4 className='light_text' style={{ textAlign: "center" }}>Line-Plot</h4>
            <div className='container-fluid light_text' >
                <Line data={data} options={options} height="300px" />
            </div>

        </div>
    )
}

export { TrendPlot };