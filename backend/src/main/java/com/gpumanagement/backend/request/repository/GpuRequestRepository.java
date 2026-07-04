package com.gpumanagement.backend.request.repository;

import com.gpumanagement.backend.common.enums.RequestStatus;
import com.gpumanagement.backend.request.model.GpuRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GpuRequestRepository extends JpaRepository<GpuRequest, Long> {

    List<GpuRequest> findByUserId(Long userId);

    List<GpuRequest> findByStatus(RequestStatus status);

    List<GpuRequest> findByUserEmail(String email);
}
