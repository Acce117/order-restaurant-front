import { Routes } from '@angular/router';
import { AuthView } from './layouts/auth/auth.component';
import { authRoutes } from './auth/routes/routes';
import { validTokenGuard } from './auth/guards/valid-token-guard';
import { Dashboard } from './layouts/dashboard/dashboard.component';
import { restaurantRoutes } from './restaurant/routes/routes';
import { catalogueRoutes } from './catalogue/routes/routes';
import { Home } from './layouts/home/home';
import { CartView } from './orders/views/cart/cartView';
import { OrdersView } from './orders/views/orders/ordersView';
import { OrderDetails } from './orders/views/order-details/orderDetails';
import { isAuthorizedGuard } from './auth/guards/is-authorized-guard';
import { MyOrders } from './authUser/views/my-orders/myOrders';
import { UserProfile } from './authUser/views/profile/profile';

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
