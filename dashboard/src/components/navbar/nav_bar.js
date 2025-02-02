import { Navbar, Nav, Button, Container, Modal, ListGroup } from "react-bootstrap";
import { useState } from 'react';
import { getExamplesHTML } from "./navbar_helper";

function MyNavBar(props) {
    const [show, setShow] = useState(false);

    const popUpClose = () => setShow(false);
    const popUpShow = () => setShow(true);


    const handleFileChange = (event) => {
        const file = event.target.files[0];

        if (file && file.type === "application/json") {
            const reader = new FileReader();
            reader.onload = () => {
                try {
                    // Parse the JSON data
                    const parsedData = JSON.parse(reader.result);
                    props.setLoadState(parsedData);
                } catch (error) {
                    alert("Invalid JSON file");
                }
            };

            reader.readAsText(file); // Read the file as text
        } else {
            alert("Please upload a valid JSON file");
        }
    };

    function performReload(newHash){
        window.location.hash = newHash
        window.location.reload()
    }

    return (
        <div>
            <Navbar bg="light" variant="light" expand="lg" style={{ boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}>
                <Container>
                    <Navbar.Brand  href="#/" onClick={() => {performReload("#/investment_visualiser/")}}>Investment Visualiser</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Nav className="ms-auto">
                        {/* WE need reload, for the useEffect to get called for loading Different States for different pageId */}
                        <Nav.Link href="#/investment_visualiser/"  onClick={() => {performReload("#/investment_visualiser/")}} style={{ color: "#333" }}>Home</Nav.Link>
                        <Nav.Link href="#/investment_visualiser/tax" onClick={() => {performReload("#/investment_visualiser/tax")}} style={{ color: "#333" }}>Tax</Nav.Link>
                        <Nav.Link href="#/investment_visualiser/play" style={{ color: "#333" }}>Play</Nav.Link>
                    </Nav>

                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <input
                                type="file"
                                accept=".json"
                                onChange={handleFileChange}
                                id="jsonFileInput"
                                style={{ display: "none" }} // Hide the default file input
                            />

                            <Button variant="outline-primary" onClick={() => { props.saveSignal() }} className="ms-3">Save</Button>
                            <Button variant="outline-primary" onClick={() => { props.downloadSignal() }} className="ms-3">Export</Button>
                            <Button variant="outline-primary" onClick={() => document.getElementById('jsonFileInput').click()} className="ms-3">Load</Button>
                            <Button variant="outline-primary" onClick={popUpShow} className="ms-3">Examples</Button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Modal show={show} onHide={popUpClose} centered >
                <Modal.Header closeButton>
                    <Modal.Title>Examples</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ListGroup>
                        {getExamplesHTML(props.changeDefaultStateFromExamples, popUpClose, props.pageId)}
                    </ListGroup>

                </Modal.Body>
            </Modal>

        </div>

    );
}

export { MyNavBar }