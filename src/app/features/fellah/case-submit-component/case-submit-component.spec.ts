import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseSubmitComponent } from './case-submit-component';

describe('CaseSubmitComponent', () => {
  let component: CaseSubmitComponent;
  let fixture: ComponentFixture<CaseSubmitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaseSubmitComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaseSubmitComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
