import axios from 'axios';
import { API_URL } from '@/app-setting';
import { useAuth } from '@/hooks';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(
  (config) => {
    const { getOauth } = useAuth();

    const oauth = getOauth() || {};

    if (oauth.access_token) {
      config.headers['Authorization'] = 'Bearer ' + oauth.access_token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const Refresh = async () => {
  const { getOauth } = useAuth();

  const oauth = getOauth();
  const rs = await api.post('api/token/auth', {
    grant_type: 'refresh_token',
    refresh_token: oauth.refresh_token,
  });

  return rs;
};

let refreshToken: any = null;

api.interceptors.response.use(
  (res) => {
    return res.data;
  },
  async (err) => {
    const { setOauth, setLogout } = useAuth();

    const originalConfig = err?.config;

    if (originalConfig?.url !== 'api/token/auth' && err?.response) {
      // Access Token was expired
      if (err?.response?.status === 401 && !originalConfig?._retry) {
        originalConfig._retry = true;

        try {
          refreshToken = refreshToken ? refreshToken : Refresh();

          const rs = await refreshToken;

          refreshToken = null;

          if (rs.access_token) {
            setOauth(rs);
          }

          return await api(originalConfig);
        } catch (_error) {
          setLogout();
          window.location.href = '/login';
          return Promise.reject(_error);
        }
      }
    }

    return Promise.reject(err);
  }
);

export default api;
