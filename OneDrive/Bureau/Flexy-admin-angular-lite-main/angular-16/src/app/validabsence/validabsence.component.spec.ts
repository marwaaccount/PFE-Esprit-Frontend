import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidabsenceComponent } from './validabsence.component';

describe('ValidabsenceComponent', () => {
  let component: ValidabsenceComponent;
  let fixture: ComponentFixture<ValidabsenceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ValidabsenceComponent]
    });
    fixture = TestBed.createComponent(ValidabsenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
