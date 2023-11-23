import React from "react";
import AppLayout from "../components/AppLayout";
import PostForm from "../components/PostForm";
import { useSelector } from "react-redux";

const MainService = () => {
  const { isLoggedIn } = useSelector((state) => state.user);

  return (
    <div>
      <AppLayout>{<PostForm />}</AppLayout>
    </div>
  );
};

export default MainService;
