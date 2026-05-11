package com.gpumanagement.backend.gpu.controller;

import com.gpumanagement.backend.gpu.model.Gpu;
import com.gpumanagement.backend.gpu.service.GpuService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/gpus")
@RequiredArgsConstructor
public class GpuController {

    private final GpuService gpuService;

    @GetMapping
    public ResponseEntity<List<Gpu>> getAllGpus() {

        return ResponseEntity.ok(gpuService.getAllGpus());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Gpu> getGpuById(@PathVariable Long id) {

        return ResponseEntity.ok(gpuService.getGpuById(id));
    }

    @PostMapping
    public ResponseEntity<Gpu> createGpu(@RequestBody Gpu gpu) {

        return ResponseEntity.ok(gpuService.createGpu(gpu));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Gpu> updateGpu(
            @PathVariable Long id,
            @RequestBody Gpu gpu
    ) {

        return ResponseEntity.ok(gpuService.updateGpu(id, gpu));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGpu(@PathVariable Long id) {

        gpuService.deleteGpu(id);

        return ResponseEntity.noContent().build();
    }
}
