package com.example.modak.diagnosis.controller;


import com.example.modak.config.security.JwtTokenProvider;
import com.example.modak.diagnosis.dto.DiagnosisRequestDto;
import com.example.modak.diagnosis.dto.RestRequestDto;
import com.example.modak.diagnosis.dto.RestResponseDto;
import com.example.modak.diagnosis.service.DiagnosisService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
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

    @PostMapping("/submitForm")
    public String diagnosis(@ModelAttribute DiagnosisRequestDto diagnosisRequestDto) throws IOException {
        MultipartFile front = diagnosisRequestDto.getFront();
        MultipartFile side = diagnosisRequestDto.getSide();


        MultiValueMap<String, Object> body
                = new LinkedMultiValueMap<>();

        body.add("front", new MultipartInputStreamFileResource(front.getInputStream(), front.getOriginalFilename()));
        body.add("side", new MultipartInputStreamFileResource(side.getInputStream(), side.getOriginalFilename()));
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);
        HttpEntity<MultiValueMap<String, Object>> requestEntity
                = new HttpEntity<>(body, headers);

        String serverUrl = "http://localhost:5000/run";

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate
                .postForEntity(serverUrl, requestEntity, String.class);
        return "test";
    }

    class MultipartInputStreamFileResource extends InputStreamResource {

        private final String filename;

        MultipartInputStreamFileResource(InputStream inputStream, String filename) {
            super(inputStream);
            this.filename = filename;
        }

        @Override
        public String getFilename() {
            return this.filename;
        }

        @Override
        public long contentLength() throws IOException {
            return -1; // we do not want to generally read the whole stream into memory ...
        }
    }

}
