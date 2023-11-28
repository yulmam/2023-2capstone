import React from "react";
import "./Home.css";
import AppLayout from "../components/AppLayout";
import PostForm from "../components/PostForm";
import { useSelector } from "react-redux";

const Home = () => {
  const { isLoggedIn } = useSelector((state) => state.user);

  return (
    <div>
      <AppLayout>
        <section calss="home_section">
          <div class="content">
            <div>
              <h2>Good Body</h2>
            </div>

            <p>
              거북목과 척추 측만증을 검사하는 웹사이트입니다. <br />
              팀명 : 모닥불 팀원 : 이규열, 김한얼, 정지헌 <br />
              개발환경 : 리엑트, 스프링, 플라스크
            </p>
          </div>

          <div class="image">
            <img
              src="\main_photo.png"
              alt="우리 기업 이미지"
              style={{ width: 700, marginTop: 30 }}
            />
          </div>
        </section>
      </AppLayout>
    </div>
  );
};

export default Home;
