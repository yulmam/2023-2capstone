package com.example.modak.logIn.dto;


import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class LogInRequestDto {
    private String id;

    private String password;
}
