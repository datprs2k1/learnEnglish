import { FC, useEffect } from 'react';
import { Form, Input, Modal, Switch, notification } from 'antd';
import { useFlashCard, useAuth } from '@/hooks';
import { useForm } from 'antd/lib/form/Form';
import useSWR from 'swr';

interface IFlashCardListFormProps {
  id?: any;
  action?: string;
  isOpen: boolean;
  onClose(isRefresh: boolean): void;
}

const defaultValue = {
  name: '',
  isPublic: true,
};

export const FlashCardListForm: FC<IFlashCardListFormProps> = ({ id, action, isOpen, onClose }) => {
  const [form] = useForm();
  const { AddList, UpdateList } = useFlashCard();
  const { GetById } = useFlashCard();
  const { data, isLoading, mutate } = useSWR(id ? `/api/flashcard/${id}` : null, () => GetById(id));

  const onSubmit = async (data: any) => {
    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('isPublic', data.isPublic);
      if (action == 'add') {
        await AddList(formData);
        notification.success({
          message: 'Thông báo',
          description: 'Thêm thành công',
        });
      } else {
        await UpdateList(id, formData);
        notification.success({
          message: 'Thông báo',
          description: 'Sửa thành công',
        });
      }

      form.resetFields();

      await onClose(true);
      await mutate();
    } catch (error: any) {
      notification.error({
        message: 'Thông báo',
        description: error.message,
      });
    }
  };

  const renderTitle = () => {
    return action == 'add' ? 'Thêm danh sách từ' : 'Sửa danh sách từ';
  };

  useEffect(() => {
    form.setFieldsValue(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <>
      <Modal title={renderTitle()} open={isOpen} onOk={form.submit} onCancel={() => onClose(false)}>
        <Form
          layout="vertical"
          onFinish={onSubmit}
          autoComplete="on"
          form={form}
          initialValues={id ? data : defaultValue}
        >
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
