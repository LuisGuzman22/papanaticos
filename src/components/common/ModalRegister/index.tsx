import React, { MouseEventHandler } from "react";
import { Modal, Form, Row, Col, Button } from "react-bootstrap";

interface IProps {
  show: boolean;
  handleClose: MouseEventHandler<HTMLButtonElement>;
}

export const ModalRegister = (props: IProps) => {
  const { show, handleClose } = props;

  const handleRegister = (event: any) => {
    console.log(event.target);

    event.preventDefault();
  };

  return (
    <div>
      <Modal show={show}>
        <Modal.Header closeButton>
          <Modal.Title>Registro de pedido</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">
                Teléfono
              </Form.Label>
              <Col sm="10">
                <Form.Control defaultValue="+569 5116 7340" />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">
                Pedido
              </Form.Label>
              <Col sm="10">
                <Form.Control placeholder="Papitas" />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">
                Tamaño
              </Form.Label>
              <Col sm="10">
                <Form.Select aria-label="XL">
                  <option>Tamaño</option>
                  <option value="1">Normal</option>
                  <option value="2">XL</option>
                </Form.Select>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">
                Cliente
              </Form.Label>
              <Col sm="10">
                <Form.Control placeholder="Luis Guzmán" />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">
                Dirección
              </Form.Label>
              <Col sm="10">
                <Form.Control placeholder="Manuel Bayon 639 casa 54" />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">
                Comentario
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  placeholder="bla bla bla"
                  as="textarea"
                  rows={3}
                />
              </Col>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="primary" type="submit" onClick={handleRegister}>
            Registrar pedido
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
