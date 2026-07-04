import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { RequestService } from '../../services/request.service';
import { GpuRequest } from '../../models/gpu-request.model';

@Component({
  selector: 'app-client-requests',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './client-requests.html',
  styleUrl: './client-requests.scss',
})
export class ClientRequests implements OnInit {
  requests: GpuRequest[] = [];
  showCreateModal = false;

  requestForm;

  constructor(
    private requestService: RequestService,
    private fb: FormBuilder
  ) {
    this.requestForm = this.fb.group({
      description: ['', Validators.required],
      projectType: ['', Validators.required],
      gpuQuantity: [1, Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadRequests();
  }

  loadRequests() {
    this.requestService.getMyRequests().subscribe({
      next: (data) => {
        this.requests = data;
      },
      error: (err: any) => {
        console.error('Error al cargar mis solicitudes:', err);
      },
    });
  }

  openCreateModal() {
    this.requestForm.reset({
      description: '',
      projectType: '',
      gpuQuantity: 1,
      startDate: '',
      endDate: '',
    });

    this.showCreateModal = true;
  }

  closeModal() {
    this.showCreateModal = false;
  }

  createRequest() {
    if (this.requestForm.invalid) return;

    const requestData = {
      ...this.requestForm.value,
      status: 'PENDING',
    };

    this.requestService.createRequest(requestData).subscribe({
      next: () => {
        this.closeModal();
        this.loadRequests();
      },
      error: (err: any) => {
        console.error('Error al crear solicitud:', err);
      },
    });
  }
}
