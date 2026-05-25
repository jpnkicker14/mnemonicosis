import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeatClockComponent } from './beat-clock.component';

describe('BeatClockComponent', () => {
  let component: BeatClockComponent;
  let fixture: ComponentFixture<BeatClockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeatClockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BeatClockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
