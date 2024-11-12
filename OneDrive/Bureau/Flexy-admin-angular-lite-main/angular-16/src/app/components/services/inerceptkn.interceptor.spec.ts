import { TestBed } from '@angular/core/testing';

import { InerceptknInterceptor } from './inerceptkn.interceptor';

describe('InerceptknInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      InerceptknInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: InerceptknInterceptor = TestBed.inject(InerceptknInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
