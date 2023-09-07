import React from "react";

import "./Loading.css";
import { Col, Row, Card } from "antd";

const { Meta } = Card;
const Report = () => {
  return (
    <div>
      <Row>
        <Col xs={2} sm={4} md={6} lg={8} xl={10}></Col>
        <Col xs={20} sm={16} md={12} lg={8} xl={4}>
          <Card
            hoverable
            style={{
              width: 240,
            }}
            cover={
              <img
                alt="example"
                src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
              />
            }
          >
            <Meta title="Europe Street beat" description="www.instagram.com" />
          </Card>
        </Col>
        <Col xs={2} sm={4} md={6} lg={8} xl={10}></Col>
      </Row>
    </div>
  );
};
export default Report;
