package com.example.modak.service;

import com.example.modak.dto.LogInResultDto;
import com.example.modak.dto.SignUpResultDto;

public interface LogInService {
    SignUpResultDto signUp(String id, String password, String name, String role);

    LogInResultDto logIn(String id, String password) throws RuntimeException;

}
