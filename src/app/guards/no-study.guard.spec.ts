import { TestBed, async, inject } from '@angular/core/testing';

import { NoStudyGuard } from './no-study.guard';

describe('NoStudyGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NoStudyGuard]
    });
  });

  it('should ...', inject([NoStudyGuard], (guard: NoStudyGuard) => {
    expect(guard).toBeTruthy();
  }));
});
