import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { useParams } from 'react-router-dom';
import interceptor from '../lib/interceptor';

function useGetSubCategory() {
    const { id } = useParams();
    const { data, error, isLoading } = useQuery({
        queryKey: ['getSubCategory', id],
        queryFn: async () => {
            const response = await interceptor.get(`product/public/api/v1/products/?category=${id}`);
            return response.data;
        },
    });
    
    if (isLoading) return <div className='w-full text-center text-white hidden'>Loading...</div>;
    
    if (error) return <div className='w-full text-center text-white hidden'> {error?.message}</div>;

    return {data}
}

export default useGetSubCategory
