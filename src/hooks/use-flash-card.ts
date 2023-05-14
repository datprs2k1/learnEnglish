import { app } from '@/app-setting';
import { useAuth } from '@/hooks';
import { api } from '@/services';

export const useFlashCard = () => {
  const { getUser } = useAuth();
  const user = getUser();

  const GetList = async () => {
    const res: any = await api.get(app.FLASHCARD_URL);

    return res;
  };

  const GetById = async (id: any) => {
    const res: any = await api.get(app.FLASHCARD_URL + '/' + id);
    return res;
  };

  const AddList = async (data: any) => {
    const res: any = await api.post(app.FLASHCARD_URL, data);
  };

  const UpdateList = async (id: any, data: any) => {
    const res: any = await api.put(app.FLASHCARD_URL + '/' + id, data);
  };

  const AddFlashCard = async (id: any, data: any) => {
    const res: any = await api.post(app.FLASHCARD_URL + '/' + id + '/flashcards', data);
  };

  const UpdateFlashCard = async (id: any, data: any) => {
    const res: any = await api.put(app.FLASHCARD_URL + '/' + id + '/flashcards', data);
  };

  const GetLearnStatus = async (id: any) => {
    const res: any = await api.get(app.FLASHCARD_URL + '/' + id + '/status');
    return res;
  };

  const RemoveLearn = async (id: any) => {
    const res: any = await api.delete(app.FLASHCARD_URL + '/' + id + '/remove');
    return res;
  };

  return {
    GetList,
    GetById,
    AddList,
    UpdateList,
    AddFlashCard,
    UpdateFlashCard,
    GetLearnStatus,
    RemoveLearn,
  };
};
