package com.example.modak.service;


import com.example.modak.respository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserService {

    @Autowired
    private final UserRepository userRepository;

    @Transactional
    public Long save() {
        return 0L;
    }

    @Transactional
    public Long modify() {
        return 0L;
    }


    @Transactional

    public void delete() {
        return;
    }


}
