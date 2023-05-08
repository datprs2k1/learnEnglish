import { FC, useState } from 'react';
import { MinusCircleOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { Form, Input, Space, Button, Row, Col, Upload, UploadProps } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { api } from '@/services';
interface IFlashCardFormProps {
  action: string;
}

export const FlashCardForm: FC<IFlashCardFormProps> = ({ action }) => {
  const [form] = useForm();

  const [add, setAdd] = useState<string[]>([]);
  const [remove, setRemove] = useState<any[]>([]);

  const onFinish = async (values: any) => {
    const formData = new FormData();

    formData.append('name', values.name);

    if (action === 'edit') {
      var addList = values.flashcards.filter((item: any) => {
        return add.includes(item.id);
      });

      var removeList = remove.filter((item: any) => {
        return !values.flashcards.includes(item);
      });

      if (addList.length > 0) {
        await addList.map((item: any, index: number) => {
          formData.append(`add[${index}].term`, item.term);
          formData.append(`add[${index}].definition`, item.definition);
          formData.append(`add[${index}].image`, item.image?.fileList[0].originFileObj);
          formData.append(`add[${index}].imagename`, item.image?.fileList[0].originFileObj.name);
        });
      }

      if (removeList.length > 0) {
        await removeList.map((item: any, index: number) => {
          formData.append(`remove[${index}]`, item);
        });
      }

      await api.put('FlashCard', formData);
    } else {
      await values.flashcards.map((item: any, index: number) => {
        formData.append(`flashcards[${index}].term`, item.term);
        formData.append(`flashcards[${index}].definition`, item.definition);
        formData.append(`flashcards[${index}].image`, item.image?.fileList[0].originFileObj);
        formData.append(`flashcards[${index}].imagename`, item.image?.fileList[0].originFileObj.name);
      });

      await api.post('FlashCard', formData);
    }
  };
  return (
    <>
      <Form
        form={form}
        name="dynamic_form_complex"
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
        className="w-full lg:w-7/12 mx-auto"
      >
        <Form.Item name="name" label="Name">
          <Input size="large" />
        </Form.Item>
        <Form.List name="flashcards">
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
                          return prevValues.flashcards !== curValues.flashcards;
                        }}
                      >
                        {() => {
                          return (
                            <Form.Item
                              {...restField}
                              name={[name, 'image']}
                              rules={[
                                {
                                  required: true,
                                  message: 'Vui lòng chọn ảnh',
                                },
                              ]}
                            >
                              <Upload listType="picture-card" maxCount={1} beforeUpload={() => false} multiple={false}>
                                {form.getFieldValue(['flashcards', name, 'image'])?.fileList.length > 0
                                  ? null
                                  : 'Upload'}
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
                      if (action === 'edit') setRemove([...remove, form.getFieldValue(['flashcards', name, 'id'])]);
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
                    if (action === 'edit') setAdd([...add, form.getFieldValue(['flashcards', fields.length, 'id'])]);
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
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
