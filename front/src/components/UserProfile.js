import React, { useCallback } from "react";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { Card, Avatar, Button } from "antd";
import styled from "styled-components";
import { logoutAction } from "../reducers/user";
const { Meta } = Card;
const LogoutButton = styled(Button)`
  margin-top: 10px;
`;

const UserProfile = ({ setIsLoggedIn }) => {
  const dispatch = useDispatch();
  const onLogOut = useCallback(() => {
    dispatch(logoutAction());
  }, [dispatch]);
  const { me } = useSelector((state) => state.user);
  return (
    <Card
      style={{
        width: 300,
        margin: 10,
      }}
      actions={[
        <SettingOutlined key="setting" />,
        <EditOutlined key="edit" />,
        <EllipsisOutlined key="ellipsis" />,
      ]}
    >
      <Meta
        avatar={<Avatar size={64} icon={<UserOutlined />} />}
        title={me}
        description="This is the description"
      />
      <LogoutButton onClick={onLogOut}>로그아웃</LogoutButton>
    </Card>
  );
};
export default UserProfile;
