import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MyCartApiService } from 'src/app/MyCartApi.service';
import { MenuItem } from 'src/app/foodItem';
import { FoodItemService } from 'src/app/food/food-item.service';
import { AuthService } from 'src/app/site/auth.service';
import { LoggedUserInfo } from 'src/app/site/user-info';
import { CartItem } from '../cartItem';

@Injectable({
  providedIn: 'root'
})
export class MyCartService {

  cartItem: CartItem;
  userId: number;
  url: string = 'http://localhost:5000/api/cart/';
  token: string;
  head: HttpHeaders;

  constructor(private api: MyCartApiService, private http: HttpClient,private authService: AuthService) {
  }

//*********************************/Dont delete after this\****************************************\\
  generateHeaders(user: LoggedUserInfo){
    this.token = this.authService.getToken();
    this.head = new HttpHeaders({
      'Authorization': 'bearer '+ this.token
    })
  }


  getCartByUser(userId: number){
    return this.http.get<CartItem[]>(this.api.url+userId,{headers: this.head});
  }

  addToCart(itemId: number, userId: number) {
    return this.http.post(this.api.url+userId,itemId,{headers: this.head});
  }

  deleteCartItem(cartItem: CartItem){
    return this.http.delete(this.api.url+cartItem.cartId,{headers: this.head});
  }
}
