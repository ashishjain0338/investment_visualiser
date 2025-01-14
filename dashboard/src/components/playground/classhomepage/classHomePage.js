import React from "react";
import Button from 'react-bootstrap/Button';

class HomePageClass extends React.Component{
    // Optional
    constructor(){
        super();
        console.log("Constructor Called");
        this.dummy = "123"
    }

    // Mandatory
    render(){
        return (
            <div>
                <p>Hello from Class Component</p>
                <p>Your Class Attribute : {this.dummy}</p>
                <button className="btn btn-sm btn-outline-secondary" type="button">Bootstrap Button</button>
                <Button variant="success">Success</Button>
            </div>
        )
    }
}

export {HomePageClass}