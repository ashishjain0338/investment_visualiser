import { Card, Row, Col, InputGroup, Form } from "react-bootstrap";
import { useState } from "react";
import React from "react";
import './card.css'

const RawDataCard = React.memo((props) => {
    const [obj, setobj] = useState(props.obj)

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
                                defaultValue={obj.title}
                                onChange={(e) => { updateEvent("title", e.target.value) }}
                            /></Card.Title>
                        </Col>
                        <Col>
                            <Card.Text style={{ float: 'right' }}>Raw Data</Card.Text>
                        </Col>
                    </Row>

                    <hr></hr>
                    <InputGroup className="mb-3">
                        <InputGroup.Text>CSV-Data</InputGroup.Text>
                        <Form.Control as="textarea" aria-label="csv-data" 
                        defaultValue={obj.csv}
                        onChange={(e) => { updateEvent("csv", e.target.value) }}
                        />
                    </InputGroup>
                </Card.Body>
            </Card>
        </div>
    )
})

export { RawDataCard };