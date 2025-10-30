import { Routes } from '@angular/router';
import { Dashboard } from './layouts/dashboard/dashboard.component';
import { AuthView } from './layouts/auth/auth.component';
import { authRoutes } from './auth/routes/routes';

export const routes: Routes = [
    {
        path: '',
        component: Dashboard
    },
    {
        path: 'auth',
        component: AuthView,
        children: authRoutes
    }
];
