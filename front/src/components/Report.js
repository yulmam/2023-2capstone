import React from "react";

import "./Loading.css";
import { Col, Row, Card, Space, Image } from "antd";

const { Meta } = Card;
const level = "좋다";
const Report = () => {
  return (
    <div>
      <Row>
        <Col xs={2} sm={4} md={6} lg={8} xl={5}></Col>
        <Col xs={20} sm={16} md={12} lg={8} xl={8}>
          <div
            style={{ display: "flex", flexDirection: "row", marginTop: 200 }}
          >
            <img
              style={{ width: 300 }}
              src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            />
            <img
              style={{ width: 300 }}
              src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            />
          </div>

          <Space direction="vertical" size="middle" style={{ display: "flex" }}>
            <Card size="small">
              <p>당신의 자세는 아주 {level}</p>
              <p>Card content</p>
            </Card>
          </Space>
        </Col>
        <Col xs={2} sm={4} md={6} lg={8} xl={10}></Col>
      </Row>
    </div>
  );
};
export default Report;
