import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MnemonicosisComponent } from './mnemonicosis.component';

describe('MnemonicosisComponent', () => {
  let component: MnemonicosisComponent;
  let fixture: ComponentFixture<MnemonicosisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MnemonicosisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MnemonicosisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
