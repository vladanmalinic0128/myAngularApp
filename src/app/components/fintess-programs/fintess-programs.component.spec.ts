import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FintessProgramsComponent } from './fintess-programs.component';

describe('FintessProgramsComponent', () => {
  let component: FintessProgramsComponent;
  let fixture: ComponentFixture<FintessProgramsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FintessProgramsComponent]
    });
    fixture = TestBed.createComponent(FintessProgramsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
