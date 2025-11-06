import { Routes } from '@angular/router';
import { AuthView } from './layouts/auth/auth.component';
import { authRoutes } from './auth/routes/routes';
import { validTokenGuard } from './auth/guards/valid-token-guard';
import { Dashboard } from './layouts/dashboard/dashboard.component';
import { restaurantRoutes } from './restaurant/routes/routes';
import { catalogueRoutes } from './catalogue/routes/routes';
import { Home } from './layouts/home/home';
import { CartView } from './orders/views/cart/cartView';
import { MyOrders } from './orders/views/my-orders/myOrders';
import { OrdersView } from './orders/views/orders/ordersView';
import { OrderDetails } from './orders/views/order-details/orderDetails';

export const routes: Routes = [
    {
        path: '',
        component: Home,
        children: [
            ...catalogueRoutes,
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
        children: [
            ...restaurantRoutes,
            {
                path: 'my-orders',
                component: MyOrders,
            },
            {
                path: 'orders',
                component: OrdersView
            },
            {
                path: 'orders/:id',
                component: OrderDetails
            }
        ]
    },
    {
        path: 'auth',
        component: AuthView,
        children: authRoutes
    }
];
