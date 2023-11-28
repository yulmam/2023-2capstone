import React, { useState, useCallback } from "react";

import { Card, Button, Input } from "antd";

const Comment = ({ comment }) => {
  return (
    <div>
      <Card
        title={comment.nickname}
        bordered={false}
        style={{
          width: 800,
          backgroundColor: "#ffa940",
          margin: 10,
          marginLeft: 30,
          fontSize: "1rem",
        }}
      >
        {comment.comment}
      </Card>
    </div>
  );
};

export default Comment;
