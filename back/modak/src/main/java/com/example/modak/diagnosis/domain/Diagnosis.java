package com.example.modak.diagnosis.domain;

import com.example.modak.logIn.domain.User;
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
    Date date;
    @ManyToOne
    User user;
}
