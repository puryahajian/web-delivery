import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import interceptor from '../lib/interceptor';
import qs from "qs";

function usePatchProfile() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ phone, address, name, addressLat, addressLng, family }) => {

            const data = qs.stringify({
                phone: phone,
                address: address,
                name: name,
                latitude: addressLat,
                longitude: addressLng,
                family: family
            });
            
            const res = await interceptor.patch(`account/mobile/api/v1/profile/`, data);
            return res.data;
        },
        onSuccess: (data) => {
            queryClient.removeQueries('getProfile');
        },
        onError: (err) => {
        }
    });
}

export default usePatchProfile
