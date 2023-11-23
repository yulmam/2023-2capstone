import React from "react";
import AppLayout from "../components/AppLayout";
import LoginForm from "../components/LoginForm";
import { useSelector } from "react-redux";
import "./Login.css";
const Login = () => {
  const { isLoggedIn } = useSelector((state) => state.user);

  return (
    <>
      <AppLayout>
        <div class="login-container">
          <h2>로그인</h2>
          <form>
            <input type="text" placeholder="아이디" required />
            <br />
            <input type="password" placeholder="비밀번호" required />
            <br />
            <button type="submit">로그인</button>
          </form>
        </div>
      </AppLayout>
    </>
  );
};

export default Login;
