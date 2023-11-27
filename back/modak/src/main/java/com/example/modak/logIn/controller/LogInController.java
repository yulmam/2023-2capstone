package com.example.modak.logIn.controller;

import com.example.modak.logIn.config.security.JwtTokenProvider;
import com.example.modak.logIn.dto.*;
import com.example.modak.logIn.service.LogInService;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpRequest;
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
   private final JwtTokenProvider jwtTokenProvider;

    @Autowired
    public LogInController(LogInService logInService, JwtTokenProvider jwtTokenProvider) {
        this.logInService = logInService;
        this.jwtTokenProvider = jwtTokenProvider;
    }


    @PostMapping(value = "/login")
    public ResponseEntity<LogInResultDto> logIn(@ApiParam(value = "uid, password", required = true) @RequestBody LogInRequestDto logInRequestDto)
            throws RuntimeException {

        LogInResultDto logInResultDto = logInService.logIn(logInRequestDto);

        if (logInResultDto.getCode() == 0) {
            logInResultDto.getToken();
        }
        return ResponseEntity.ok(logInResultDto);
    }

    @GetMapping(value = "/logout")
    public LogOutResultDto logOut(HttpServletRequest request){
        String token = jwtTokenProvider.resolveToken(request);
        return logInService.logout();
    }

    @PostMapping(value = "/signup")
    public ResponseEntity<SignUpResultDto> signUp(
            @ApiParam(value = "UID", required = true) @RequestBody SignUpRequestDto signUpRequestDto) {

        SignUpResultDto signUpResultDto = logInService.signUp(signUpRequestDto);

        return ResponseEntity.ok(signUpResultDto);
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