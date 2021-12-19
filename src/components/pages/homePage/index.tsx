import React, { useEffect, useState } from "react";
import { auth, firestore } from "../../../config/firebase";

interface IOrders {
  id: string;
  Nombre: string;
}
export const HomePage = () => {
  const [orders, setOrders] = useState<IOrders[]>([]);

  useEffect(() => {
    firestore
      .collection("orders")
      .get()
      .then((querySnapshot) => {
        // Loop through the data and store
        // it in array to display
        querySnapshot.forEach((element) => {
          const nombre = element.data().Nombre;
          const id = element.id;
          //console.log(nombre, id);
          const data: IOrders = {
            Nombre: nombre,
            id,
          };
          setOrders((arr) => [...arr, data]);
        });
      });
  }, []);

  useEffect(() => {
    console.log(orders);
    orders.map((order) => {
      console.log(order);
    });
  }, [orders]);

  return (
    <div>
      {orders.map((order, key) => {
        return <label key={key}>{order.Nombre}</label>;
      })}
    </div>
  );
};
