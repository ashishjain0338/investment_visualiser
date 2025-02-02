import { TrendPlot } from "../line-plot/line_plot"
import { Dropdown, Row, Col, DropdownButton, ButtonGroup } from "react-bootstrap"
import { useState, useCallback, useEffect } from "react"
import { FD } from "../../logic/fd"
import { RawData } from "../../logic/rawdata"
import { Tax } from "../../logic/tax"
import { DayConverter } from "../day-converter/day-converter"
import { getOptionsForDiffView } from "./main_helper"
import { examples } from "../../saved_states/example"
import { DumpClass, LoadClass, DownloadData, saveToLocalStorage, loadFromLocalStorage } from "../../logic/class_loadDump"

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

// let testTaxState = [
//     new Tax("First", [{ limit: 400, rate: 70 }, { limit: 30, rate: 45 }], ""),
// ]

let MASTER_TESTING = false;
let MASTER_STATE = undefined;

// EnabledCards & theirCardClassName MUST BE SAME
var enabledCards = ["FD", "RawData", "sip", "tax"];
// var enabledCards = ["RawData"];

function Main(props) {
    const [state, setState] = useState([])
    // This state-variable will signal TrendPlot to only re-calculate this index

    const [indexUpdated, setIndexUpdated] = useState(-1);
    const [percentageView, setpercentageView] = useState(false);
    const [diffView, setdiffView] = useState(false);
    const [diffIndex, setDiffIndex] = useState(-1);

    const handlePercentageToggle = () => {
        const newState = !percentageView;
        setpercentageView(newState);
    };
    const handleDiffToggle = () => {
        const newState = !diffView;
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

    const deleteFxn = useCallback(
        (indexToDelete) => {
            setState((prevState) => prevState.filter((_, index) => index !== indexToDelete));
        }
    )

    const duplicateFxn = useCallback(
        (indexToDuplicate) => {
            const newArray = [...state]; // Create a copy of the state array
            newArray.splice(indexToDuplicate + 1, 0, state[indexToDuplicate]); // Insert duplicate at index + 1
            setState(newArray);

        }
    )


    useEffect(() => {
        if (props.defaultStateIndex != -1) {
            loadState(examples[props.defaultStateIndex]);
        }
    },
        [props.defaultStateIndex]
    )



    useEffect(() => {
        // -1 suggests Page-Refresh, Not a Button Click
        if (props.stateDownloadSignal != -1) {
            let downloadObj = getStateForStorage()
            DownloadData(downloadObj, "export.json");
        }
    },
        [props.stateDownloadSignal]
    )

    useEffect(() => {
        if (typeof props.loadedState !== "undefined") {
            loadState(props.loadedState);
        }
    }, [props.loadedState]
    )

    useEffect(() => {
        if (props.stateSaveSignal != -1) {
            saveToLocalStorage(`savedState_pageId_${props.pageId}`, getStateForStorage());
            alert('Saved');
        }
    }, [props.stateSaveSignal])


    function getAddNewDropDownOptions(enabledCards) {
        let prettyCardTypes = {
            "FD": "Fixed Deposit",
            "RawData": "Raw-Data",
            "sip": "Mutual Funds",
            "Tax": "Tax"
        }
        var out = []
        for (let i = 0; i < enabledCards.length; i++) {
            out.push(
                <Dropdown.Item onClick={() => { addCard(enabledCards[i]) }}>{prettyCardTypes[enabledCards[i]]}</Dropdown.Item>
            )
        }
        return out;
    }

    function loadState(newState) {
        try {
            // console.log("LoadState : ", newState);
            let stateList = []
            for (let i = 0; i < newState['state'].length; i++) {
                let loadedInstance = LoadClass(newState['state'][i]);
                let className = loadedInstance.getClassName();
                console.log(loadedInstance);
                if (props.enabledCards.includes(className)) {
                    stateList.push(loadedInstance);
                }
            }
            
            setpercentageView(newState['percentage-view']);
            setdiffView(newState['diff-view'])
            setDiffIndex(-1);
            if (MASTER_TESTING) {
                stateList = MASTER_STATE;
            }
            setState(stateList);
        } catch (err) {
            alert("Unable To Load-State| Will Load Default");
            console.log("State-Load Error", err);
            setpercentageView(false);
            setdiffView(false)
            setDiffIndex(-1);
            setState([]);

        }

    }

    function getStateForStorage() {
        let curState = [];
        for (let i = 0; i < state.length; i++) {
            curState.push(DumpClass(state[i]));
        }

        let obj = {
            "title": "Your Title",
            "state": curState,
            "percentage-view": percentageView,
            "diff-view": diffView,
        }
        return obj;
    }

    /*
    The Function will be called to add new-card, It will add card-obj to state as per input
    */
    function addCard(identifier) {
        let obj = undefined;
        switch (identifier) {
            case 'FD':
                obj = new FD();
                console.debug('New FD-Object Created', obj);
                setState(state => [...state, obj]);
                break;
            case 'RawData':
                obj = new RawData();
                console.debug('New Raw-Object Created', obj);
                setState(state => [...state, obj]);
                break;
            case 'Tax':
                obj = new Tax();
                console.debug('New Tax-Object Created', obj);
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
                    {state[i].getReactComponent(i, stateUpdateFxn, deleteFxn, duplicateFxn)}
                </Col>
            );
        }
        return out;
    }

    return (
        <div>
            <TrendPlot
                state={state}
                indexUpdated={indexUpdated}
                percentageView={percentageView}
                diffView={diffView}
                diffIndex={diffIndex}
                plotSettings={props.plotSettings}
            />
            <br></br>

            <div className="container">
                <div className="row">
                    <div className="col-lg-6">
                        <DayConverter />
                    </div>
                    <div className="col-lg-6">
                        <DropdownButton id="dropdown-basic-button" style={{ float: "right" }} title="Add New">
                            {getAddNewDropDownOptions(props.enabledCards)}
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