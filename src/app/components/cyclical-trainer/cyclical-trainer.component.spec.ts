import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CyclicalTrainerComponent } from './cyclical-trainer.component';

describe('CyclicalTrainerComponent', () => {
  let component: CyclicalTrainerComponent;
  let fixture: ComponentFixture<CyclicalTrainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CyclicalTrainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CyclicalTrainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
