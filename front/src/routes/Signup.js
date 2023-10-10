import React, { useState, useCallback, useEffect } from "react";

import { Button, Checkbox, Form, Input } from "antd";
import { Helmet } from "react-helmet";
import useInput from "../hooks/useInput";
import AppLayout from "../components/AppLayout";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../reducers/user";
import { useNavigate } from "react-router-dom";
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};
const Signup = () => {
  const dispatch = useDispatch();
  const { signUpLoading } = useSelector((state) => state.user);
  const [form] = Form.useForm();
  const [user_id, onChangeId] = useInput("");
  const [email, onChangeEmail] = useInput("");
  const [password, onChangePassword] = useInput("");
  const [nickname, onChangeNickname] = useInput("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const { me } = useSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (me && me.id) {
      navigate("/");
    }
  }, [me, navigate]);

  const onChangePasswordCheck = useCallback((e) => {
    setPasswordCheck(e.target.value);
    setPasswordError(e.target.value !== password);
  }, []);
  const onSubmit = useCallback(
    (e) => {
      dispatch(signUp({ user_id, email, password, nickname }));
    },
    [dispatch, user_id, email, nickname, password]
  );

  return (
    <div>
      <AppLayout>
        <Helmet>
          <title>Signup</title>
        </Helmet>

        <Form
          {...formItemLayout}
          form={form}
          name="register"
          onFinish={onSubmit}
          initialValues={{
            residence: ["zhejiang", "hangzhou", "xihu"],
            prefix: "86",
          }}
          style={{
            maxWidth: 600,
          }}
          scrollToFirstError
        >
          <Form.Item
            label="ID"
            name="user_id"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input
              name="user-id"
              value={user_id}
              required
              onChange={onChangeEmail}
            />
          </Form.Item>

          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input
              name="user-email"
              value={email}
              required
              onChange={onChangeEmail}
            />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
            hasFeedback
          >
            <Input.Password
              name="user-password"
              value={password}
              required
              onChange={onChangePassword}
            />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The new password that you entered do not match!")
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="nickname"
            label="Nickname"
            tooltip="What do you want others to call you?"
            rules={[
              {
                required: true,
                message: "Please input your nickname!",
                whitespace: true,
              },
            ]}
            value={nickname}
            required
            onChange={onChangeNickname}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(new Error("Should accept agreement")),
              },
            ]}
            {...tailFormItemLayout}
          >
            <Checkbox>
              I have read the <a href="">agreement</a>
            </Checkbox>
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              Register
            </Button>
          </Form.Item>
        </Form>
      </AppLayout>
    </div>
  );
};
export default Signup;
