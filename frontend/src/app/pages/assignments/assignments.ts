import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

import {
  AssignmentService,
  GpuAssignment,
} from '../../services/assignment.service';

import { RequestService } from '../../services/request.service';
import { GpuService } from '../../services/gpu.service';

import { GpuRequest } from '../../models/gpu-request.model';
import { Gpu } from '../../models/gpu.model';

@Component({
  selector: 'app-assignments',
  standalone: true,
  imports: [CommonModule, DatePipe, RouterLink, FormsModule],
  templateUrl: './assignments.html',
  styleUrl: './assignments.scss',
})
export class Assignments implements OnInit {
  assignments: GpuAssignment[] = [];
  requests: GpuRequest[] = [];
  gpus: Gpu[] = [];

  selectedRequestId: number | null = null;
  selectedGpuId: number | null = null;

  constructor(
    private assignmentService: AssignmentService,
    private requestService: RequestService,
    private gpuService: GpuService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.assignmentService.getAllAssignments().subscribe({
      next: (data) => {
        this.assignments = data;
      },
      error: (err: any) => {
        console.error('Error al cargar asignaciones:', err);
      },
    });

    this.requestService.getAllRequests().subscribe({
      next: (data) => {
        this.requests = data.filter(
          (request) => request.status === 'APPROVED'
        );
      },
      error: (err: any) => {
        console.error('Error al cargar solicitudes:', err);
      },
    });

    this.gpuService.getAllGpus().subscribe({
      next: (data) => {
        this.gpus = data.filter((gpu) => gpu.available);
      },
      error: (err: any) => {
        console.error('Error al cargar GPUs:', err);
      },
    });
  }

  assignGpu() {
    if (this.selectedRequestId === null || this.selectedGpuId === null) {
      return;
    }

    this.assignmentService
      .assignGpu(this.selectedRequestId, this.selectedGpuId)
      .subscribe({
        next: () => {
          this.selectedRequestId = null;
          this.selectedGpuId = null;
          this.loadData();
        },
        error: (err: any) => {
          console.error('Error al asignar GPU:', err);
        },
      });
  }

  releaseAssignment(id: number) {
    this.assignmentService.releaseAssignment(id).subscribe({
      next: () => {
        this.loadData();
      },
      error: (err: any) => {
        console.error('Error al liberar asignación:', err);
      },
    });
  }
}
