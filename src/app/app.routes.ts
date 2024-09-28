import { Routes } from '@angular/router';
import { protectorGuard } from './core/guards/protector.guard';
import { authValidationGuard } from './core/guards/auth-validation.guard';


export const routes: Routes = [
    {
        path: "",
        loadComponent: () => import("./modules/home/home/home.component").then(m => m.HomeComponent),
    },
    {
        path: "login",
        loadComponent: () => import("./modules/login/login/login.component").then(m => m.LoginComponent)
    },
    {
        path: "admin",
            loadComponent: () => import("./modules/admin-products/admin-products/admin-products.component").then(m => m.AdminProductsComponent),
        canActivate: [protectorGuard]
    },
    {
        path: "sell-with-us",
            loadComponent: () => import("./modules/sellWithUs/sell-with-us/sell-with-us.component").then(m => m.SellWithUsComponent),
    },
    {
        path: "orders",
            loadComponent: () => import("./modules/orders/orders/orders.component").then(m => m.OrdersComponent),
        canActivate: [protectorGuard,authValidationGuard]
    },
    {
        path: "my-orders",
            loadComponent: () => import("./modules/myOrders/my-orders/my-orders.component").then(m => m.MyOrdersComponent),
            canActivate: [authValidationGuard]
        },
    {
        path: "checkout",
        loadComponent: () => import("./modules/checkout/checkout/checkout.component").then(m => m.CheckoutComponent),
        canActivate: [authValidationGuard]
    },
    {
        path: "favorites",
        loadComponent: () => import("./modules/myFavorites/my-favorites/my-favorites.component").then(m => m.MyFavoritesComponent),
        canActivate: [authValidationGuard]
    },
    {
        path: "product/:idProduct",
        loadComponent: () => import("./modules/productDetails/product-detail/product-detail.component").then(m => m.ProductDetailComponent),
    },
    {
        path: "impact",
        loadComponent: () => import("./modules/impact/impact/impact.component").then(m => m.ImpactComponent),
    },
    {
        path: "*",
        redirectTo: "",
        pathMatch: "full"
    },
    
    
    
];
