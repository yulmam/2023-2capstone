package com.example.modak.controller;

import com.example.modak.service.UserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/user")
public class UserController {


    @Autowired
    private UserService userService;


    @GetMapping("/")
    public String login(HttpSession session, Model model) {


        return "??";//로그인 첫 페이지 보여주기
    }

    @PostMapping("/login")
    public void userLogin() {

    }

    @PostMapping("/signup")
    public void userSignUp(){

    }

    @PostMapping("/logout")
    public void userLogOut() {

    }

}
