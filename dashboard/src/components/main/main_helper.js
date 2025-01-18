import { Dropdown } from "react-bootstrap";

function getOptionsForDiffView(state, updatefxn){
    let out = [<Dropdown.Item onClick={() => { updatefxn(-1) }}>Auto</Dropdown.Item>]
    for(let i = 0; i < state.length; i++){
        let obj = state[i];
        console.log(obj.title);
        out.push(
            <Dropdown.Item onClick={() => { updatefxn(i) }}>{obj.title}</Dropdown.Item>
        )
    }
    return out;
}


export {getOptionsForDiffView}