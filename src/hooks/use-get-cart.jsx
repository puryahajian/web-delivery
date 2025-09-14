import { useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useEffect } from 'react'
import interceptor from '../lib/interceptor';
import { useParams } from 'react-router-dom';

function useGetCart() {
    
    const { data, error, isLoading } = useQuery({
        queryKey: ['getCart', ],
        queryFn: async () => {
            const response = await interceptor.get(`order/mobile/v1/orders/`);
            return response.data;
        }
    });
    
    if (isLoading) return <div className='w-full text-center text-white hidden'>Loading...</div>;
    
    if (error) return <div className='w-full text-center text-white hidden'> {error?.message}</div>;

    return {data}
}

export default useGetCart
