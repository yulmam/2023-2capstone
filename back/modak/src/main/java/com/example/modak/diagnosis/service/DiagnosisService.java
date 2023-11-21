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

import javax.persistence.*;
import java.util.Collections;
import java.util.List;

@Service
public class DiagnosisService {

    @Autowired
    UserRepository userRepository;
    @Autowired
    DiagnosisRepository diagnosisRepository;

    public String saveDiagnosticResult(String uid, RestResponseDto restResponseDto){

        User user = userRepository.getByUid(uid);

        Diagnosis diagnosis = Diagnosis.builder()
                .user(user)
                .turtleneckValue(restResponseDto.getTurtleneckValue())
                .discValue(restResponseDto.getDiscValue())
                .shoulderAngle(restResponseDto.getShoulderAngle())
                .hipAngle(restResponseDto.getDiscCheck())
                .build();

        user.getDiagnosisList().add(diagnosis);
        diagnosisRepository.save(diagnosis);
        userRepository.save(user);
        return user.getNickName();
    }

    public String history(String uid){
        User user = userRepository.getByUid(uid);



        return null;
    }


//    @Id
//    @GeneratedValue
//    private long id;
//    @Column
//    private long turtleneckValue;
//    @Column
//    private long discValue;
//    @Column
//    private long shoulderAngle;
//    @Column
//    private long hipAngle;
//    @Column
//    private long faceAngle;
//    @ManyToOne
//    @JoinColumn(name="userFk")
//    private User user;
}
