package com.example.modak.diagnosis.service;


import com.example.modak.diagnosis.controller.DiagnosisController;
import com.example.modak.diagnosis.dto.RestRequestDto;
import com.example.modak.diagnosis.dto.RestResponseDto;
import com.example.modak.diagnosis.util.MultipartInputStreamFileResource;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;

@Service
public class RestService {

    public RestResponseDto rest(RestRequestDto restRequestDto) throws IOException {

        MultiValueMap<String, Object> body
                = new LinkedMultiValueMap<>();
        MultipartFile front = restRequestDto.getFront();
        MultipartFile side = restRequestDto.getSide();
        body.add("front", new MultipartInputStreamFileResource(front.getInputStream(), front.getOriginalFilename()));
        body.add("side", new MultipartInputStreamFileResource(side.getInputStream(), side.getOriginalFilename()));

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);
        HttpEntity<MultiValueMap<String, Object>> requestEntity
                = new HttpEntity<>(body, headers);

        String serverUrl = "http://localhost:5000/run";

        return new RestTemplate().postForObject(serverUrl, requestEntity, RestResponseDto.class);
    }
}
