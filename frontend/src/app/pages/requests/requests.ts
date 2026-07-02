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
  selector: 'app-requests',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './requests.html',
  styleUrl: './requests.scss',
})
export class Requests implements OnInit {
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
    this.requestService.getAllRequests().subscribe({
      next: (data) => {
        this.requests = data;
      },
      error: (err: any) => {
        console.error(err);
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
        console.error(err);
      },
    });
  }
}
