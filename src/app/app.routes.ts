import { Routes } from '@angular/router';
import { HomeComponent } from './layout/pages/home/home.component';
import { NotFoundComponent } from './layout/additions/not-found/not-found.component';
import { authguardGuard } from './shared/guards/authguard.guard';

export const routes: Routes = [
    {path :"" , redirectTo :"home" , pathMatch:"full"},
    {path :"home" , component :HomeComponent , title :"home" , canActivate:[authguardGuard]},
    {path :"login" , loadComponent : ()=> import ('./layout/pages/login/login.component').then((c)=>c.LoginComponent) , title :"login"},
    {path :"register" ,loadComponent : ()=> import ('./layout/pages/register/register.component').then((c)=>c.RegisterComponent) , title :"register"},
    {path :"categories" ,  loadComponent : ()=> import ('./layout/pages/categories/categories.component').then((c)=>c.CategoriesComponent) , title :"categories" , canActivate:[authguardGuard]},
    {path :"brands" , loadComponent : ()=> import ('./layout/pages/brands/brands.component').then((c)=>c.BrandsComponent) ,title :"brands" , canActivate:[authguardGuard]},
    {path :"cart" ,  loadComponent : ()=> import ( './layout/pages/cart/cart.component').then((c)=>c.CartComponent) , title :"cart" , canActivate:[authguardGuard]},
    {path :"forgetPassword" , loadComponent : ()=> import ( './layout/additions/forget-password/forget-password.component').then((c)=>c.ForgetPasswordComponent)  , title :"forgetPassword"},
    {path :"products" ,loadComponent : ()=> import ( './layout/pages/products/products.component').then((c)=>c.ProductsComponent) , title :"products" , canActivate:[authguardGuard]},
    {path :"wishlist" ,loadComponent : ()=> import ( './layout/additions/wishlist/wishlist.component').then((c)=>c.WishlistComponent) , title :"wishlist" , canActivate:[authguardGuard]},
    {path :"checkout/:cartId" ,loadComponent : ()=> import ( './layout/additions/checkout/checkout/checkout.component').then((c)=>c.CheckoutComponent) , title :"checkout" , canActivate:[authguardGuard]},
    {path :"productDetails/:id" , loadComponent : ()=> import ( './layout/additions/product-details/product-details.component').then((c)=>c.ProductDetailsComponent) , title :"product details" , canActivate:[authguardGuard]},
    {path :"**" , component :NotFoundComponent , title :"notfound"}
];
