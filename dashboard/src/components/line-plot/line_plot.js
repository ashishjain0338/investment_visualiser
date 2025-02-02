import { Line } from "react-chartjs-2";
// Chart is imported to avoid error "category is not a registered scale"
import Chart from "chart.js/auto";
import { useEffect, useState } from "react";
import { diffViewUnevenLength, convertToPercentage2D, getQuaterLabels, diffViewUnevenLengthWithXY } from "./helper";
import annotationPlugin from 'chartjs-plugin-annotation';

Chart.register(annotationPlugin);

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

// const options = {
//     responsive: true,
//     maintainAspectRatio: false,
//     legend: {
//         position: "none"
//     },
//     scales: {
//         x: {
//             type: "linear",
//         },
//         y: {
//             title: {
//                 display: true,
//                 text: 'Amount (Rs)'
//             },
//         }
//     },
//     plugins: {
//         annotation: {
//             annotations: {

//                 "point1": {
//                     type: 'point',
//                     xValue: 12,
//                     yValue: 5,
//                     backgroundColor: 'rgba(255, 99, 132, 0.25)',
//                     shadowBlur: 15,
//                 },
//                 "point2": {
//                     type: 'point',
//                     xValue: 15,
//                     yValue: 2.65,
//                     backgroundColor: selectedColors[0],
//                     borderWidth: 1.5,
//                 },
//             }
//         }
//     }
// }

function TrendPlot(props) {
    const [data, setdata] = useState(intialData);
    const [plotOptions, setPlotOptions] = useState(props.plotSettings["options"]);

    useEffect(
        () => {
            let out = [], titles = [];
            let maxDataSize = 0;
            let xyList = [];
            for (let i = 0; i < props.state.length; i++) {
                let obj = props.state[i]
                let [x, y] = obj.getDataForPlot(obj.period);
                // Get all data in 2D-Matrix
                xyList.push([x, y]);
                titles.push(obj.title);
                maxDataSize = Math.max(maxDataSize, y.length);

            }
            // Modify Data based on View
            if (props.percentageView) {
                xyList = convertToPercentage2D(xyList);
            }
            if (props.diffView) {
                xyList = diffViewUnevenLengthWithXY(xyList, props.diffIndex);
            }

            for (let i = 0; i < xyList.length; i++) {
                // Combine x, y : Convert CollectData[i] --> x,y
                let inter = [];
                let x = xyList[i][0], y = xyList[i][1];
                for (let j = 0; j < x.length; j++) {
                    inter.push({
                        x: x[j],
                        y: y[j]
                    })
                }
                out.push(getSinglePlotData(inter, titles[i], selectedColors[i % 12]));
            }

            if (props.plotSettings["highlightPoints"]) {
                let points = getXYtoHighlight(xyList);
                let plotOptions = getOptionsForPointHighlighing(points);
                setPlotOptions(plotOptions);
            }

            setdata({ datasets: out }
            );

        },
        [props.state, props.indexUpdated, props.percentageView, props.diffView, props.diffIndex]
    )


    function getXYtoHighlight(xyList) {
        let points = [];
        for (let i = 0; i < props.state.length; i++) {
            let obj = props.state[i]
            let xToHightlight = obj.getHighlightPoints(obj.period);
            xToHightlight.sort();
            // Find Corresponding y for each x to highlight from xylist
            let curX = xyList[i][0];
            let inter = [], interIndex = 0;
            for (let j = 0; j < curX.length && interIndex < xToHightlight.length; j++) {
                if (curX[j] == xToHightlight[interIndex]) {
                    inter.push({
                        x: xToHightlight[interIndex],
                        y: xyList[i][1][j]
                    })
                    interIndex++;
                }
            }

            points.push(inter);
        }
        return points;
    }

    function getOptionsForPointHighlighing(points) {
        let pointSpec = {}
        let id = 0
        for (let i = 0; i < points.length; i++) {
            let color = selectedColors[i % 12]
            for (let j = 0; j < points[i].length; j++) {
                let x = points[i][j].x, y = points[i][j].y;
                pointSpec[`pointId_${id}`] = {
                    type: 'point',
                    xValue: x,
                    yValue: y,
                    backgroundColor: color,
                    borderWidth: 1.5,
                }
                id++;
            }
        }

        return {
            ...plotOptions,
            plugins: {
                annotation: {
                    annotations: pointSpec
                }
            }
        }
    }

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
            pointRadius: 2,
        }
        return out;
    }


    return (
        <div>
            {/* <h4 className='light_text' style={{ textAlign: "center" }}>Line-Plot</h4> */}
            <div className='container-fluid light_text' >
                <Line data={data} options={plotOptions} height="300px" />
            </div>

        </div>
    )
}

export { TrendPlot };