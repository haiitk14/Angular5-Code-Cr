import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckControlComponent } from './check-control.component';

describe('CheckControlComponent', () => {
  let component: CheckControlComponent;
  let fixture: ComponentFixture<CheckControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
