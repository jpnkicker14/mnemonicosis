import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CyclicalComponent } from './cyclical.component';

describe('CyclicalComponent', () => {
  let component: CyclicalComponent;
  let fixture: ComponentFixture<CyclicalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CyclicalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CyclicalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
