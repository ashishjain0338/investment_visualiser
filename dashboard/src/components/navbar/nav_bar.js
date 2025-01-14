import { Navbar, Nav, Button, Container } from "react-bootstrap";

function NavBar(){
    return (
      <div>
          <Navbar bg="light" variant="light" expand="lg" style={{ boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}>
              <Container>
                  <Navbar.Brand href="/">Investment Visualiser</Navbar.Brand>
                  <Navbar.Toggle aria-controls="basic-navbar-nav" />
                  <Nav className="ms-auto">
                      <Nav.Link href="/" style={{ color: "#333" }}>Home</Nav.Link>
                      <Nav.Link href="/play" style={{ color: "#333" }}>Play</Nav.Link>
                      <Nav.Link href="#contact" style={{ color: "#333" }}>Contact</Nav.Link>
                  </Nav>
  
                  <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="ms-auto">
                      <Nav.Link href="#contact" style={{ color: "#333" }}>Profile</Nav.Link>
                      <Button variant="outline-primary" className="ms-3">Get Started</Button>
                  </Nav>
                  </Navbar.Collapse>
              </Container>
      </Navbar>
      </div>
      
    );
  };

export {NavBar}