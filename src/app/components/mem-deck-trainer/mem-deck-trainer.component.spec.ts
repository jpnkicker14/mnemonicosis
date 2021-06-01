import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemDeckTrainerComponent } from './mem-deck-trainer.component';

describe('MemDeckTrainerComponent', () => {
  let component: MemDeckTrainerComponent;
  let fixture: ComponentFixture<MemDeckTrainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemDeckTrainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemDeckTrainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
