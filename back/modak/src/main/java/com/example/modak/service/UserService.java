package com.example.modak.service;


import com.example.modak.respository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;

    @Transactional
    public Long save()
}
