import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyLawyerCasesComponent } from './my-lawyer-cases-component';

describe('MyLawyerCasesComponent', () => {
  let component: MyLawyerCasesComponent;
  let fixture: ComponentFixture<MyLawyerCasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyLawyerCasesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyLawyerCasesComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
