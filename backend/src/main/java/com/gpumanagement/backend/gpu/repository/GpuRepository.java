package com.gpumanagement.backend.gpu.repository;

import com.gpumanagement.backend.gpu.model.Gpu;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GpuRepository extends JpaRepository<Gpu, Long> {

    List<Gpu> findByAvailableTrue();
}
