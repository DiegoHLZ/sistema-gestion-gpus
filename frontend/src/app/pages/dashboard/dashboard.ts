import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { GpuService } from '../../services/gpu.service';
import { Gpu } from '../../models/gpu.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {

  gpus: Gpu[] = [];

  showCreateModal = false;

  gpuForm;

  constructor(
    private gpuService: GpuService,
    private router: Router,
    private fb: FormBuilder
  ) {

    this.gpuForm = this.fb.group({
      name: ['', Validators.required],
      model: ['', Validators.required],
      memory: [0, Validators.required],
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
      error: (err) => {
        console.error(err);
      },
    });
  }

  createGpu() {

    if (this.gpuForm.invalid) return;

    this.gpuService.createGpu(this.gpuForm.value).subscribe({
      next: () => {

        this.showCreateModal = false;

        this.gpuForm.reset();

        this.loadGpus();
      },

      error: (err:any) => {
        console.error(err);
      },
    });

  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  get availableGpus(): number {
    return this.gpus.filter((gpu) => gpu.available).length;
  }
}
