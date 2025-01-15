import { Card } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { InputGroup, Form } from "react-bootstrap";
import './card.css'

function FdCard() {
    return (
        <div >
            <Card className="mycard" >
                <Card.Body >
                    <Row>
                        <Col>
                            <Card.Title><Form.Control aria-label="Amount (to the nearest dollar)" /></Card.Title>
                        </Col>
                        <Col>
                            <Card.Text style={{float: 'right'}}>FD</Card.Text>
                        </Col>
                    </Row>

                    <hr></hr>
                        <InputGroup className="mb-3">
                            <InputGroup.Text>Principal</InputGroup.Text>
                            <Form.Control aria-label="Amount (to the nearest dollar)" />

                            <InputGroup.Text>Time</InputGroup.Text>
                            <Form.Control aria-label="Amount (to the nearest dollar)" />
                            <InputGroup.Text>Days</InputGroup.Text>
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Text>Rate</InputGroup.Text>
                            <Form.Control aria-label="Rate" />
                            <InputGroup.Text>%</InputGroup.Text>
                            <Form.Select aria-label="Default select example">
                                <option >Cumulative-Frequency</option>
                                <option value="1">None</option>
                                <option value="2">Monthly</option>
                                <option value="3">Quaterly</option>
                            </Form.Select>
                            <InputGroup.Text>Premature</InputGroup.Text>
                            <Form.Control aria-label="Rate" />
                            <InputGroup.Text>%</InputGroup.Text>  
                        </InputGroup>
                </Card.Body>
            </Card>
        </div>
    )
}

export { FdCard };