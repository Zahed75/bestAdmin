import { TestBed } from '@angular/core/testing';

import { OutletService } from './outlet.service';

describe('OutletService', () => {
  let service: OutletService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OutletService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
