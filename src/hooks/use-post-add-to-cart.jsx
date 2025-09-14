import { useMutation, useQueryClient } from '@tanstack/react-query';
import interceptor from '../lib/interceptor';
import qs from "qs";

function usePostAddToCart() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ itemId, quantity = 1 }) => {
            // console.log(itemId)
            const data = {
                delivery_method : 5525,
                payment_method: 2319,
                items: [
                    {
                        product_id: itemId,
                        quantity: quantity
                    }
                ],
                delivery_address: "0",
                discount_code: ""
            };
            console.log(data)
            
            const response = await interceptor.post(
                `order/mobile/v1/orders/create/`,
                data,
                // {
                //     headers: {
                //         "Content-Type": "application/json",
                //     }
                // }
            );
            return response.data;
        },
        onSuccess: (data) => {
            console.log(data)
            queryClient.removeQueries('getCart');
        },
        onError: (error) => {
            // console.log(error)
        }
        
    });
}

export default usePostAddToCart;
