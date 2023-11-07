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

    private String nickName;

    private String email;

    private String role;
}
