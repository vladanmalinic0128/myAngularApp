import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListParticipationsComponent } from './list-participations.component';

describe('ListParticipationsComponent', () => {
  let component: ListParticipationsComponent;
  let fixture: ComponentFixture<ListParticipationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListParticipationsComponent]
    });
    fixture = TestBed.createComponent(ListParticipationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
