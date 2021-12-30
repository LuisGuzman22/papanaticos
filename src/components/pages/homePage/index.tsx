import React, { useEffect, useState } from "react";
import { auth, firestore } from "../../../config/firebase";
import { OrderComponent } from "../../common/Order";
import "./style.css";

export interface IOrders {
  id: string;
  client: string;
  comment: string;
  size: string;
  address: string;
  created_at: string;
  order: string;
}
export const HomePage = () => {
  const [orders, setOrders] = useState<IOrders[]>([]);

  useEffect(() => {
    firestore.collection("orders").onSnapshot((snapshot) => {
      setOrders([]);
      snapshot.forEach((element) => {
        const data: IOrders = {
          client: element.data().client,
          id: element.id,
          address: element.data().address,
          comment: element.data().comment,
          created_at: element.data().created_at,
          size: element.data().size,
          order: element.data().order,
        };

        setOrders((arr) => [...arr, data]);
      });
    });
  }, []);

  return (
    <div className="homePage">
      <label className="homePageTitle">Tablero de pedidos</label>
      <div className="container ordersContainer">
        <div className="row">
          {orders.map((order, key) => {
            return (
              <div className="col col-lg-4">
                <OrderComponent key={key} order={order} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
