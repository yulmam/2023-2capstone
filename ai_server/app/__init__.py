from flask import Flask, request, jsonify

from body_25 import output_keypoints_with_lines, output_keypoints, image_printing
from werkzeug.utils import secure_filename
import fomula
import cv2
import base64
import numpy as np
from PIL import ImageFont, ImageDraw, Image
app = Flask(__name__)


# 진단 결과
turtleneck_result = scoliosis_result = 0

@app.route('/')
def index():
    return "Welcome to the index page!"

@app.route('/run', methods=["POST"])
def ai_run():
    # 계산식에 필요한 각 관절 좌표
    side_shoulderx = side_earx = side_eyex = 0
    front_Rshoulderx = front_Rshouldery = front_Rhipx = front_Rhipy = 0
    front_Lshoulderx = front_Lshouldery = front_Lhipx = front_Lhipy = 0

    img=request.files["front"]
    img.save('./upload/front.png')
    img=request.files["side"]
    img.save('./upload/side.png')

    BODY_PARTS_BODY_25 = {0: "Nose", 1: "Neck", 2: "RShoulder", 3: "RElbow", 4: "RWrist",

                        5: "LShoulder", 6: "LElbow", 7: "LWrist", 8: "MidHip", 9: "RHip",
                        10: "RKnee", 11: "RAnkle", 12: "LHip", 13: "LKnee", 14: "LAnkle",
                        15: "REye", 16: "LEye", 17: "REar", 18: "LEar", 19: "LBigToe",
                        20: "LSmallToe", 21: "LHeel", 22: "RBigToe", 23: "RSmallToe", 24: "RHeel", 25: "Background"}

    POSE_PAIRS_BODY_25 = [[0, 1], [0, 15], [0, 16], [1, 2], [1, 5], [1, 8], [8, 9], [8, 12], [9, 10], [12, 13], [2, 3],
                        [3, 4], [5, 6], [6, 7], [10, 11], [13, 14], [15, 17], [16, 18], [14, 21], [19, 21], [20, 21],
                        [11, 24], [22, 24], [23, 24]]

    # 신경 네트워크의 구조를 지정하는 prototxt 파일 (다양한 계층이 배열되는 방법 등)
    protoFile_body_25 = ".\\body_25\\pose_deploy.prototxt"

    # 훈련된 모델의 weight 를 저장하는 caffemodel 파일
    weightsFile_body_25 = ".\\body_25\\pose_iter_584000.caffemodel"

    # 이미지 경로
    # sideman = ".\\Pictures\\side_good.png"
    sideman = ".\\upload\\side.png"
    frontman = ".\\upload\\front.png"

    # frame_body_25 = cv2.imread(man)
    frame_side = cv2.imread(sideman)
    frame_front = cv2.imread(frontman)

    # BODY_25 Model (front, side)
    #frame_BODY_25 = output_keypoints(frame=frame_body_25, proto_file=protoFile_body_25, weights_file=weightsFile_body_25,
    #                              threshold=0.2, model_name="BODY_25", BODY_PARTS=BODY_PARTS_BODY_25)
    
    (frame_SIDE, side_shoulderx, side_earx, front_Rshoulderx, front_Rshouldery, front_Lshoulderx, front_Lshouldery,
    front_Rhipx, front_Rhipy, front_Lhipx, front_Lhipy)= output_keypoints(frame=frame_side, proto_file=protoFile_body_25, weights_file=weightsFile_body_25,
                                threshold=0.2, model_name="BODY_25", BODY_PARTS=BODY_PARTS_BODY_25, picturetype = "side",
                                side_shoulderx=side_shoulderx, side_earx=side_earx, front_Rshoulderx=front_Rshoulderx, front_Rshouldery=front_Rshouldery,
                                front_Lshoulderx=front_Lshoulderx, front_Lshouldery=front_Lshouldery, front_Rhipx=front_Rhipx,
                                front_Rhipy=front_Rhipy, front_Lhipx=front_Lhipx, front_Lhipy=front_Lhipy)
    print("옆모습 어깨 전역변수",side_shoulderx);
    image_printing(frame=frame_SIDE, picture_name="side")

    print(f"side_earx: {side_earx}, side_shoulderx: {side_shoulderx}, side_eyex= {side_eyex}")
    TurtleneckValue = fomula.ear_to_shoulder_cm(earx=side_earx, shoulderx=side_shoulderx, eyex=side_eyex)           # 귀부터 어깨까지 거리
    TurtleneckCheck = fomula.turtleneck_fomula(earx=side_earx, shoulderx=side_shoulderx, eyex=side_eyex)            # 거북목 수치화 ex) 1: 정상상태, 2: 거북목 의심상태, 3: 거북목상태, 0: 에러(다른 사진으로 교체)

    print(f"TurtleneckValue: {TurtleneckValue}cm, TurtleneckCheck: {TurtleneckCheck}")

    side_shoulderx = side_earx = side_eyex = 0
    front_Rshoulderx = front_Rshouldery = front_Rhipx = front_Rhipy = 0
    front_Lshoulderx = front_Lshouldery = front_Lhipx = front_Lhipy = 0
    
    (frame_FRONT, side_shoulderx, side_earx, front_Rshoulderx, front_Rshouldery, front_Lshoulderx, front_Lshouldery,
    front_Rhipx, front_Rhipy, front_Lhipx, front_Lhipy) = output_keypoints(frame=frame_front, proto_file=protoFile_body_25, weights_file=weightsFile_body_25,
                                threshold=0.2, model_name="BODY_25", BODY_PARTS=BODY_PARTS_BODY_25, picturetype = "front",
                                side_shoulderx=side_shoulderx, side_earx=side_earx, front_Rshoulderx=front_Rshoulderx, front_Rshouldery=front_Rshouldery,
                                front_Lshoulderx=front_Lshoulderx, front_Lshouldery=front_Lshouldery, front_Rhipx=front_Rhipx,
                                front_Rhipy=front_Rhipy, front_Lhipx=front_Lhipx, front_Lhipy=front_Lhipy)
    # 정면 사진 관절 라인
    (frame_front, side_shoulderx, side_earx, front_Rshoulderx, front_Rshouldery, front_Lshoulderx, front_Lshouldery,
    front_Rhipx, front_Rhipy, front_Lhipx, front_Lhipy) = output_keypoints_with_lines(frame=frame_FRONT, POSE_PAIRS=POSE_PAIRS_BODY_25, side_shoulderx=side_shoulderx, side_earx=side_earx, front_Rshoulderx=front_Rshoulderx, front_Rshouldery=front_Rshouldery,
                                front_Lshoulderx=front_Lshoulderx, front_Lshouldery=front_Lshouldery, front_Rhipx=front_Rhipx,
                                front_Rhipy=front_Rhipy, front_Lhipx=front_Lhipx, front_Lhipy=front_Lhipy)
    image_printing(frame=frame_front, picture_name="front")

    discValue = fomula.shoulder_and_hip_angle(Lshoulderx=front_Lshoulderx, Lshouldery=front_Lshouldery, Rshoulderx=front_Rshoulderx, Rshouldery=front_Rshouldery, Lhipx=front_Lhipx, Lhipy=front_Lhipy, Rhipx=front_Rhipx, Rhipy=front_Rhipy)
    discCheck = fomula.disc_fomula(Lshouldery=front_Lshouldery, Rshouldery=front_Rshouldery, Lhipy=front_Lhipy, Rhipy=front_Rhipy)
    shoulderAngle = fomula.shoulderAngle(Lshoulderx=front_Lshoulderx, Lshouldery=front_Lshouldery, Rshoulderx=front_Rshoulderx, Rshouldery=front_Rshouldery)
    hipAngle = fomula.hipAngle(Lhipx=front_Lhipx, Lhipy=front_Lhipy, Rhipx=front_Rhipx, Rhipy=front_Rhipy)

    image_path1 = ".\\download\\side.png"
    image_path2 = ".\\download\\front.png"
    variable_value= "value"
    with open(image_path1, 'rb') as img1_file:
        encoded_image1 = base64.b64encode(img1_file.read()).decode('utf-8')
    with open(image_path2, 'rb') as img2_file:
        encoded_image2 = base64.b64encode(img2_file.read()).decode('utf-8')
    value = "value"
    response_data = {
        'side': encoded_image1,
        'front' : encoded_image2,
        'turtleneckValue' : TurtleneckValue,
        'turtleneckCheck' : TurtleneckCheck,
        'discValue' : discValue,
        'discCheck' : discCheck,
        'shoulderAngle': shoulderAngle,
        'hipAngle' : hipAngle,
    }
    print("hi")
   

    return jsonify(response_data)