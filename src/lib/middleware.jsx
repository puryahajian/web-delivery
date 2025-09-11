import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import Cookies from "js-cookie";

function Middleware() {
    const accessToken = Cookies.get('access');
    const refreshToken = Cookies.get('refresh');
    const location = useLocation();

    // اگر لاگین نیست → بفرست به login (مگر اینکه خودش توی login باشه)
    if (!accessToken || !refreshToken) {
        if (location.pathname !== '/login') {
        return <Navigate to="/login" replace />;
        }
    }

    // اگر لاگین هست → نذار بره login
    if (accessToken && refreshToken && location.pathname === '/login') {
        return <Navigate to="/" replace />;
    }

    // در غیر این صورت صفحه‌ی مورد نظر رو نشون بده
    return <Outlet />;
}

export default Middleware;
