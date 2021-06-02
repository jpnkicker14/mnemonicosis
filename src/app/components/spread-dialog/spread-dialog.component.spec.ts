import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpreadDialogComponent } from './spread-dialog.component';

describe('SpreadDialogComponent', () => {
  let component: SpreadDialogComponent;
  let fixture: ComponentFixture<SpreadDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpreadDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpreadDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
