import { TestBed } from '@angular/core/testing';

import { SmoothscrollService } from './smoothscroll.service';

describe('SmoothscrollService', () => {
  let service: SmoothscrollService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SmoothscrollService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
