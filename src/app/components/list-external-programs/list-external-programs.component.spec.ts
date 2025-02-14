import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListExternalProgramsComponent } from './list-external-programs.component';

describe('ListExternalProgramsComponent', () => {
  let component: ListExternalProgramsComponent;
  let fixture: ComponentFixture<ListExternalProgramsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListExternalProgramsComponent]
    });
    fixture = TestBed.createComponent(ListExternalProgramsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
