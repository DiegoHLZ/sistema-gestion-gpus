package com.gpumanagement.backend.report.controller;

import com.gpumanagement.backend.report.model.UsageReport;
import com.gpumanagement.backend.report.service.UsageReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reports")
@RequiredArgsConstructor
public class UsageReportController {

    private final UsageReportService usageReportService;

    @GetMapping
    public ResponseEntity<List<UsageReport>> getAllReports() {
        return ResponseEntity.ok(usageReportService.getAllReports());
    }

    @GetMapping("/{id}")
    public ResponseEntity<UsageReport> getReportById(@PathVariable Long id) {
        return ResponseEntity.ok(usageReportService.getReportById(id));
    }

    @PostMapping
    public ResponseEntity<UsageReport> createReport(
            @RequestParam Long assignmentId,
            @RequestBody UsageReport report
    ) {
        return ResponseEntity.ok(
                usageReportService.createReport(assignmentId, report)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReport(@PathVariable Long id) {
        usageReportService.deleteReport(id);
        return ResponseEntity.noContent().build();
    }
}
