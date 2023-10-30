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
          backgroundColor: "#fff1f0",
          margin: 10,
        }}
        onClick={onToggleNotice}
      >
<<<<<<< HEAD
        <Meta title={post.title} description={post.User.nickname} />
=======
        <Meta title="Europe Street beat" description="www.instagram.com" />
>>>>>>> 434509657068d8fe8091375ade4bee90f1f572c5
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
          {array.map(() => (
            <Comment />
          ))}

          <TextArea rows={4} />
        </Card>
      )}
    </div>
  );
};

export default Notice;
