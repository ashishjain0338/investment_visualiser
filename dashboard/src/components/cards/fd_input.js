import { InputGroup, Form, Button, Card, Row, Col } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { Trash, Duplicate } from "../icons/icons";
import './card.css'

const FdCard = React.memo((props) => {
    const [obj, setobj] = useState(props.obj)

    useEffect(() => {
        setobj(props.obj);
    }, [props.obj])

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
                                onClick={() => {props.deleteFxn(props.index)}}
                            ><Trash /></Button>
                            <Button className="btn btn-success" style={{ float: 'right', margin: "0 1% 0 3%" }}
                                onClick={() => {props.duplicateFxn(props.index)}}
                            ><Duplicate /></Button>
                            <Card.Text style={{ float: 'right', marginRight: "10%" }}>FD</Card.Text>
                        </Col>
                    </Row>

                    <hr></hr>
                    <InputGroup className="mb-3">
                        <InputGroup.Text>Principal</InputGroup.Text>
                        <Form.Control aria-label="principal"
                            value={obj.principal}
                            onChange={(e) => { updateEvent("principal", e.target.value) }}
                        />

                        <InputGroup.Text>Time</InputGroup.Text>
                        <Form.Control aria-label="Time in Days"
                            value={obj.period}
                            onChange={(e) => { updateEvent("period", e.target.value) }}
                        />
                        <InputGroup.Text>Days</InputGroup.Text>
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <InputGroup.Text>Rate</InputGroup.Text>
                        <Form.Control aria-label="Rate"
                            value={obj.rate}
                            onChange={(e) => { updateEvent("rate", e.target.value) }}
                        />
                        <InputGroup.Text>%</InputGroup.Text>
                        <Form.Select aria-label="Default select example"
                            value={obj.cumulative_freq}
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
                            value={obj.premature}
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