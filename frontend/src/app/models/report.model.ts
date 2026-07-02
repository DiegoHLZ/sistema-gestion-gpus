export interface UsageReport {
  id: number;
  reportDate: string;
  usageHours: number;
  estimatedConsumption: number;
  observation: string;
  user?: any;
  gpu?: any;
  assignment?: any;
}
