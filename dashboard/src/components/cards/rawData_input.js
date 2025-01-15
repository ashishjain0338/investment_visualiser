import { Card } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { InputGroup, Form } from "react-bootstrap";
import React from "react";
import './card.css'

const RawDataCard = React.memo(() => {
    return (
        <div >
            <Card className="mycard" >
                <Card.Body >
                    <Row>
                        <Col>
                            <Card.Title><Form.Control aria-label="Amount (to the nearest dollar)" /></Card.Title>
                        </Col>
                        <Col>
                            <Card.Text style={{float: 'right'}}>Raw Data</Card.Text>
                        </Col>
                    </Row>

                    <hr></hr>
                        <InputGroup className="mb-3">
                            <InputGroup.Text>CSV-Data</InputGroup.Text>
                            <Form.Control as="textarea" aria-label="Amount (to the nearest dollar)" />
                        </InputGroup>
                </Card.Body>
            </Card>
        </div>
    )
})

export { RawDataCard };