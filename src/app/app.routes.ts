import {Routes} from '@angular/router';
import {AuthComponent} from './components/auth/auth.component';
import {LayoutComponent} from './components/layout/layout.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {CustomersComponent} from './components/customers/customers.component';
import {OrdersComponent} from './components/orders/orders.component';
import {OutletsComponent} from './components/outlets/outlets.component';
import {DiscountComponent} from './components/discount/discount.component';
import {OrderDetailsComponent} from './components/order-details/order-details.component';
import {UsersComponent} from './components/users/users.component';
import {ReportingComponent} from './components/reporting/reporting.component';
import {authGuard} from './guard/auth.guard';
import {OutletDetailsComponent} from './components/outlet-details/outlet-details.component';
import {OutletCreationComponent} from './components/outlet-creation/outlet-creation.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: AuthComponent,
  },
  {
    path: 'layout',
    component: LayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [authGuard],
        data: {roles: ['HQ', 'BA', 'AD']}, // Only HQ, BA, AD can access
      },
      {
        path: 'customers',
        component: CustomersComponent,
        canActivate: [authGuard],
        data: {roles: ['HQ', 'BA', 'AD']}, // Only HQ, BA, AD can access
      },
      {
        path: 'order',
        component: OrdersComponent,
        canActivate: [authGuard],
        data: {roles: ['HQ', 'BA', 'AD', 'MGR']}, // HQ, BA, AD, MGR can access
      },
      {
        path: 'outlets',
        component: OutletsComponent,
        canActivate: [authGuard],
        data: {roles: ['HQ', 'BA', 'AD']}, // Only HQ, BA, AD can access
      },
      {
        path:'add-outlet',
        component:OutletCreationComponent,
        canActivate: [authGuard],
        data: {roles: ['HQ', 'BA', 'AD']},
      },
      {
        path: 'outlet-details/:outletId',
        component: OutletDetailsComponent,
        canActivate: [authGuard],
        data: {roles: ['HQ', 'BA', 'AD']}
      },
      {
        path: 'discount',
        component: DiscountComponent,
        canActivate: [authGuard],
        data: {roles: ['HQ', 'BA', 'AD']}, // Only HQ, BA, AD can access
      },
      {
        path: 'order-details/:orderId',
        component: OrderDetailsComponent,
        canActivate: [authGuard],
        data: {roles: ['HQ', 'BA', 'AD', 'MGR']}, // HQ, BA, AD, MGR can access
      },

      {
        path: 'users',
        component: UsersComponent,
        canActivate: [authGuard],
        data: {roles: ['HQ', 'BA', 'AD']}, // Only HQ, BA, AD can access
      },
      {
        path: 'reporting',
        component: ReportingComponent,
        canActivate: [authGuard],
        data: {roles: ['HQ', 'BA', 'AD']}, // Only HQ, BA, AD can access
      },
      {
        path: '**',
        redirectTo: 'login',
      },
    ],
  },
];
