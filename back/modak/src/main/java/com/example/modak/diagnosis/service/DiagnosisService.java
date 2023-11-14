package com.example.modak.diagnosis.service;


import com.example.modak.diagnosis.dto.DiagnosisRequestDto;
import com.example.modak.diagnosis.dto.DiagnosisResultDto;
import com.example.modak.diagnosis.dto.RestRequestDto;
import com.example.modak.diagnosis.dto.RestResponseDto;
import com.example.modak.logIn.respository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class DiagnosisService {

    @Autowired
    UserRepository userRepository;

    public DiagnosisResultDto diagnosis(DiagnosisRequestDto diagnosisRequestDto){

        return null;
    }

    public RestResponseDto postPicture(RestRequestDto restRequestDto) {
        RestTemplate restTemplate = new RestTemplate();
        String url = "test";

        return restTemplate.postForObject(
                url,
                restRequestDto,
                RestResponseDto.class
        );
    }

}
