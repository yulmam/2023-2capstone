import numpy as np

def turtleneck_fomula(earx, shoulderx, eyex):
    print("[거북목 진단결과]")

    A = abs(shoulderx - earx)
    B = abs(earx - eyex)

    if B/6*5 < A:
        print("거북목 상태")
        return 3
    elif B/6*2.5 < A:     
        print("거북목 의심상태")
        return 2
    else:
        print("정상 상태")
        return 1

def disc_fomula(discCheck):
    
    return 1
# def disc_fomula(Lshouldery, Rshouldery, Lhipy, Rhipy):
#     print("[척추측만증 진단결과]")

#     if (Lshouldery > Rshouldery) and (Lhipy < Rhipy):
#         print("척추측만증 매우 의심")
#         return 3
#     elif (abs(Lshouldery-Rshouldery) > abs(Lhipy-Rhipy)):
#         print("척추측만증 약간 의심")
#         return 2
#     else:
#         print("정상 상태")    
#         return 1

def ear_to_shoulder_cm(earx, shoulderx, eyex):
    
    A = abs(shoulderx - earx)
    B = abs(earx - eyex)
    
    print(f"A:{A}")
    print(f"B:{B}")
    result = 6 * A / B
    return result

def shoulder_and_face_angle(Neckx, Necky, Rshoulderx, Rshouldery, Nosex, Nosey):
    x1 = Rshoulderx-Neckx
    y1 = Rshouldery-Necky
    x2 = Nosex-Neckx
    y2 = Nosey-Necky

    vector_1 = np.array([x1, y1])                           # A벡터
    vector_2 = np.array([x2, y2])                           # B벡터

    innerAB = np.dot(vector_1, vector_2)                    # A내적 B
    AB=np.linalg.norm(vector_1)*np.linalg.norm(vector_2)    # A절댓값 * B절댓갑

    angle_radian = np.arccos(innerAB/AB)                    # cosΘ = AㅇB / |A||B|
    angle_PI = (angle_radian / np.pi * 180)
    print(f"shoulder and face angle: {angle_PI}")

    return angle_PI

def shoulderAngle(Lshoulderx, Lshouldery, Rshoulderx, Rshouldery):
    x1 = Lshoulderx-Rshoulderx
    y1 = Lshouldery-Rshouldery

    vector_1 = np.array([x1, y1])                           # A벡터
    vector_2 = np.array([1, 0])                             # B벡터

    innerAB = np.dot(vector_1, vector_2)                    # A내적 B
    AB=np.linalg.norm(vector_1)*np.linalg.norm(vector_2)    # A절댓값 * B절댓갑

    angle_radian = np.arccos(innerAB/AB)                    # cosΘ = AㅇB / |A||B|
    angle_PI = (angle_radian / np.pi * 180)
    print(f"shoulder angle: {angle_PI}")

    return angle_PI

def hipAngle(Lhipx, Lhipy, Rhipx, Rhipy):
    x1 = Lhipx-Rhipx
    y1 = Lhipy-Rhipy

    vector_1 = np.array([x1, y1])                           # A벡터
    vector_2 = np.array([1, 0])                             # B벡터

    innerAB = np.dot(vector_1, vector_2)                    # A내적 B
    AB=np.linalg.norm(vector_1)*np.linalg.norm(vector_2)    # A절댓값 * B절댓갑

    angle_radian = np.arccos(innerAB/AB)                    # cosΘ = AㅇB / |A||B|
    angle_PI = (angle_radian / np.pi * 180)
    print(f"hip angle: {angle_PI}")

    return angle_PI