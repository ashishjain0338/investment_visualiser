import { examples } from "../../saved_states/example";
import { ListGroup } from "react-bootstrap";

function getExamplesHTML(changeDefaultStateFromExamples, closePopupFxn, pageId) {
    let out = []
    for (let i = 0; i < examples.length; i++) {
        let curPageId = examples[i]["pageId"];
        if(curPageId != pageId)
            continue;
        let title = examples[i]["title"];
        out.push(
            <ListGroup.Item
                key={i}
                action
                onClick={() => {
                    changeDefaultStateFromExamples(i);
                    closePopupFxn()
                }}
                className="d-flex justify-content-between align-items-center"
            >
                {title}
            </ListGroup.Item>
        )
    }
    return out;
}


export { getExamplesHTML }