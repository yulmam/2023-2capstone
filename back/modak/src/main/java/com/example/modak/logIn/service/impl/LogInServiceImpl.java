package com.example.modak.logIn.service.impl;

import com.example.modak.common.CommonResponse;
import com.example.modak.config.security.JwtTokenProvider;
import com.example.modak.logIn.domain.User;
import com.example.modak.logIn.dto.LogInRequestDto;
import com.example.modak.logIn.dto.LogInResultDto;
import com.example.modak.logIn.dto.SignUpRequestDto;
import com.example.modak.logIn.dto.SignUpResultDto;
import com.example.modak.logIn.respository.UserRepository;
import com.example.modak.logIn.service.LogInService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class LogInServiceImpl implements LogInService {
    public UserRepository userRepository;
    public JwtTokenProvider jwtTokenProvider;
    public PasswordEncoder passwordEncoder;

    @Autowired
    public LogInServiceImpl(UserRepository userRepository, JwtTokenProvider jwtTokenProvider,
                            PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.jwtTokenProvider = jwtTokenProvider;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public SignUpResultDto signUp(SignUpRequestDto signUpRequestDto) {


        User user;
        if (signUpRequestDto.getRole().equalsIgnoreCase("admin")) {
            user = User.builder()
                    .uid(signUpRequestDto.getUid())
                    .nickName(signUpRequestDto.getNickName())
                    .email(signUpRequestDto.getEmail())
                    .password(passwordEncoder.encode(signUpRequestDto.getPassword()))
                    .roles(Collections.singletonList("ROLE_ADMIN"))
                    .build();
        } else {
            user = User.builder()
                    .uid(signUpRequestDto.getUid())
                    .nickName(signUpRequestDto.getNickName())
                    .email(signUpRequestDto.getEmail())
                    .password(passwordEncoder.encode(signUpRequestDto.getPassword()))
                    .roles(Collections.singletonList("ROLE_USER"))
                    .build();
        }

        User savedUser = userRepository.save(user);
        SignUpResultDto signUpResultDto = new SignUpResultDto();

        if (!savedUser.getNickName().isEmpty()) {
            setSuccessResult(signUpResultDto);
        } else {
            setFailResult(signUpResultDto);
        }
        return signUpResultDto;
    }

    @Override
    public LogInResultDto logIn(LogInRequestDto logInRequestDto) throws RuntimeException {
        User user = userRepository.getByUid(logInRequestDto.getUid());

        if (!passwordEncoder.matches(logInRequestDto.getPassword(), user.getPassword())) {
            throw new RuntimeException();
        }
        LogInResultDto logInResultDto = LogInResultDto.builder()
                .token(jwtTokenProvider.createToken(String.valueOf(user.getUid()),
                        user.getRoles()))
                .nickName(user.getNickName())
                .build();
        setSuccessResult(logInResultDto);
        return logInResultDto;
    }

    // 결과 모델에 api 요청 성공 데이터를 세팅해주는 메소드
    private void setSuccessResult(SignUpResultDto result) {
        result.setSuccess(true);
        result.setCode(CommonResponse.SUCCESS.getCode());
        result.setMsg(CommonResponse.SUCCESS.getMsg());
    }

    // 결과 모델에 api 요청 실패 데이터를 세팅해주는 메소드
    private void setFailResult(SignUpResultDto result) {
        result.setSuccess(false);
        result.setCode(CommonResponse.FAIL.getCode());
        result.setMsg(CommonResponse.FAIL.getMsg());
    }
}
