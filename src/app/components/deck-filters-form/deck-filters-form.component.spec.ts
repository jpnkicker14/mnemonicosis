import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeckFiltersFormComponent } from './deck-filters-form.component';

describe('DeckFiltersFormComponent', () => {
  let component: DeckFiltersFormComponent;
  let fixture: ComponentFixture<DeckFiltersFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeckFiltersFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeckFiltersFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
