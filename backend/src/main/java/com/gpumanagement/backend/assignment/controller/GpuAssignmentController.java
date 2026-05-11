package com.gpumanagement.backend.assignment.controller;

import com.gpumanagement.backend.assignment.model.GpuAssignment;
import com.gpumanagement.backend.assignment.service.GpuAssignmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/assignments")
@RequiredArgsConstructor
public class GpuAssignmentController {

    private final GpuAssignmentService assignmentService;

    @GetMapping
    public ResponseEntity<List<GpuAssignment>> getAllAssignments() {
        return ResponseEntity.ok(assignmentService.getAllAssignments());
    }

    @GetMapping("/{id}")
    public ResponseEntity<GpuAssignment> getAssignmentById(@PathVariable Long id) {
        return ResponseEntity.ok(assignmentService.getAssignmentById(id));
    }

    @PostMapping("/assign")
    public ResponseEntity<GpuAssignment> assignGpu(
            @RequestParam Long requestId,
            @RequestParam Long gpuId
    ) {
        return ResponseEntity.ok(assignmentService.assignGpu(requestId, gpuId));
    }

    @PutMapping("/{id}/release")
    public ResponseEntity<GpuAssignment> releaseAssignment(@PathVariable Long id) {
        return ResponseEntity.ok(assignmentService.releaseAssignment(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAssignment(@PathVariable Long id) {
        assignmentService.deleteAssignment(id);
        return ResponseEntity.noContent().build();
    }
}
