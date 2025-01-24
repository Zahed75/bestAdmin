import { TestBed } from '@angular/core/testing';

import { DetailsOrderService } from './details-order.service';

describe('DetailsOrderService', () => {
  let service: DetailsOrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetailsOrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
