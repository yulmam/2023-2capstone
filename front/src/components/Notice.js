import React, { useState, useCallback } from "react";

import { useSelector } from "react-redux";
import Comment from "./Comment";
import { Card, Button, Input } from "antd";
const { Meta } = Card;
const { TextArea } = Input;
const Notice = ({ post }) => {
  const [openNotice, setOpenNotice] = useState(false);
  const [openComment, setOpenComment] = useState(false);

  const onToggleNotice = useCallback(() => {
    setOpenNotice((prev) => !prev);
    if (openComment === true) {
      setOpenComment((prev) => !prev);
    }
  }, [openComment]);
  const onToggleComment = useCallback(() => {
    setOpenComment((prev) => !prev);
  }, []);

  return (
    <div>
      <Card
        hoverable
        style={{
          width: 500,
          backgroundColor: "#fff1f0",
          margin: 10,
        }}
        onClick={onToggleNotice}
      >
        <Meta title={post.title} description={post.content} />
      </Card>
      {openNotice && (
        <Card
          title="제목"
          bordered={false}
          style={{
            width: 500,
            backgroundColor: "#ffd8bf",
            margin: 10,
          }}
        >
          <p>내용</p>
          <Button
            type="primary"
            style={{
              marginLeft: 380,
              backgroundColor: "#ffd8bf",
              color: "#000000",
            }}
            onClick={onToggleComment}
          >
            <span>댓글</span>
          </Button>
        </Card>
      )}
      {openComment && (
        <Card
          title="댓글창"
          bordered={false}
          style={{
            width: 500,
            backgroundColor: "#ffd8bf",
            margin: 10,
          }}
        >
          {post.Comments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}

          <TextArea rows={4} />
          <Button
            type="primary"
            style={{
              marginLeft: 380,
              backgroundColor: "#ffd8bf",
              color: "#000000",
            }}
            onClick={onToggleComment}
          >
            <span>댓글작성</span>
          </Button>
        </Card>
      )}
    </div>
  );
};

export default Notice;
