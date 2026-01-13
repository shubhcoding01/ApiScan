// import axios from 'axios';
// import { getToken } from './auth';

// // 1. Create Axios Instance
// const api = axios.create({
//   baseURL: 'http://127.0.0.1:8000/api/v1', // Matches your FastAPI prefix
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // 2. Request Interceptor (Adds Token)
// api.interceptors.request.use(
//   (config) => {
//     // We check if running in browser to avoid server-side errors
//     if (typeof window !== 'undefined') {
//       const token = getToken();
//       if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//       }
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // 3. Response Interceptor (Handles 401 Unauthorized)
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     // If token is invalid/expired, redirect to login
//     if (error.response?.status === 401) {
//       if (typeof window !== 'undefined') {
//         localStorage.removeItem('token');
//         // Only redirect if not already on login page
//         if (!window.location.pathname.startsWith('/login')) {
//           window.location.href = '/login';
//         }
//       }
//     }
//     return Promise.reject(error);
//   }
// );

// export default api;

import axios from "axios";
import { getToken } from "./auth";

// 1️⃣ Axios instance
const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api", // ✅ FIXED (no /v1)
  headers: {
    "Content-Type": "application/json",
  },
});

// 2️⃣ Request Interceptor (Attach JWT)
api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = getToken(); // should return access_token
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 3️⃣ Response Interceptor (Handle 401)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("access_token"); // ✅ FIXED
        if (!window.location.pathname.startsWith("/login")) {
          window.location.href = "/login";
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;
