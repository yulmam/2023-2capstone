package com.example.modak.diagnosis.dto;

import lombok.Builder;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Builder
public class RestRequestDto {
    List<MultipartFile> files;
}
