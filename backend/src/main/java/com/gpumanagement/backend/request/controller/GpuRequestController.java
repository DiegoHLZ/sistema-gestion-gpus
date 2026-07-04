package com.gpumanagement.backend.request.controller;

import com.gpumanagement.backend.request.model.GpuRequest;
import com.gpumanagement.backend.request.service.GpuRequestService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.security.Principal;

@RestController
@RequestMapping("/api/requests")
@RequiredArgsConstructor
public class GpuRequestController {

    private final GpuRequestService gpuRequestService;

    @GetMapping
    public ResponseEntity<List<GpuRequest>> getAllRequests() {
        return ResponseEntity.ok(gpuRequestService.getAllRequests());
    }

    @GetMapping("/my-requests")
    public ResponseEntity<List<GpuRequest>> getMyRequests(
            @RequestHeader("Authorization") String authorizationHeader
    ) {
        String token = authorizationHeader.replace("Bearer ", "");
        String email = gpuRequestService.getEmailFromToken(token);

        return ResponseEntity.ok(
                gpuRequestService.getMyRequests(email)
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<GpuRequest> getRequestById(@PathVariable Long id) {
        return ResponseEntity.ok(gpuRequestService.getRequestById(id));
    }

    @PostMapping
    public ResponseEntity<GpuRequest> createRequest(
            @RequestBody GpuRequest request,
            @RequestHeader("Authorization") String authorizationHeader
    ) {
        String token = authorizationHeader.replace("Bearer ", "");
        String email = gpuRequestService.getEmailFromToken(token);

        return ResponseEntity.ok(
                gpuRequestService.createRequest(request, email)
        );
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
