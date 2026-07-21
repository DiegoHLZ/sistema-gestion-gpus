import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

import { RequestService } from '../../services/request.service';
import { ReportService } from '../../services/report.service';
import { AssignmentService, GpuAssignment } from '../../services/assignment.service';

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
  requests: GpuRequest[] = [];
  reports: UsageReport[] = [];
  assignments: GpuAssignment[] = [];

  totalRequests = 0;
  approvedRequests = 0;
  totalReports = 0;
  activeAssignments = 0;

  constructor(
    private requestService: RequestService,
    private reportService: ReportService,
    private assignmentService: AssignmentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData() {
    this.requestService.getMyRequests().subscribe({
      next: (requests) => {
        this.requests = requests;
        this.totalRequests = requests.length;
        this.approvedRequests = requests.filter(
          (request) => request.status === 'APPROVED'
        ).length;
      },
      error: (err) => console.error('Error al cargar solicitudes:', err),
    });

    this.reportService.getMyReports().subscribe({
      next: (reports) => {
        this.reports = reports;
        this.totalReports = reports.length;
      },
      error: (err) => console.error('Error al cargar reportes:', err),
    });

    this.assignmentService.getMyActiveAssignments().subscribe({
      next: (assignments) => {
        this.assignments = assignments;
        this.activeAssignments = assignments.length;
      },
      error: (err) => console.error('Error al cargar asignaciones:', err),
    });
  }

  get recentRequests(): GpuRequest[] {
    return [...this.requests].slice(-5).reverse();
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.router.navigate(['/login']);
  }
}
