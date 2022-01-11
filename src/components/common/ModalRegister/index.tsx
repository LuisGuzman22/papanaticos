import React, { MouseEventHandler, useEffect, useState } from "react";
import {
  Button,
  Col,
  Form,
  ListGroup,
  Modal,
  Row,
  Tab,
  Tabs,
  ToggleButton,
  ToggleButtonGroup,
} from "react-bootstrap";
import { FaBiking, FaMapMarkerAlt, FaWineBottle } from "react-icons/fa";
import { GiFrenchFries } from "react-icons/gi";
import { firestore } from "../../../config/firebase";
import useGetAggregates, { IAggregates } from "../../../hooks/useGetAggregates";
import useGetProducts, { IProducts } from "../../../hooks/useGetProducts";
import "./style.css";
interface IProps {
  show: boolean;
  handleClose: MouseEventHandler<HTMLButtonElement>;
}

interface IClient {
  name: string;
  address: string;
}

interface ISelectedProducts {
  id: string;
  product: string;
  aggregates?: string;
  price: number;
}

interface ISelProdUnit {
  product?: string;
  id?: string;
}

export const ModalRegister = (props: IProps) => {
  const initialStateClient: IClient = {
    name: "",
    address: "",
  };
  const { show, handleClose } = props;
  const [phoneNumber, setphoneNumber] = useState("");
  // const [order, setorder] = useState("");
  // const [size, setsize] = useState("");
  const [clientName, setclientName] = useState("");
  const [address, setaddress] = useState("");
  const [comment, setcomment] = useState("");
  const [disableUsesr, setdisableUsesr] = useState(true);
  const [disableAddress, setdisableAddress] = useState(true);
  const [createUser, setcreateUser] = useState(false);
  const [deliveryType, setdeliveryType] = useState("");
  const [clientData, setclientData] = useState<IClient>();
  const [showMini, setShowMini] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<ISelectedProducts[]>(
    []
  );
  const [selectProduct, setselectProduct] = useState<ISelProdUnit>();
  const [totalPrice, settotalPrice] = useState(0);

  const [deliveryTypeError, setdeliveryTypeError] = useState(false);

  const { aggregates } = useGetAggregates();
  const { products } = useGetProducts();

  const handleRegister = (event: any) => {
    event.preventDefault();
    console.log("deliveryType", deliveryType);
    if (!deliveryType) {
      console.log("no hay deliveryType");
      setdeliveryTypeError(true);
    }

    if (!clientData?.name || !clientName) {
      console.log("no hay cliente");
    }

    if (!clientData?.address || !address) {
      console.log("no hay address");
    }

    let orderStr = "";
    selectedProducts.map((selectedProduct: ISelectedProducts) => {
      const agg =
        selectedProduct.aggregates &&
        selectedProduct.aggregates.trim().length > 0
          ? ` con ${selectedProduct.aggregates}`
          : "";
      orderStr += `${selectedProduct.product} ${agg}`;
    });

    if (!orderStr) {
      console.log("No hay orden");
    }

    // firestore
    //   .collection("orders")
    //   .add({
    //     client: clientData ? clientData.name : clientName,
    //     address: clientData ? clientData.address : address,
    //     comment,
    //     // size,
    //     order: orderStr,
    //     created_at: firebase.firestore.FieldValue.serverTimestamp(),
    //     type: deliveryType,
    //   })
    //   .then((res) => {
    //     console.log("orden registrada", res);
    //     setclientData(initialStateClient);
    //     setSelectedProducts([]);
    //     setaddress("");
    //     setclientName("");
    //     setdisableAddress(true);
    //     setdisableUsesr(true);
    //   })
    //   .catch((e) => {
    //     console.log("e", e);
    //   });

    // if (createUser) {
    //   firestore
    //     .collection("clients")
    //     .add({
    //       address,
    //       name: clientName,
    //       phone: phoneNumber,
    //       created_at: firebase.firestore.FieldValue.serverTimestamp(),
    //     })
    //     .then((res) => {
    //       console.log("res", res);
    //     })
    //     .catch((e) => {
    //       console.log("e", e);
    //     });
    // }

    // handleClose(event);
  };

  const handleChangePhone = (event: any) => {
    setphoneNumber(event.target.value);
  };

  useEffect(() => {
    if (phoneNumber.length === 9) {
      firestore
        .collection("clients")
        .where("phone", "==", phoneNumber)
        .onSnapshot((snapshot) => {
          snapshot.forEach((element) => {
            const data: IClient = {
              address: element.data().address,
              name: element.data().name,
            };
            setclientData(data);
          });
        });
      setdisableAddress(false);
      setdisableUsesr(false);
    } else {
      setdisableAddress(true);
      setdisableUsesr(true);
      setclientName("");
      setaddress("");
    }
  }, [phoneNumber]);

  useEffect(() => {
    if (!clientData) {
      setcreateUser(true);
    } else {
      setcreateUser(false);
    }
  }, [clientData]);

  // const handleChangeOrder = (event: any) => {
  //   setorder(event.target.value);
  // };

  // const handleChangeSize = (event: any) => {
  //   setsize(event.target.value);
  // };

  const handleChangeClient = (event: any) => {
    setclientName(event.target.value);
  };

  const handleChangeAddress = (event: any) => {
    setaddress(event.target.value);
  };

  const handleChangeComment = (event: any) => {
    setcomment(event.target.value);
  };

  const handleChangeType = (event: any) => {
    setdeliveryType(event === 1 ? "ret" : "del");
    setdeliveryTypeError(false);
  };

  const handleCloseMini = () => {
    let filterProduct = selectedProducts.filter(
      (selectedProduct: ISelectedProducts) => {
        return selectedProduct.id !== selectProduct?.id;
      }
    );
    setSelectedProducts(filterProduct);
    setselectProduct({});
    setShowMini(false);
  };

  const handleAddAggregates = () => {
    setselectProduct({});
    setShowMini(false);
  };

  const handleSelectProduct = (product: IProducts) => {
    setShowMini(true);
    const selectData: ISelProdUnit = {
      product: product.name,
      id: Date.now().toString(),
    };
    setselectProduct(selectData);

    const data: ISelectedProducts = {
      product: product.name,
      id: Date.now().toString(),
      price: product.price,
    };
    setSelectedProducts((arr) => [...arr, data]);
  };

  const handleSelectDrink = (product: IProducts) => {
    const data: ISelectedProducts = {
      product: product.name,
      id: Date.now().toString(),
      price: product.price,
    };
    setSelectedProducts((arr) => [...arr, data]);
  };

  const handleSelectAggregate = (
    selectProduct: ISelProdUnit,
    aggregate: IAggregates,
    value: any
  ) => {
    const selecProduct = selectedProducts.find(
      (selectedProduct: ISelectedProducts) => {
        return selectedProduct.id === selectProduct?.id;
      }
    );

    let filterProduct = selectedProducts.filter(
      (selectedProduct: ISelectedProducts) => {
        return selectedProduct.id !== selectProduct?.id;
      }
    );
    if (selectProduct) {
      const data: ISelectedProducts = {
        product: selecProduct ? selecProduct.product : "",
        aggregates:
          selecProduct?.aggregates === undefined
            ? aggregate.name
            : value
            ? `${selecProduct.aggregates} ${aggregate.name}`
            : selecProduct.aggregates.replace(aggregate.name, ""),
        id: selecProduct ? selecProduct.id : "",
        price: selecProduct
          ? value
            ? selecProduct.price + aggregate.price
            : selecProduct.price - aggregate.price
          : 0,
      };

      filterProduct.push(data);
      setSelectedProducts(filterProduct);
    } else {
      setselectProduct({});
      setShowMini(false);
    }
  };

  // useEffect(() => {
  //   console.log("useEffect", selectedProducts);
  //   //Falta
  //   // Generar notificación de creación de pedido
  //   // Mejorar la lista de botones de productos
  //   // Mejorar el diseño de las pestañas
  //   // Agregar un eliminar al listado de compra
  //   // Validar el envio de nada
  // }, [selectedProducts]);

  useEffect(() => {
    let total = 0;
    settotalPrice(total);
    for (let prod of selectedProducts) {
      total += prod.price;
    }

    settotalPrice(total);
  }, [selectedProducts]);

  return (
    <div className="ModalRegister">
      <Modal show={show} onHide={handleClose} fullscreen={true}>
        <Modal.Header closeButton>
          <Modal.Title>Registro de pedido</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group as={Row} className="mb-3">
              {/* <Form.Label column sm="3"></Form.Label> */}
              <Col sm="12" className="button-container">
                <ToggleButtonGroup
                  type="radio"
                  name="options"
                  onChange={handleChangeType}
                >
                  <ToggleButton
                    id="tbg-check-1"
                    value={1}
                    variant={
                      deliveryTypeError ? "outline-danger" : "outline-dark"
                    }
                    className="ret"
                  >
                    <div className="ret-div">
                      <FaMapMarkerAlt className="ret-icon" />
                      <br />
                      <span className="ret-label">Retiro en tienda</span>
                    </div>
                  </ToggleButton>
                  <ToggleButton
                    id="tbg-check-2"
                    value={2}
                    variant={
                      deliveryTypeError ? "outline-danger" : "outline-dark"
                    }
                    className="del"
                  >
                    <div className="del-div">
                      <FaBiking className="del-icon" />
                      <br />
                      <span className="del-label">Delivery</span>
                    </div>
                  </ToggleButton>
                </ToggleButtonGroup>
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

            <Tabs
              defaultActiveKey={1}
              transition={false}
              id="noanim-tab-example"
              className="mb-3"
            >
              <Tab
                eventKey={1}
                title={
                  <span>
                    <GiFrenchFries className="ret-icon" /> <span>Papas</span>
                  </span>
                }
              >
                <>
                  {products
                    .filter((product: IProducts) => {
                      return product.type === "comida";
                    })
                    .map((product: IProducts) => {
                      return (
                        <div key={product.name}>
                          <Button
                            variant="outline-dark"
                            onClick={() => {
                              handleSelectProduct(product);
                            }}
                          >
                            {`${product.name} (+$${product.price})`}
                          </Button>
                        </div>
                      );
                    })}
                </>
              </Tab>
              <Tab
                eventKey={2}
                title={
                  <span>
                    <FaWineBottle className="ret-icon" /> <span>Bebidas</span>
                  </span>
                }
              >
                <>
                  {products
                    .filter((product: IProducts) => {
                      return product.type === "bebida";
                    })
                    .map((product: IProducts) => {
                      return (
                        <div key={product.name}>
                          <Button
                            variant="outline-dark"
                            onClick={() => {
                              handleSelectDrink(product);
                            }}
                          >
                            {`${product.name} (+$${product.price})`}
                          </Button>
                        </div>
                      );
                    })}
                </>
              </Tab>
            </Tabs>

            <ListGroup variant="flush" as="ol" numbered>
              {selectedProducts.map((selectedProduct: ISelectedProducts) => {
                const agg =
                  selectedProduct.aggregates &&
                  selectedProduct.aggregates.trim().length > 0
                    ? ` con ${selectedProduct.aggregates}`
                    : "";
                return (
                  <ListGroup.Item key={selectedProduct.id} as="li">
                    <label>{`${selectedProduct.product} ${agg}`}</label>
                  </ListGroup.Item>
                );
              })}
            </ListGroup>

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
          <span className="total-price">Total: {totalPrice}</span>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="primary" type="submit" onClick={handleRegister}>
            Registrar pedido
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showMini}>
        <Modal.Header closeButton>
          <Modal.Title>
            Agregados:{" "}
            {selectProduct !== undefined ? selectProduct.product : ""}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup variant="flush">
            {aggregates.map((aggregate: IAggregates) => {
              return (
                <ListGroup.Item key={aggregate.name}>
                  <input
                    type="checkbox"
                    id={aggregate.id}
                    value={aggregate.id}
                    onChange={(e) => {
                      handleSelectAggregate(
                        selectProduct ? selectProduct : {},
                        aggregate,
                        e.currentTarget.checked
                      );
                    }}
                  />{" "}
                  <label>{`${aggregate.name} (+$${aggregate.price})`}</label>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseMini}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleAddAggregates}>
            Agregar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
