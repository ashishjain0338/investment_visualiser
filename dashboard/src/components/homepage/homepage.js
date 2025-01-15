import { TrendPlot } from "../line-plot/line_plot"
import { FdCard } from "../cards/fd_input"
import { Row } from "react-bootstrap"
import { Col } from "react-bootstrap"

function HomePage() {
    // Returning the HTML-DOM
    return (
        <div>
            <TrendPlot />
            {/* <GridExample /> */}
            {/* Card-Grid as Follows */}
            <br></br>
            <br></br>
            <div className="container">
                <Row xs={1} md={2} className="g-4">
                    {Array.from({ length: 4 }).map((_, idx) => (
                        <Col key={idx}>
                            <FdCard />
                        </Col>
                    ))}
                </Row>
            </div>
            
        </div>
    )
}

// Export the function so that we can import it in App.js
export { HomePage }