package com.gpumanagement.backend.request.controller;

import com.gpumanagement.backend.request.model.GpuRequest;
import com.gpumanagement.backend.request.service.GpuRequestService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/requests")
@RequiredArgsConstructor
public class GpuRequestController {

    private final GpuRequestService gpuRequestService;

    @GetMapping
    public ResponseEntity<List<GpuRequest>> getAllRequests() {
        return ResponseEntity.ok(gpuRequestService.getAllRequests());
    }

    @GetMapping("/{id}")
    public ResponseEntity<GpuRequest> getRequestById(@PathVariable Long id) {
        return ResponseEntity.ok(gpuRequestService.getRequestById(id));
    }

    @PostMapping
    public ResponseEntity<GpuRequest> createRequest(@RequestBody GpuRequest request) {
        return ResponseEntity.ok(gpuRequestService.createRequest(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<GpuRequest> updateRequest(
            @PathVariable Long id,
            @RequestBody GpuRequest request
    ) {
        return ResponseEntity.ok(gpuRequestService.updateRequest(id, request));
    }

    @PutMapping("/{id}/approve")
    public ResponseEntity<GpuRequest> approveRequest(@PathVariable Long id) {
        return ResponseEntity.ok(gpuRequestService.approveRequest(id));
    }

    @PutMapping("/{id}/reject")
    public ResponseEntity<GpuRequest> rejectRequest(@PathVariable Long id) {
        return ResponseEntity.ok(gpuRequestService.rejectRequest(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRequest(@PathVariable Long id) {
        gpuRequestService.deleteRequest(id);
        return ResponseEntity.noContent().build();
    }
}
