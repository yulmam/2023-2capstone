package com.example.modak.diagnosis.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;


@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DiagnosisResultDto {
    MultipartFile front;
    MultipartFile side;
    String value;
}
