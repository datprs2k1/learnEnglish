import { FC, useState, useEffect } from 'react';
import { MinusCircleOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { Form, Input, Space, Button, Row, Col, Upload, UploadProps, Drawer, notification } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { api } from '@/services';
import { useFlashCard } from '@/hooks';
import useSWR from 'swr';
interface IFlashCardFormProps {
  isOpen: boolean;
  id: any;
  action: string;
  onClose(isRefresh: boolean): void;
}

const defaultValue = {
  flashcards: [],
};

export const FlashCardForm: FC<IFlashCardFormProps> = ({ isOpen, id, action, onClose }) => {
  const [form] = useForm();

  const { AddFlashCard, UpdateFlashCard } = useFlashCard();

  const { GetById } = useFlashCard();
  const { data, isLoading, mutate } = useSWR(action == 'edit' ? `/api/flashcard/${id}` : null, () => GetById(id));

  useEffect(() => {
    form.resetFields();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [action]);

  useEffect(() => {
    form.setFieldsValue(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const onSubmit = async (values: any) => {
    const formData = new FormData();
    await values.flashCards?.map((item: any, index: number) => {
      formData.append(`list[${index}].term`, item.term);
      formData.append(`list[${index}].definition`, item.definition);
      formData.append(`list[${index}].image`, item.image?.fileList[0].originFileObj);
      formData.append(
        `list[${index}].imageName`,
        item.image?.fileList[0].originFileObj.name ? item.image?.fileList[0].originFileObj.name : item.imageName
      );
    });

    if (action == 'add') {
      try {
        await AddFlashCard(id, formData);

        notification.success({
          message: 'Thông báo',
          description: 'Thêm thành công',
        });

        mutate();

        onClose(true);
      } catch (error: any) {
        notification.error({
          message: 'Thông báo',
          description: error.message,
        });
      }
    } else if (action == 'edit') {
      try {
        await UpdateFlashCard(id, formData);

        notification.success({
          message: 'Thông báo',
          description: 'Thêm thành công',
        });

        mutate();

        onClose(true);
      } catch (error: any) {
        notification.error({
          message: 'Thông báo',
          description: error.message,
        });
      }
    }

    await form.resetFields();
  };

  const close = () => {
    onClose(false);
  };

  const renderTitle = () => {
    return action == 'add' ? 'Thêm danh sách từ' : 'Sửa danh sách từ';
  };

  return (
    <>
      <Drawer
        title={renderTitle()}
        placement="right"
        width={700}
        open={isOpen}
        onClose={close}
        extra={
          <Space>
            <Button onClick={() => onClose(false)}>Cancel</Button>
            <Button type="primary" onClick={() => form.submit()}>
              OK
            </Button>
          </Space>
        }
      >
        <Form
          form={form}
          name="dynamic_form_complex"
          onFinish={onSubmit}
          autoComplete="off"
          layout="vertical"
          className="w-full mx-auto"
          initialValues={id ? data : defaultValue}
        >
          <Form.List name="flashCards">
            {(fields, { add: addItem, remove: removeItem }) => (
              <>
                {fields.map(({ key, name, ...restField }, index) => (
                  <Space
                    size="large"
                    key={key}
                    align="baseline"
                    className="bg-slate-200 rounded-md md:rounded-xl px-4 flex justify-between items-center mb-4 w-full h-72 md:h-32"
                  >
                    <Row gutter={16} justify="center" align="middle" className="mt-10 md:mt-5 w-full">
                      <Col xs={{ span: 24 }} md={{ span: 10 }}>
                        <Form.Item
                          {...restField}
                          name={[name, 'term']}
                          rules={[
                            {
                              required: true,
                              message: 'Vui lòng nhập thuật ngữ',
                            },
                          ]}
                        >
                          <Input size="large" placeholder="Thuật ngữ" />
                        </Form.Item>
                      </Col>
                      <Col xs={{ span: 24 }} md={{ span: 10 }}>
                        <Form.Item
                          {...restField}
                          name={[name, 'definition']}
                          rules={[
                            {
                              required: true,
                              message: 'Vui lòng nhập định nghĩa',
                            },
                          ]}
                        >
                          <Input size="large" placeholder="Định nghĩa" />
                        </Form.Item>
                      </Col>
                      <Col xs={{ span: 24 }} md={{ span: 4 }}>
                        <Form.Item
                          className="mt4 md:mt-8"
                          shouldUpdate={(prevValues, curValues) => {
                            return prevValues.flashCards !== curValues.flashCards;
                          }}
                        >
                          {() => {
                            return (
                              <Form.Item
                                {...restField}
                                name={[name, 'image']}
                                rules={[
                                  {
                                    required: form.getFieldValue(['flashCards', name, 'imageName']) ? false : true,
                                    message: 'Vui lòng chọn ảnh',
                                  },
                                ]}
                              >
                                <Upload
                                  listType="picture-card"
                                  maxCount={1}
                                  beforeUpload={() => false}
                                  multiple={false}
                                >
                                  {form.getFieldValue(['flashCards', name, 'image'])?.fileList.length >
                                  0 ? null : form.getFieldValue(['flashCards', name, 'imageName']) ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img
                                      src={`https://localhost:7136/Resources/Images/FlashCards/${id}/${form.getFieldValue(
                                        ['flashCards', name, 'imageName']
                                      )}`}
                                      alt="avatar"
                                      style={{
                                        width: '100%',
                                      }}
                                    />
                                  ) : (
                                    'Upload'
                                  )}
                                </Upload>
                              </Form.Item>
                            );
                          }}
                        </Form.Item>
                      </Col>
                    </Row>
                    <MinusCircleOutlined
                      className="ml-6 text-2xl md:text-base"
                      onClick={() => {
                        removeItem(name);
                      }}
                    />
                  </Space>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => {
                      addItem();
                    }}
                    block
                    icon={<PlusOutlined />}
                  >
                    Add field
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form>
      </Drawer>
    </>
  );
};
