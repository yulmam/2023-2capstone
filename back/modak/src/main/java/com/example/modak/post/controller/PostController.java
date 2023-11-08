package com.example.modak.post.controller;


import com.example.modak.post.dto.PostListDto;
import com.example.modak.post.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/post")
public class PostController {
    @Autowired
    PostService postService;

    @GetMapping("/loadPosts")
    public List<PostListDto> loadPost() {
        return null;
    }

}
