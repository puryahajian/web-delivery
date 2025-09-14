import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom';
import interceptor from '../lib/interceptor';
import qs from "qs";

function usePostVerify() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: async ({ otp, userName }) => {
            const data = JSON.stringify({
                phone: userName,
                password: otp
            });

            const res = await interceptor.post(`account/mobile/api/v1/verify/`, data);
            return res.data;
        },
        onSuccess: (data) => {
            const access = data.access;
            const refresh = data.refresh;

            Cookies.set("access", access, { expires: 365 });
            Cookies.set("refresh", refresh, { expires: 365 });
            navigate('/')
            // queryClient.removeQueries('login');
        },
    });

}

export default usePostVerify