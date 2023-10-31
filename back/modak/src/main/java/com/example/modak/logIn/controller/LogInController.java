package com.example.modak.logIn.controller;

import com.example.modak.logIn.dto.LogInRequestDto;
import com.example.modak.logIn.dto.LogInResultDto;
import com.example.modak.logIn.dto.SignUpRequestDto;
import com.example.modak.logIn.dto.SignUpResultDto;
import com.example.modak.logIn.service.LogInService;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/user")
public class LogInController {

   private final LogInService logInService;

    @Autowired
    public LogInController(LogInService logInService) {
        this.logInService = logInService;
    }


    @PostMapping(value = "/login")
    public LogInResultDto logIn(@ApiParam(value = "uid, password", required = true) @RequestBody LogInRequestDto logInRequestDto)
            throws RuntimeException {

        LogInResultDto logInResultDto = logInService.logIn(logInRequestDto);

        if (logInResultDto.getCode() == 0) {
            logInResultDto.getToken();
        }
        return logInResultDto;
    }

    @PostMapping(value = "/signup")
    public SignUpResultDto signUp(
            @ApiParam(value = "UID", required = true) @RequestBody SignUpRequestDto signUpRequestDto) {

        SignUpResultDto signUpResultDto = logInService.signUp(signUpRequestDto);

        return signUpResultDto;
    }

    @GetMapping(value = "/exception")
    public void exceptionTest() throws RuntimeException {
        throw new RuntimeException("접근이 금지되었습니다.");
    }

    @ExceptionHandler(value = RuntimeException.class)
    public ResponseEntity<Map<String, String>> ExceptionHandler(RuntimeException e) {
        HttpHeaders responseHeaders = new HttpHeaders();
        HttpStatus httpStatus = HttpStatus.BAD_REQUEST;

        Map<String, String> map = new HashMap<>();
        map.put("error type", httpStatus.getReasonPhrase());
        map.put("code", "400");
        map.put("message", "에러 발생");

        return new ResponseEntity<>(map, responseHeaders, httpStatus);
    }

}