package com.example.modak.diagnosis.controller;


import com.example.modak.config.security.JwtTokenProvider;
import com.example.modak.diagnosis.dto.DiagnosisRequestDto;
import com.example.modak.diagnosis.dto.DiagnosisResultDto;
import com.example.modak.diagnosis.service.DiagnosisService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
public class DiagnosisController {

    @Autowired
    JwtTokenProvider jwtTokenProvider;
    @Autowired
    DiagnosisService diagnosisService;

    @PostMapping("/diagnosis")
    public void diagnosis(HttpServletRequest request, @RequestPart(value="image", required=false) List<MultipartFile> files) {
        String uid = jwtTokenProvider.getUsername(request.getHeader("X-AUTH-TOKEN"));
        DiagnosisRequestDto diagnosisRequestDto = DiagnosisRequestDto.builder()
                .files(files)
                .uid(Long.parseLong(uid))
                .build();
        System.out.println(diagnosisRequestDto);
        System.out.println("test");
        //        DiagnosisResultDto diagnosisResultDto = diagnosisService.diagnosis(diagnosisRequestDto);

    }

}
