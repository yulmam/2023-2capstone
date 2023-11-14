package com.example.modak.diagnosis.dto;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;


@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
@Getter
public class DiagnosisRequestDto {

    MultipartFile front;
    MultipartFile side;
}
