import { FC } from 'react';
import { Input, Button, Form, Checkbox } from 'antd';
import Link from 'next/link';
import Image from 'next/image';
import { HomeLayout } from '@/layouts';
import { useAuth } from '@/hooks';
import { LoginType } from '@/types';
import { NextPageWithLayout } from '@/models';

export const Login: NextPageWithLayout = () => {
  const { login, setUser, setToken } = useAuth();

  const onSubmit = async (data: LoginType) => {
    try {
      const res = await login(data);

      if (res.user && res.token) {
        setToken(res.token);
        setUser(res.user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className=" w-8/12 mx-auto">
        <div className=" rounded px-7 py-4 shadow-md mt-20">
          <div className="text-center mb-10">
            <h1 className="text-2xl">Đăng nhập</h1>
          </div>
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 8 }}
            initialValues={{ remember: true }}
            onFinish={onSubmit}
            autoComplete="off"
            className="w-full"
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Vui lòng nhập mật khẩu' },
                { type: 'email', message: 'Email không hợp lệ' },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Mật khẩu"
              name="password"
              rules={[
                { required: true, message: 'Vui lòng nhập mật khẩu' },
                {
                  pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%\^&\*])(?=.{6,})/,
                  message: 'Mật khẩu phải có ít nhất 1 ký tự hoa, 1 ký tự đặc biệt và 1 số',
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Đăng nhập
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};

Login.Layout = HomeLayout;

export default Login;
