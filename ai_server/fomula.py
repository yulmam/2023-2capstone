def turtleneck_fomula(earx, shoulderx, eyex):
    print("[거북목 진단결과]")

    A= shoulderx-earx
    B= earx - eyex 
    if B/6*5 < A:
        print("거북목 상태")
        return 3
    elif B/6*2.5 < A:     
        print("거북목 의심상태")
        return 2
    else:
        print("정상 상태")
        return 1

def scoliosis_fomula(Lshouldery, Rshouldery, Lhipy, Rhipy):
    print("[척추측만증 진단결과]")

    if (Lshouldery > Rshouldery) and (Lhipy < Rhipy):
        print("척추측만증 매우 의심")
        return 3
    elif (abs(Lshouldery-Rshouldery) > abs(Lhipy-Rhipy)):
        print("척추측만증 약간 의심")
        return 2
    else:
        print("정상 상태")    
        return 1