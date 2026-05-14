import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GpuService } from '../../services/gpu.service';
import { Gpu } from '../../models/gpu.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {
  gpus: Gpu[] = [];

  constructor(private gpuService: GpuService) {}

  ngOnInit(): void {
    this.loadGpus();
  }

  loadGpus() {
    this.gpuService.getAllGpus().subscribe({
      next: (data) => {
        this.gpus = data;
        console.log(data);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  get availableGpus(): number {
    return this.gpus.filter((gpu) => gpu.available).length;
  }
}
