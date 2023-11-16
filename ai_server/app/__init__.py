from flask import Flask, request, send_file

from body_25 import output_keypoints_with_lines, output_keypoints
from werkzeug.utils import secure_filename
import cv2
app = Flask(__name__)

@app.route('/')
def index():
    return "Welcome to the index page!"

@app.route('/run', methods=["POST"])
def ai_run():
    print(request.files.get("front"))
    print(request.files.get("side"))
    print(request.files["front"])
    img=request.files["front"]
    img.save('./upload/front.png')
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
    man = ".\\upload\\front.png"

    frame_body_25 = cv2.imread(man)
   
    # BODY_25 Model
    frame_BODY_25 = output_keypoints(frame=frame_body_25, proto_file=protoFile_body_25, weights_file=weightsFile_body_25,
                                threshold=0.2, model_name="BODY_25", BODY_PARTS=BODY_PARTS_BODY_25)
    
    output_keypoints_with_lines(frame=frame_BODY_25, POSE_PAIRS=POSE_PAIRS_BODY_25)
    image_path = "/download/image.jpg"
    variable_value= "value"
    files = {'front': open(image_path, 'rb')}
    data = {'variable' : variable_value}
    
    return request.post(files=files, data=data)