package com.example.modak.diagnosis.repository;

import com.example.modak.diagnosis.domain.Diagnosis;
import com.example.modak.logIn.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DiagnosisRepository extends JpaRepository<Diagnosis, Long> {
}
