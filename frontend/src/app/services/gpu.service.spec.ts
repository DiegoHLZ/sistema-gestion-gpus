import { TestBed } from '@angular/core/testing';

import { GpuService } from './gpu.service';

describe('Gpu', () => {
  let service: GpuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GpuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
