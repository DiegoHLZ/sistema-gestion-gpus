package com.gpumanagement.backend.assignment.repository;

import com.gpumanagement.backend.assignment.model.GpuAssignment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface GpuAssignmentRepository extends JpaRepository<GpuAssignment, Long> {

    List<GpuAssignment> findByActiveTrue();

    Optional<GpuAssignment> findByRequestId(Long requestId);

    List<GpuAssignment> findByRequestUserEmailAndActiveTrue(String email);
}
