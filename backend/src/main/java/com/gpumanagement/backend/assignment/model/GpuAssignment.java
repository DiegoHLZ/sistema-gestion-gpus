package com.gpumanagement.backend.assignment.model;

import com.gpumanagement.backend.gpu.model.Gpu;
import com.gpumanagement.backend.request.model.GpuRequest;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "gpu_assignments")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GpuAssignment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime assignmentDate;

    private LocalDateTime releaseDate;

    private Boolean active;

    @ManyToOne
    @JoinColumn(name = "gpu_id")
    private Gpu gpu;

    @OneToOne
    @JoinColumn(name = "request_id")
    private GpuRequest request;
}
