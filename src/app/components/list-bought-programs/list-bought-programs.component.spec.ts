import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBoughtProgramsComponent } from './list-bought-programs.component';

describe('ListBoughtProgramsComponent', () => {
  let component: ListBoughtProgramsComponent;
  let fixture: ComponentFixture<ListBoughtProgramsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListBoughtProgramsComponent]
    });
    fixture = TestBed.createComponent(ListBoughtProgramsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
