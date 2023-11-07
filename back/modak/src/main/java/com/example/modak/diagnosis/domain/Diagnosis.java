package com.example.modak.diagnosis.domain;

import com.example.modak.logIn.domain.User;

import javax.persistence.ManyToOne;
import java.util.Date;

public class Diagnosis {

    long id;
    long tutleNeckResult;
    long scoliosis;
    Date date;
    @ManyToOne
    User user;
}
