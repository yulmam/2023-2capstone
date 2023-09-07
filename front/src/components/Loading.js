import React from "react";

import "./Loading.css";
import { Alert, Space, Spin, Col, Row } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
const Loading = () => {
  return (
    <div>
      <Row>
        <Col xs={2} sm={4} md={6} lg={8} xl={10}></Col>
        <Col xs={20} sm={16} md={12} lg={8} xl={4}>
          <Space
            direction="vertical"
            style={{
              width: "100%",
              marginTop: 300,
            }}
          >
            <Space>
              <Spin tip="Loading" size="large">
                <div className="content" />
              </Spin>
            </Space>
          </Space>
        </Col>
        <Col xs={2} sm={4} md={6} lg={8} xl={10}></Col>
      </Row>
      <Alert
        message="잠시만 기다려 주세요"
        description="Further details about the context of this alert."
        type="info"
      />
    </div>
  );
};
export default Loading;
