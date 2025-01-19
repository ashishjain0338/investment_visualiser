import { Line } from "react-chartjs-2";
// Chart is imported to avoid error "category is not a registered scale"
import Chart from "chart.js/auto";
import { useEffect, useState } from "react";
import { diffViewUnevenLength, convertToPercentage2D, getQuaterLabels } from "./helper";

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
const colorCombinations = [
    // Combination 1 (Vibrant Pastel Theme)
    ["#4DB8FF", "#58D68D", "#FFA07A", "#C39BD3", "#FFD700", "#FF6F61"],

    // Combination 2 (Muted Elegance)
    ["#ADD8E6", "#BCC6CC", "#D19A99", "#4682B4", "#F0E68C", "#2F4F4F"],

    // Combination 3 (Nature-Inspired)
    ["#4DA8DA", "#228B22", "#8B4513", "#DAA520", "#D3D3D3", "#DC143C"],

    // Combination 4 (Bright and Playful)
    ["#87CEFA", "#FF69B4", "#32CD32", "#FFA500", "#9370DB", "#FFFACD"],

    // Combination 5 (Professional Palette)
    ["#89CFF0", "#708090", "#800020", "#556B2F", "#FFD700", "#191970"],

    // Combination 6 (Soft Gradient Look)
    ["#B0E0E6", "#FFD1DC", "#E6E6FA", "#98FF98", "#FFE5B4", "#FFFFE0"]
];

let selectedColors = [
    "#4DB8FF", "#58D68D", "#FFA07A", "#C39BD3", "#FFD700", "#FF6F61",
    "#87CEFA", "#FF69B4", "#32CD32", "#FFA500", "#9370DB", "#FFFACD"
];
function TrendPlot(props) {
    const [data, setdata] = useState(intialData);

    useEffect(
        () => {
            let out = [], collectData = [], titles = [];
            let maxDataSize = 0;
            for (let i = 0; i < props.state.length; i++) {
                let obj = props.state[i]
                let curData = obj.calculateFromDays(obj.period);
                // Get all data in 2D-Matrix
                collectData.push(curData);
                titles.push(obj.title);
                maxDataSize = Math.max(maxDataSize, curData.length);

            }
            // Modify Data based on View
            if (props.percentageView) {
                collectData = convertToPercentage2D(collectData);
            }
            if (props.diffView) {
                collectData = diffViewUnevenLength(collectData, props.diffIndex);
            }

            for (let i = 0; i < collectData.length; i++) {
                out.push(getSinglePlotData(collectData[i], titles[i], selectedColors[i % 12]));
            }

            setdata(
                {
                    labels: getQuaterLabels(maxDataSize),
                    datasets: out
                }
            );
        },
        [props.state, props.indexUpdated, props.percentageView, props.diffView, props.diffIndex]
    )



    function getSinglePlotData(curData, title, color) {
        let out =
        {
            label: title,
            data: curData,
            lineTension: 0, // 0 for Straight line, Increase it to make line curve
            fill: false,// Area under curve is highlighted
            borderColor: color,
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
            {/* <h4 className='light_text' style={{ textAlign: "center" }}>Line-Plot</h4> */}
            <div className='container-fluid light_text' >
                <Line data={data} options={options} height="300px" />
            </div>

        </div>
    )
}

export { TrendPlot };