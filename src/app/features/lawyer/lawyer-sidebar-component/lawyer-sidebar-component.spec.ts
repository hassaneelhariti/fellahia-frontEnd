import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LawyerSidebarComponent } from './lawyer-sidebar-component';

describe('LawyerSidebarComponent', () => {
  let component: LawyerSidebarComponent;
  let fixture: ComponentFixture<LawyerSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LawyerSidebarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LawyerSidebarComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
