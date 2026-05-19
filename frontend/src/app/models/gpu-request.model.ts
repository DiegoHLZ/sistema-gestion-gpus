export interface GpuRequest {
  id: number;
  description: string;
  projectType: string;
  gpuQuantity: number;
  requestDate: string;
  startDate: string;
  endDate: string;
  status: string;
  user?: any;
}
