import { TestBed, async, inject } from '@angular/core/testing';

import { ShouldNotAuthGuard } from './should-not-auth.guard';

describe('ShouldNotAuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShouldNotAuthGuard]
    });
  });

  it('should ...', inject([ShouldNotAuthGuard], (guard: ShouldNotAuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
