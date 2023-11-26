

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

def output_keypoints(frame, proto_file, weights_file, threshold, model_name, BODY_PARTS, picturetype):

    # disc = [0, 1, 2, 5, 8, 9, 12]
    side_shoulderx = side_earx = 0
    front_Rshoulderx = front_Rshouldery = front_Lshoulderx = front_Lshouldery = 0
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
    side = []
    front = []
    value = []                                                          # 거북목, 척추측만증 value 및 check 값
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
        else:  # [not pointed]
            #cv2.circle(frame, (x, y), 5, (0, 255, 255), thickness=-1, lineType=cv2.FILLED)
            points.append(None)
            if i == 16:                      #왼쪽귀가 안보이므로 오른쪽 측면사진
                side_photo = "right"
            elif i == 18:
                side_phto = "left"
            print(f"[not pointed] {BODY_PARTS[i]} ({i}) => prob: {prob:.5f} / x: {x} / y: {y}")
    if picturetype == "side":
        if side_photo == "right":                   # 왼쪽귀가 안보이므로 오른쪽 측면 사진
            cv2.circle(frame, points[2], 5, (0, 255, 255), thickness=-1, lineType=cv2.FILLED)
            side.append(points[2])
            frame = PutTextHangul(frame, '어깨', (points[2][0]+30, points[2][1]), 40, (0,255,255))
            cv2.circle(frame, points[15], 5, (0, 255, 255), thickness=-1, lineType=cv2.FILLED)
            side.append(points[15])
            frame = PutTextHangul(frame, '눈', (points[15][0]+30, points[15][1]), 40, (0,255,255))
            # cv2.circle(frame, points[17], 5, (0, 255, 255), thickness=-1, lineType=cv2.FILLED)
            side.append(points[17])
            # frame = PutTextHangul(frame, '귀', (points[17][0]+10, points[17][1]), 20, (0,255,255))
            # side_shoulderx = points[2][0]
            # side_eyex = points[15][0]
            # side_earx = points[17][0]
        elif side_phto == "left":
            cv2.circle(frame, points[5], 5, (0, 255, 255), thickness=-1, lineType=cv2.FILLED)
            side.append(points[5])
            frame = PutTextHangul(frame, '어깨', (points[5][0]+30, points[5][1]), 40, (0,255,255))
            cv2.circle(frame, points[16], 5, (0, 255, 255), thickness=-1, lineType=cv2.FILLED)
            side.append(points[16])
            frame = PutTextHangul(frame, '눈', (points[16][0]+30, points[16][1]), 40, (0,255,255))
            # cv2.circle(frame, points[18], 5, (0, 255, 255), thickness=-1, lineType=cv2.FILLED)
            side.append(points[18])
            # frame = PutTextHangul(frame, '귀', (points[18][0]+10, points[18][1]), 40, (0,255,255))
            # side_shoulderx = points[5][0]
            # side_eyex = points[16][0]
            # side_earx = points[18][0]
    elif picturetype == "front":
        cv2.circle(frame, points[0], 5, (0, 255, 255), thickness=-1, lineType=cv2.FILLED)
        #front_Nosex = points[0][0]
        #front_Nosey = points[0][1]
        front.append(points[0])
        frame = PutTextHangul(frame, '얼굴', (points[0][0]+30, points[0][1]), 40, (0,255,255))
        cv2.circle(frame, points[1], 5, (0, 255, 255), thickness=-1, lineType=cv2.FILLED)
        #front_Neckx = points[1][0]
        #front_Necky = points[1][1]
        front.append(points[1])
        # frame = PutTextHangul(frame, '목', (points[1][0]+10, points[1][1]), 20, (0,255,255))
        cv2.circle(frame, points[2], 5, (0, 255, 255), thickness=-1, lineType=cv2.FILLED)
        #front_Rshoulderx = points[2][0]
        #front_Rshouldery = points[2][1]
        front.append(points[2])
        cv2.circle(frame, points[5], 5, (0, 255, 255), thickness=-1, lineType=cv2.FILLED)
        #front_Lshoulderx = points[5][0]
        #front_Lshouldery = points[5][1]
        front.append(points[5])
        frame = PutTextHangul(frame, '어깨', (points[5][0]+30, points[5][1]), 40, (0,255,255))
        cv2.circle(frame, points[8], 5, (0, 255, 255), thickness=-1, lineType=cv2.FILLED)
        #front_MidHipx = points[8][0]
        #front_MidHipy = points[8][1]
        front.append(points[8])
        cv2.circle(frame, points[9], 5, (0, 255, 255), thickness=-1, lineType=cv2.FILLED)
        #front_RHipx = points[9][0]
        #front_RHipy = points[9][1]
        front.append(points[9])
        cv2.circle(frame, points[12], 5, (0, 255, 255), thickness=-1, lineType=cv2.FILLED)
        #front_LHipx = points[12][0]
        #front_LHipy = points[12][1]
        front.append(points[12])
        frame = PutTextHangul(frame, '골반', (points[12][0]+30, points[12][1]), 40, (0,255,255))
    if picturetype == "side":
        cv2.line(frame, (side[0][0], 0), (side[0][0], 2000), (0, 0, 255), 5)
        frame = PutTextHangul(frame, '기준선', (side[0][0]+30, side[0][1]+100), 40, (0,0,255))
        frame = output_keypoints_with_lines(frame = frame, type = side, picture_name = picturetype)
        TurtleneckValue = fomula.ear_to_shoulder_cm(earx=side[1][0], shoulderx=side[0][0], eyex=side[2][0])             # 귀부터 어깨까지 거리
        print(f"TurtleneckValue: {TurtleneckValue}")
        TurtleneckCheck = fomula.turtleneck_fomula(earx=side[1][0], shoulderx=side[0][0], eyex=side[2][0])            # 거북목 수치화 ex) 1: 정상상태, 2: 거북목 의심상태, 3: 거북목상태, 0: 에러(다른 사진으로 교체)
        print(f"TurtleneckCheck: {TurtleneckCheck}")
        value.append(TurtleneckValue)
        value.append(TurtleneckCheck)
        # frame = PutTextHangul(frame, '기준점', (side_shoulderx+10, 100), 20, (0,0,255))
        
    elif picturetype == "front":
        frame = output_keypoints_with_lines(frame = frame, type = front, picture_name = picturetype)
        discValue = fomula.shoulder_and_face_angle(Neckx=front[1][0], Necky=front[1][1], Rshoulderx=front[3][0], Rshouldery=front[3][1], Nosex=front[0][0], Nosey=front[0][1])
        discCheck = fomula.disc_fomula(discValue)
        value.append(discValue)
        value.append(discCheck)
    print(f"points: {points}")
    # cv2.imshow("Output_Keypoints", frame)
    # cv2.waitKey(0)
    return (frame, value)

def output_keypoints_with_lines(frame, type, picture_name):
    #front 0 : Nose, 1 : Neck, 2 : Lshoulder, 3 : Rshoulder, 4 : MidHip, 5 : LHip, 6 : RHip
    if picture_name == "front":
        cv2.line(frame, type[0], type[1], (0, 255, 0), 3)    # 코 - 목
        # frame = PutTextHangul(frame, '어깨 기울기', (front_Lshoulderx+10, front_Lshouldery + 15), 20, (0,255,255))
        cv2.line(frame, type[1], type[2], (0, 255, 0), 3)   # 목 - 왼쪽어깨
        cv2.line(frame, type[1], type[3], (0, 255, 0), 3)   # 목 - 오른쪽어깨
        cv2.line(frame, type[1], type[4], (0, 255, 0), 3)   # 목 - 중앙골반
        cv2.line(frame, type[4], type[5], (0, 255, 0), 3)   # 중앙골반 - 왼쪽골반
        cv2.line(frame, type[4], type[6], (0, 255, 0), 3)   # 중앙골반 - 오른쪽골반
    #side 0 : shoulder, 1 : eye, 2 : ear
    elif picture_name == "side":
        cv2.line(frame, type[0], type[1], (0, 255, 0), 3)   # 어깨 - 귀
    # frame = PutTextHangul(frame, '골반 기울기', (front_Lhipx+10, front_Lhipy + 10), 20, (0,255,255))
        # if points[part_a] and points[part_b]:
        #     print(f"[linked] {part_a} {points[part_a]} <=> {part_b} {points[part_b]}")
        #     cv2.line(frame, points[part_a], points[part_b], (0, 255, 0), 3)
        # else:
        #     print(f"[not linked] {part_a} {points[part_a]} <=> {part_b} {points[part_b]}")
    image_printing(frame = frame, picture_name = picture_name)
    # cv2.imshow("output_keypoints_with_lines", frame)
    # cv2.waitKey(0)
    # cv2.destroyAllWindows()

    # print(f"front_shoulderx: {front_shoulderx}")
    return frame