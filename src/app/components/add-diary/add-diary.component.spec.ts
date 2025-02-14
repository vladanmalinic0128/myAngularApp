import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDiaryComponent } from './add-diary.component';

describe('AddDiaryComponent', () => {
  let component: AddDiaryComponent;
  let fixture: ComponentFixture<AddDiaryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddDiaryComponent]
    });
    fixture = TestBed.createComponent(AddDiaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
