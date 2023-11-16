package com.example.modak.diagnosis.controller;


import com.example.modak.config.security.JwtTokenProvider;
import com.example.modak.diagnosis.dto.DiagnosisRequestDto;
import com.example.modak.diagnosis.dto.DiagnosisResultDto;
import com.example.modak.diagnosis.dto.RestRequestDto;
import com.example.modak.diagnosis.dto.RestResponseDto;
import com.example.modak.diagnosis.service.DiagnosisService;
import com.example.modak.diagnosis.service.RestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.*;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.io.InputStream;
import java.util.Enumeration;
import java.util.List;

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
    public ResponseEntity<DiagnosisResultDto> diagnosis(HttpServletRequest request, @ModelAttribute DiagnosisRequestDto diagnosisRequestDto) throws IOException {
        RestRequestDto restRequestDto = RestRequestDto.builder()
                .front(diagnosisRequestDto.getFront())
                .side(diagnosisRequestDto.getSide())
                .build();

        ResponseEntity<RestResponseDto> entityRestResponseDto = restService.rest(restRequestDto);

        String userName = jwtTokenProvider.getUsername(jwtTokenProvider.resolveToken(request));
        RestResponseDto restResponseDto = entityRestResponseDto.getBody();

        DiagnosisResultDto diagnosisResultDto = diagnosisService.diagnosis(userName, restResponseDto);

        return null;
    }



}
