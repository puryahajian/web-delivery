import { useMutation, useQueryClient } from '@tanstack/react-query';
import interceptor from '../lib/interceptor';
import qs from "qs";
import { useOrder } from '../context/OrderContext';

function usePostAddToCart() {
    const queryClient = useQueryClient();
    const { setOrderData } = useOrder();

    return useMutation({
        mutationFn: async ({ result }) => {
            const data = JSON.stringify({
                delivery_method : 1,
                payment_method: 1,
                items: result,
                discount_code: ""
            });
            // console.log(data)
            const response = await interceptor.post(
                `order/mobile/v1/orders/create/`,
                data
            );
            return response.data;
        },
        onSuccess: (data) => {
            // console.log(data)
            setOrderData(data);
            queryClient.removeQueries('getCart');
        },
        onError: (error) => {
            // console.log(error)
        }
        
    });
}

export default usePostAddToCart;
