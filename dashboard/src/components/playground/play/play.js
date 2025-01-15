import { useState } from "react"
import { Button } from "react-bootstrap"

let renderCounter = 0;
class myClass{
  constructor(name){
    this.name = name;
  }
  clone(){
    return new myClass(this.name);
  }
}
function Play(){
    const [state, setState] = useState(1)
    const [stateList, setStateList] = useState([1, 2, 3]);
    const [stateDict, setStateDict] = useState({'x' : 1, 'y' : 2});
    const [stateClass, setStateClass] = useState(new myClass('abc'));

    function incrementStateCase1(){
        // Note that the component will re-render always when state is changed
        setState(state + 1);
    }

    function incrementStateCase2(){
        // Now that the state will only increment by 1, not by 3
        setState(state + 1);
        setState(state + 1);
        setState(state + 1);
    }

    function incrementStateCase3(){
        // If after calling the setState, the value is same, the component won't re-render
        setState(state);
    }

    function incrementStateCase4(){
      // The Cases where Re-render won't happen
      stateList[0] = -1;
      stateList.push(80);
      setStateList(stateList); // Beacuse reference is not Changed
      console.log(stateList);

      stateDict['a'] = 'b';
      setStateDict(stateDict);
      console.log(stateDict)

      stateClass.name = 'No Re-render'
      setStateClass(stateClass)
      console.log(stateClass);
    }

    function incrementStateCase5(){
      // The Cases where Re-render will always happen even if value is not changed (but reference is changed)
      stateList[0] = 9; // You can remove this line, and still it will re-render
      setStateList([...stateList]); // Beacuse reference is not Changed
      console.log(stateList);

      stateDict['a'] = 'b'; // You can remove this line, and still it will re-render
      setStateDict({...stateDict});
      console.log(stateDict)

      setStateClass(stateClass.clone());
      console.log(stateClass);
    }

    console.log("Rendering Components ", renderCounter += 1)
    return (
        <div>
            <p>Current State-Variable is {state}</p>
            <p>Current State-List is {stateList}</p>
            <p>Render-Count is {renderCounter}</p>
            <Button variant="outline-primary" className="ms-3" onClick={incrementStateCase1}>Case-1</Button>
            <Button variant="outline-primary" className="ms-3" onClick={incrementStateCase2}>Case-2</Button>
            <Button variant="outline-primary" className="ms-3" onClick={incrementStateCase3}>Case-3</Button>
            <Button variant="outline-primary" className="ms-3" onClick={incrementStateCase4}>Won't Re-render</Button>
            <Button variant="outline-primary" className="ms-3" onClick={incrementStateCase5}>Always Re-render</Button>
        </div>
    )
}

export {Play}