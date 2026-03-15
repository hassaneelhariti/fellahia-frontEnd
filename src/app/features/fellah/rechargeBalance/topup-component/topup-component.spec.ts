import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopupComponent } from './topup-component';

describe('TopupComponent', () => {
  let component: TopupComponent;
  let fixture: ComponentFixture<TopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopupComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
