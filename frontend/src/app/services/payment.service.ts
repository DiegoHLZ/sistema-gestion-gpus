import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
  Payment,
  PaymentStatus,
} from '../models/payment.model';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private apiUrl = 'http://localhost:8080/api/payments';

  constructor(private http: HttpClient) {}

  getAllPayments(): Observable<Payment[]> {
    return this.http.get<Payment[]>(this.apiUrl);
  }

  getPaymentById(id: number): Observable<Payment> {
    return this.http.get<Payment>(`${this.apiUrl}/${id}`);
  }

  getMyPayments(): Observable<Payment[]> {
    return this.http.get<Payment[]>(`${this.apiUrl}/my-payments`);
  }

  createPayment(
    reportId: number,
    paymentMethod: string
  ): Observable<Payment> {
    const params = new HttpParams()
      .set('reportId', reportId)
      .set('paymentMethod', paymentMethod);

    return this.http.post<Payment>(
      this.apiUrl,
      null,
      { params }
    );
  }

  updatePaymentStatus(
    id: number,
    status: PaymentStatus
  ): Observable<Payment> {
    const params = new HttpParams().set('status', status);

    return this.http.put<Payment>(
      `${this.apiUrl}/${id}/status`,
      null,
      { params }
    );
  }

  deletePayment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
