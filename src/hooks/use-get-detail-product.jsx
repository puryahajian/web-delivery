import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { useParams } from 'react-router-dom';
import interceptor from '../lib/interceptor';

function useGetDetailProduct() {
    const { id } = useParams();
    const { data, error, isLoading } = useQuery({
        queryKey: ['detailProduct', id],
        queryFn: async () => {
            if (!id) throw new Error('No product id in URL');
            const response = await interceptor.get(`product/public/api/v1/products/${id}/`);
            return response.data;
        },
        enabled: !!id,
    });

    if (isLoading) return <div>loading</div>;

    if (error){ return <div>Error: {error?.message}</div>};

    return {data}
}

export default useGetDetailProduct
