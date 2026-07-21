package com.gpumanagement.backend.gpu.service;

import com.gpumanagement.backend.gpu.model.Gpu;
import com.gpumanagement.backend.gpu.repository.GpuRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GpuService {

    private final GpuRepository gpuRepository;

    public List<Gpu> getAllGpus() {
        return gpuRepository.findAll();
    }

    public Gpu getGpuById(Long id) {

        return gpuRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("GPU no encontrada"));
    }

    public Gpu createGpu(Gpu gpu) {

        return gpuRepository.save(gpu);
    }

    public Gpu updateGpu(Long id, Gpu gpuUpdated) {

        Gpu gpu = getGpuById(id);

        gpu.setName(gpuUpdated.getName());
        gpu.setModel(gpuUpdated.getModel());
        gpu.setMemory(gpuUpdated.getMemory());
        gpu.setProviderCloud(gpuUpdated.getProviderCloud());
        gpu.setRegion(gpuUpdated.getRegion());
        gpu.setPricePerHour(gpuUpdated.getPricePerHour());
        gpu.setAvailable(gpuUpdated.getAvailable());

        return gpuRepository.save(gpu);
    }

    public void deleteGpu(Long id) {

        Gpu gpu = getGpuById(id);

        gpuRepository.delete(gpu);
    }
}
