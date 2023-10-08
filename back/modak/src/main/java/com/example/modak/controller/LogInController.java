package com.example.modak.controller;

import com.example.modak.dto.LogInResultDto;
import com.example.modak.dto.RegisterResultDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/user")
public class LogInController {
    private final UserService userService;


    @Autowired
    public LogInController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    public LogInResultDto logIn() throws RuntimeException {
        LogInResultDto logInResultDto = userService.logIn(id, password);

        return logInResultDto;
    }

    @PostMapping("/register")
    public RegisterResultDto register() {
        RegisterResultDto registerResultDto = userService.register();

        return registerResultDto;
    }


}
