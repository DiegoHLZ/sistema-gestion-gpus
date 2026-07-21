package com.gpumanagement.backend.payment.model;

import com.gpumanagement.backend.assignment.model.GpuAssignment;
import com.gpumanagement.backend.common.enums.PaymentStatus;
import com.gpumanagement.backend.report.model.UsageReport;
import com.gpumanagement.backend.user.model.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "payments")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime paymentDate;

    private Double amount;

    @Enumerated(EnumType.STRING)
    private PaymentStatus status;

    private String paymentMethod;

    @Column(unique = true)
    private String transactionCode;

    @OneToOne
    @JoinColumn(name = "report_id", unique = true)
    private UsageReport report;

    @OneToOne
    @JoinColumn(name = "assignment_id", unique = true)
    private GpuAssignment assignment;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
