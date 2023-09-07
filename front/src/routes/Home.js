import React from "react";
import AppLayout from "../components/AppLayout";
import PostForm from "../components/PostForm";
import { useSelector } from "react-redux";

const Home = () => {
  const { isLoggedIn } = useSelector((state) => state.user);

  return (
    <div>
      <AppLayout>{isLoggedIn && <PostForm />}</AppLayout>
    </div>
  );
};

export default Home;
