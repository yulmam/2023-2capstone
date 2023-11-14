package com.example.modak.diagnosis.domain;

import com.example.modak.logIn.domain.User;
import lombok.*;
import org.hibernate.annotations.Columns;

import javax.persistence.*;

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
    long id;
    @Column
    long turtleNeckResult;
    @Column
    long scoliosis;

    @ManyToOne
    @JoinColumn(name="userFk")
    User user;
}
