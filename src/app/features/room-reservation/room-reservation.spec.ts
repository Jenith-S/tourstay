import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RoomReservation } from './room-reservation';

describe('RoomReservation', () => {
  let component: RoomReservation;
  let fixture: ComponentFixture<RoomReservation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomReservation],
    }).compileComponents();

    fixture = TestBed.createComponent(RoomReservation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
