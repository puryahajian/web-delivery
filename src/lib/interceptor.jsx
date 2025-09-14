import axios from "axios";
import Cookies from "js-cookie";

const interceptor = axios.create({
  baseURL: "https://api.nowdesign.ir/",  
});

interceptor.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get("access");

    // فقط وقتی نیاز داری Content-Type رو ست کن
    if (!config.headers["Content-Type"]) {
      config.headers["Content-Type"] = "application/json";
    }

    config.headers["Accept"] = "application/json";

    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

interceptor.interceptors.response.use(
  (response) => response,
  async (error) => {
    // console.log(error)
    const originalRequest = error.config;

    if (error?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = Cookies.get('refresh');

      if (refreshToken) {
        try {
          const { data } = await axios.post('https://api.nowdesign.ir/account/api/v1/refresh/', { refresh: refreshToken });
          const newAccessToken = data.access;
          Cookies.set('access', newAccessToken, { expires: 365, path: '/' });
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

          return interceptor(originalRequest);
        } catch (refreshError) {
          console.error('Error refreshing token:', refreshError);
          Cookies.remove('access');
          Cookies.remove('refresh');
          // Optionally redirect user to login page
        }
      }
    }

    return Promise.reject(error);
  }
);

export default interceptor;