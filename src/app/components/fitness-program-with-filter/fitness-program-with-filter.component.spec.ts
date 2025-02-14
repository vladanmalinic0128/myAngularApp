import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FitnessProgramWithFilterComponent } from './fitness-program-with-filter.component';

describe('FitnessProgramWithFilterComponent', () => {
  let component: FitnessProgramWithFilterComponent;
  let fixture: ComponentFixture<FitnessProgramWithFilterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FitnessProgramWithFilterComponent]
    });
    fixture = TestBed.createComponent(FitnessProgramWithFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
