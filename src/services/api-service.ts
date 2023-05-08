import axios from 'axios';
import { app } from '@/app-setting';
import { useAuth } from '@/hooks';

export const api = axios.create({
  baseURL: app.API_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

api.interceptors.request.use(
  (config) => {
    const { getToken } = useAuth();

    const token = getToken() || {};

    if (token.accessToken) {
      config.headers['Authorization'] = 'Bearer ' + token.accessToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const Refresh = async () => {
  const { getToken } = useAuth();

  const token = getToken();
  const rs = await api.post('api/User/refresh', {
    refreshToken: token.refreshToken,
  });

  return rs;
};

let refreshToken: any = null;

api.interceptors.response.use(
  (res) => {
    return res.data;
  },
  async (err) => {
    const { setToken, logout } = useAuth();

    const originalConfig = err?.config;

    if ((originalConfig?.url !== app.LOGIN_URL || originalConfig?.url !== app.REGISTER_URL) && err?.response) {
      // Access Token was expired
      if (err?.response?.status === 401 && !originalConfig?._retry) {
        originalConfig._retry = true;

        try {
          refreshToken = refreshToken ? refreshToken : Refresh();

          const rs = await refreshToken;

          refreshToken = null;

          if (rs.accessToken) {
            setToken(rs);
          }

          return await api(originalConfig);
        } catch (_error) {
          logout();
          return Promise.reject(_error);
        }
      }
    }

    return Promise.reject(err);
  }
);
