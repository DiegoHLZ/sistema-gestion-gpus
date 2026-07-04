import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

import { RequestService } from '../../services/request.service';
import { ReportService } from '../../services/report.service';
import { GpuRequest } from '../../models/gpu-request.model';
import { UsageReport } from '../../models/report.model';

@Component({
  selector: 'app-client-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './client-dashboard.html',
  styleUrl: './client-dashboard.scss',
})
export class ClientDashboard implements OnInit {
  totalRequests = 0;
  approvedRequests = 0;
  totalReports = 0;

  constructor(
    private requestService: RequestService,
    private reportService: ReportService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData() {
    this.requestService.getMyRequests().subscribe({
      next: (requests: GpuRequest[]) => {
        this.totalRequests = requests.length;
        this.approvedRequests = requests.filter(
          (request) => request.status === 'APPROVED'
        ).length;
      },
      error: (err) => console.error('Error al cargar solicitudes:', err),
    });

    this.reportService.getMyReports().subscribe({
      next: (reports: UsageReport[]) => {
        this.totalReports = reports.length;
      },
      error: (err) => console.error('Error al cargar reportes:', err),
    });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.router.navigate(['/login']);
  }
}
