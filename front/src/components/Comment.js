import React, { useState, useCallback } from "react";

import { Card, Button, Input } from "antd";

const Comment = () => {
  return (
    <div>
      <Card
        title="댓글"
        bordered={false}
        style={{
          width: 400,
          backgroundColor: "#ff9c6e",
          margin: 10,
        }}
      >
        댓글 내용
      </Card>
    </div>
  );
};

export default Comment;
