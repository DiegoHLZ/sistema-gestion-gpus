import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { GpuService } from '../../services/gpu.service';
import { Gpu } from '../../models/gpu.model';

@Component({
  selector: 'app-gpus',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './gpus.html',
  styleUrl: './gpus.scss',
})
export class Gpus implements OnInit {
  gpus: Gpu[] = [];

  showCreateModal = false;
  showEditModal = false;

  selectedGpuId: number | null = null;

  gpuForm;

  constructor(
    private gpuService: GpuService,
    private fb: FormBuilder
  ) {
    this.gpuForm = this.fb.group({
      name: ['', Validators.required],
      model: ['', Validators.required],
      memory: [0, [Validators.required, Validators.min(1)]],
      providerCloud: ['', Validators.required],
      region: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadGpus();
  }

  loadGpus() {
    this.gpuService.getAllGpus().subscribe({
      next: (data) => {
        this.gpus = data;
      },
      error: (err: any) => {
        console.error('Error al cargar GPUs:', err);
      },
    });
  }

  openCreateModal() {
    this.gpuForm.reset({
      name: '',
      model: '',
      memory: 0,
      providerCloud: '',
      region: '',
    });

    this.showCreateModal = true;
  }

  openEditModal(gpu: Gpu) {
    this.selectedGpuId = gpu.id;

    this.gpuForm.patchValue({
      name: gpu.name,
      model: gpu.model,
      memory: gpu.memory,
      providerCloud: gpu.providerCloud,
      region: gpu.region,
    });

    this.showEditModal = true;
  }

  closeModals() {
    this.showCreateModal = false;
    this.showEditModal = false;
    this.selectedGpuId = null;
    this.gpuForm.reset();
  }

  createGpu() {
    if (this.gpuForm.invalid) return;

    const gpuData = {
      ...this.gpuForm.value,
      available: true,
    };

    this.gpuService.createGpu(gpuData).subscribe({
      next: () => {
        this.closeModals();
        this.loadGpus();
      },
      error: (err: any) => {
        console.error('Error al crear GPU:', err);
      },
    });
  }

  updateGpu() {
    if (this.gpuForm.invalid || this.selectedGpuId === null) return;

    const gpuData = {
      ...this.gpuForm.value,
      available: true,
    };

    this.gpuService.updateGpu(this.selectedGpuId, gpuData).subscribe({
      next: () => {
        this.closeModals();
        this.loadGpus();
      },
      error: (err: any) => {
        console.error('Error al actualizar GPU:', err);
      },
    });
  }

  deleteGpu(id: number) {
    const confirmed = confirm('¿Deseas eliminar esta GPU?');

    if (!confirmed) return;

    this.gpuService.deleteGpu(id).subscribe({
      next: () => {
        this.loadGpus();
      },
      error: (err: any) => {
        console.error('Error al eliminar GPU:', err);
      },
    });
  }
}
