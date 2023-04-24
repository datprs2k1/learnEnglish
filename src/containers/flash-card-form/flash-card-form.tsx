import { FC } from 'react';
import { MinusCircleOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { Form, Input, Space, Button, Row, Col, Upload, UploadProps } from 'antd';
import { useForm } from 'antd/lib/form/Form';
interface IFlashCardFormProps {}

export const FlashCardForm: FC<IFlashCardFormProps> = (props) => {
  const [form] = useForm();

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
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
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }, index) => (
                <Space
                  key={key}
                  align="baseline"
                  className="bg-slate-200 rounded-md md:rounded-xl px-4 flex justify-between items-center mb-4 w-full h-72 md:h-32"
                >
                  <Row gutter={16} justify="center" align="middle" className="mt-10 md:mt-5 w-full">
                    <Col xs={{ span: 24 }} md={{ span: 10 }}>
                      <Form.Item {...restField} name={[name, 'term']}>
                        <Input size="large" placeholder="Thuật ngữ" />
                      </Form.Item>
                    </Col>
                    <Col xs={{ span: 24 }} md={{ span: 10 }}>
                      <Form.Item {...restField} name={[name, 'definition']}>
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
                            <Form.Item {...restField} name={[name, 'image']}>
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
                  <MinusCircleOutlined className="ml-6 text-2xl md:text-base" onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
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
