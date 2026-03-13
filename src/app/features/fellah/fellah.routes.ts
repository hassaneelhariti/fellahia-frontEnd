import { Routes } from '@angular/router';
import { FellahLayoutComponent } from './fellah-layout-component/fellah-layout-component';

export const FELLAH_ROUTES: Routes = [
  {
    path: '',
    component: FellahLayoutComponent,
    children: [
      { path: 'dashboard', loadComponent: () => import('./dashboard/fellah-dashboard-component').then(m => m.FellahDashboardComponent) },
      { path: 'chat', loadComponent: () => import('./chat/chat-component').then(m => m.ChatComponent) },
      { path: 'cases', loadComponent: () => import('./case-list-component/case-list-component').then(m => m.CaseListComponent) },
      { path: 'cases/submit', loadComponent: () => import('./case-submit-component/case-submit-component').then(m => m.CaseSubmitComponent) },
      { path: 'cases/:id', loadComponent: () => import('./case-detail-component/case-detail-component').then(m => m.CaseDetailComponent) },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  }
];
