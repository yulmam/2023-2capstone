package com.example.modak.logIn.service;

import com.example.modak.logIn.dto.LogInRequestDto;
import com.example.modak.logIn.dto.LogInResultDto;
import com.example.modak.logIn.dto.SignUpRequestDto;
import com.example.modak.logIn.dto.SignUpResultDto;

public interface LogInService {
    SignUpResultDto signUp(SignUpRequestDto signUpRequestDto);

    LogInResultDto logIn(LogInRequestDto logInRequestDto) throws RuntimeException;

}
