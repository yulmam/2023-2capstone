package com.example.modak.diagnosis.dto;

import lombok.*;

import java.time.LocalDateTime;
import java.util.List;


@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
@Getter
public class HistoryDto {
    List<Float> turtleneckValue;
    List<Float> discValue;
    List<LocalDateTime> time;
}