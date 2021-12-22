import React from "react";
import { Card } from "react-bootstrap";
import { IOrders } from "../../pages/homePage";

interface IProps {
  order: IOrders;
}
export const OrderComponent = (props: IProps) => {
  const { order } = props;
  const { client, comment, order: title, size } = order;
  return (
    <div>
      <Card border="dark" style={{ width: "18rem" }}>
        <Card.Header>
          {title} - {size}
        </Card.Header>
        <Card.Body>
          <Card.Title></Card.Title>
          <Card.Text>{comment}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};
