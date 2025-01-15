import { Card } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { InputGroup, Form } from "react-bootstrap";
import React from "react";
import { useState } from "react";
import './card.css'

const FdCard = React.memo((props) => {
    const [obj, setobj] = useState(props.obj)

    function updateEvent(attributeName, value) {
        // Clone the object to create a new reference, in order to component to re-render after setObj()
        // console.log(obj);
        const clone = obj.clone();
        clone.updateField(attributeName, value);
        setobj(clone);
        props.parentUpdateFxn(props.index, clone);
    }

    return (
        <div >
            {obj.principal}
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
                            <Card.Text style={{ float: 'right' }}>FD</Card.Text>
                        </Col>
                    </Row>

                    <hr></hr>
                    <InputGroup className="mb-3">
                        <InputGroup.Text>Principal</InputGroup.Text>
                        <Form.Control aria-label="principal"
                            defaultValue={obj.principal}
                            onChange={(e) => { updateEvent("principal", e.target.value) }}
                        />

                        <InputGroup.Text>Time</InputGroup.Text>
                        <Form.Control aria-label="Time in Days"
                            defaultValue={obj.period}
                            onChange={(e) => { updateEvent("period", e.target.value) }}
                        />
                        <InputGroup.Text>Days</InputGroup.Text>
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <InputGroup.Text>Rate</InputGroup.Text>
                        <Form.Control aria-label="Rate"
                            defaultValue={obj.rate}
                            onChange={(e) => { updateEvent("rate", e.target.value) }}
                        />
                        <InputGroup.Text>%</InputGroup.Text>
                        <Form.Select aria-label="Default select example"
                            defaultValue={obj.cumulative_freq}
                            onChange={(e) => { updateEvent("cumulative_freq", e.target.value) }}
                        >
                            <option disabled>Cumulative-Frequency</option>
                            <option value="0">None</option>
                            <option value="1">Monthly</option>
                            <option value="4">Quaterly</option>
                            <option value="6">Twice a Year</option>
                            <option value="12">Annualy</option>

                        </Form.Select>
                        <InputGroup.Text>Premature</InputGroup.Text>
                        <Form.Control aria-label="Premature" 
                            defaultValue={obj.premature}
                            onChange={(e) => { updateEvent("premature", e.target.value) }}
                        />
                        <InputGroup.Text>%</InputGroup.Text>
                    </InputGroup>
                </Card.Body>
            </Card>
        </div>
    )
})

export { FdCard };