import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Gpu } from '../models/gpu.model';

@Injectable({
  providedIn: 'root',
})
export class GpuService {
  private apiUrl = 'http://localhost:8080/api/gpus';

  constructor(private http: HttpClient) {}

  getAllGpus(): Observable<Gpu[]> {
    return this.http.get<Gpu[]>(this.apiUrl);
  }

  createGpu(gpu: any): Observable<Gpu> {
    return this.http.post<Gpu>(this.apiUrl, gpu);
  }

  updateGpu(id: number, gpu: any): Observable<Gpu> {
    return this.http.put<Gpu>(`${this.apiUrl}/${id}`, gpu);
  }

  deleteGpu(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}