package com.gpumanagement.backend.report.service;

import com.gpumanagement.backend.assignment.model.GpuAssignment;
import com.gpumanagement.backend.assignment.repository.GpuAssignmentRepository;
import com.gpumanagement.backend.report.model.UsageReport;
import com.gpumanagement.backend.report.repository.UsageReportRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UsageReportService {

    private final UsageReportRepository usageReportRepository;
    private final GpuAssignmentRepository assignmentRepository;

    public List<UsageReport> getAllReports() {
        return usageReportRepository.findAll();
    }

    public UsageReport getReportById(Long id) {
        return usageReportRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Reporte no encontrado"));
    }

    public UsageReport createReport(Long assignmentId, UsageReport report) {
        GpuAssignment assignment = assignmentRepository.findById(assignmentId)
                .orElseThrow(() -> new RuntimeException("Asignación no encontrada"));

        report.setAssignment(assignment);
        report.setGpu(assignment.getGpu());
        report.setUser(assignment.getRequest().getUser());
        report.setReportDate(LocalDateTime.now());

        return usageReportRepository.save(report);
    }

    public void deleteReport(Long id) {
        UsageReport report = getReportById(id);
        usageReportRepository.delete(report);
    }
}
