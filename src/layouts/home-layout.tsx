import { ReactNode, useState, useEffect } from 'react';
import { Layout, theme, Menu, Drawer, Button, Avatar, Dropdown } from 'antd';
import { MenuOutlined, SmileOutlined } from '@ant-design/icons';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks';
import { UserForm } from '@/containers/user';
import type { MenuProps } from 'antd';
import { RouteGuard } from '@/components/home';

interface IHomeLayoutProps {
  children: ReactNode;
}

export const HomeLayout = ({ children }: IHomeLayoutProps) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const { Header, Content, Footer } = Layout;

  const [open, setOpen] = useState(false);

  const router = useRouter();

  const path = router.pathname;

  const [active, setActive] = useState<string>('0');

  const { getUser, logout } = useAuth();

  const [info, setInfo] = useState<boolean>(false);

  const viewInfo = () => {
    setInfo(true);
  };

  const onCloseUser = (isRefresh: boolean) => {
    setInfo(false);
  };

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: 'Thông tin tài khoản',
      onClick: () => viewInfo(),
    },
    {
      key: '2',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
          Đổi mật khẩu
        </a>
      ),
    },
    {
      key: '3',
      danger: true,
      label: 'Đăng xuất',
      onClick: () => {
        logout();
        router.push('/login');
      },
    },
  ];

  const getActive = (path: string) => {
    const pathName = path.split('/');
    switch (pathName[1]) {
      case '':
        return '0';
      case 'course':
        return '1';
      case 'exam':
        return '2';
      case 'flashcard':
        return '3';
      default:
        return '0';
    }
  };

  useEffect(() => {
    setActive(getActive(path));
  }, [path]);

  const menuItem = [
    {
      key: '0',
      label: 'Trang chủ',
      onClick: () => router.push('/'),
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
      onClick: () => router.push('/flashcard'),
    },
  ];

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <RouteGuard>
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
            selectedKeys={[active]}
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
                selectedKeys={[active]}
              />
              <div className=" flex flex-col space-y-5 mt-10">
                {!getUser() && (
                  <>
                    <Link href="/login">
                      <Button type="primary" className="rounded-full align-middle font-medium">
                        Đăng nhập
                      </Button>
                    </Link>
                    <Link href="/register">
                      <Button type="primary" danger className="rounded-full align-middle font-medium">
                        Đăng ký
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </Drawer>
          </div>
          <div className="px-4 hidden md:inline">
            <div className=" flex justify-center items-center align-middle space-x-5 h-full invisible md:visible">
              {!getUser() && (
                <>
                  <Link href="/login">
                    <Button type="primary" size="large" className="rounded-full align-middle font-medium">
                      Đăng nhập
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button type="primary" size="large" danger className="rounded-full align-middle font-medium">
                      Đăng ký
                    </Button>
                  </Link>
                </>
              )}
              {getUser() && (
                <Dropdown menu={{ items }}>
                  <div className="flex items-center space-x-3 mx-12">
                    <Avatar size="large" style={{ backgroundColor: '#7265e6', verticalAlign: 'middle' }}>
                      {getUser().name}
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-base font-medium">{getUser().name}</span>
                    </div>
                  </div>
                </Dropdown>
              )}
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
      <UserForm action="view" isOpen={info} onClose={onCloseUser} />
    </RouteGuard>
  );
};
