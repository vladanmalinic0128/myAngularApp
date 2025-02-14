import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipateComponent } from './participate.component';

describe('ParticipateComponent', () => {
  let component: ParticipateComponent;
  let fixture: ComponentFixture<ParticipateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ParticipateComponent]
    });
    fixture = TestBed.createComponent(ParticipateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
