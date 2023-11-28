/* eslint-disable jsx-a11y/img-redundant-alt */
import { PlusOutlined } from "@ant-design/icons";
import React, { useCallback, useState, useEffect } from "react";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  Upload,
  Modal,
  Space,
} from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { submitForm } from "../reducers/diagnosis";
import useInput from "../hooks/useInput";
import "./PostForm.css";
const customLabelStyle = {
  fontSize: "20px", // 원하는 폰트 크기로 변경
  fontWeight: "bold",
  marginTop: 60,
};
const containerStyle = {};
const onChange = (value) => {
  console.log("changed", value);
};
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const normFrontFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const normSideFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};
const PostForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [frontList, setFrontList] = useState([]);
  const [sideList, setSideList] = useState([]);
  const [imageUrl, setImageUrl] = useState(null);
  const { front, side } = useSelector((state) => state.diagnosis);

  const onSumbitForm = useCallback(() => {
    const formData = new FormData();

    const imageArray = [];
    frontList.forEach((e) => {
      console.log(e.originFileObj);
      imageArray.push(e.originFileObj);
      formData.append("front", e.originFileObj);
    });
    sideList.forEach((e) => {
      console.log(e.originFileObj);
      imageArray.push(e.originFileObj);
      formData.append("side", e.originFileObj);
    });

    console.log(formData);

    for (let key of formData.keys()) {
      console.log(key, ":", formData.get(key));
    }
    for (let value of formData.values()) {
      console.log(value);
    }
    dispatch(submitForm(formData));
    // 이미지 처리하는 로직

    // 모든 로직이 끝나고 화면이동
    // 모든 로직이 끝나고 화면을 이동할지 이동하고 로직이 돌아가는지는
    //navigate위치 조정해서 테스트
    navigate("/Result");

    // dispatch(submitReport(formData));
  }, [dispatch, frontList, navigate, sideList]);

  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleFrontChange = (e) => {
    console.log("setfrontlist", e.fileList);
    setFrontList(e.fileList);
    console.log("frontList", frontList);
  };

  const handleSideChange = (e) => {
    console.log("setsidelist", e.fileList);
    setSideList(e.fileList);
    console.log("sideList", sideList);
  };
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );
  useEffect(() => {
    if (front) {
      const uint8Array = new Uint8Array(front);
      const blob = new Blob([uint8Array], { type: "image/png" });
      console.log(blob);

      const url = URL.createObjectURL(blob);
      console.log(url);
      setImageUrl(url);
    }
  }, [front]);

  return (
    <>
      <div class="align_center">
        <section class="PostForm_section">
          <h2>환상적인 선물을 담아내다</h2>

          <p>
            프리미엄 선물 상자는 특별한 순간을 기념하거나 소중한 사람에게 감사의
            마음을 전하고자 하는 분들을 위한 완벽한 선택입니다. 고급 재료와
            정교한 디자인으로 만들어진 이 선물 상자는 여러분의 센스와 감성을
            돋보이게 합니다.
          </p>

          <h2>디자인 특징</h2>

          <ol>
            <li>
              <span class="highlight">고품격 소재 사용</span>
              <ul>
                <li>
                  내구성 있는 판지와 고급 종이를 사용하여 탁월한 품질을
                  보장합니다.
                </li>
                <li>
                  환경 친화적인 재료로 제작되어, 지속 가능한 소비를 장려합니다.
                </li>
              </ul>
            </li>

            <li>
              <span class="highlight">다양한 사이즈와 스타일</span>
              <ul>
                <li>
                  작은 규모의 선물부터 크고 특별한 선물까지 다양한 사이즈로
                  제공됩니다.
                </li>
                <li>
                  클래식한 박스부터 현대적이고 창의적인 디자인까지, 다양한
                  스타일이 준비되어 있습니다.
                </li>
              </ul>
            </li>
          </ol>
        </section>
      </div>

      <Form
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        encType="multipart/form-data"
        onFinish={onSumbitForm}
      >
        <div style={containerStyle}>
          <Form.Item
            valuePropName="FileList"
            getValueFromEvent={normFrontFile}
            labelAlign="left"
            // label={<span style={customLabelStyle}>앞모습 사진:</span>}
            label="앞모습 사진"
          >
            <Upload
              listType="picture-card"
              fileList={frontList}
              onPreview={handlePreview}
              onChange={handleFrontChange}
            >
              {frontList.length >= 1 ? null : uploadButton}
            </Upload>
            <Modal
              open={previewOpen}
              title={previewTitle}
              footer={null}
              onCancel={handleCancel}
            >
              <img
                alt="example"
                style={{
                  width: "100%",
                }}
                src={previewImage}
              />
            </Modal>
          </Form.Item>

          <Form.Item
            valuePropName="FileList"
            getValueFromEvent={normFrontFile}
            labelAlign="left"
            // label={<span style={customLabelStyle}>옆모습 사진:</span>}
            label="옆모습 사진"
          >
            <Upload
              listType="picture-card"
              fileList={sideList}
              onPreview={handlePreview}
              onChange={handleSideChange}
            >
              {sideList.length >= 1 ? null : uploadButton}
            </Upload>
            <Modal
              open={previewOpen}
              title={previewTitle}
              footer={null}
              onCancel={handleCancel}
            >
              <img
                alt="example"
                style={{
                  width: "100%",
                }}
                src={previewImage}
              />
            </Modal>
          </Form.Item>
        </div>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ marginLeft: 750 }}>
            제출
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

// eslint-disable-next-line import/no-anonymous-default-export
export default () => <PostForm />;
