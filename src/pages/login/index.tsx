import React, { FormEvent } from 'react';
import { Form, Input, Button } from 'antd';
import 'antd/dist/antd.css';
import './index.scss';
import { getData } from '../../utils/request';

const layout = {
  labelCol: { span: 9 },
  wrapperCol: { span: 6 }
};
const tailLayout = {
  wrapperCol: { offset: 9, span: 6 }
};
interface ILoginValue {
  username: string;
  password: string;
}
interface IData {
  data: string;
}

export const Login = () => {
  const onSubmit = (values: ILoginValue) => {
    console.log('Success:', values);
    console.log(values);
    getData<IData>('http://mockdata.com/login', { params: values }).then((res) => {
      console.log(res);
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="login-wrap">
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onSubmit}
        onFinishFailed={onFinishFailed}>
        <Form.Item
          label="用户名"
          name="username"
          rules={[{ required: true, message: '请填写用户名' }]}>
          <Input allowClear={true} />
        </Form.Item>
        <Form.Item label="密码" name="password" rules={[{ required: true, message: '请填写密码' }]}>
          <Input.Password />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
