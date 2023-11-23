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
            <h2>우리 프로그램 대한 소개</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              euismod ligula euismod, congue justo non, vulputate nisi. Integer
              posuere libero vel risus elementum, id euismod sapien efficitur.
              Donec volutpat nunc et justo luctus, vel laoreet tortor volutpat.
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
