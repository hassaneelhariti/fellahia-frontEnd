import { Routes } from '@angular/router';
import { MyLawyerCasesComponent } from './my-lawyer-cases-component/my-lawyer-cases-component';
import {LawyerLayoutComponent} from './lawyer-layout-component/lawyer-layout-component';
import {PendingCasesComponent} from './pending-cases-component/pending-cases-component';

export const LAWYER_ROUTES: Routes = [
  {
    path: '',
    component: LawyerLayoutComponent,
    children: [
      { path: '',          redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: MyLawyerCasesComponent },
      { path: 'pending',   component: PendingCasesComponent },
    ]
  }
];
