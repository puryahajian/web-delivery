import { useMutation, useQueryClient } from '@tanstack/react-query';
import interceptor from '../lib/interceptor';
import qs from "qs";

function usePostAddToCart() {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async ({ id }) => {
            const data = qs.stringify({
                items: [
                    {
                        product_id: id,
                        quantity: 1,
                    }
                ],
            });
            const response = await interceptor.post(`order/mobile/v1/orders/create/`, data);
            return response.data;
        },
        onSuccess: () => {
            // queryClient.removeQueries({ queryKey: ['dataGetPostSingle'] });
        }
    });

    return { mutation };
}

export default usePostAddToCart;
