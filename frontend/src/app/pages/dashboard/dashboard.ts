import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

import { GpuService } from '../../services/gpu.service';
import { Gpu } from '../../models/gpu.model';

import { RequestService } from '../../services/request.service';
import { GpuRequest } from '../../models/gpu-request.model';

import { ReportService } from '../../services/report.service';
import { UsageReport } from '../../models/report.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {
  gpus: Gpu[] = [];
  requests: GpuRequest[] = [];
  reports: UsageReport[] = [];

  constructor(
    private gpuService: GpuService,
    private requestService: RequestService,
    private reportService: ReportService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData() {
    this.loadGpus();
    this.loadRequests();
    this.loadReports();
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

  loadRequests() {
    this.requestService.getAllRequests().subscribe({
      next: (data) => {
        this.requests = data;
      },
      error: (err: any) => {
        console.error('Error al cargar solicitudes:', err);
      },
    });
  }

  loadReports() {
    this.reportService.getAllReports().subscribe({
      next: (data) => {
        this.reports = data;
      },
      error: (err: any) => {
        console.error('Error al cargar reportes:', err);
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

  get activeRequests(): number {
    return this.requests.filter(
      (request) =>
        request.status === 'PENDING' || request.status === 'APPROVED'
    ).length;
  }

  get generatedReports(): number {
    return this.reports.length;
  }
}
