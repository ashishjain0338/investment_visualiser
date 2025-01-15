import { Line } from "react-chartjs-2";
// Chart is imported to avoid error "category is not a registered scale"
import Chart from "chart.js/auto";
import { useEffect, useState } from "react";

const intialData = {
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

function TrendPlot(props) {
    const [data, setdata] = useState(intialData);

    useEffect(
        () => {
            console.log('useEffect of Trendplot called with indexUpdated as ' + props.indexUpdated)
            let out = []
            if (props.indexUpdated == -1) {
                console.log('Trend-Plot will update all data')

                for (let i = 0; i < props.state.length; i++) {
                    let obj = props.state[i]
                    let curData = obj.calculateFromDays(obj.period);
                    console.log("Check Me --> ", curData)
                    out.push(getSinglePlotData(curData, obj.title));
                }
            }

            setdata(
                {
                    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                    datasets: out
                }
            );
        },
        [props.state, props.indexUpdated]
    )

    function getSinglePlotData(curData, title) {
        let out =
        {
            label: title,
            data: curData,
            lineTension: 0.5, // 0 for Straight line, Increase it to make line curve
            fill: true,// Area under curve is highlighted
            borderWidth: 2,
            pointBorderWidth: 8,
            pointHoverRadius: 8,
            pointHoverBorderWidth: 3,
            pointRadius: 3,
        }
        return out;
    }


    return (
        <div>
            {console.log("Rerendering Trend-Plot")}
            <h4 className='light_text' style={{ textAlign: "center" }}>Line-Plot</h4>
            <div className='container-fluid light_text' >
                <Line data={data} options={options} height="300px" />
            </div>

        </div>
    )
}

export { TrendPlot };