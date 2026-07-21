import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { PaymentService } from '../../services/payment.service';
import {
  Payment,
  PaymentStatus,
} from '../../models/payment.model';

import { ReportService } from '../../services/report.service';
import { UsageReport } from '../../models/report.model';

@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './payments.html',
  styleUrl: './payments.scss',
})
export class Payments implements OnInit {
  payments: Payment[] = [];
  availableReports: UsageReport[] = [];

  showCreateModal = false;
  errorMessage = '';

  paymentForm;

  constructor(
    private paymentService: PaymentService,
    private reportService: ReportService,
    private fb: FormBuilder
  ) {
    this.paymentForm = this.fb.group({
      reportId: [null, Validators.required],
      paymentMethod: ['TRANSFER', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.paymentService.getAllPayments().subscribe({
      next: (data) => {
        this.payments = data;
        this.loadAvailableReports();
      },
      error: (err) => {
        console.error('Error al cargar pagos:', err);
        this.errorMessage = 'No se pudieron cargar los pagos.';
      },
    });
  }

  loadAvailableReports(): void {
    this.reportService.getAllReports().subscribe({
      next: (reports) => {
        const usedReportIds = new Set(
          this.payments
            .map((payment) => payment.report?.id)
            .filter((id): id is number => id !== undefined && id !== null)
        );

        this.availableReports = reports.filter(
          (report) =>
            report.estimatedCost !== null &&
            report.estimatedCost !== undefined &&
            report.user !== null &&
            report.user !== undefined &&
            !usedReportIds.has(report.id)
        );
      },
      error: (err) => {
        console.error('Error al cargar reportes disponibles:', err);
      },
    });
  }

  openCreateModal(): void {
    this.errorMessage = '';

    this.paymentForm.reset({
      reportId: null,
      paymentMethod: 'TRANSFER',
    });

    this.showCreateModal = true;
  }

  closeModal(): void {
    this.showCreateModal = false;
    this.errorMessage = '';
    this.paymentForm.reset();
  }

  createPayment(): void {
    if (this.paymentForm.invalid) {
      return;
    }

    const reportId = Number(this.paymentForm.value.reportId);
    const paymentMethod = this.paymentForm.value.paymentMethod!;

    this.paymentService
      .createPayment(reportId, paymentMethod)
      .subscribe({
        next: () => {
          this.closeModal();
          this.loadData();
        },
        error: (err) => {
          console.error('Error al crear pago:', err);

          this.errorMessage =
            err?.error?.message ||
            'No se pudo generar el pago. Revisa que el reporte tenga usuario, asignación y costo.';
        },
      });
  }

  updateStatus(
    payment: Payment,
    status: PaymentStatus
  ): void {
    this.paymentService
      .updatePaymentStatus(payment.id, status)
      .subscribe({
        next: () => {
          this.loadData();
        },
        error: (err) => {
          console.error('Error al actualizar el pago:', err);
        },
      });
  }

  deletePayment(id: number): void {
    const confirmed = window.confirm(
      '¿Seguro que deseas eliminar este pago?'
    );

    if (!confirmed) {
      return;
    }

    this.paymentService.deletePayment(id).subscribe({
      next: () => {
        this.loadData();
      },
      error: (err) => {
        console.error('Error al eliminar el pago:', err);
      },
    });
  }

  getStatusLabel(status: PaymentStatus): string {
    switch (status) {
      case 'PAID':
        return 'Pagado';
      case 'REJECTED':
        return 'Rechazado';
      default:
        return 'Pendiente';
    }
  }

  getStatusClass(status: PaymentStatus): string {
    switch (status) {
      case 'PAID':
        return 'bg-green-500/20 text-green-400';
      case 'REJECTED':
        return 'bg-red-500/20 text-red-400';
      default:
        return 'bg-yellow-500/20 text-yellow-400';
    }
  }

  get pendingPaymentsCount(): number {
  return this.payments.filter(
    (payment) => payment.status === 'PENDING'
  ).length;
}

get paidPaymentsCount(): number {
  return this.payments.filter(
    (payment) => payment.status === 'PAID'
  ).length;
}
}
