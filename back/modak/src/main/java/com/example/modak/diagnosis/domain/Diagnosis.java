package com.example.modak.diagnosis.domain;

import com.example.modak.logIn.domain.User;
<<<<<<< HEAD
import lombok.*;

import javax.persistence.*;
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
    long id;
    @Column
    long tutleNeckResult;
    @Column
    long scoliosis;
    @Column
=======

import javax.persistence.ManyToOne;
import java.util.Date;

public class Diagnosis {

    long id;
    long tutleNeckResult;
    long scoliosis;
>>>>>>> origin/main
    Date date;
    @ManyToOne
    User user;
}
