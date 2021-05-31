import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemDeckComponent } from './mem-deck.component';

describe('MemDeckComponent', () => {
  let component: MemDeckComponent;
  let fixture: ComponentFixture<MemDeckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemDeckComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemDeckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
