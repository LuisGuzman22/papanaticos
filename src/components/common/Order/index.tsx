import React from "react";
import { Card } from "react-bootstrap";

interface IProps {
  nombre: string;
}
export const OrderComponent = (props: IProps) => {
  const { nombre } = props;
  return (
    <div>
      <Card border="dark" style={{ width: "18rem" }}>
        <Card.Header>{nombre}</Card.Header>
        <Card.Body>
          <Card.Title>Dark Card Title</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};
