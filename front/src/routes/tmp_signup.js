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
  const [errorMessage, setErrorMessage] = useState("";)
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

  const handleSubmit = useCallback((e) => {
    e.preventDefault();

    if (password !== passwordCheck) {
      setErrorMessage("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
    } else {
      setErrorMessage("");
      // 여기에 서버로 데이터를 전송하는 로직을 추가할 수 있습니다.
    }
  }, []);
  return (
    <div>
      <AppLayout>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="아이디"
            onChange={onChangeId}
            required
          />
          <br></br>
          <input
            type="email"
            placeholder="E-mail"
            onChange={onChangeEmail}
            required
          />
          <br />
          <input
            type="password"
            id="password"
            placeholder="비밀번호"
            onChange={onChangePassword}
            required
          />
          <br />
          <input
            type="password"
            id="confirmPassword"
            placeholder="비밀번호 확인"
            onChange={onChangePasswordCheck}
            required
          />
          <br />
          <span id="errorMessage" class="error-message"></span>
          <br />
          <button type="submit">가입하기</button>
        </form>
      </AppLayout>
    </div>
  );
};
export default Signup;
