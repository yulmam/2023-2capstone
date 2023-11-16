package com.example.modak.diagnosis.service;


import com.example.modak.diagnosis.domain.Diagnosis;
import com.example.modak.diagnosis.dto.DiagnosisRequestDto;
import com.example.modak.diagnosis.dto.DiagnosisResultDto;
import com.example.modak.diagnosis.dto.RestRequestDto;
import com.example.modak.diagnosis.dto.RestResponseDto;
import com.example.modak.diagnosis.repository.DiagnosisRepository;
import com.example.modak.logIn.domain.User;
import com.example.modak.logIn.dto.SignUpResultDto;
import com.example.modak.logIn.respository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;

@Service
public class DiagnosisService {

    @Autowired
    UserRepository userRepository;
    @Autowired
    DiagnosisRepository diagnosisRepository;

    public DiagnosisResultDto diagnosis(String userName, RestResponseDto restResponseDto){
//        Diagnois diagnois = Diagnosis.builder()
//                .
//
//
//
//
//
//        User user;
//        user = User.builder()
//                .uid(signUpRequestDto.getUid())
//                .nickName(signUpRequestDto.getNickName())
//                .email(signUpRequestDto.getEmail())
//                .password(passwordEncoder.encode(signUpRequestDto.getPassword()))
//                .roles(Collections.singletonList("ROLE_USER"))
//                .build();
//
//
//        User savedUser = userRepository.save(user);
//        SignUpResultDto signUpResultDto = new SignUpResultDto();
//
//        if (!savedUser.getNickName().isEmpty()) {
//            setSuccessResult(signUpResultDto);
//        } else {
//            setFailResult(signUpResultDto);
//        }
//        return signUpResultDto;
        return null;
    }

}
