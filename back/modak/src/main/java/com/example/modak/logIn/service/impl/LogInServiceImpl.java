package com.example.modak.logIn.service.impl;

import com.example.modak.common.CommonResponse;
import com.example.modak.logIn.config.security.JwtTokenProvider;
import com.example.modak.logIn.domain.User;
import com.example.modak.logIn.dto.*;
import com.example.modak.logIn.respository.UserRepository;
import com.example.modak.logIn.service.LogInService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.concurrent.TimeUnit;

@Service
public class LogInServiceImpl implements LogInService {
    public final UserRepository userRepository;
    public final JwtTokenProvider jwtTokenProvider;
    public final PasswordEncoder passwordEncoder;
    public final RedisTemplate<String, String> redisTemplate;

    @Autowired
    public LogInServiceImpl(UserRepository userRepository, JwtTokenProvider jwtTokenProvider,
                            PasswordEncoder passwordEncoder, RedisTemplate<String, String> redisTemplate) {
        this.userRepository = userRepository;
        this.jwtTokenProvider = jwtTokenProvider;
        this.passwordEncoder = passwordEncoder;
        this.redisTemplate = redisTemplate;
    }

    @Override
    public SignUpResultDto signUp(SignUpRequestDto signUpRequestDto) {
        User user;
        user = User.builder()
                .uid(signUpRequestDto.getUid())
                .nickName(signUpRequestDto.getNickName())
                .email(signUpRequestDto.getEmail())
                .password(passwordEncoder.encode(signUpRequestDto.getPassword()))
                .roles(Collections.singletonList("ROLE_USER"))
                .build();


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
        String token = jwtTokenProvider.createToken(String.valueOf(user.getUid()),
                user.getRoles());
        LogInResultDto logInResultDto = LogInResultDto.builder()
                .token(token)
                .nickName(user.getNickName())
                .build();
        setSuccessResult(logInResultDto);
        System.out.println("test1");
        redisTemplate.opsForValue().set("JWT_TOKEN" + logInRequestDto.getUid(), token, jwtTokenProvider.getExpiration(token), TimeUnit.MILLISECONDS);
        return logInResultDto;
    }

    public LogOutResultDto logout() {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        LogOutResultDto result = new LogOutResultDto();
        if(redisTemplate.opsForValue().get("JWT_TOKEN" + user.getUid()) != null){
            redisTemplate.delete("JWT_TOKEN:" + user.getUid());
            result.setSuccess(true);
            result.setCode(CommonResponse.SUCCESS.getCode());
            result.setMsg(CommonResponse.SUCCESS.getMsg());
            return result;
        }
        result.setSuccess(false);
        result.setCode(CommonResponse.FAIL.getCode());
        result.setMsg(CommonResponse.FAIL.getMsg());
        return result;
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
