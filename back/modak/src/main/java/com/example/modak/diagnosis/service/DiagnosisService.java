package com.example.modak.diagnosis.service;


import com.example.modak.diagnosis.domain.Diagnosis;
import com.example.modak.diagnosis.dto.*;
import com.example.modak.diagnosis.repository.DiagnosisRepository;
import com.example.modak.logIn.domain.User;
import com.example.modak.logIn.dto.SignUpResultDto;
import com.example.modak.logIn.respository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

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

    public HistoryDto history(String uid){
        User user = userRepository.getByUid(uid);
        List<Diagnosis> diagnosisList = user.getDiagnosisList();
        List<Float> turtleneckValue = diagnosisList.stream().map(Diagnosis::getTurtleneckValue).toList();
        List<Float> discValue = diagnosisList.stream().map(Diagnosis::getDiscValue).toList();
        List<Float> shoulderAngle = diagnosisList.stream().map(Diagnosis::getShoulderAngle).toList();
        List<Float> hipAngle = diagnosisList.stream().map(Diagnosis::getHipAngle).toList();
        List<LocalDateTime> time = diagnosisList.stream().map(Diagnosis::getInsDate).toList();
        return HistoryDto.builder()
                .turtleneckValue(turtleneckValue)
                .discValue(discValue)
                .shoulderAngle(shoulderAngle)
                .hipAngle(hipAngle)
                .time(time).build();
    }


//    List<Float> turtleneckValue;
//    List<Float> discValue;
//    List<Float> shoulderAngle;
//    List<Float> hipAngle;
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
