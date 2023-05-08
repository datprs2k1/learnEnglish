import useSWR from 'swr';
import { app } from '@/app-setting';
import { useAuth } from '@/hooks';
import { api } from '@/services';

export const useFlashCard = () => {
  const { getUser } = useAuth();
  const user = getUser();

  const GetList = (type: string) => {
    const res = api.get(app.GET_LIST_FLASHCARD_URL, {
      params: {
        type: type,
      },
    });

    return res;
  };

  const AddList = async (data: any) => {
    const res = await api.post(app.GET_LIST_FLASHCARD_URL, data);
  };

  return {
    GetList,
    AddList,
  };
};
