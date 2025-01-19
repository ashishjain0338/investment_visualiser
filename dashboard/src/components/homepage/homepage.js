import { Main } from "../main/main"

function HomePage(props) {
    // Returning the HTML-DOM
    return (
        <div>
            <Main 
            defaultStateIndex={props.defaultStateIndex} 
            stateDownloadSignal={props.stateDownloadSignal}
            loadedState={props.loadedState}
            />
        </div>
    )
}

// Export the function so that we can import it in App.js
export { HomePage }