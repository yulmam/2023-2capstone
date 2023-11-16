package com.example.modak.diagnosis.controller;


import com.example.modak.config.security.JwtTokenProvider;
import com.example.modak.diagnosis.dto.DiagnosisRequestDto;
import com.example.modak.diagnosis.dto.DiagnosisResultDto;
import com.example.modak.diagnosis.dto.RestRequestDto;
import com.example.modak.diagnosis.dto.RestResponseDto;
import com.example.modak.diagnosis.service.DiagnosisService;
import com.example.modak.diagnosis.service.RestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@RestController
@RequestMapping("/diagnosis")
public class DiagnosisController {

    @Autowired
    JwtTokenProvider jwtTokenProvider;
    @Autowired
    DiagnosisService diagnosisService;
    @Autowired
    RestService restService;

    @PostMapping("/submitForm")
    public ResponseEntity<RestResponseDto> diagnosis(HttpServletRequest request, @ModelAttribute DiagnosisRequestDto diagnosisRequestDto) throws IOException {
        RestRequestDto restRequestDto = RestRequestDto.builder()
                .front(diagnosisRequestDto.getFront())
                .side(diagnosisRequestDto.getSide())
                .build();

        return ResponseEntity.ok(restService.rest(restRequestDto));
    }

}
