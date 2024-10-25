import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupcandidatComponent } from './popupcandidat.component';

describe('PopupcandidatComponent', () => {
  let component: PopupcandidatComponent;
  let fixture: ComponentFixture<PopupcandidatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PopupcandidatComponent]
    });
    fixture = TestBed.createComponent(PopupcandidatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
