import { useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useEffect } from 'react'
import interceptor from '../lib/interceptor';

function useGetWithDiscount() {
    
    const { data, error, isLoading } = useQuery({
        queryKey: ['withDiscount', ],
        queryFn: async () => {
            const response = await interceptor.get(`product/public/api/v1/products/with-discount/`);
            return response.data;
        }
    });
    
    if (isLoading) return <div className='w-full text-center text-white hidden'>Loading...</div>;
    
    if (error) return <div className='w-full text-center text-white hidden'> {error?.message}</div>;

    return {data}
}

export default useGetWithDiscount
