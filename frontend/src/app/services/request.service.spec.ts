import { TestBed } from '@angular/core/testing';

import { RequestService } from './request.service';

describe('Request', () => {
  let service: Request;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Request);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
