import { Routes } from '@angular/router';
import { AuthView } from './layouts/auth/auth';
import { Dashboard } from './layouts/dashboard/dashboard';
import { catalogueRoutes } from './modules/catalogue/routes/routes';
import { Home } from './layouts/home/home';
import { MyOrders } from './authUser/views/my-orders/myOrders';
import { UserProfile } from './authUser/views/profile/profile';
import { CartView } from './modules/orders/views/cart/cartView';
import { restaurantRoutes } from './modules/restaurant/routes/routes';
import { OrdersView } from './modules/orders/views/orders/ordersView';
import { OrderDetails } from './modules/orders/views/order-details/orderDetails';
import { validTokenGuard } from './core/guards/valid-token-guard';
import { isAuthorizedGuard } from './core/guards/is-authorized-guard';
import { authRoutes } from './modules/auth/routes/routes';

export const routes: Routes = [
    {
        path: '',
        component: Home,
        children: [
            { path: '', redirectTo: 'catalogue', pathMatch: 'full'},
            {
                path: 'catalogue',
                children: [
                    ...catalogueRoutes,
                ]
            },
            {
                path: 'cart',
                component: CartView,
            },
        ]
    },
    {
        path: 'dashboard',
        component: Dashboard,
        canActivate: [validTokenGuard],
        canActivateChild: [isAuthorizedGuard],
        children: [
            ...restaurantRoutes,
            {
                path: 'my-orders',
                component: MyOrders,
                data: { roles: ['client'] }
            },
            {
                path: 'orders',
                component: OrdersView,
                data: { roles: ['operator', 'admin'] }
            },
            {
                path: 'orders/:id',
                component: OrderDetails,
                data: { roles: ['operator', 'admin'] }
            },
            {
                path: 'profile',
                component: UserProfile
            }
        ]
    },
    {
        path: 'auth',
        component: AuthView,
        children: authRoutes
    }
];
