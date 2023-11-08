package com.example.modak.diagnosis.controller;


import com.example.modak.config.security.JwtTokenProvider;
import com.example.modak.diagnosis.dto.DiagnosisRequestDto;
import com.example.modak.diagnosis.dto.DiagnosisResultDto;
import com.example.modak.diagnosis.service.DiagnosisService;
import org.springframework.beans.factory.annotation.Autowired;
<<<<<<< HEAD
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.util.Enumeration;
import java.util.List;

@RestController
@RequestMapping("/diagnosis")
=======
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
>>>>>>> origin/main
public class DiagnosisController {

    @Autowired
    JwtTokenProvider jwtTokenProvider;
    @Autowired
    DiagnosisService diagnosisService;

<<<<<<< HEAD
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
=======
    @PostMapping("/diagnosis")
    public void diagnosis(HttpServletRequest request, @RequestPart(value="image", required=false) List<MultipartFile> files) {
        String uid = jwtTokenProvider.getUsername(request.getHeader("X-AUTH-TOKEN"));
        DiagnosisRequestDto diagnosisRequestDto = DiagnosisRequestDto.builder()
                .files(files)
                .uid(Long.parseLong(uid))
                .build();
        System.out.println(diagnosisRequestDto);
>>>>>>> origin/main
        //        DiagnosisResultDto diagnosisResultDto = diagnosisService.diagnosis(diagnosisRequestDto);

    }

}
