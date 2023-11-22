package com.example.modak.diagnosis.controller;


import com.example.modak.diagnosis.dto.*;
import com.example.modak.logIn.config.security.JwtTokenProvider;
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
        System.out.println(restResponseDto.getShoulderAngle());
        System.out.println(restResponseDto.getHipAngle());
        System.out.println(restResponseDto.getTurtleneckCheck());
        System.out.println(restResponseDto.getDiscCheck());
        String uid = jwtTokenProvider.getUsername(jwtTokenProvider.resolveToken(request));

        String nickName = diagnosisService.saveDiagnosticResult(uid, restResponseDto);
        System.out.println(nickName);
        System.out.println(uid);
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
    public ResponseEntity<HistoryDto> history(HttpServletRequest request){
        System.out.println("history");
        String uid = jwtTokenProvider.getUsername(jwtTokenProvider.resolveToken(request));
        System.out.println(uid);
        return ResponseEntity.ok(diagnosisService.history(uid));
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
