import { UsageReport } from './report.model';
import { GpuAssignment } from '../services/assignment.service';

export type PaymentStatus = 'PENDING' | 'PAID' | 'REJECTED';

export interface PaymentUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  phone?: string;
  active?: boolean;
}

export interface Payment {
  id: number;
  paymentDate: string;
  amount: number;
  status: PaymentStatus;
  paymentMethod: string;
  transactionCode: string;
  report: UsageReport;
  assignment: GpuAssignment;
  user: PaymentUser;
}
