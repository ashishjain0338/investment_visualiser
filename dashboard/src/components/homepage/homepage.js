import { Main } from "../main/main"
import { MyNavBar } from "../navbar/nav_bar";
import { useState, useCallback, useEffect } from 'react';
import { loadFromLocalStorage } from "../../logic/class_loadDump";

function HomePage(props) {
    // Returning the HTML-DOM
    const [defaultStateIndex, setDefaultStateIndex] = useState(-1)
    const [loadState, setLoadState] = useState(undefined)
    const [stateDownloadSignal, setStateDownloadSignal] = useState(-1);
    const [stateSaveSignal, setStateSaveSignal] = useState(-1);

    const downloadSignal = useCallback(() => {
        if (stateDownloadSignal == -1) {
            setStateDownloadSignal(0);
        } else {
            setStateDownloadSignal((stateDownloadSignal + 1) % 2); // Toggling
        }

    })

    const saveSignal = useCallback(() => {
        if (stateSaveSignal == -1) {
            setStateSaveSignal(0);
        } else {
            setStateSaveSignal((stateSaveSignal + 1) % 2); // Toggling
        }

    })


    const setLoadStateCallBack = useCallback((loadedState) => {
        setLoadState(loadedState);
    })

    // At First-render, Load-State from Session-Storage
    useEffect(() => {
        let savedState = loadFromLocalStorage(`savedState_pageId_${props.pageId}`);
        console.warn(`No saved state found from local-storage for pageId ${props.pageId}`)
        if (typeof savedState !== "undefined" && savedState != null) {
            setLoadState(savedState);
        }

    }, [])

    return (
        <div>
            <MyNavBar
                changeDefaultStateFromExamples={setDefaultStateIndex}
                downloadSignal={downloadSignal}
                saveSignal={saveSignal}
                setLoadState={setLoadStateCallBack}
                pageId={props.pageId}

            />
            <Main
                {...props}
                defaultStateIndex={defaultStateIndex}
                stateDownloadSignal={stateDownloadSignal}
                stateSaveSignal={stateSaveSignal}
                loadedState={loadState}
            />
        </div>
    )
}

// Export the function so that we can import it in App.js
export { HomePage }