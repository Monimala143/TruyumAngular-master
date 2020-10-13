import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { FoodItemEditComponent } from './food/item-edit/food-item-edit.component';
import { FoodMenuComponent } from './food/menu/food-menu/food-menu.component';
import { ShoppingCartComponent } from './shopping/cart/Shopping-cart.component';
import { LoginComponent } from './site/login/login.component';
import { SignoutComponent } from './site/signout/signout.component';
import { SignupComponent } from './site/signup/signup.component';


const routes: Routes = [
  {path: 'menu-item-list', component: FoodMenuComponent},
  {path: 'cart', component: ShoppingCartComponent, canActivate:[AuthGuard]},
  {path: 'edit-menu-item/:itemId', component: FoodItemEditComponent, canActivate:[AuthGuard]},
  {path: 'sign-up', component: SignupComponent},
  {path: 'login/:cartError', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'sign-out', component: SignoutComponent},
  {path: '', redirectTo:'/menu-item-list', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
