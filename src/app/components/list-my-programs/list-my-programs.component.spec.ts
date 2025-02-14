import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMyProgramsComponent } from './list-my-programs.component';

describe('ListMyProgramsComponent', () => {
  let component: ListMyProgramsComponent;
  let fixture: ComponentFixture<ListMyProgramsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListMyProgramsComponent]
    });
    fixture = TestBed.createComponent(ListMyProgramsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
