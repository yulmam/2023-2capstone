package com.example.modak.service.impl;

import com.example.modak.config.security.JwtTokenProvider;
import com.example.modak.domain.User;
import com.example.modak.dto.LogInResultDto;
import com.example.modak.dto.RegisterResultDto;
import com.example.modak.respository.UserRepository;
import com.example.modak.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class LoginServiceImpl implements LoginService {
    public UserRepository userRepository;
    public JwtTokenProvider jwtTokenProvider;
    public PasswordEncoder passwordEncoder;

    @Autowired
    public LoginServiceImpl(UserRepository userRepository, JwtTokenProvider jwtTokenProvider,
             PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.jwtTokenProvider = jwtTokenProvider;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public RegisterResultDto signUp(String id, String password, String name, String role) {

        User user;
        if (role.equalsIgnoreCase("admin")) {
            user = User.builder()
                    .uid(id)
                    .name(name)
                    .password(passwordEncoder.encode(password))
                    .roles(Collections.singletonList("ROLE_ADMIN"))
                    .build();
        } else {
            user = User.builder()
                    .uid(id)
                    .name(name)
                    .password(passwordEncoder.encode(password))
                    .roles(Collections.singletonList("ROLE_USER"))
                    .build();
        }

        User savedUser = userRepository.save(user);
        RegisterResultDto signUpResultDto = new LogInResultDto();

        if (!savedUser.getName().isEmpty()) {
            setSuccessResult(RegisterResultDto);
        } else {
            setFailResult(RegisterResultDto);
        }
        return signUpResultDto;
    }

    @Override
    public LogInResultDto logIn(String id, String password) throws RuntimeException {
        User user = userRepository.getByUid(id);

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException();
        }
        LogInResultDto logInResultDto = LogInResultDto.builder()
                .token(jwtTokenProvider.createToken(String.valueOf(user.getUid()),
                        user.getRoles()))
                .build();

        setSuccessResult(logInResultDto);

        return logInResultDto;
    }

    // 결과 모델에 api 요청 성공 데이터를 세팅해주는 메소드
    private void setSuccessResult(RegisterResultDto result) {
        result.setSuccess(true);
        result.setCode(CommonResponse.SUCCESS.getCode());
        result.setMsg(CommonResponse.SUCCESS.getMsg());
    }

    // 결과 모델에 api 요청 실패 데이터를 세팅해주는 메소드
    private void setFailResult(RegisterResultDto result) {
        result.setSuccess(false);
        result.setCode(CommonResponse.FAIL.getCode());
        result.setMsg(CommonResponse.FAIL.getMsg());
    }
}
