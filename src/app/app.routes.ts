import { Routes } from '@angular/router';
import {authGuard, roleGuard} from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes').then(m => m.AUTH_ROUTES)
  },
  {
    path: 'fellah',
    canActivate: [authGuard, roleGuard('FELLAH')],
    loadChildren: () => import('./features/fellah/fellah.routes').then(m => m.FELLAH_ROUTES)
  },
  // {
  //   path: 'lawyer',
  //   canActivate: [authGuard, roleGuard('AVOCAT')],
  //   loadChildren: () => import('./features/lawyer/lawyer.routes').then(m => m.LAWYER_ROUTES)
  // }
];
