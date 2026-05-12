import { Routes } from '@angular/router';

import { Login } from './auth/pages/login/login';
import { Register } from './auth/pages/register/register';

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
];
