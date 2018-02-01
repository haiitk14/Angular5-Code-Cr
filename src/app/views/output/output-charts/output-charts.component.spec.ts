import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutputChartsComponent } from './output-charts.component';

describe('OutputChartsComponent', () => {
  let component: OutputChartsComponent;
  let fixture: ComponentFixture<OutputChartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutputChartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutputChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
