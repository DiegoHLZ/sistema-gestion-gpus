import { Routes } from '@angular/router';

import { Login } from './auth/pages/login/login';
import { Register } from './auth/pages/register/register';
import { Dashboard } from './pages/dashboard/dashboard';
import { authGuard } from './core/guards/auth-guard';
import { Requests } from './pages/requests/requests';
import { Assignments } from './pages/assignments/assignments';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: Login,
  },
  {
    path: 'register',
    component: Register,
  },
  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [authGuard],
  },
  {
    path: 'requests',
    component: Requests,
    canActivate: [authGuard],
  },
  {
  path: 'assignments',
  loadComponent: () =>
    import('./pages/assignments/assignments').then(
      (m) => m.Assignments
    ),
  },
];

