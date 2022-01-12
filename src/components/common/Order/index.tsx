import React from "react";
import { Card } from "react-bootstrap";
import { IOrders } from "../../pages/homePage";
import "./style.css";

interface IProps {
  order: IOrders;
}
export const OrderComponent = (props: IProps) => {
  const { order } = props;
  const { comment, order: title, client, address } = order;
  return (
    <div className="order-component">
      <Card border="dark" style={{ width: "18rem" }}>
        <Card.Header>{title}</Card.Header>
        <Card.Body>
          <div>Orden para: {client}</div>
          <div>Dirección: {address}</div>
          <div>{comment}</div>
          <Card.Title></Card.Title>
          <Card.Text></Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};
