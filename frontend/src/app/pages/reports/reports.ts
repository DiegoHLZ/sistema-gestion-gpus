import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { ReportService } from '../../services/report.service';
import { UsageReport } from '../../models/report.model';

import {
  AssignmentService,
  GpuAssignment,
} from '../../services/assignment.service';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './reports.html',
  styleUrl: './reports.scss',
})
export class Reports implements OnInit {
  reports: UsageReport[] = [];
  activeAssignments: GpuAssignment[] = [];

  showCreateModal = false;

  reportForm;

  constructor(
    private reportService: ReportService,
    private assignmentService: AssignmentService,
    private fb: FormBuilder
  ) {
    this.reportForm = this.fb.group({
      assignmentId: [null, Validators.required],
      usageHours: [null, [Validators.required, Validators.min(0.1)]],
      estimatedConsumption: [
        null,
        [Validators.required, Validators.min(0)],
      ],
      observation: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.reportService.getAllReports().subscribe({
      next: (data) => {
        this.reports = data;
      },
      error: (err: any) => {
        console.error('Error al cargar reportes:', err);
      },
    });

    this.assignmentService.getAllAssignments().subscribe({
      next: (data) => {
        this.activeAssignments = data.filter(
          (assignment) => assignment.active
        );
      },
      error: (err: any) => {
        console.error('Error al cargar asignaciones:', err);
      },
    });
  }

  openCreateModal() {
    this.reportForm.reset({
      assignmentId: null,
      usageHours: null,
      estimatedConsumption: null,
      observation: '',
    });

    this.showCreateModal = true;
  }

  closeModal() {
    this.showCreateModal = false;
    this.reportForm.reset();
  }

  createReport() {
    if (this.reportForm.invalid) {
      return;
    }

    const assignmentId = this.reportForm.value.assignmentId!;
    const reportData = {
      usageHours: this.reportForm.value.usageHours,
      estimatedConsumption: this.reportForm.value.estimatedConsumption,
      observation: this.reportForm.value.observation,
    };

    this.reportService.createReport(assignmentId, reportData).subscribe({
      next: () => {
        this.closeModal();
        this.loadData();
      },
      error: (err: any) => {
        console.error('Error al crear reporte:', err);
      },
    });
  }

  deleteReport(id: number) {
    this.reportService.deleteReport(id).subscribe({
      next: () => {
        this.loadData();
      },
      error: (err: any) => {
        console.error('Error al eliminar reporte:', err);
      },
    });
  }
}
