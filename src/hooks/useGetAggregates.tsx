import { useEffect, useState } from "react";
import { firestore } from "../config/firebase";

export interface IAggregates {
  id: string;
  name: string;
  price: number;
}

export default function useGetAggregates() {
  const [aggregates, setAggregates] = useState<IAggregates[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        firestore
          .collection("aggregates")
          .where("status", "==", true)
          .onSnapshot((snapshot) => {
            setAggregates([]);
            snapshot.forEach((element) => {
              const data: IAggregates = {
                id: element.id,
                name: element.data().name,
                price: element.data().price,
              };
              setAggregates((arr) => [...arr, data]);
            });
          });
      } catch (error) {
        console.log("error useAggregate", error);
      }
    };

    fetchData();
  }, []);

  return { aggregates };
}
