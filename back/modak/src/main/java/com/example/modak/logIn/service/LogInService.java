package com.example.modak.logIn.service;

import com.example.modak.logIn.dto.*;

public interface LogInService {
    SignUpResultDto signUp(SignUpRequestDto signUpRequestDto);

    LogInResultDto logIn(LogInRequestDto logInRequestDto) throws RuntimeException;

}
