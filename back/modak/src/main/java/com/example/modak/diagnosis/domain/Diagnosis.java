package com.example.modak.diagnosis.domain;

import com.example.modak.logIn.domain.User;
import lombok.*;
import org.hibernate.annotations.Columns;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table
public class Diagnosis {

    @Id
    @GeneratedValue
    private long id;
    @Column
    private float turtleneckValue;
    @Column
    private int turtleneckCheck;
    @Column
    private float discValue;
    @Column
    private int discCheck;
    @Column
    private float shoulderAngle;
    @Column
    private float hipAngle;
    @CreationTimestamp
    @Column(name = "ins_date")
    private LocalDateTime insDate;
    @ManyToOne
    @JoinColumn(name="userFk")
    private User user;
}
