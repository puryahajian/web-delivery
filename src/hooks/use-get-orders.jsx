import { useQuery } from '@tanstack/react-query';
import React from 'react'
import interceptor from '../lib/interceptor';

function useGetOrders() {
    const { data, error, isLoading } = useQuery({
        queryKey: ['orders', ],
        queryFn: async () => {
            const response = await interceptor.get(`order/mobile/v1/orders/`);
            return response.data;
        }
    });
    
    if (isLoading) return <div className='w-full text-center text-white hidden'>Loading...</div>;
    
    if (error) return <div className='w-full text-center text-white hidden'> {error?.message}</div>;

    return {data}
}

export default useGetOrders
