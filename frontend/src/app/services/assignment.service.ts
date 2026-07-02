import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface GpuAssignment {
  id: number;
  assignmentDate: string;
  releaseDate: string | null;
  active: boolean;
  gpu: any;
  request: any;
}

@Injectable({
  providedIn: 'root',
})
export class AssignmentService {
  private apiUrl = 'http://localhost:8080/api/assignments';

  constructor(private http: HttpClient) {}

  getAllAssignments(): Observable<GpuAssignment[]> {
    return this.http.get<GpuAssignment[]>(this.apiUrl);
  }

  assignGpu(requestId: number, gpuId: number): Observable<GpuAssignment> {
    return this.http.post<GpuAssignment>(
      `${this.apiUrl}/assign?requestId=${requestId}&gpuId=${gpuId}`,
      {}
    );
  }

  releaseAssignment(id: number): Observable<GpuAssignment> {
    return this.http.put<GpuAssignment>(`${this.apiUrl}/${id}/release`, {});
  }
}
