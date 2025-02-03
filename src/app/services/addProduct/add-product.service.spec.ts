import { TestBed } from '@angular/core/testing';

import { AddProductService } from './add-product.service';

describe('AddProductService', () => {
  let service: AddProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
