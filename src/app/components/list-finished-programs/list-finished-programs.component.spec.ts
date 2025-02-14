import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFinishedProgramsComponent } from './list-finished-programs.component';

describe('ListFinishedProgramsComponent', () => {
  let component: ListFinishedProgramsComponent;
  let fixture: ComponentFixture<ListFinishedProgramsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListFinishedProgramsComponent]
    });
    fixture = TestBed.createComponent(ListFinishedProgramsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
