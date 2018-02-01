import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenStudyComponent } from './open-study.component';

describe('OpenStudyComponent', () => {
  let component: OpenStudyComponent;
  let fixture: ComponentFixture<OpenStudyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenStudyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenStudyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
