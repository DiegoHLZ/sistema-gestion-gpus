package com.gpumanagement.backend.report.repository;

import com.gpumanagement.backend.report.model.UsageReport;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UsageReportRepository extends JpaRepository<UsageReport, Long> {

    List<UsageReport> findByUserId(Long userId);

    List<UsageReport> findByGpuId(Long gpuId);

    List<UsageReport> findByAssignmentId(Long assignmentId);

    List<UsageReport> findByUserEmail(String email);
}
