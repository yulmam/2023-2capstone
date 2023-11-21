package com.example.modak.diagnosis.controller;


import com.example.modak.diagnosis.dto.DiagnosisResultDto;
import com.example.modak.logIn.config.security.JwtTokenProvider;
import com.example.modak.diagnosis.dto.DiagnosisRequestDto;
import com.example.modak.diagnosis.dto.RestRequestDto;
import com.example.modak.diagnosis.dto.RestResponseDto;
import com.example.modak.diagnosis.service.DiagnosisService;
import com.example.modak.diagnosis.service.RestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

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
    public ResponseEntity<DiagnosisResultDto> diagnosis(HttpServletRequest request, @ModelAttribute DiagnosisRequestDto diagnosisRequestDto) throws IOException, IllegalArgumentException {

        RestResponseDto restResponseDto = restService.rest(diagnosisRequestDto);

        if(restResponseDto.getCheck() == 0){
            throw new IllegalArgumentException("잘못된 사진을 보냈습니다.");
        }

        String uid = jwtTokenProvider.getUsername(jwtTokenProvider.resolveToken(request));

        String nickName = diagnosisService.saveDiagnosticResult(uid, restResponseDto);

        DiagnosisResultDto diagnosisResultDto = DiagnosisResultDto.builder()
                .nickName(nickName)
                .front(restResponseDto.getFront())
                .side(restResponseDto.getSide())
                .turtleneckValue(restResponseDto.getTurtleneckValue())
                .turtleneckCheck(restResponseDto.getTurtleneckCheck())
                .discValue(restResponseDto.getDiscValue())
                .discCheck(restResponseDto.getDiscCheck())
                .build();

        return ResponseEntity.ok(diagnosisResultDto);
    }

    @GetMapping("/history")
    public ResponseEntity<Object> history(HttpServletRequest request){

//        diagnosisService.history();

        return null;
    }


    @ExceptionHandler(value = IllegalArgumentException.class)
    public ResponseEntity<Map<String, String>> ExceptionHandler(IllegalArgumentException e) {
        HttpHeaders responseHeaders = new HttpHeaders();
        HttpStatus httpStatus = HttpStatus.BAD_REQUEST;

        Map<String, String> map = new HashMap<>();
        map.put("error type", httpStatus.getReasonPhrase());
        map.put("code", "400");
        map.put("message", e.getMessage());

        return new ResponseEntity<>(map, responseHeaders, httpStatus);
    }

}
