package com.example.modak.post.service;

import com.example.modak.post.domain.Post;
import com.example.modak.post.dto.PostListDto;
import com.example.modak.post.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PostService {

    @Autowired
    PostRepository postRepository;

    public PostListDto getPostList(int listNum) {

    }
}
