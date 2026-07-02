import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { UsageReport } from '../models/report.model';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  private apiUrl = 'http://localhost:8080/api/reports';

  constructor(private http: HttpClient) {}

  getAllReports(): Observable<UsageReport[]> {
    return this.http.get<UsageReport[]>(this.apiUrl);
  }

  createReport(assignmentId: number, report: any): Observable<UsageReport> {
    return this.http.post<UsageReport>(
      `${this.apiUrl}?assignmentId=${assignmentId}`,
      report
    );
  }

  deleteReport(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
