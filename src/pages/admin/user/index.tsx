import Search from 'antd/lib/input/Search';
import useSWR from 'swr';
import { AdminLayout } from '@/layouts';
import { Col, Row, Space, Table } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { NextPageWithLayout } from '@/models';
import { useState } from 'react';
import { useUser } from '@/hooks';

export const UserIndex: NextPageWithLayout = () => {
  const columns: any = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      align: 'center',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      align: 'center',
      ellipsis: true,
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      align: 'center',
    },
    {
      title: 'Create At',
      dataIndex: 'created_At',
      key: 'created_At',
      align: 'center',
    },
    {
      title: 'Update At',
      dataIndex: 'updated_At',
      key: 'updated_At',
      align: 'center',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <DeleteOutlined className="text-xl text-red-500" />
        </Space>
      ),
      align: 'center',
    },
  ];

  const [keyword, setKeyword] = useState('');

  const { getAllUsers } = useUser();

  const { data }: any = useSWR('/admin/user', () => getAllUsers());

  const dataFilter = (): any => {
    if (!keyword) return Array.isArray(data) && data;

    return (
      Array.isArray(data) &&
      data.filter(
        (item) =>
          item.id === Number(keyword) ||
          item.name.toLowerCase().includes(keyword.toLowerCase()) ||
          item.email.toLowerCase().includes(keyword.toLowerCase()) ||
          item.role.toLowerCase().includes(keyword.toLowerCase())
      )
    );
  };

  return (
    <>
      <Row justify="space-between" align="middle">
        <Col>
          <h1 className="text-xl">Quản lý tài khoản</h1>
        </Col>
        <Col>
          <Search
            allowClear
            type="text"
            className="w-36 md:w-72"
            enterButton
            onChange={(e) => setKeyword(e.target.value)}
          />
        </Col>
      </Row>
      <Row className="mt-8">
        <Col span={24}>
          <Table dataSource={dataFilter()} columns={columns} rowKey="id" pagination={{ defaultPageSize: 10 }} />
        </Col>
      </Row>
    </>
  );
};

UserIndex.Layout = AdminLayout;

export default UserIndex;
