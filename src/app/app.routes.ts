import { Routes } from '@angular/router';
import { AuthComponent } from './Layouts/auth/auth.component';
import { BlankComponent } from './Layouts/blank/blank.component';
import { NotfoundComponent } from './Pages/notfound/notfound.component';
import { authGuard } from './core/guards/auth/auth.guard';
import { loggedGuard } from './core/guards/loged/logged.guard';
import { CheckoutComponent } from './Pages/checkout/checkout.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  {
    path: '',
    component: AuthComponent,canActivate:[loggedGuard],
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./Pages/login/login.component').then((m) => m.LoginComponent),
        title: 'Login',
      },
      {
        path: 'forgotPassword',
        loadComponent: () =>
          import('./Pages/forgot-password/forgot-password.component').then((m) => m.ForgotPasswordComponent),
        title: 'Login',
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./Pages/register/register.component').then(
            (m) => m.RegisterComponent
          ),
        title: 'Register',
      },
    ],
  },

  {
    path: '',
    component: BlankComponent,canActivate:[authGuard],
    children: [


      {
        path: 'home',
        loadComponent: () =>
          import('./Pages/home/home.component').then((m) => m.HomeComponent),
        title: 'Home',
      },
      {
        path: 'cart',
        loadComponent: () =>
          import('./Pages/cart/cart.component').then((m) => m.CartComponent),
        title: 'Cart',
      },
      {
        path: 'whishList',
        loadComponent: () =>
          import('./Pages/whish-list/whish-list.component').then((m) => m.WhishListComponent),
        title: 'WhishList',
      },
      {
        path: 'product',
        loadComponent: () =>
          import('./Pages/products/products.component').then(
            (m) => m.ProductsComponent
          ),
        title: 'Products',
      },
      {
        path: 'categories',
        loadComponent: () =>
          import('./Pages/catigories/catigories.component').then(
            (m) => m.CatigoriesComponent
          ),
        title: 'Categories',
      },
      {
        path: 'brands',
        loadComponent: () =>
          import('./Pages/brands/brands.component').then(
            (m) => m.BrandsComponent
          ),
        title: 'Brands',
      },
      {
        path: 'blog',
        loadComponent: () =>
          import('./Pages/blog/blog.component').then((m) => m.BlogComponent),
        title: 'Blog',
      },
      {
        path: 'checkout',
        loadComponent: () =>
          import('./Pages/checkout/checkout.component').then(
            (m) => m.CheckoutComponent
          ),
        title: 'Checkout',
      },
      {
        path: 'allorders',
        loadComponent: () =>
          import('./Pages/allorders/allorders.component').then(
            (m) => m.AllordersComponent
          ),
        title: 'allorders',
      },
      {
        path: 'details/:proId',
        loadComponent: () =>
          import('./Pages/details/details.component').then(
            (m) => m.DetailsComponent
          ),
        title: 'Details',
      },
      {
        path: 'contact',
        loadComponent: () =>
          import('./Pages/contact/contact.component').then(
            (m) => m.ContactComponent
          ),
        title: 'Contact',
      },
    ],
  },

  { path: '**', component: NotfoundComponent, title: 'Not Found' },
];
