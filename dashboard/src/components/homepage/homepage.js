import { TrendPlot } from "../line-plot/line_plot"

function HomePage(){
    // Returning the HTML-DOM
    return (
        <div>
            <TrendPlot />
        </div>
    )
}

// Export the function so that we can import it in App.js
export { HomePage }