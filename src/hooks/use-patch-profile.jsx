import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import interceptor from '../lib/interceptor';
import qs from "qs";

function usePatchProfile() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ phone, address, name, addressLat, addressLng, family , location }) => {

            const data = qs.stringify({
                phone: phone,
                address: address,
                name: name,
                latitude: location?.features[0]?.bbox[2],
                longitude: location?.features[0]?.bbox[3],
                family: family
            });
            
            const res = await interceptor.patch(`account/mobile/api/v1/profile/`, data);
            return res.data;
        },
        onSuccess: (data) => {
            // console.log(data)
            queryClient.removeQueries('getProfile');
        },
        onError: (err) => {
            // console.log(err)

        }
    });
}

export default usePatchProfile
