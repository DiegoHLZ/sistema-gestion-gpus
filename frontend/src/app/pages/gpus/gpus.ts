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

  regionOptions = [
  { value: 'us-east-1', label: 'US East 1' },
  { value: 'us-west-2', label: 'US West 2' },
  { value: 'us-central1', label: 'US Central 1' },
  { value: 'eastus', label: 'East US' },
  { value: 'brazilsouth', label: 'Brazil South' },
  { value: 'southamerica-west1', label: 'South America West 1' },
  { value: 'lima-1', label: 'Lima 1' },
];

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
      pricePerHour: [0, [Validators.required, Validators.min(0)]],
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
      pricePerHour: 0,
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
      pricePerHour: gpu.pricePerHour,
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
