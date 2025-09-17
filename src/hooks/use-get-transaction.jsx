import { useQuery } from '@tanstack/react-query';
import React from 'react'
import interceptor from '../lib/interceptor';

function useGetTransaction() {
    const { data, error, isLoading } = useQuery({
        queryKey: ['getStories', ],
        queryFn: async () => {
            const response = await interceptor.get(`payment/mobile/api/v1/payment/transactions/`);
            return response.data;
        }
    });
    
    if (isLoading) return <div className='w-full text-center text-white hidden'>Loading...</div>;
    
    if (error) return <div className='w-full text-center text-white hidden'> {error?.message}</div>;

    return {data}
}

export default useGetTransaction
