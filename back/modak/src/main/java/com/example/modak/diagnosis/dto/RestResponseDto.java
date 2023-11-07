package com.example.modak.diagnosis.dto;

import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public class RestResponseDto {

    long turtleNeck;

    long scoliosis;

    List<MultipartFile> images;
}
