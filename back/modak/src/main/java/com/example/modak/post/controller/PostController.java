package com.example.modak.post.controller;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.net.http.HttpRequest;

@RestController
@RequestMapping("/post")
public class PostController {
    @GetMapping("/loadPost")
    public String seePost(HttpServletRequest request) {
        return request.getHeader("X-AUTH-TOKEN");
    }
}
