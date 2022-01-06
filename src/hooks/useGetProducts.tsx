import { useEffect, useState } from "react";
import { firestore } from "../config/firebase";

export interface IProducts {
  id: string;
  name: string;
  price: number;
  type: string;
}

export default function useGetProducts() {
  const [products, setProduct] = useState<IProducts[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        firestore
          .collection("products")
          .where("status", "==", true)
          .onSnapshot((snapshot) => {
            setProduct([]);
            snapshot.forEach((element) => {
              const data: IProducts = {
                id: element.id,
                name: element.data().name,
                price: element.data().price,
                type: element.data().type,
              };
              setProduct((arr) => [...arr, data]);
            });
          });
      } catch (error) {
        console.log("error useGetProducts", error);
      }
    };

    fetchData();
  }, []);

  return { products };
}
