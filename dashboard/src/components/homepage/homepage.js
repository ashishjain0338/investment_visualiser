import { Main } from "../main/main"

function HomePage(props) {
    // Returning the HTML-DOM
    return (
        <div>
            <Main
                defaultStateIndex={props.defaultStateIndex}
                stateDownloadSignal={props.stateDownloadSignal}
                stateSaveSignal={props.stateSaveSignal}
                loadedState={props.loadedState}
                enabledCards={props.enabledCards}
            />
        </div>
    )
}

// Export the function so that we can import it in App.js
export { HomePage }