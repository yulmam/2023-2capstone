/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Loading.css";
import { Col, Row, Card, Space } from "antd";
import { dispatchImageURL } from "../reducers/diagnosis";
const { Meta } = Card;
const level = "좋다";
const shoulderAngle = 20;
const Report = () => {
  const dispatch = useDispatch();
  const [imageUrl, setImageUrl] = useState(null);
  const { front, side } = useSelector((state) => state.diagnosis);
  useEffect(() => {
    const uint8Array = new Uint8Array(front);
    const blob = new Blob([uint8Array], { type: "image/png" });
    console.log(blob);

    const url = URL.createObjectURL(blob);
    console.log(url);
    setImageUrl(url);
    dispatch(dispatchImageURL(url));
  }, [dispatch, front]);

  return (
    <div>
      <Row>
        <Col xs={2} sm={4} md={6} lg={8} xl={5}></Col>
        <Col xs={20} sm={16} md={12} lg={8} xl={8}>
          <div
            style={{ display: "flex", flexDirection: "row", marginTop: 200 }}
          >
            <img style={{ width: 300 }} src={imageUrl} />
            <img
              style={{ width: 300 }}
              src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            />
          </div>

          <Space direction="vertical" size="middle" style={{ display: "flex" }}>
            <Card size="small">
              <p>당신의 자세는 아주 {level}</p>
              <p>당신의 어깨 각도는 {shoulderAngle}</p>
            </Card>
          </Space>
        </Col>
        <Col xs={2} sm={4} md={6} lg={8} xl={10}></Col>
      </Row>
    </div>
  );
};
export default Report;
