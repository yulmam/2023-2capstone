package com.example.modak.logIn.respository;

import com.example.modak.post.domain.Posts;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostsRepository extends JpaRepository<Posts, Long> {
}
