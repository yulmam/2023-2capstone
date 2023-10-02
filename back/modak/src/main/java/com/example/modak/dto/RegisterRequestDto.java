package com.example.modak.dto;


import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class RegisterRequestDto {
    private String id;

    private String password;

    private String name;
}
