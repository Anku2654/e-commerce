import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SellerAuthComponent } from './seller-auth/seller-auth.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { SellerAddProductComponent } from './seller-add-product/seller-add-product.component';
import { authGuard } from './auth.guard';
import { SellerUpdateProductComponent } from './seller-update-product/seller-update-product.component';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { ProductDetailsComponent } from './product-details/product-details.component';

export const routes: Routes = [
    { path: "", redirectTo: '/home', pathMatch: 'full' },
    { path: "home", component: HomeComponent },
    { path: "seller-auth", component: SellerAuthComponent },
    { path: "seller-home", component: SellerHomeComponent, canActivate: [authGuard] },
    { path: "seller-add-product", component: SellerAddProductComponent, canActivate: [authGuard] },
    { path: "seller-update-product/:id", component: SellerUpdateProductComponent, canActivate: [authGuard] },
    { path: "user-auth", component: UserAuthComponent },
    { path: "details/:id", component: ProductDetailsComponent }
];
