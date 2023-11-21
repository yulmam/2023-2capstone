import os
from PIL import Image

# 이미지 확장자 리스트
extension_list = ['.jpg', '.png', '.gif']

# resize 이미지 폴더
target = 'C:/project/python/랜덤이미지'

file_list = os.listdir(target)

for file in file_list:
    name, ext = os.path.splitext(file)
    if ext in extestion_list:
        img_path = os.path.join(target, file)
        img = Image.open(img_path)
        
        # 이미지 크기 수정
        width = int(img.width * )
        height = int(img.height * )
        resize = img.resize((width, heigth))

        save_path = os.path.join(destination, file)
        resize.save(save_path)
