import { useQuery } from "@tanstack/react-query";
import interceptor from "../lib/interceptor";

function useGetProduct(userName, enabled = false) {
  return useQuery({
    queryKey: ["products", userName],
    queryFn: async () => {
      const res = await interceptor.get(
        `product/public/api/v1/products/?search=${userName}`
      );
      return res.data;
    },
    enabled: !!userName,// فقط وقتی سرچ داری اجرا بشه
  });
}

export default useGetProduct;
