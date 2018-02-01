import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculationStatusComponent } from './calculation-status.component';

describe('CalculationStatusComponent', () => {
  let component: CalculationStatusComponent;
  let fixture: ComponentFixture<CalculationStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalculationStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculationStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
