import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechargeCodeComponent } from './recharge-code-component';

describe('RechargeCodeComponent', () => {
  let component: RechargeCodeComponent;
  let fixture: ComponentFixture<RechargeCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RechargeCodeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RechargeCodeComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
