package com.example.modak.logIn.controller;

import com.example.modak.logIn.dto.LogInResultDto;
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
    public LogInResultDto logIn(HttpServletRequest request,
            @ApiParam(value = "Username", required = true) @RequestParam("username") String username,
                                @ApiParam(value = "Password", required = true) @RequestParam("password") String password)
            throws RuntimeException {

        System.out.println("request.getMethod() = " + request.getMethod()); //GET
        System.out.println("request.getProtocal() = " + request.getProtocol()); // HTTP/1.1
        System.out.println("request.getScheme() = " + request.getScheme()); //http
        // http://localhost:8080/request-header
        System.out.println("request.getRequestURL() = " + request.getRequestURL());
        // /request-test
        System.out.println("request.getRequestURI() = " + request.getRequestURI());
        //username=hi
        System.out.println("request.getQueryString() = " +
                request.getQueryString());
        System.out.println("request.isSecure() = " + request.isSecure()); //https 사용 유무
        Enumeration params = request.getParameterNames();
        System.out.println("----------------------------");
        while (params.hasMoreElements()){
            String name = (String)params.nextElement();
            System.out.println(name + " : " +request.getParameter(name));
        }
        System.out.println("----------------------------");
        LogInResultDto logInResultDto = logInService.logIn(username, password);

        if (logInResultDto.getCode() == 0) {
            logInResultDto.getToken();
        }
        return logInResultDto;
    }

    @PostMapping(value = "/signup")
    public SignUpResultDto signUp(
            @ApiParam(value = "UID", required = true) @RequestParam String uid,
            @ApiParam(value = "비밀번호", required = true) @RequestParam String password,
            @ApiParam(value = "이름", required = true) @RequestParam String name,
            @ApiParam(value = "email", required = true) @RequestParam String email,
            @ApiParam(value = "권한", required = false) @RequestParam String role) {

        SignUpResultDto signUpResultDto = logInService.signUp(uid, password, name, email, role);

        return signUpResultDto;
    }

    @GetMapping(value = "/exception")
    public void exceptionTest() throws RuntimeException {
        throw new RuntimeException("접근이 금지되었습니다.");
    }

    @ExceptionHandler(value = RuntimeException.class)
    public ResponseEntity<Map<String, String>> ExceptionHandler(RuntimeException e) {
        HttpHeaders responseHeaders = new HttpHeaders();
        //responseHeaders.add(HttpHeaders.CONTENT_TYPE, "application/json");
        HttpStatus httpStatus = HttpStatus.BAD_REQUEST;

        Map<String, String> map = new HashMap<>();
        map.put("error type", httpStatus.getReasonPhrase());
        map.put("code", "400");
        map.put("message", "에러 발생");

        return new ResponseEntity<>(map, responseHeaders, httpStatus);
    }

}