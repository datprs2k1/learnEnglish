import { ReactNode, useState } from 'react';
import { Layout, theme, Menu, Drawer, Button } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import Image from 'next/image';

interface IHomeLayoutProps {
  children: ReactNode;
}

export const HomeLayout = ({ children }: IHomeLayoutProps) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const { Header, Content, Footer } = Layout;

  const [open, setOpen] = useState(false);

  const menuItem = [
    {
      key: '0',
      label: 'Trang chủ',
    },
    {
      key: '1',
      label: 'Khoá học online',
    },
    {
      key: '2',
      label: 'Đề thi online',
    },
    {
      key: '3',
      label: 'Flashcard',
    },
  ];

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Layout className="min-h-screen">
        <Header
          style={{ background: colorBgContainer, padding: 0, position: 'sticky', top: 0, zIndex: 1 }}
          className="shadow-md flex justify-between"
        >
          <div className="px-4">
            <Image
              src="/assets/images/logo.png"
              alt="logo"
              width={128}
              height={32}
              className="w-32 h-8 object-fill align-middle"
            />
          </div>
          <Menu
            theme="light"
            mode="horizontal"
            defaultSelectedKeys={['0']}
            items={menuItem}
            className="hidden md:inline justify-center text-gray-700 text-base font-medium space-x-5 border-b-0"
          />
          <div className="px-4 inline md:hidden">
            <MenuOutlined className="text-xl" onClick={() => showDrawer()} />
            <Drawer placement="right" onClose={onClose} open={open} className="visible md:invisible">
              <Menu
                theme="light"
                mode="vertical"
                defaultSelectedKeys={['0']}
                items={menuItem}
                className="text-gray-500 font-semibold space-y-5 border-none"
              />
              <div className=" flex flex-col space-y-5 mt-10">
                <Button type="primary" className="rounded-full align-middle font-medium">
                  Đăng nhập
                </Button>
                <Button type="primary" danger className="rounded-full align-middle font-medium">
                  Đăng ký
                </Button>
              </div>
            </Drawer>
          </div>
          <div className="px-4 hidden md:inline">
            <div className=" flex justify-center items-center align-middle space-x-5 h-full invisible md:visible">
              <Button type="primary" size="large" className="rounded-full align-middle font-medium">
                Đăng nhập
              </Button>
              <Button type="primary" size="large" danger className="rounded-full align-middle font-medium">
                Đăng ký
              </Button>
            </div>
          </div>
        </Header>
        <Content
          style={{
            background: colorBgContainer,
          }}
        >
          <div className="container w-11/12 md:w-8/12 mx-auto mt-8 mb-16">{children}</div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </>
  );
};
