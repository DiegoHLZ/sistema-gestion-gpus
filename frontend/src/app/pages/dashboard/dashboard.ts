import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Chart, ChartConfiguration, registerables } from 'chart.js';

import { GpuService } from '../../services/gpu.service';
import { Gpu } from '../../models/gpu.model';

import { RequestService } from '../../services/request.service';
import { GpuRequest } from '../../models/gpu-request.model';

import { ReportService } from '../../services/report.service';
import { UsageReport } from '../../models/report.model';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit, AfterViewInit, OnDestroy {
  gpus: Gpu[] = [];
  requests: GpuRequest[] = [];
  reports: UsageReport[] = [];

  private gpuChart?: Chart;
  private requestChart?: Chart;
  private viewReady = false;

  constructor(
    private gpuService: GpuService,
    private requestService: RequestService,
    private reportService: ReportService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  ngAfterViewInit(): void {
    this.viewReady = true;
    this.renderCharts();
  }

  ngOnDestroy(): void {
    this.gpuChart?.destroy();
    this.requestChart?.destroy();
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
        this.renderCharts();
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
        this.renderCharts();
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

  renderCharts() {
    if (!this.viewReady) return;

    this.createGpuChart();
    this.createRequestChart();
  }

  createGpuChart() {
    const canvas = document.getElementById(
      'gpuAvailabilityChart'
    ) as HTMLCanvasElement | null;

    if (!canvas) return;

    this.gpuChart?.destroy();

    const available = this.gpus.filter((gpu) => gpu.available).length;
    const inUse = this.gpus.filter((gpu) => !gpu.available).length;

    const config: ChartConfiguration<'doughnut'> = {
      type: 'doughnut',
      data: {
        labels: ['Disponibles', 'En uso'],
        datasets: [
          {
            data: [available, inUse],
            backgroundColor: ['#22c55e', '#ef4444'],
            borderColor: ['#111827', '#111827'],
            borderWidth: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: '#d1d5db',
              padding: 18,
            },
          },
        },
      },
    };

    this.gpuChart = new Chart(canvas, config);
  }

  createRequestChart() {
    const canvas = document.getElementById(
      'requestStatusChart'
    ) as HTMLCanvasElement | null;

    if (!canvas) return;

    this.requestChart?.destroy();

    const pending = this.requests.filter(
      (request) => request.status === 'PENDING'
    ).length;

    const approved = this.requests.filter(
      (request) => request.status === 'APPROVED'
    ).length;

    const rejected = this.requests.filter(
      (request) => request.status === 'REJECTED'
    ).length;

    const completed = this.requests.filter(
      (request) => request.status === 'COMPLETED'
    ).length;

    const config: ChartConfiguration<'bar'> = {
      type: 'bar',
      data: {
        labels: ['Pendientes', 'Aprobadas', 'Rechazadas', 'Completadas'],
        datasets: [
          {
            label: 'Solicitudes',
            data: [pending, approved, rejected, completed],
            backgroundColor: ['#eab308', '#22c55e', '#ef4444', '#3b82f6'],
            borderRadius: 8,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            ticks: {
              color: '#d1d5db',
            },
            grid: {
              display: false,
            },
          },
          y: {
            beginAtZero: true,
            ticks: {
              color: '#d1d5db',
              precision: 0,
            },
            grid: {
              color: '#374151',
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    };

    this.requestChart = new Chart(canvas, config);
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
