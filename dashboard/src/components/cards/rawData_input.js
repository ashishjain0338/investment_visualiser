import { Card, Row, Col, InputGroup, Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import React from "react";
import { Trash, Duplicate } from "../icons/icons";
import './card.css'

const RawDataCard = React.memo((props) => {
    const [obj, setobj] = useState(props.obj)

    useEffect(() => {
        setobj(props.obj);
    }, [props.obj]
    )

    function updateEvent(attributeName, value) {
        // Clone the object to create a new reference, in order to component to re-render after setObj()
        const clone = obj.clone();
        clone.updateField(attributeName, value);
        setobj(clone);
        props.parentUpdateFxn(props.index, clone);
    }

    return (
        <div >
            <Card className="mycard" >
                <Card.Body >
                    <Row>
                        <Col>
                            <Card.Title><Form.Control aria-label="Title"
                                value={obj.title}
                                onChange={(e) => { updateEvent("title", e.target.value) }}
                            /></Card.Title>
                        </Col>
                        <Col>
                            <Button className="btn btn-danger" style={{ float: 'right', margin: "0 1% 0 3%" }}
                                onClick={() => { props.deleteFxn(props.index) }}
                            ><Trash /></Button>
                            <Button className="btn btn-success" style={{ float: 'right', margin: "0 1% 0 3%" }}
                                onClick={() => { props.duplicateFxn(props.index) }}
                            ><Duplicate /></Button>
                            <Card.Text style={{ float: 'right' }}>Raw Data</Card.Text>
                        </Col>
                    </Row>

                    <hr></hr>
                    <InputGroup className="mb-3">
                        <InputGroup.Text>CSV-Data</InputGroup.Text>
                        <Form.Control as="textarea" aria-label="csv-data"
                            value={obj.csv}
                            onChange={(e) => { updateEvent("csv", e.target.value) }}
                        />
                    </InputGroup>
                </Card.Body>
            </Card>
        </div>
    )
})

export { RawDataCard };