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
}
