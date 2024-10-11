import axios, { AxiosError, AxiosInstance } from "axios";

// Axios instance
export const instanceAxios: AxiosInstance = axios.create({
    baseURL: "/api/",  // API base URL
    headers: {
        "Content-Type": "application/json",
    },
});

// Request interceptor:
instanceAxios.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("access_token");
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (err: AxiosError) => {
        return Promise.reject(err);
    }
);

// Response interceptor: 401 Unauthorized
instanceAxios.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error: AxiosError) => {
        const originalRequest = error.config;

        // 401 Unauthorized hatası kontrolü
        if (error.response?.status === 401 && !originalRequest?._retry) {
            originalRequest._retry = true;
            const refreshToken = localStorage.getItem("refresh_token");

            if (refreshToken) {
                try {
                    // Yeni access token almak için refresh token ile istek yap
                    const { data } = await axios.post("/api/auth/refresh", {
                        refresh_token: refreshToken, // Doğru body key ismi
                    });

                    // Yeni token'ları localStorage'a kaydet
                    localStorage.setItem("access_token", data.access_token);
                    localStorage.setItem("refresh_token", data.refresh_token);

                    // Orijinal isteği yeniden yap, yeni token ile
                    originalRequest.headers.Authorization = `Bearer ${data.access_token}`;

                    return instanceAxios(originalRequest); // Orijinal isteği tekrar gönder
                } catch (refreshError) {
                    console.error("Refresh token expired or invalid", refreshError);
                    // Token yenileme başarısız oldu, kullanıcıyı giriş sayfasına yönlendirin
                    localStorage.removeItem("access_token");
                    localStorage.removeItem("refresh_token");
                    window.location.href = "/login"; // Giriş sayfasına yönlendirme

                    return Promise.reject(refreshError);
                }
            } else {
                // Refresh token yoksa, kullanıcıyı giriş sayfasına yönlendirin
                window.location.href = "/login";
            }
        }
        return Promise.reject(error);
    }
);
