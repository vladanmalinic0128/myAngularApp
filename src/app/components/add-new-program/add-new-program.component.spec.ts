import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewProgramComponent } from './add-new-program.component';

describe('AddNewProgramComponent', () => {
  let component: AddNewProgramComponent;
  let fixture: ComponentFixture<AddNewProgramComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddNewProgramComponent]
    });
    fixture = TestBed.createComponent(AddNewProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
