import { TestBed, async, inject } from '@angular/core/testing';

import { StudyRequiredGuard } from './study-required.guard';

describe('StudyRequiredGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StudyRequiredGuard]
    });
  });

  it('should ...', inject([StudyRequiredGuard], (guard: StudyRequiredGuard) => {
    expect(guard).toBeTruthy();
  }));
});
