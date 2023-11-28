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
          <h2>사용법</h2>

          <ol>
            <li>
              <span class="highlight">사진 찍는 법</span>
              <ul>
                <li>
                  정면 사진 : 정자세로 힘을 빼고 찍어주세요. 가벼운 옷을
                  입어주세요. 두꺼운 옷을 입을 경우 측정이 부정확 할 수
                  있습니다.
                </li>
                <li>
                  측면 사진 : 귀와 어깨가 잘 보이게 찍어주세요. 카메라와 어깨가
                  90도 각도로 찍어야 정확한 측정이 가능합니다.
                </li>
              </ul>
            </li>
            <br />
            <li>
              <span class="highlight">주의사항</span>
              <ul>
                <li>
                  최대한 편한 자세로 찍어주세요. 인위적인 자세를 취할 경우
                  정확한 측정이 불가능 합니다.
                </li>
                <li>
                  가벼운 옷차림으로 찍어주세요. 옷이 너무 두껍거나 상하의가 같은
                  색상의 옷일 경우 정확도가 떨어집니다.
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
