from flask import Flask, request, jsonify
from body_25 import output_keypoints_with_lines
import cv2  # OpenCV

# OpenPose 라이브러리 임포트

app = Flask(__name__)


@app.route('/')
def index():
    print("hi")
    file = output_keypoints_with_lines()
    print(file)
  
    return 

app.run()