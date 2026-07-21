package com.gpumanagement.backend.report.service;

import com.gpumanagement.backend.assignment.model.GpuAssignment;
import com.gpumanagement.backend.assignment.repository.GpuAssignmentRepository;
import com.gpumanagement.backend.report.model.UsageReport;
import com.gpumanagement.backend.report.repository.UsageReportRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.gpumanagement.backend.auth.service.JwtService;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UsageReportService {

    private final UsageReportRepository usageReportRepository;
    private final GpuAssignmentRepository assignmentRepository;
    private final JwtService jwtService;

    public List<UsageReport> getAllReports() {
        return usageReportRepository.findAll();
    }

    public UsageReport getReportById(Long id) {
        return usageReportRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Reporte no encontrado"));
    }

    public List<UsageReport> getMyReports(String email) {
        return usageReportRepository.findByUserEmail(email);
    }

    public String getEmailFromToken(String token) {
        return jwtService.extractUsername(token);
    }

    public UsageReport createReport(Long assignmentId, UsageReport report) {
        GpuAssignment assignment = assignmentRepository.findById(assignmentId)
                .orElseThrow(() -> new RuntimeException("Asignación no encontrada"));

        if (Boolean.TRUE.equals(assignment.getActive())) {
            throw new RuntimeException("Primero debes liberar la asignación para generar el reporte");
        }

        if (assignment.getReleaseDate() == null) {
            throw new RuntimeException("La asignación no tiene fecha de liberación");
        }

        long minutes = java.time.Duration.between(
                assignment.getAssignmentDate(),
                assignment.getReleaseDate()
        ).toMinutes();

        double usageHours = minutes / 60.0;

        Double pricePerHour = assignment.getGpu().getPricePerHour();
        if (pricePerHour == null) {
            pricePerHour = 0.0;
        }

        double estimatedCost = usageHours * pricePerHour;

        report.setAssignment(assignment);
        report.setGpu(assignment.getGpu());
        report.setUser(assignment.getRequest().getUser());
        report.setReportDate(LocalDateTime.now());
        report.setUsageHours(usageHours);
        report.setEstimatedCost(estimatedCost);
        report.setEstimatedConsumption(estimatedCost);

        return usageReportRepository.save(report);
    }

    public void deleteReport(Long id) {
        UsageReport report = getReportById(id);
        usageReportRepository.delete(report);
    }

}
