import { TrendPlot } from "../line-plot/line_plot"
import { Dropdown, Row, Col, DropdownButton, ButtonGroup } from "react-bootstrap"
import { useState, useCallback } from "react"
import { FD } from "../../logic/fd"
import { RawData } from "../../logic/rawdata"
import { DayConverter } from "../day-converter/day-converter"
import { getOptionsForDiffView } from "./main_helper"

let testStateLen2 = [new FD("First", 100000, 6.7, 666, 0), new FD("Every Month", 100000, 6.7, 666, 1), new FD("Quaterly", 100000, 6.7, 666, 4)]
let testStateLen10 = []
for (let i = 0; i < 10; i++) {
    testStateLen10.push(new FD("First_" + i, 10000, 7 + i, 1000, 1));
}
let testStateRaw_FD = [
    new FD("First", 100000, 6.7, 666, 0),
    new FD("Every Month", 100000, 6.7, 666, 1),
    new FD("Quaterly", 100000, 6.7, 666, 4),
    new RawData("Raw", "100000, 101000, 102000, 105000, 102000, 101000")
]

function Main() {
    const [state, setState] = useState(testStateRaw_FD)
    // This state-variable will signal TrendPlot to only re-calculate this index
    const [indexUpdated, setIndexUpdated] = useState(-1);

    const [percentageView, setpercentageView] = useState(false);
    const [diffView, setdiffView] = useState(false);
    const [diffIndex, setDiffIndex] = useState(-1);

    const handlePercentageToggle = () => {
        const newState = !percentageView;
        console.log("New State --> ", newState);
        setpercentageView(newState);
    };
    const handleDiffToggle = () => {
        const newState = !diffView;
        console.log("New State --> ", newState);
        setdiffView(newState);
    };

    const stateUpdateFxn = useCallback(
        (index, newObj) => {
            // clone of current state
            let clone = [...state]
            clone[index] = newObj;
            setState(clone);
        }
    )
    /*
    The Function will be called to add new-card, It will add card-obj to state as per input
    */
    function addCard(identifier) {
        let obj = undefined;
        switch (identifier) {
            case 'fd':
                obj = new FD();
                console.debug('New FD-Object Created', obj);
                setState(state => [...state, obj]);
                break;
            case 'raw':
                obj = new RawData();
                console.debug('New Raw-Object Created', obj);
                setState(state => [...state, obj]);
                break;
            default:
                console.error(`Unknown AddCard Identifier ${identifier}`)
        }
    }

    function convertStatetoHTML() {
        let out = []
        for (let i = 0; i < state.length; i++) {
            out.push(
                <Col>
                    {state[i].getReactComponent(i, stateUpdateFxn)}
                </Col>
            );
        }
        return out;
    }



    return (
        <div>
            {console.log("Re-render : State --> ", state, percentageView)}
            <TrendPlot state={state} indexUpdated={indexUpdated} percentageView={percentageView} diffView={diffView} diffIndex={diffIndex} />
            <br></br>

            <div className="container">
                <div className="row">
                    <div className="col-lg-6">
                        <DayConverter />
                    </div>
                    <div className="col-lg-6">
                        <DropdownButton id="dropdown-basic-button" style={{ float: "right" }} title="Add New">
                            <Dropdown.Item onClick={() => { addCard("fd") }}>Fixed Deposit</Dropdown.Item>
                            <Dropdown.Item onClick={() => { addCard("raw") }}>Raw-Data</Dropdown.Item>
                            <Dropdown.Item onClick={() => { addCard("sip") }}>Mutual Funds</Dropdown.Item>
                        </DropdownButton>


                        <Dropdown as={ButtonGroup} style={{ float: 'right', marginRight: '30px' }}>
                            <button
                                className={`btn ${diffView ? "btn-success" : "btn-danger"} px-4`}
                                onClick={handleDiffToggle}
                            >
                                Diff-View {diffView ? "ON" : "OFF"}
                            </button>

                            <Dropdown.Toggle split className={`${diffView ? "btn-success" : "btn-danger"}`} variant="success" id="dropdown-split-basic" />

                            <Dropdown.Menu>
                                {getOptionsForDiffView(state, setDiffIndex)}
                            </Dropdown.Menu>
                        </Dropdown>

                        <button
                            className={`btn ${percentageView ? "btn-success" : "btn-danger"} px-4`}
                            onClick={handlePercentageToggle}
                            style={{ float: 'right', marginRight: '30px' }}
                        >
                            Percentage-View {percentageView ? "ON" : "OFF"}
                        </button>
                    </div>
                </div>

                {/* <br></br>
                <br></br> */}
                <hr></hr>
                {/* Card-Grid as Follows */}
                <Row xs={1} md={2} className="g-4">
                    {convertStatetoHTML()}
                </Row>
            </div>
        </div>
    )
}

export { Main }