import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FellahDashboardComponent } from './fellah-dashboard-component';

describe('FellahDashboardComponent', () => {
  let component: FellahDashboardComponent;
  let fixture: ComponentFixture<FellahDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FellahDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FellahDashboardComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
