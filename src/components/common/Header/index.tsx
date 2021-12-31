import React, { useState } from "react";
import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
  Modal,
  Button,
  Col,
  Form,
  Row,
} from "react-bootstrap";
import { ModalRegister } from "../ModalRegister";

export const HeaderComponent = () => {
  const [show, setShow] = useState(false);

  const handleModal = () => {
    setShow(true);
  };

  const handleClose = () => setShow(false);

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
                <NavDropdown.Item onClick={handleModal}>
                  Nuevo Pedido
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Finalizar dia
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <ModalRegister handleClose={handleClose} show={show} />
    </div>
  );
};
