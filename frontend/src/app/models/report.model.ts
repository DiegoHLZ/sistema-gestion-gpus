export interface ReportUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  company: string;
}

export interface ReportGpu {
  id: number;
  name: string;
  model: string;
  providerCloud: string;
  region: string;
  pricePerHour: number;
}

export interface ReportAssignment {
  id: number;
  assignmentDate: string;
  releaseDate: string;
  active: boolean;
  request?: {
    id: number;
    projectType: string;
    description: string;
  };
}

export interface UsageReport {
  id: number;
  reportDate: string;
  usageHours: number;
  estimatedConsumption: number;
  estimatedCost: number;
  observation: string;
  user?: ReportUser;
  gpu?: ReportGpu;
  assignment?: ReportAssignment;
}
