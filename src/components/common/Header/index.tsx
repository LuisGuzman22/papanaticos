import React from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";

export const HeaderComponent = () => {
  return (
    <div>
      <Navbar variant="dark" bg="dark" expand="lg">
        <Container fluid>
          <Navbar.Brand href="#home">Papanaticos</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-dark-example" />
          <Navbar.Collapse id="navbar-dark-example">
            <Nav>
              <NavDropdown
                id="nav-dropdown-dark-example"
                title="Acciones"
                menuVariant="dark"
              >
                <NavDropdown.Item href="#action/3.1">Tablero</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Finalizar dia
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};
