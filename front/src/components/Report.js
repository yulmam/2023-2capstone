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
  const [front_imageUrl, setFrontImageUrl] = useState(null);
  const [side_imageUrl, setSideImageUrl] = useState(null);
  const { front, side } = useSelector((state) => state.diagnosis);
  useEffect(() => {
    //front 사진
    const fornt_uint8Array = new Uint8Array(front);
    const front_blob = new Blob([fornt_uint8Array], { type: "image/png" });
    console.log(front_blob);

    const front_url = URL.createObjectURL(front_blob);
    console.log(front_url);
    setFrontImageUrl(front_url);
    //side 사진
    const side_uint8Array = new Uint8Array(side);
    const side_blob = new Blob([side_uint8Array], { type: "image/png" });
    console.log(side_blob);

    const side_url = URL.createObjectURL(side_blob);
    setSideImageUrl(side_url);
  }, [front, side]);

  return (
    <div>
      <Row>
        <Col xs={2} sm={4} md={6} lg={8} xl={5}></Col>
        <Col xs={20} sm={16} md={12} lg={8} xl={8}>
          <div
            style={{ display: "flex", flexDirection: "row", marginTop: 200 }}
          >
            <img style={{ width: 500 }} src={front_imageUrl} />
            <img style={{ width: 500 }} src={side_imageUrl} />
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
