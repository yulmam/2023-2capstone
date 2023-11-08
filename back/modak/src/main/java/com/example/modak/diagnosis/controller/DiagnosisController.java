package com.example.modak.diagnosis.controller;


import com.example.modak.config.security.JwtTokenProvider;
import com.example.modak.diagnosis.dto.DiagnosisRequestDto;
import com.example.modak.diagnosis.service.DiagnosisService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.util.Enumeration;
import java.util.List;

@RestController
@RequestMapping("/diagnosis")
public class DiagnosisController {

    @Autowired
    JwtTokenProvider jwtTokenProvider;
    @Autowired
    DiagnosisService diagnosisService;

    @PostMapping("/submitForm")
    public void diagnosis(HttpServletRequest request, @RequestPart(value="image", required=false) List<MultipartFile> file) {
        Enumeration params = request.getParameterNames();
        System.out.println(request);
        System.out.println("----------------------------");
        while (params.hasMoreElements()){
            String name = (String)params.nextElement();
            System.out.println(name + " : " +request.getParameter(name));
        }
        System.out.println("----------------------------");
        DiagnosisRequestDto diagnosisRequestDto = DiagnosisRequestDto.builder()
                .files(file)
                .uid(123)
                .build();
        System.out.println(diagnosisRequestDto);
        System.out.println("test");
    }

}
