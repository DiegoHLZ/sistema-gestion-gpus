package com.gpumanagement.backend.assignment.service;

import com.gpumanagement.backend.assignment.model.GpuAssignment;
import com.gpumanagement.backend.assignment.repository.GpuAssignmentRepository;
import com.gpumanagement.backend.common.enums.RequestStatus;
import com.gpumanagement.backend.gpu.model.Gpu;
import com.gpumanagement.backend.gpu.repository.GpuRepository;
import com.gpumanagement.backend.request.model.GpuRequest;
import com.gpumanagement.backend.request.repository.GpuRequestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.gpumanagement.backend.user.model.User;
import com.gpumanagement.backend.user.repository.UserRepository;
import com.gpumanagement.backend.auth.service.JwtService;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class GpuAssignmentService {

    private final GpuAssignmentRepository assignmentRepository;
    private final GpuRepository gpuRepository;
    private final GpuRequestRepository requestRepository;
    private final UserRepository userRepository;
    private final JwtService jwtService;

    public List<GpuAssignment> getAllAssignments() {
        return assignmentRepository.findAll();
    }

    public List<GpuAssignment> getMyActiveAssignments(String email) {
        userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        return assignmentRepository.findByRequestUserEmailAndActiveTrue(email);
    }

    public GpuAssignment getAssignmentById(Long id) {
        return assignmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Asignación no encontrada"));
    }

    public GpuAssignment assignGpu(Long requestId, Long gpuId) {
        GpuRequest request = requestRepository.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Solicitud no encontrada"));

        Gpu gpu = gpuRepository.findById(gpuId)
                .orElseThrow(() -> new RuntimeException("GPU no encontrada"));

        if (!Boolean.TRUE.equals(gpu.getAvailable())) {
            throw new RuntimeException("La GPU no está disponible");
        }

        GpuAssignment assignment = GpuAssignment.builder()
                .request(request)
                .gpu(gpu)
                .assignmentDate(LocalDateTime.now())
                .active(true)
                .build();

        gpu.setAvailable(false);
        request.setStatus(RequestStatus.APPROVED);

        gpuRepository.save(gpu);
        requestRepository.save(request);

        return assignmentRepository.save(assignment);
    }

    public GpuAssignment releaseAssignment(Long assignmentId) {
        GpuAssignment assignment = getAssignmentById(assignmentId);

        assignment.setActive(false);
        assignment.setReleaseDate(LocalDateTime.now());

        Gpu gpu = assignment.getGpu();
        gpu.setAvailable(true);

        GpuRequest request = assignment.getRequest();
        request.setStatus(RequestStatus.COMPLETED);

        gpuRepository.save(gpu);
        requestRepository.save(request);

        return assignmentRepository.save(assignment);
    }

    public void deleteAssignment(Long id) {
        GpuAssignment assignment = getAssignmentById(id);
        assignmentRepository.delete(assignment);
    }

    public String getEmailFromToken(String token) {
        return jwtService.extractUsername(token);
    }
}
