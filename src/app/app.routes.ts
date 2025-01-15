import {Routes} from '@angular/router';
import {AuthComponent} from './components/auth/auth.component';
import {LayoutComponent} from './components/layout/layout.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {CustomersComponent} from './components/customers/customers.component';
import {OrdersComponent} from './components/orders/orders.component';
import {OutletsComponent} from './components/outlets/outlets.component';
import {DiscountComponent} from './components/discount/discount.component';
import {ProductDetailsComponent} from './components/product-details/product-details.component';
import {UsersComponent} from './components/users/users.component';
import {ReportingComponent} from './components/reporting/reporting.component';
import { authGuard } from './guard/auth.guard';
export const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
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
      },
      {
        path: 'customers',
        component: CustomersComponent,
        canActivate: [authGuard],
      },
      {
        path: 'order',
        component: OrdersComponent,
        canActivate: [authGuard],
      },
      {
        path: 'outlets',
        component: OutletsComponent,
        canActivate: [authGuard],
      },
      {
        path: 'discount',
        component: DiscountComponent,
        canActivate: [authGuard],
      },
      {
        path: 'product-details',
        component: ProductDetailsComponent,
        canActivate: [authGuard],
      },
      {
        path: 'users',
        component: UsersComponent,
        canActivate: [authGuard],
      },
      {
        path: 'reporting',
        component: ReportingComponent,
        canActivate: [authGuard],
      },
      {
        path:'**',
        redirectTo:'login'
      }

    ]
  }

];
