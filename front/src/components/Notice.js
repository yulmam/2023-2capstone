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
          width: 1000,
          backgroundColor: "#ffe7ba",
          margin: 5,
          marginTop: 30,
        }}
        onClick={onToggleNotice}
      >
        <Meta title={post.title} description={post.User.nickname} />
      </Card>
      {openNotice && (
        <Card
          bordered={false}
          style={{
            width: 1000,
            backgroundColor: "#ffd591",
            margin: 5,
            fontSize: "1rem",
            fontWeight: "bold",
          }}
        >
          <p>{post.content}</p>
          <Button
            type="primary"
            style={{
              marginLeft: 870,
              backgroundColor: "#ffc069",
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
            width: 1000,
            backgroundColor: "#ffc069",
            margin: 10,
          }}
        >
          {post.Comments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}

          <TextArea
            rows={4}
            style={{
              width: 800,
              marginLeft: 30,
            }}
          />
          <Button
            type="primary"
            style={{
              marginLeft: 850,
              backgroundColor: "#ffa940",
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
