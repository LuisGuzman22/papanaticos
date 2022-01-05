import React, { MouseEventHandler, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";

interface IProps {
  show: boolean;
  handleClose: MouseEventHandler<HTMLButtonElement>;
}

interface IClient {
  name: string;
  address: string;
}

export const ModalRegister = (props: IProps) => {
  const { show, handleClose } = props;
  const [phoneNumber, setphoneNumber] = useState("");
  const [order, setorder] = useState("");
  const [size, setsize] = useState("");
  const [clientName, setclientName] = useState("");
  const [address, setaddress] = useState("");
  const [comment, setcomment] = useState("");
  const [disableUsesr, setdisableUsesr] = useState(true);
  const [disableAddress, setdisableAddress] = useState(true);
  const [createUser, setcreateUser] = useState(false);
  const [clientData, setclientData] = useState<IClient>();

  const handleRegister = (event: any) => {
    console.log(event.target);

    event.preventDefault();
  };

  const handleChangeOrder = (event: any) => {
    setorder(event.target.value);
  };

  const handleChangeSize = (event: any) => {
    setsize(event.target.value);
  };

  const handleChangeClient = (event: any) => {
    setclientName(event.target.value);
  };

  const handleChangeAddress = (event: any) => {
    setaddress(event.target.value);
  };

  const handleChangeComment = (event: any) => {
    setcomment(event.target.value);
  };

  const handleChangePhone = (event: any) => {
    setphoneNumber(event.target.value);
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Registro de pedido</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="3"></Form.Label>
              <Col sm="9">
                <Button variant="outline-dark">Retiro en tienda</Button>
                <Button variant="outline-dark">Delivery</Button>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">
                Teléfono
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  placeholder="Teléfono"
                  onChange={handleChangePhone}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">
                Pedido
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  placeholder="Pedido"
                  onChange={handleChangeOrder}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">
                Tamaño
              </Form.Label>
              <Col sm="10">
                <Form.Select aria-label="XL" onChange={handleChangeSize}>
                  <option>Tamaño</option>
                  <option value="Normal">Normal</option>
                  <option value="XL">XL</option>
                </Form.Select>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">
                Cliente
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  placeholder="Cliente"
                  onChange={handleChangeClient}
                  value={
                    clientName
                      ? clientName
                      : clientData?.name
                      ? clientData?.name
                      : ""
                  }
                  disabled={disableUsesr}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">
                Dirección
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  placeholder="Dirección"
                  onChange={handleChangeAddress}
                  value={
                    address
                      ? address
                      : clientData?.address
                      ? clientData?.address
                      : ""
                  }
                  disabled={disableAddress}
                />
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
                  onChange={handleChangeComment}
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
