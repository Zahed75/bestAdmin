import { TestBed } from '@angular/core/testing';

import { AddOutletService } from './add-outlet.service';

describe('AddOutletService', () => {
  let service: AddOutletService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddOutletService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
