import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { GpuRequest } from '../models/gpu-request.model';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  private apiUrl = 'http://localhost:8080/api/requests';

  constructor(private http: HttpClient) {}

  getAllRequests(): Observable<GpuRequest[]> {
    return this.http.get<GpuRequest[]>(this.apiUrl);
  }

  createRequest(request: any): Observable<GpuRequest> {
  return this.http.post<GpuRequest>(this.apiUrl, request);
  }

}


