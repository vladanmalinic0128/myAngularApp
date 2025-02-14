import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFitnessProgramComponent } from './edit-fitness-program.component';

describe('EditFitnessProgramComponent', () => {
  let component: EditFitnessProgramComponent;
  let fixture: ComponentFixture<EditFitnessProgramComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditFitnessProgramComponent]
    });
    fixture = TestBed.createComponent(EditFitnessProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
