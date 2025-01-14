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

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: AuthComponent
  },
  {
    path: 'layout',
    component: LayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'customers',
        component: CustomersComponent,
      },
      {
        path: 'order',
        component: OrdersComponent
      },
      {
        path: 'outlets',
        component: OutletsComponent
      },
      {
        path: 'discount',
        component: DiscountComponent
      },
      {
        path: 'product-details',
        component: ProductDetailsComponent
      },
      {
        path: 'users',
        component: UsersComponent
      },
      {
        path: 'reporting',
        component: ReportingComponent
      },
      {
        path:'**',
        redirectTo:'login'
      }

    ]
  }

];
