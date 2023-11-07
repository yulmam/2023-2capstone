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
  const { signUpLoading, signUpDone } = useSelector((state) => state.user);
  const [form] = Form.useForm();
  const [uid, onChangeId] = useInput("");
  const [email, onChangeEmail] = useInput("");
  const [password, onChangePassword] = useInput("");
  const [nickName, onChangeNickname] = useInput("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const { me } = useSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (me && me.id) {
      navigate("/");
    }
  }, [me, navigate]);

  useEffect(() => {
    if (signUpDone) {
      navigate("/");
    }
  }, [navigate, signUpDone]);

  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordCheck(e.target.value);
      setPasswordError(e.target.value !== password);
    },
    [password]
  );
  const onSubmit = useCallback(
    (e) => {
      dispatch(signUp({ uid, email, password, nickName }));
    },
    [dispatch, uid, email, nickName, password]
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
            margin: 50,
          }}
          scrollToFirstError
        >
          <Form.Item
            label="ID"
            name="uid"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
<<<<<<< Updated upstream
            <Input name="user-id" value={uid} required onChange={onChangeId} />
=======
            <Input
              name="user-id"
              value={uid}
              required
              onChange={onChangeId}
            />
>>>>>>> Stashed changes
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
            value={nickName}
            required
            onChange={onChangeNickname}
          >
            <Input />
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
