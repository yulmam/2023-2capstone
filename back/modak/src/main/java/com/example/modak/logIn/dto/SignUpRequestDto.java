package com.example.modak.logIn.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class SignUpRequestDto {
    private String uid;

    private String password;

    private String nickname;

    private String email;

    private String role;
}
