import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FoodItemComponent } from './food/item-info/food-item-info.component';
import { FoodMenuComponent } from './food/menu/food-menu/food-menu.component';
import { FoodSearchComponent } from './food/search/food-search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShoppingCartComponent } from './shopping/cart/Shopping-cart.component';
import { MainComponent } from './main/main.component';
import { FoodItemEditComponent } from './food/item-edit/food-item-edit.component';
import { MyCartService } from './shopping/cart/cart.service';
import { DatePipe } from '@angular/common';
import { SignupComponent } from './site/signup/signup.component';
import { LoginComponent } from './site/login/login.component';
import { SignoutComponent } from './site/signout/signout.component';
import { FoodItemService } from './food/food-item.service';
import { FoodItemListApiService } from './foodItemListApi.service';
import { UserDetailsApiService } from './UserDetailsapi.service';
@NgModule({
  declarations: [
    AppComponent,
    FoodItemComponent,
    FoodMenuComponent,
    FoodSearchComponent,
    ShoppingCartComponent,
    MainComponent,
    FoodItemEditComponent,
    SignupComponent,
    LoginComponent,
    SignoutComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [MyCartService,DatePipe,FoodItemService,FoodItemListApiService,UserDetailsApiService],
  bootstrap: [MainComponent]
})
export class AppModule { }
