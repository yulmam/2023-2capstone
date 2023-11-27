/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Report.css";
import { Col, Row, Card, Space } from "antd";
import { dispatchImageURL } from "../reducers/diagnosis";
const { Meta } = Card;
const level = "좋다";
const shoulderAngle = 20;
const Report = () => {
  const [front_imageUrl, setFrontImageUrl] = useState(null);
  const [side_imageUrl, setSideImageUrl] = useState(null);
  const {
    front,
    side,
    discCheck,
    turtleneckCheck,
    turtleneckValue,
    discValue,
    k,
  } = useSelector((state) => state.diagnosis);
  const test = 3;
  const value = 50;
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
      {/* <div
            style={{ display: "flex", flexDirection: "row", marginTop: 200 }}
          >
            <img style={{ width: 500 }} src={front_imageUrl} />
            <img style={{ width: 500 }} src={side_imageUrl} />
          </div> */}
      <section>
        <div class="image-container">
          <img
            src={front_imageUrl}
            alt="이미지 1"
          />
          <p class="image-description">
            <p>
              당신의 허리는 {discValue}도 만큼 <br />
              기울어져있습니다.
              <br />
              {discCheck >= 3 ? (
                <div>
                  <span>디스크가 매우 의심됩니다 </span>
                  <br /> <span>병원가서 진찰을 권유 </span>
                  <br />
                  드립니다
                </div>
              ) : test >= 2 ? (
                " 디스크가 의심됩니다 "
              ) : (
                "허리건강 상태가 좋습니다 "
              )}
            </p>
          </p>
        </div>

        <div class="image-container">
          <img
            src={side_imageUrl}
            alt="이미지 2"
          />
          <p class="image-description">
            당신은 귀는 목에서
            <br /> {turtleneckValue}cm 만큼 떨어져있습니다.
            {turtleneckCheck >= 3 ? (
              <div>
                <span>디스크가 매우 의심됩니다 </span>
                <br /> <span>병원가서 진찰을 권유 </span>
                <br />
                드립니다
              </div>
            ) : test >= 2 ? (
              " 거북목이 의심됩니다 "
            ) : (
              " 목 상태가 좋습니다 "
            )}
          </p>
        </div>
      </section>
    </div>
  );
};
export default Report;