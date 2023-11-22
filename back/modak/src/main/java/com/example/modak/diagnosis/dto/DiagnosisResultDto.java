package com.example.modak.diagnosis.dto;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
@Getter
public class DiagnosisResultDto {
    String nickName;
    Byte[] front;
    Byte[] side;
    float turtleneckValue;
    int turtleneckCheck;
    float discValue;
    int discCheck;
}
