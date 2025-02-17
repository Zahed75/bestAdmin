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
import {AddProductComponent} from './components/add-product/add-product.component';
import {ProductsComponent} from './components/products/products.component';
import {CategoriesListComponent} from './components/categories-list/categories-list.component';
import {AddDiscountComponent} from './components/add-discount/add-discount.component';
import {AddUserComponent} from './components/add-user/add-user.component';
import {CustomerDetailsComponent} from './components/customer-details/customer-details.component';
import { DiscountDetailsComponent } from './components/discount-details/discount-details.component';
import {ProductDetailsComponent} from './components/product-details/product-details.component';

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
        path: 'categories',
        component: CategoriesListComponent,
        canActivate: [authGuard],
        data: {roles: ['HQ', 'BA', 'AD']}, // Only HQ, BA, AD can access
      },
      {
        path: 'discount',
        component: DiscountComponent,
        canActivate: [authGuard],
        data: {roles: ['HQ', 'BA', 'AD']}, // Only HQ, BA, AD can access
      },
      {
        path: 'add-discount',
        component: AddDiscountComponent,
        canActivate: [authGuard],
        data: {roles: ['HQ', 'BA', 'AD']}, // Only HQ, BA, AD can access
      },
      {
        path: 'add-product',
        component: AddProductComponent,
        canActivate: [authGuard],
        data: {roles: ['HQ', 'BA', 'AD']},
      },
      {
        path: 'products',
        component: ProductsComponent,
        canActivate: [authGuard],
        data: {roles: ['HQ', 'BA', 'AD']},
      },
      {
        path: 'product-details',
        component: ProductDetailsComponent,
        canActivate: [authGuard],
        data: {roles: ['HQ', 'BA', 'AD']},
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
        path: 'add-outlet',
        component: OutletCreationComponent,
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
        path: 'discount-details/:discountId', // Corrected typo
        component: DiscountDetailsComponent,
        canActivate: [authGuard],
        data: {roles: ['HQ', 'BA', 'AD']},
      },

      {
        path: 'order-details/:orderId',
        component: OrderDetailsComponent,
        canActivate: [authGuard],
        data: {roles: ['HQ', 'BA', 'AD', 'MGR']}, // HQ, BA, AD, MGR can access
      },

      {
        path: 'customer-details/:customerId',
        component: CustomerDetailsComponent,
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
        path: 'add-user',
        component: AddUserComponent,
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
