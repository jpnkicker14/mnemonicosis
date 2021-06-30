import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccanComponent } from './accan.component';

describe('AccanComponent', () => {
  let component: AccanComponent;
  let fixture: ComponentFixture<AccanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
