import React, { useCallback } from "react";
import "./LoginForm.css";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import useInput from "../hooks/useInput";
import { loginAction } from "../reducers/user";
import { useSelector } from "react-redux";
const SignupButton = styled(Button)`
  background: gray;
`;

const LoginForm = () => {
  const dispatch = useDispatch();
  const { logInLoading } = useSelector((state) => state.user);
  const [uid, onChangeuid] = useInput("");
  const [password, onChangePassword] = useInput("");

  const onSumbitForm = useCallback(() => {
    console.log(uid, password);
    dispatch(loginAction({ uid, password }));
  }, [uid, password, dispatch]);

  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onSumbitForm}
    >
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: "Please input your Username!",
          },
        ]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Username"
          value={uid}
          onChange={onChangeuid}
          required
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your Password!",
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
          value={password}
          onChange={onChangePassword}
          required
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Link className="login-form-forgot" href="">
          Forgot password
        </Link>
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="login-form-button"
          loading={logInLoading}
        >
          Log in
        </Button>
        <SignupButton
          type="primary"
          href="/signup"
          className="login-form-button"
        >
          sign up
        </SignupButton>
        Or <Link href="">register now!</Link>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
