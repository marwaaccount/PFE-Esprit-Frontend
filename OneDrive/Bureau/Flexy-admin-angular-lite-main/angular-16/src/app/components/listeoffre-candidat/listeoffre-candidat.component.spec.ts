import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeoffreCandidatComponent } from './listeoffre-candidat.component';

describe('ListeoffreCandidatComponent', () => {
  let component: ListeoffreCandidatComponent;
  let fixture: ComponentFixture<ListeoffreCandidatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListeoffreCandidatComponent]
    });
    fixture = TestBed.createComponent(ListeoffreCandidatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
