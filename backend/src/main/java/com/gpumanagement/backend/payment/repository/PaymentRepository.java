package com.gpumanagement.backend.payment.repository;

import com.gpumanagement.backend.payment.model.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PaymentRepository extends JpaRepository<Payment, Long> {

    Optional<Payment> findByReportId(Long reportId);

    Optional<Payment> findByAssignmentId(Long assignmentId);

    List<Payment> findByUserEmail(String email);
}
