package com.gpumanagement.backend.report.model;

import com.gpumanagement.backend.assignment.model.GpuAssignment;
import com.gpumanagement.backend.gpu.model.Gpu;
import com.gpumanagement.backend.user.model.User;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "usage_reports")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UsageReport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime reportDate;

    private Double usageHours;

    private Double estimatedConsumption;

    private String observation;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "gpu_id")
    private Gpu gpu;

    @ManyToOne
    @JoinColumn(name = "assignment_id")
    private GpuAssignment assignment;
}
