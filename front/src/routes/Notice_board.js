import React, { useEffect } from "react";
import AppLayout from "../components/AppLayout";
import Notice from "../components/Notice";
import { useDispatch, useSelector } from "react-redux";
import { loadPosts } from "../reducers/post";

const Notice_board = () => {
  // 일단 5번 반복하는 코드 작성 이제 더미 데이터로 실험하기
  let array = [1, 2, 3, 4, 5];

  const dispatch = useDispatch();
  const { mainPosts } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(loadPosts());
  }, [dispatch]);

  // const lastId = mainPosts[mainPosts.length - 1]?.id;
  // useEffect(() => {
  //   dispatch(loadPosts(lastId));
  // }, [dispatch, lastId]);
  return (
    <div>
      <AppLayout>
        {mainPosts.map((post) => (
          <Notice key={post.id} post={post} />
        ))}
      </AppLayout>
    </div>
  );
};

export default Notice_board;
