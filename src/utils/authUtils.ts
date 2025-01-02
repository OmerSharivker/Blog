// src/utils/authUtils.ts

import { toast } from "react-toastify";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

const getAccessToken = async (): Promise<string | null> => {
    const tokenExpiry = localStorage.getItem('accessTokenExpiry');
    const currentTime = Date.now();

    if (tokenExpiry && currentTime >= parseInt(tokenExpiry, 10)) {
        // Token is expired, refresh it
        return await refreshAccessToken();
    } else {
        // Token is still valid
        const accessToken = localStorage.getItem('accessToken');
        return accessToken;
    }
};

// Function to refresh access token if expired
const refreshAccessToken = async (): Promise<string | null> => {
    const refreshTokenExpiry = localStorage.getItem('refreshTokenExpiry');
    const refreshToken = localStorage.getItem('refreshToken');
    
    if (refreshTokenExpiry && Date.now() >= parseInt(refreshTokenExpiry, 10)) {
        // log out user if refresh token is expired
        await logout();
        return null;
    }

    try {
        const response = await api.get('/auth/refreshToken', { data: { refreshToken } });

        localStorage.setItem('accessToken', response.data.token);
        const newExpiryTime = Date.now() + 3600000; // 1 hour from now
        localStorage.setItem('accessTokenExpiry', newExpiryTime.toString());
        return response.data.token;
    } catch (error) {
        //logout user
        await logout();
        throw error;
    }
};

const logout = async (): Promise<void> => {
    localStorage.removeItem('accessToken');
    // localStorage.removeItem('refreshToken');
    localStorage.removeItem('accessTokenExpiry');
    localStorage.removeItem('refreshTokenExpiry');
    const refreshToken = localStorage.getItem('refreshToken');
    const navigate = useNavigate();

    try {
        const response = await api.get('/auth/logout', { data: { refreshToken } });
        toast.success(response.data.message);
        navigate('/login');
    } catch (error) {
        toast.error('Error logging out');
    }
};

export { getAccessToken, refreshAccessToken, logout };
