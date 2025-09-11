import { useQuery } from '@tanstack/react-query';
import React from 'react'
import interceptor from '../lib/interceptor';

function useGetDataMegaMenu() {
     const { data, error, isLoading } = useQuery({
        queryKey: ['allSubCategoryMegaMenu'],
        queryFn: async () => {
        const response = await interceptor.get('product/public/api/v1/categories/');
        return response.data;
        },
    });
    
    if (isLoading) return <div>loading</div>;

    if (error){ return <div>Error: {error?.message}</div>};
    
    return {data}
}

export default useGetDataMegaMenu
