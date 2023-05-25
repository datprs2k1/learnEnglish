import { app } from '@/app-setting';
import { api } from '@/services';

export const useUser = () => {
  const getAllUsers = async () => {
    const res = await api.get(app.GET_ALL_USERS_URL);
    return res;
  };

  return {
    getAllUsers,
  };
};
