import { TestBed } from '@angular/core/testing';

import { CartControllerService } from './cart-controller.service';

describe('CartControllerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CartControllerService = TestBed.get(CartControllerService);
    expect(service).toBeTruthy();
  });
});
