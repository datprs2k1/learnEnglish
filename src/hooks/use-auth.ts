import { api } from '@/services';
import { app } from '@/app-setting';
import { LoginType, UserType, TokenType, RegisterType } from '@/types';
import { hasCookie, setCookie, getCookie, deleteCookie } from 'cookies-next';

export const useAuth = () => {
  const getUser = () => {
    const user: any = hasCookie('user') ? JSON.parse(getCookie('user') as string) : null;
    return user;
  };

  const getToken = () => {
    const token = hasCookie('token') ? JSON.parse(getCookie('token') as string) : null;
    return token;
  };

  const setUser = (user: UserType) => {
    setCookie('user', JSON.stringify(user));
  };

  const setToken = (token: TokenType) => {
    setCookie('token', JSON.stringify(token));
  };

  const login = async (data: LoginType) => {
    const res: any = await api.post(app.LOGIN_URL, {
      email: data.email,
      password: data.password,
    });
    return res;
  };

  const register = async (data: RegisterType) => {
    const res: any = await api.post(app.REGISTER_URL, {
      name: data.name,
      email: data.email,
      password: data.password,
    });
    return res;
  };

  const logout = () => {
    deleteCookie('user');
    deleteCookie('token');
  };

  const getInfo = async () => {
    const res: any = await api.get(app.GET_USER_INFO_URL);
    return res;
  };

  const updateInfo = async (data: any) => {
    const res: any = await api.put(app.GET_USER_INFO_URL, data);
    return res;
  };

  return {
    getUser,
    getToken,
    setUser,
    setToken,
    login,
    register,
    logout,
    getInfo,
    updateInfo,
  };
};
