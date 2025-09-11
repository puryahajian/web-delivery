import { useQuery } from '@tanstack/react-query';
import React from 'react'
import interceptor from '../lib/interceptor';

function useGetStories() {
    const { data, error, isLoading } = useQuery({
        queryKey: ['getStories', ],
        queryFn: async () => {
            const response = await interceptor.get(`story/public/api/v1/`);
            return response.data;
        }
    });
    
    if (isLoading) return <div className='w-full text-center text-white hidden'>Loading...</div>;
    
    if (error) return <div className='w-full text-center text-white hidden'> {error?.message}</div>;

    return {data}
}

export default useGetStories
