import { Navbar, Nav, Button, Container, Modal, ListGroup } from "react-bootstrap";
import { useState } from 'react';
import { getExamplesHTML} from "./navbar_helper";

function NavBar(props) {
    const [show, setShow] = useState(false);

    const popUpClose = () => setShow(false);
    const popUpShow = () => setShow(true);

    return (
        <div>
            <Navbar bg="light" variant="light" expand="lg" style={{ boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}>
                <Container>
                    <Navbar.Brand href="/investment_visualiser">Investment Visualiser</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Nav className="ms-auto">
                        <Nav.Link href="/investment_visualiser" style={{ color: "#333" }}>Home</Nav.Link>
                        <Nav.Link href="/investment_visualiser/play" style={{ color: "#333" }}>Play</Nav.Link>
                        <Nav.Link href="#contact" style={{ color: "#333" }}>Contact</Nav.Link>
                    </Nav>

                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <Nav.Link href="#contact" style={{ color: "#333" }}>Profile</Nav.Link>
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
                        {getExamplesHTML(props.changeDefaultStateFromExamples, popUpClose)}
                    </ListGroup>

                </Modal.Body>
            </Modal>

        </div>

    );
}

export { NavBar }