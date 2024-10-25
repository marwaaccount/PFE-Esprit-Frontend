import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatoffreComponent } from './candidatoffre.component';

describe('CandidatoffreComponent', () => {
  let component: CandidatoffreComponent;
  let fixture: ComponentFixture<CandidatoffreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CandidatoffreComponent]
    });
    fixture = TestBed.createComponent(CandidatoffreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
