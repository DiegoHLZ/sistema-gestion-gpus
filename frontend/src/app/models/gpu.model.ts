export interface Gpu {
  id: number;
  name: string;
  model: string;
  memory: number;
  providerCloud: string;
  region: string;
  pricePerHour: number;
  available: boolean;
}
