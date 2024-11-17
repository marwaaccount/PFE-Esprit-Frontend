import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogincondidatComponent } from './logincondidat.component';

describe('LogincondidatComponent', () => {
  let component: LogincondidatComponent;
  let fixture: ComponentFixture<LogincondidatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LogincondidatComponent]
    });
    fixture = TestBed.createComponent(LogincondidatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
