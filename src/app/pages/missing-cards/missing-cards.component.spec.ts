import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissingCardsComponent } from './missing-cards.component';

describe('MissingCardsComponent', () => {
  let component: MissingCardsComponent;
  let fixture: ComponentFixture<MissingCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MissingCardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MissingCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
