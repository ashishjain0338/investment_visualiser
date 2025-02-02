import { Card, Row, Col, InputGroup, Form, Button, Table, DropdownButton, Dropdown, Collapse } from "react-bootstrap";
import { useState, useEffect } from "react";
import React from "react";
import { Trash, Duplicate, Plus, ColumnGap, CaretDownFill, CaretUpFill } from "../icons/icons";
import './card.css'
import { TAX_SLABS } from "../../saved_states/taxSlab";

const TaxDataCard = React.memo((props) => {
    const [obj, setobj] = useState(props.obj);
    const [tableCollapse, setTableCollapse] = useState(true);
    useEffect(() => {
        setobj(props.obj);
    }, [props.obj]
    )

    function getLoadDropDownOptions() {
        let out = [];
        for (let i = 0; i < TAX_SLABS.length; i++) {
            out.push(
                <Dropdown.Item onClick={() => { loadTableFromPreSetTaxSlabs(i) }}>{TAX_SLABS[i]['title']}</Dropdown.Item>
            )
        }
        return out;
    }

    function loadTableFromPreSetTaxSlabs(index) {
        const clone = obj.clone();
        clone.updateTaxTable("replace", undefined, undefined, [...TAX_SLABS[index]['tax-slabs']]);
        setobj(clone);
        props.parentUpdateFxn(props.index, clone);
        setTableCollapse(true);
    }

    function addNewTaxRow() {
        const clone = obj.clone();
        clone.updateTaxTable("add");
        setobj(clone);
        /* Since the new row is 0,0 {Which have no effect on plot-data render}
            So, we decided not to call parent
        */
    }
    function deleteEventFromTable(index) {
        const clone = obj.clone();
        clone.updateTaxTable("delete", index);
        setobj(clone);
        props.parentUpdateFxn(props.index, clone);
    }

    function updateEventFromTable(index, attributeName, value) {
        const clone = obj.clone();
        clone.updateTaxTable("update", index, attributeName, value);
        setobj(clone);
        props.parentUpdateFxn(props.index, clone);
    }

    function updateEvent(attributeName, value) {
        // Clone the object to create a new reference, in order to component to re-render after setObj()
        const clone = obj.clone();
        clone.updateField(attributeName, value);
        setobj(clone);
        props.parentUpdateFxn(props.index, clone);
    }


    return (
        <div >
            {/* {JSON.stringify(obj)} */}
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
                            <DropdownButton variant="light" id="dropdown-basic-button" style={{ float: "right" }} title={<ColumnGap />}>
                                {getLoadDropDownOptions()}
                            </DropdownButton>

                            <Card.Text style={{ float: 'right', margin: "4%" }}>Tax</Card.Text>
                        </Col>
                    </Row>

                    <hr></hr>
                    <InputGroup className="mb-3">
                        <InputGroup.Text>Gross-Income</InputGroup.Text>
                        <Form.Control aria-label="Gross-Income"
                            value={obj.taxableIncome}
                            onChange={(e) => { updateEvent("grossIncome", e.target.value) }}
                        />
                    </InputGroup>
                    <InputGroup className="sm-3">
                        <InputGroup.Text>Net-Deductions (Lakhs)</InputGroup.Text>
                        <Form.Control aria-label="Net-Deduction"
                            type="number"
                            value={obj.taxableIncome}
                            onChange={(e) => { updateEvent("deduction", e.target.value) }}
                        />

                        <InputGroup.Text>
                            <Form.Check // prettier-ignore
                                type="switch"
                                id="custom-switch"
                                label="Cess"
                                onChange={(e) => { updateEvent("cessEnabled", e.target.checked) }}
                            />
                        </InputGroup.Text>

                        <InputGroup.Text>
                            <Button className="btn btn-light"
                                onClick={() => setTableCollapse(!tableCollapse)}
                            >
                                {tableCollapse ? <CaretUpFill /> : <CaretDownFill />}
                            </Button>
                        </InputGroup.Text>
                    </InputGroup>
                    {/* New Code */}
                    <Collapse in={tableCollapse}>
                        <div>
                            <Table bordered hover size="sm" >
                                <thead>
                                    <tr>
                                        <th>Tax Slab Limit (Lakhs)</th>
                                        <th>Rate (%)

                                        </th>
                                        <th><Button className="btn btn-light" style={{ float: 'right', margin: "0 1% 0 3%" }}
                                            onClick={addNewTaxRow}
                                        >
                                            <Plus />
                                        </Button></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {obj.taxSlabsRaw.map((row, index) => (
                                        <tr key={index}>
                                            <td>
                                                {index === obj.taxSlabsRaw.length - 1 ? (
                                                    <InputGroup.Text>Rest</InputGroup.Text>
                                                ) : (
                                                    <Form.Control
                                                        type="number"
                                                        value={row.limit}
                                                        onChange={(e) => updateEventFromTable(index, "limit", e.target.value)}
                                                    />
                                                )}
                                            </td>
                                            <td>
                                                <Form.Control
                                                    type="number"
                                                    // step={0.01}
                                                    value={row.rate}
                                                    onChange={(e) => updateEventFromTable(index, "rate", e.target.value)}
                                                />
                                            </td>
                                            <td>
                                                {index === obj.taxSlabsRaw.length - 1 ? (
                                                    <Button className="btn btn-secondary" style={{ float: 'right', margin: "0 1% 0 3%" }}
                                                        onClick={() => { }} disabled
                                                    ><Trash /></Button>
                                                ) : (
                                                    <Button className="btn btn-secondary" style={{ float: 'right', margin: "0 1% 0 3%" }}
                                                        onClick={() => { deleteEventFromTable(index) }}
                                                    ><Trash /></Button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>

                    </Collapse>
                </Card.Body>
            </Card>
        </div>
    )
})

export { TaxDataCard };