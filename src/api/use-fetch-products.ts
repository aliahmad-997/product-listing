import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Product } from "../types";

export const useFetchProducts = () => {
  const query = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await axios.get<Product[]>(
        "https://my-json-server.typicode.com/benirvingplt/products/products"
      );

      return response.data;
    },
  });

  return query;
};
