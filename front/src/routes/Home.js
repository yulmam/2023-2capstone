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
        <section>
          <div class="content">
            <h2>Good Body</h2>
            <p>
              거북목과 척추 측만증을 검사하는 웹사이트입니다.
              OpenCV라이브러리와 OpenPose라이브러리로 관절의 위치를 파악한 후에 
            </p>
          </div>

          <div class="image">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWq71_eF8GnoqHq_0ybQ7Oqwviw6_khVZIYN9XhDpGqw&s"
              alt="우리 기업 이미지"
              style={{ width: 400 }}
            />
          </div>
        </section>
      </AppLayout>
    </div>
  );
};

export default Home;
