// import './play.css';
import { Navbar, Nav, Button, Container } from "react-bootstrap";


function DarkModeNavBar(){
    return (
      <Navbar bg="dark" variant="dark" expand="lg" style={{ boxShadow: "0 2px 4px rgba(255, 255, 255, 0.1)" }}>
        <Container>
          <Navbar.Brand href="#" style={{ color: "#ffffffcc" }}>BrandName</Navbar.Brand>
          <Navbar.Toggle aria-controls="dark-navbar-nav" />
          <Nav className="ms-auto">
          <Nav.Link href="#home" style={{ color: "#ffffffcc" }}>Home</Nav.Link>
              <Nav.Link href="#about" style={{ color: "#ffffffcc" }}>About</Nav.Link>
              <Nav.Link href="#contact" style={{ color: "#ffffffcc" }}>Contact</Nav.Link>
          </Nav>

          <Navbar.Collapse id="dark-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="#contact" style={{ color: "#ffffffcc" }}>Profile</Nav.Link>
              <Button variant="outline-light" className="ms-3">Get Started</Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  };
  
  export {DarkModeNavBar};


function LightModeNavBar(){
  return (
    <div>
        <Navbar bg="light" variant="light" expand="lg" style={{ boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}>
            <Container>
                <Navbar.Brand href="#">BrandName</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Nav className="ms-auto">
                    <Nav.Link href="#home" style={{ color: "#333" }}>Home</Nav.Link>
                    <Nav.Link href="#about" style={{ color: "#333" }}>About</Nav.Link>
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

export {LightModeNavBar};

