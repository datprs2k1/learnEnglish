import { FC, useState } from 'react';
import './style.module.css';
import { NotificationFilled, UserOutlined } from '@ant-design/icons';
import { Dropdown, Layout, Menu, theme } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/router';

const { Header, Sider, Content, Footer } = Layout;

interface IAdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout: FC<IAdminLayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const router = useRouter();

  const MenuItem = [
    {
      key: '0',
      icon: <UserOutlined />,
      label: 'Trang chủ',
      onClick: () => router.push('/admin'),
    },
    {
      key: '1',
      icon: <UserOutlined />,
      label: 'Quản lý người dùng',
    },
  ];

  const items = [
    {
      key: '1',
      label: 'Đăng xuất',
    },
  ];

  const getActive = () => {
    const path = router.pathname;
    const pathName = path.split('/');
    switch (pathName[2]) {
      case '':
        return '0';
      case 'user':
        return '1';
      default:
        return '0';
    }
  };

  return (
    <Layout className="h-screen">
      <Sider breakpoint="lg" collapsedWidth="0" width={250}>
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['0']} items={MenuItem} selectedKeys={[getActive()]} />
      </Sider>
      <Layout className="h-screen">
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <div className="flex item-center align-middle gap-10 mr-4 float-right">
            <div>
              <NotificationFilled className="text-xl text-gray-500" />
            </div>
            <Dropdown
              menu={{
                items,
              }}
              trigger={['click']}
            >
              <div className="flex justify-center align-middle items-center">
                <Image src="" className="rounded-full object-fill w-10 h-auto mr-3" alt="" />
                <span className="text-base text-teal-400 font-semibold">ABC</span>
              </div>
            </Dropdown>
          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px 0',
          }}
        >
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
            {children}
          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
