import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserreferencesComponent } from './userreferences.component';

describe('UserreferencesComponent', () => {
  let component: UserreferencesComponent;
  let fixture: ComponentFixture<UserreferencesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserreferencesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserreferencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
