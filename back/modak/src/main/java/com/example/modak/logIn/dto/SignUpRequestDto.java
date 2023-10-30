package com.example.modak.logIn.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class SignUpRequestDto {
    private String id;

    private String password;

    private String name;
}
