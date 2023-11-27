import React, { useState } from "react";
import LoginForm from "./LoginForm";
import UserProfile from "./UserProfile";
import { createGlobalStyle } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  HomeOutlined,
  AppstoreOutlined,
  SettingOutlined,
  MailOutlined,
} from "@ant-design/icons";
import "./AppLayout.css";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Menu, Input, Row, Col, Breadcrumb, Layout, theme } from "antd";
const { Header, Content, Footer } = Layout;

const Global = createGlobalStyle`
  .ant-row {
    margin-right: 0 !important;
    margin-left: 0 !importtant;
  }
  .ant-col:first-child{
    padding-left: 0!important;
  }
  .ant-col:last-chiled{
    padding-right: 0 !important;
  }
`;

const AppLayout = ({ children }) => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const handleLinkClick = (e) => {
    if (me === "") {
      e.preventDefault();
      alert("로그인이 필요합니다");
    }
    console.log("hi");
  };
  const logoutClick = (e) => {
    dispatch();
  };
  return (
    <Layout className="layout">
      <Header style={{ height: 100 }}>
        <nav>
          <Link to="/" style={{fontFamily : "Korker Brush"}}>Good Body</Link>
          <Link to="/MainService" onClick={handleLinkClick}>
            몸상태 체크
          </Link>
          <Link to="/history" onClick={handleLinkClick}>
            내 몸상태
          </Link>
          
          <Link to="/notice_board">게시판</Link>

          {me === "" ? (
            <div style={{ display: "inline" }}>

            </div>
          ) : (
            <div style={{ display: "inline" }}>

              <Link class="right" onClick={logoutClick}>
                로그아웃
              </Link>
              <Link to="/login" class="right">
                로그인
              </Link>
              <Link to="/signup" class="right">
                회원가입
              </Link>
            </div>
          )}
        </nav>
      </Header>

      <Content
        style={{
          padding: "0 50px",
        }}
      >
        <div
          className="site-layout-content"
          style={{
            background: colorBgContainer,
          }}
        >
          <Row gutter={8}>
            <Col xs={24} md={6}>
              {me ? <UserProfile /> : <LoginForm />}
            </Col>
            <Col xs={24} md={18}>
              {children}
            </Col>
            {/* <Col xs={24} md={6}>
              <a
                href="https://github.com/seroak"
                target="_blank"
                rel="noreferrer noopener"
              >
                Made by lee
              </a>
            </Col> */}
          </Row>
        </div>
      </Content>
      <Footer
        style={{
          textAlign: "center",
          marginTop: 50,
          backgroundColor: "white",
        }}
      >
        design by modakbul
      </Footer>
    </Layout>
  );
};
export default AppLayout;
