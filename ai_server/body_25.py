

import cv2
import numpy as np
import fomula
from PIL import ImageFont, ImageDraw, Image



# 사진 출력 함수
def image_printing(frame, picture_name):
    
    cv2.imwrite(f"./download/{picture_name}.png",frame)
    cv2.waitKey(0)
    
    #화면 종료
    cv2.destroyAllWindows()

def PutTextHangul(src, text, pos, font_size, font_color):                # opencv의 이미지에서 한글 출력 함수
    img_pil = Image.fromarray(src)
    draw = ImageDraw.Draw(img_pil)
    font = ImageFont.truetype('fonts/MaruBuri-Bold.ttf', font_size)
    draw.text(pos, text, font=font, fill= font_color)
    return np.array(img_pil)

def output_keypoints(frame, proto_file, weights_file, threshold, model_name, BODY_PARTS, picturetype, side_shoulderx, side_earx, front_Rshoulderx, front_Rshouldery, front_Lshoulderx, front_Lshouldery, front_Rhipx, front_Rhipy, front_Lhipx, front_Lhipy):

    global points
    net = cv2.dnn.readNetFromCaffe(proto_file, weights_file)            # 네트워크 불러오기

    # 입력 이미지의 사이즈 정의
    image_height = 368
    image_width = 368

    input_blob = cv2.dnn.blobFromImage(frame, 1.0 / 255, (image_width, image_height), (0, 0, 0), swapRB=False, crop=False)          # 네트워크에 넣기 위한 전처리

    net.setInput(input_blob)             # 전처리된 blob 네트워크에 입력

    out = net.forward()                  # 결과 받아오기
    # The output is a 4D matrix :
    # The first dimension being the image ID ( in case you pass more than one image to the network ).
    # The second dimension indicates the index of a keypoint.
    # The model produces Confidence Maps and Part Affinity maps which are all concatenated.
    # For COCO model it consists of 57 parts – 18 keypoint confidence Maps + 1 background + 19*2 Part Affinity Maps. Similarly, for MPI, it produces 44 points.
    # We will be using only the first few points which correspond to Keypoints.
    
    out_height = out.shape[2]           # The third dimension is the height of the output map.
    out_width = out.shape[3]            # The fourth dimension is the width of the output map.

    frame_height, frame_width = frame.shape[:2]                         # 원본 이미지의 높이, 너비를 받아오기

    points = []                                                         # 포인트 리스트 초기화

    print(f"\n============================== {picturetype} picture ==============================")
    for i in range(len(BODY_PARTS)):

        prob_map = out[0, i, :, :]                                      # 신체 부위의 confidence map

        min_val, prob, min_loc, point = cv2.minMaxLoc(prob_map)         # 최소값, 최대값, 최소값 위치, 최대값 위치

        # 원본 이미지에 맞게 포인트 위치 조정
        x = (frame_width * point[0]) / out_width
        x = int(x)
        y = (frame_height * point[1]) / out_height
        y = int(y)

        
        if prob > threshold:  # [pointed]

            points.append((x, y))
            print(f"[pointed] {BODY_PARTS[i]} ({i}) => prob: {prob:.5f} / x: {x} / y: {y}")
            if picturetype == "side":
                if (i == 2) or (i == 5): 
                    print(f"side_shoulderx = {side_shoulderx}")
                    side_shoulderx = x
                    print(f"side_shoulderx = {side_shoulderx}")
                    cv2.circle(frame, (x, y), 5, (0, 255, 255), thickness=-1, lineType=cv2.FILLED)
                    frame = PutTextHangul(frame, '어깨', (x+10, y), 20, (0,255,255))
                #earx
                if (i == 17) or (i == 18):
                    side_earx = x
                    cv2.circle(frame, (x, y), 5, (0, 255, 255), thickness=-1, lineType=cv2.FILLED)
                    frame = PutTextHangul(frame, '귀', (x+10, y), 20, (0,255,255))
                if (i == 15) or (i == 16):                  # side_eyex 저장
                    side_eyex = x
            else: # picture == "front"
                # Shoulder
                if (i == 2):
                    front_Rshoulderx = x
                    front_Rshouldery = y
                
                    cv2.circle(frame, (x, y), 5, (0, 255, 255), thickness=-1, lineType=cv2.FILLED)
                elif (i == 5):
                    front_Lshoulderx = x
                    front_Lshouldery = y
                
                    cv2.circle(frame, (x, y), 5, (0, 255, 255), thickness=-1, lineType=cv2.FILLED)
                # Hip
                elif (i == 9):
                    front_Rhipx = x
                    front_Rhipy = y

                    cv2.circle(frame, (x, y), 5, (0, 255, 255), thickness=-1, lineType=cv2.FILLED)
                    # frame = PutTextHangul(frame, '귀', (x+10, y), 20, (0,255,255))
                elif (i == 12):
                    front_Lhipx = x
                    front_Lhipy = y

                    cv2.circle(frame, (x, y), 5, (0, 255, 255), thickness=-1, lineType=cv2.FILLED)
                    # frame = PutTextHangul(frame, '귀', (x+10, y), 20, (0,255,255))
                    # print(f"i: {i}, x: {x}")    
        else:  # [not pointed]
            #cv2.circle(frame, (x, y), 5, (0, 255, 255), thickness=-1, lineType=cv2.FILLED)
            points.append(None)
            print(f"[not pointed] {BODY_PARTS[i]} ({i}) => prob: {prob:.5f} / x: {x} / y: {y}")
    if picturetype == "side":
        # cv2.line(frame, (side_shoulderx, 0),(side_shoulderx, 460), (0, 0, 255), 3)
        print(f"side_shoulderx: {side_shoulderx}") 
        # frame = PutTextHangul(frame, '기준점', (side_shoulderx+10, 100), 20, (0,0,255))
    print(f"points: {points}")
    # cv2.imshow("Output_Keypoints", frame)
    # cv2.waitKey(0)
    return (frame,side_shoulderx, side_earx, front_Rshoulderx, front_Rshouldery, front_Lshoulderx, front_Lshouldery, front_Rhipx, front_Rhipy, front_Lhipx, front_Lhipy)

def output_keypoints_with_lines(frame, POSE_PAIRS, side_shoulderx, side_earx, front_Rshoulderx, front_Rshouldery, front_Lshoulderx, front_Lshouldery, front_Rhipx, front_Rhipy, front_Lhipx, front_Lhipy):
    for pair in POSE_PAIRS:
        part_a = pair[0]  # 0 (Head)
        part_b = pair[1]  # 1 (Neck)
        # print(f"pair[0]: {pair[0]}")
        # print(f"pair[1]: {pair[1]}")
        
        cv2.line(frame, points[2], points[5], (0, 255, 0), 3)
        frame = PutTextHangul(frame, '어깨 기울기', (front_Lshoulderx+10, front_Lshouldery + 15), 20, (0,255,255))
        cv2.line(frame, points[9], points[12], (0, 255, 0), 3)
        frame = PutTextHangul(frame, '골반 기울기', (front_Lhipx+10, front_Lhipy + 10), 20, (0,255,255))
        # if points[part_a] and points[part_b]:
        #     print(f"[linked] {part_a} {points[part_a]} <=> {part_b} {points[part_b]}")
        #     cv2.line(frame, points[part_a], points[part_b], (0, 255, 0), 3)
        # else:
        #     print(f"[not linked] {part_a} {points[part_a]} <=> {part_b} {points[part_b]}")
        
    # cv2.imshow("output_keypoints_with_lines", frame)
    # cv2.waitKey(0)
    # cv2.destroyAllWindows()

    # print(f"front_shoulderx: {front_shoulderx}")

    return (frame, side_shoulderx, side_earx, front_Rshoulderx, front_Rshouldery, front_Lshoulderx, front_Lshouldery, front_Rhipx, front_Rhipy, front_Lhipx, front_Lhipy) 