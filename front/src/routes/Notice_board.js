import React from "react";

import AppLayout from "../components/AppLayout";

import Notice from "../components/Notice";

const Notice_board = () => {
  // 일단 5번 반복하는 코드 작성 이제 더미 데이터로 실험하기
  let array = [1, 2, 3, 4, 5];
  return (
    <div>
      <AppLayout>
        {array.map(() => (
          <Notice />
        ))}
      </AppLayout>
    </div>
  );
};

export default Notice_board;
