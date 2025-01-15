import { TrendPlot } from "../line-plot/line_plot"
import { RawDataCard } from "../cards/rawData_input"
import { FdCard } from "../cards/fd_input"
import { Dropdown, Row, Col, DropdownButton } from "react-bootstrap"
import { useState, useCallback } from "react"
import { FD } from "../../logic/fd"
import { RawData } from "../../logic/rawdata"

let testStateLen2 = [new FD("First", 100000, 6.7, 666, 0), new FD("Every Month", 100000, 6.7, 666, 1), new FD("Quaterly", 100000, 6.7, 666, 4)]
let testStateLen10 = []
for (let i = 0; i < 10; i++) {
    testStateLen10.push(new FD("First_" + i, 100, 7 + 4*i, 1000, 1));
}

function Main() {
    const [state, setState] = useState(testStateLen2)
    // This state-variable will signal TrendPlot to only re-calculate this index
    const [indexUpdated, setIndexUpdated] = useState(-1);

    const [percentageView, setpercentageView] = useState(false);
    const [diffView, setdiffView] = useState(false);

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
            <TrendPlot state={state} indexUpdated={indexUpdated} percentageView={percentageView} diffView={diffView}/>
            <br></br>

            <div className="container">
                <DropdownButton id="dropdown-basic-button" style={{ float: "right" }} title="Add New">
                    <Dropdown.Item onClick={() => { addCard("fd") }}>Fixed Deposit</Dropdown.Item>
                    <Dropdown.Item onClick={() => { addCard("raw") }}>Raw-Data</Dropdown.Item>
                    <Dropdown.Item onClick={() => { addCard("sip") }}>Mutual Funds</Dropdown.Item>
                </DropdownButton>

                <button
                    className={`btn ${diffView ? "btn-success" : "btn-danger"} px-4`}
                    onClick={handleDiffToggle}
                    style={{float: 'right', marginRight: '30px'}}
                >
                    Diff-View {diffView ? "ON" : "OFF"}
                </button>

                <button
                    className={`btn ${percentageView ? "btn-success" : "btn-danger"} px-4`}
                    onClick={handlePercentageToggle}
                    style={{float: 'right', marginRight: '30px'}}
                >
                    Percentage-View {percentageView ? "ON" : "OFF"}
                </button>

                <br></br>
                <br></br>
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