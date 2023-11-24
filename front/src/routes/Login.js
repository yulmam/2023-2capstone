import React, { useCallback } from "react";
import AppLayout from "../components/AppLayout";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Login.css";
import { useDispatch } from "react-redux";
import useInput from "../hooks/useInput";
import { loginAction } from "../reducers/user";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.user);
  const { logInLoading } = useSelector((state) => state.user);
  const [uid, onChangeuid] = useInput("");
  const [password, onChangePassword] = useInput("");

  const onSumbitForm = useCallback(() => {
    console.log(uid, password);
    dispatch(loginAction({ uid, password }));
    navigate("/");
  }, [uid, password, dispatch]);
  return (
    <>
      <AppLayout>
        <div class="login-container">
          <h2>로그인</h2>
          <form>
            <input
              type="text"
              placeholder="아이디"
              value={uid}
              onChange={onChangeuid}
              required
            />
            <br />
            <input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={onChangePassword}
              required
            />
            <br />
            <button type="submit" onClick={onSumbitForm}>
              로그인
            </button>
          </form>
        </div>
      </AppLayout>
    </>
  );
};

export default Login;
