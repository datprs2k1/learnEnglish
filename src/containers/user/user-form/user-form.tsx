import { FC, useEffect } from 'react';
import { Form, Input, Modal, Switch, notification } from 'antd';
import { useFlashCard, useAuth } from '@/hooks';
import { useForm } from 'antd/lib/form/Form';
import useSWR from 'swr';

interface IUserFormProps {
  action?: string;
  isOpen: boolean;
  onClose(isRefresh: boolean): void;
}

const defaultValue = {
  name: '',
  email: '',
};

export const UserForm: FC<IUserFormProps> = ({ action, isOpen, onClose }) => {
  const [form] = useForm();
  const { getUser, getInfo, updateInfo } = useAuth();
  const id = getUser()?.id;
  const { data, isLoading, mutate } = useSWR(id ? `/api/user/${id}` : null, () => getInfo());

  const onSubmit = async (data: any) => {
    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('email', data.email);

      await updateInfo(formData);

      notification.success({
        message: 'Thông báo',
        description: 'Sửa thành công',
      });

      form.resetFields();

      mutate();

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
    if (data) {
      form.setFieldsValue(data);
    }
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
          initialValues={isOpen ? data : defaultValue}
        >
          <Form.Item
            name="name"
            label="Tên"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập tên',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập email',
              },
            ]}
          >
            <Input disabled={true} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
