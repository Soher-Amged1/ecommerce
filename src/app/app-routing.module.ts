import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { BrandsComponent } from './components/brands/brands.component';
import { BrandDetailsComponent } from './components/brand-details/brand-details.component';
import { ProductsComponent } from './components/products/products.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { RegisterComponent } from './components/register/register.component';
import { authGuard } from './auth.guard';
import{ ProductDetailsComponent }from './components/product-details/product-details.component'
import { CheckoutComponent } from './components/checkout/checkout.component';
import { AllordersComponent } from './allorders/allorders.component';
import { CategoryDetailsComponent } from './components/category-details/category-details.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { CartComponent   } from './components/cart/cart.component'

const routes: Routes = [
  {path:"",redirectTo:"login",pathMatch:"full"},
  {path:"register",component:RegisterComponent},
  {path:"login",component:LoginComponent},
  {path:"home",canActivate: [authGuard],component:HomeComponent},
  {path:"allorders",canActivate: [authGuard],component:AllordersComponent},
  {path:"brands",canActivate: [authGuard],component:BrandsComponent},
  {path:"brandDetails/:bId",canActivate: [authGuard],component:BrandDetailsComponent},
  {path:"products",canActivate: [authGuard],component:ProductsComponent},
  {path:"cart",canActivate: [authGuard],component:CartComponent},
  {path:"wishlist",canActivate: [authGuard],component:WishlistComponent},

  {path:"checkout/:cartId",canActivate: [authGuard],component:CheckoutComponent},
  {path:"categories",canActivate: [authGuard],component:CategoriesComponent},
  {path:"categoryDetails/:cId",canActivate: [authGuard],component:CategoryDetailsComponent},
  {path:"productDetails/:hamada",canActivate: [authGuard],component:ProductDetailsComponent},
  {path:"**",component:NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes , { useHash : true , scrollPositionRestoration:'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
