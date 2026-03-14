import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LawyerLayoutComponent } from './lawyer-layout-component';

describe('LawyerLayoutComponent', () => {
  let component: LawyerLayoutComponent;
  let fixture: ComponentFixture<LawyerLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LawyerLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LawyerLayoutComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
