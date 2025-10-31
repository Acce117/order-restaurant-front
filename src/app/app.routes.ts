import { Routes } from '@angular/router';
import { Dashboard } from './layouts/dashboard/dashboard.component';
import { AuthView } from './layouts/auth/auth.component';
import { authRoutes } from './auth/routes/routes';
import { validTokenGuard } from './auth/guards/valid-token-guard';

export const routes: Routes = [
    {
        path: '',
        component: Dashboard,
        canActivate: [validTokenGuard]
    },
    {
        path: 'auth',
        component: AuthView,
        children: authRoutes
    }
];
