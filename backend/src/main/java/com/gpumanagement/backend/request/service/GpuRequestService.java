package com.gpumanagement.backend.request.service;

import com.gpumanagement.backend.common.enums.RequestStatus;
import com.gpumanagement.backend.request.model.GpuRequest;
import com.gpumanagement.backend.request.repository.GpuRequestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class GpuRequestService {

    private final GpuRequestRepository gpuRequestRepository;

    public List<GpuRequest> getAllRequests() {
        return gpuRequestRepository.findAll();
    }

    public GpuRequest getRequestById(Long id) {
        return gpuRequestRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Solicitud no encontrada"));
    }

    public GpuRequest createRequest(GpuRequest request) {
        request.setRequestDate(LocalDateTime.now());

        if (request.getStatus() == null) {
            request.setStatus(RequestStatus.PENDING);
        }

        return gpuRequestRepository.save(request);
    }

    public GpuRequest updateRequest(Long id, GpuRequest updatedRequest) {
        GpuRequest request = getRequestById(id);

        request.setDescription(updatedRequest.getDescription());
        request.setProjectType(updatedRequest.getProjectType());
        request.setGpuQuantity(updatedRequest.getGpuQuantity());
        request.setStartDate(updatedRequest.getStartDate());
        request.setEndDate(updatedRequest.getEndDate());
        request.setStatus(updatedRequest.getStatus());

        return gpuRequestRepository.save(request);
    }

    public GpuRequest approveRequest(Long id) {
        GpuRequest request = getRequestById(id);

        request.setStatus(RequestStatus.APPROVED);

        return gpuRequestRepository.save(request);
    }

    public GpuRequest rejectRequest(Long id) {
        GpuRequest request = getRequestById(id);

        request.setStatus(RequestStatus.REJECTED);

        return gpuRequestRepository.save(request);
    }

    public void deleteRequest(Long id) {
        GpuRequest request = getRequestById(id);
        gpuRequestRepository.delete(request);
    }
}
