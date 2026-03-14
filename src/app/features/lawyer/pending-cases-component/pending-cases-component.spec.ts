import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingCasesComponent } from './pending-cases-component';

describe('PendingCasesComponent', () => {
  let component: PendingCasesComponent;
  let fixture: ComponentFixture<PendingCasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PendingCasesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendingCasesComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
