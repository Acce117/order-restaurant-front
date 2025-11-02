import { Routes } from '@angular/router';
import { AuthView } from './layouts/auth/auth.component';
import { authRoutes } from './auth/routes/routes';
import { validTokenGuard } from './auth/guards/valid-token-guard';
import { Dashboard } from './layouts/dashboard/dashboard.component';
import { restaurantRoutes } from './restaurant/routes/routes';
import { isAuthorizedGuard } from './auth/guards/is-authorized-guard';

export const routes: Routes = [
    {
        path: '',
        component: Dashboard,
        canActivate: [validTokenGuard],
        children: restaurantRoutes
    },
    {
        path: 'auth',
        component: AuthView,
        children: authRoutes
    }
];
