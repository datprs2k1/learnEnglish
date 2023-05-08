import { FC } from 'react';
import { Form, Input, Modal, Switch } from 'antd';
import { useFlashCard, useAuth } from '@/hooks';
import { useForm } from 'antd/lib/form/Form';

interface IFlashCardListFormProps {
  id: string;
  action: string;
  isOpen: boolean;
  onClose(isRefresh: boolean): void;
}

export const FlashCardListForm: FC<IFlashCardListFormProps> = ({ id, action, isOpen, onClose }) => {
  const [form] = useForm();
  const { AddList } = useFlashCard();
  const { getUser } = useAuth();

  const userId = getUser()?.id;

  const onSubmit = async (data: any) => {
    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('isPublic', data.isPublic);
      formData.append('userId', userId!);

      await AddList(formData);
    } catch (error) {
      console.log(error);
    }
  };

  const renderTitle = () => {
    return action == 'add' ? 'Thêm danh sách từ' : 'Sửa danh sách từ';
  };

  return (
    <>
      <Modal title={renderTitle()} open={isOpen} onOk={form.submit} onCancel={() => onClose(false)}>
        <Form layout="vertical" onFinish={onSubmit} autoComplete="on" form={form}>
          <Form.Item
            name="name"
            label="Tên danh sách"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập tên danh sách',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Công khai" valuePropName="checked" name="isPublic">
            <Switch />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
