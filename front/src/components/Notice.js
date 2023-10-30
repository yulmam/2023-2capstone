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
  let array = [1, 2, 3];
  return (
    <div>
      <Card
        hoverable
        style={{
          width: 500,
          backgroundColor: "#ffccc7",
          margin: 10,
          marginLeft: 50,
        }}
        onClick={onToggleNotice}
      >
        <Meta title={post.title} description={post.User.nickname} />
      </Card>
      {openNotice && (
        <Card
          title="제목"
          bordered={false}
          style={{
            width: 500,
            backgroundColor: "#ffd8bf",
            marginLeft: 50,
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
          bordered={true}
          style={{
            width: 500,
            backgroundColor: "#ffd8bf",
            margin: 10,
            marginLeft: 50,
          }}
        >
          {array.map(() => (
            <Comment />
          ))}

          <TextArea rows={4} />
          <Button
            type="primary"
            style={{
              marginLeft: 380,
              backgroundColor: "#ffd8bf",
              color: "#000000",
            }}
          >
            <span>댓글달기</span>
          </Button>
        </Card>
      )}
    </div>
  );
};

export default Notice;
