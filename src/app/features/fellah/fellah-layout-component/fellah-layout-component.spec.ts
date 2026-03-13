import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FellahLayoutComponent } from './fellah-layout-component';

describe('FellahLayoutComponent', () => {
  let component: FellahLayoutComponent;
  let fixture: ComponentFixture<FellahLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FellahLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FellahLayoutComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
