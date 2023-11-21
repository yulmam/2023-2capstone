package com.example.modak.diagnosis.dto;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class RestResponseDto {
    int check;
    Byte[] front;
    Byte[] side;
    float turtleneckValue;
    int turtleneckCheck;
    float discValue;
    int discCheck;
    float shoulderAngle;
    float hipAngle;
}
