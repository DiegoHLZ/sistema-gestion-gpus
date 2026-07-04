import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { ReportService } from '../../services/report.service';
import { UsageReport } from '../../models/report.model';

@Component({
  selector: 'app-client-reports',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './client-reports.html',
  styleUrl: './client-reports.scss',
})
export class ClientReports implements OnInit {
  reports: UsageReport[] = [];

  constructor(private reportService: ReportService) {}

  ngOnInit(): void {
    this.loadReports();
  }

  loadReports() {
    this.reportService.getMyReports().subscribe({
      next: (data) => {
        this.reports = data;
      },
      error: (err) => {
        console.error('Error al cargar mis reportes:', err);
      },
    });
  }
}
