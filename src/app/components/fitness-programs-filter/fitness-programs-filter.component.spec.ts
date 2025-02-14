import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FitnessProgramsFilterComponent } from './fitness-programs-filter.component';

describe('FitnessProgramsFilterComponent', () => {
  let component: FitnessProgramsFilterComponent;
  let fixture: ComponentFixture<FitnessProgramsFilterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FitnessProgramsFilterComponent]
    });
    fixture = TestBed.createComponent(FitnessProgramsFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
