import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppSysUtilzComponent } from './app-sys-utilz.component';

describe('AppSysUtilzComponent', () => {
  let component: AppSysUtilzComponent;
  let fixture: ComponentFixture<AppSysUtilzComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppSysUtilzComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppSysUtilzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
