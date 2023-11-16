import cv2
import numpy as np
from PIL import ImageFont, ImageDraw, Image

shoulderx = 0
earx = 0

#opencv의 이미지에서 한글 출력 함수
def PutTextHangul(src, text, pos, font_size, font_color):
    img_pil = Image.fromarray(src)
    draw = ImageDraw.Draw(img_pil)
    font = ImageFont.truetype('fonts/MaruBuri-Bold.ttf', font_size)
    draw.text(pos, text, font=font, fill= font_color)
    return np.array(img_pil)

def output_keypoints(frame, proto_file, weights_file, threshold, model_name, BODY_PARTS, picturetype):
    global points

    # 네트워크 불러오기
    net = cv2.dnn.readNetFromCaffe(proto_file, weights_file)

    # 입력 이미지의 사이즈 정의
    image_height = 368
    image_width = 368

    # 네트워크에 넣기 위한 전처리
    input_blob = cv2.dnn.blobFromImage(frame, 1.0 / 255, (image_width, image_height), (0, 0, 0), swapRB=False, crop=False)

    # 전처리된 blob 네트워크에 입력
    net.setInput(input_blob)

    # 결과 받아오기
    out = net.forward()
    # The output is a 4D matrix :
    # The first dimension being the image ID ( in case you pass more than one image to the network ).
    # The second dimension indicates the index of a keypoint.
    # The model produces Confidence Maps and Part Affinity maps which are all concatenated.
    # For COCO model it consists of 57 parts – 18 keypoint confidence Maps + 1 background + 19*2 Part Affinity Maps. Similarly, for MPI, it produces 44 points.
    # We will be using only the first few points which correspond to Keypoints.
    # The third dimension is the height of the output map.
    out_height = out.shape[2]
    # The fourth dimension is the width of the output map.
    out_width = out.shape[3]

    # 원본 이미지의 높이, 너비를 받아오기
    frame_height, frame_width = frame.shape[:2]

    # 포인트 리스트 초기화
    points = []

    print(f"\n============================== {picturetype} picture ==============================")
    for i in range(len(BODY_PARTS)):

        # 신체 부위의 confidence map
        prob_map = out[0, i, :, :]

        # 최소값, 최대값, 최소값 위치, 최대값 위치
        min_val, prob, min_loc, point = cv2.minMaxLoc(prob_map)

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
                    global shoulderx
                    shoulderx = x
                    cv2.circle(frame, (x, y), 5, (0, 255, 255), thickness=-1, lineType=cv2.FILLED)
                    frame = PutTextHangul(frame, '어깨', (x+10, y), 20, (0,255,255))
                    #cv2.putText(frame, str("shoulder"), (x+10, y), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0, 255, 255), 1, lineType=cv2.LINE_AA)
                    print(f"i: {i}, shoulderx: {shoulderx}, x: {x}")
                #earx
                if (i == 17) or (i == 18):
                    global earx
                    earx = x
                    cv2.circle(frame, (x, y), 5, (0, 255, 255), thickness=-1, lineType=cv2.FILLED)
                    frame = PutTextHangul(frame, '귀', (x+10, y), 20, (0,255,255))
                    # cv2.putText(frame, str("ear"), (x+10, y), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0, 255, 255), 1, lineType=cv2.LINE_AA)
                    print(f"i: {i}, earx: {earx}, x: {x}")
            else: # picture == "front"
                # Shoulder
                if (i == 2) or (i == 5): 
                    cv2.circle(frame, (x, y), 5, (0, 255, 255), thickness=-1, lineType=cv2.FILLED)
                    # frame = PutTextHangul(frame, '어깨', (x+10, y), 20, (0,255,255))
                    #cv2.putText(frame, str("shoulder"), (x+10, y), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0, 255, 255), 1, lineType=cv2.LINE_AA)
                    print(f"i: {i}, x: {x}")
                # Hip
                if (i == 9) or (i == 12):
                    cv2.circle(frame, (x, y), 5, (0, 255, 255), thickness=-1, lineType=cv2.FILLED)
                    # frame = PutTextHangul(frame, '귀', (x+10, y), 20, (0,255,255))
                    # cv2.putText(frame, str("ear"), (x+10, y), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0, 255, 255), 1, lineType=cv2.LINE_AA)
                    print(f"i: {i}, x: {x}")
        else:  # [not pointed]
            #cv2.circle(frame, (x, y), 5, (0, 255, 255), thickness=-1, lineType=cv2.FILLED)
            #cv2.putText(frame, str(i), (x, y), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255, 0, 0), 1, lineType=cv2.LINE_AA)
            points.append(None)
            print(f"[not pointed] {BODY_PARTS[i]} ({i}) => prob: {prob:.5f} / x: {x} / y: {y}")
    print(f"points: {points}")
    # cv2.imshow("Output_Keypoints", frame)
    # cv2.waitKey(0)
    return frame

def output_keypoints_with_lines(frame, POSE_PAIRS):
    print()
    for pair in POSE_PAIRS:
        part_a = pair[0]  # 0 (Head)
        part_b = pair[1]  # 1 (Neck)
        print(f"pair[0]: {pair[0]}")
        '''
        if points[part_a] and points[part_b]:
            print(f"[linked] {part_a} {points[part_a]} <=> {part_b} {points[part_b]}")
            cv2.line(frame, points[part_a], points[part_b], (0, 255, 0), 3)
        else:
            print(f"[not linked] {part_a} {points[part_a]} <=> {part_b} {points[part_b]}")
        '''
    # cv2.imshow("output_keypoints_with_lines", frame)
    # cv2.waitKey(0)
    # cv2.destroyAllWindows()

    print(f"shoulderx: {shoulderx}")
    
    red = (0, 0, 255)

    frame = PutTextHangul(frame, '기준점', (shoulderx+10, 100), 20, (0,0,255))
    
    '''
    text = "기준점"
    font = ImageFont.truetype('fonts/MaruBuri-Bold.ttf', 20)
    img_pil = Image.fromarray(frame)
    draw = ImageDraw.Draw(img_pil)
    draw.text((shoulderx+10, 100), text, (0,0,255), font=font)
    
    frame = np.array(img_pil)
    '''
    cv2.line(frame, (shoulderx, 0),(shoulderx, 460), red, 3)
    # cv2.putText(frame, str("criterion"), (shoulderx+10, 100), cv2.FONT_HERSHEY_SIMPLEX, 0.5, red, 1, lineType=cv2.LINE_AA)
    cv2.imshow("Turtle neck Diagnosis", frame)
    cv2.imwrite("./download/image7.png",frame)
    cv2.waitKey(0)
    
    #화면 종료
    cv2.destroyAllWindows()

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
sideman = ".\\Pictures\\side_good.png"
frontman = ".\\Pictures\\scoliosis_test7.jpg"

# frame_body_25 = cv2.imread(man)
frame_side = cv2.imread(sideman)
frame_front = cv2.imread(frontman)

# BODY_25 Model (front, side)
#frame_BODY_25 = output_keypoints(frame=frame_body_25, proto_file=protoFile_body_25, weights_file=weightsFile_body_25,
#                              threshold=0.2, model_name="BODY_25", BODY_PARTS=BODY_PARTS_BODY_25)
# frame_SIDE = output_keypoints(frame=frame_side, proto_file=protoFile_body_25, weights_file=weightsFile_body_25,
#                               threshold=0.2, model_name="BODY_25", BODY_PARTS=BODY_PARTS_BODY_25, picturetype = "side")
frame_FRONT = output_keypoints(frame=frame_front, proto_file=protoFile_body_25, weights_file=weightsFile_body_25,
                              threshold=0.2, model_name="BODY_25", BODY_PARTS=BODY_PARTS_BODY_25, picturetype = "front")

#output_keypoints_with_lines(frame=frame_BODY_25, POSE_PAIRS=POSE_PAIRS_BODY_25)
# 옆면 사진 관절 라인
# output_keypoints_with_lines(frame=frame_SIDE, POSE_PAIRS=POSE_PAIRS_BODY_25)
# 정면 사진 관절 라인
output_keypoints_with_lines(frame=frame_FRONT, POSE_PAIRS=POSE_PAIRS_BODY_25)