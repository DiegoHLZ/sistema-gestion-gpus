import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { PaymentService } from '../../services/payment.service';
import { Payment, PaymentStatus } from '../../models/payment.model';

@Component({
  selector: 'app-client-payments',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './client-payments.html',
  styleUrl: './client-payments.scss',
})
export class ClientPayments implements OnInit {
  payments: Payment[] = [];
  errorMessage = '';

  constructor(private paymentService: PaymentService) {}

  ngOnInit(): void {
    this.loadPayments();
  }

  loadPayments(): void {
    this.paymentService.getMyPayments().subscribe({
      next: (data) => {
        this.payments = data;
      },
      error: (err) => {
        console.error('Error al cargar pagos del cliente:', err);
        this.errorMessage = 'No se pudieron cargar tus pagos.';
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
}
