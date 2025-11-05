import { Routes } from '@angular/router';
import { AuthView } from './layouts/auth/auth.component';
import { authRoutes } from './auth/routes/routes';
import { validTokenGuard } from './auth/guards/valid-token-guard';
import { Dashboard } from './layouts/dashboard/dashboard.component';
import { restaurantRoutes } from './restaurant/routes/routes';
import { catalogueRoutes } from './catalogue/routes/routes';
import { Home } from './layouts/home/home';
import { CartView } from './orders/views/cartView';

export const routes: Routes = [
    {
        path: '',
        component: Home,
        children: [
            ...catalogueRoutes,
            {
                path: 'cart',
                component: CartView
            },
        ]
    },
    {
        path: 'dashboard',
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
