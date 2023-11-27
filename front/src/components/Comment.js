import React, { useState, useCallback } from "react";

import { Card, Button, Input } from "antd";

const Comment = ({ comment }) => {
  return (
    <div>
      <Card
        title={comment.nickname}
        bordered={false}
        style={{
          width: 400,
          backgroundColor: "#2f54eb",
          margin: 10,
        }}
      >
        {comment.comment}
      </Card>
    </div>
  );
};

export default Comment;
