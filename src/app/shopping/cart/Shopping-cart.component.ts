import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'src/app/foodItem';
import { FoodItemService } from 'src/app/food/food-item.service';
import { AuthService } from 'src/app/site/auth.service';
import { User } from 'src/app/site/user';
import { LoggedUserInfo } from 'src/app/site/user-info';
import { UserService } from 'src/app/site/user.service';
import { CartItem } from '../cartItem';
import { MyCartService } from 'src/app/shopping/cart/cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  
  cart: Array<CartItem>;
  user: LoggedUserInfo;
  total: number;
  isDeleted: boolean;

  constructor(private cartService: MyCartService, private authService: AuthService, private route: Router,
              private foodService: FoodItemService) { 
    this.user = authService.loggedUser;
    this.getCartByUser(this.user.userId);
  }

  getCartByUser(userId: number){
    this.cart = new Array<CartItem>();
    this.total = 0;
    let carts: CartItem[] = [];
    this.cartService.generateHeaders(this.user);
    this.cartService.getCartByUser(userId).subscribe(
      res =>{
        carts=res;
        carts.forEach(c => {
          c.foodItem.launchDate = this.foodService.toDate(c.foodItem.launchDate);
          this.cart.push(c);
          this.total += c.foodItem.price;
        });
      },
      err => console.log(err)
    );
    

  }

  clicked(cartItem: CartItem){
    this.cartService.generateHeaders(this.user);
    this.cartService.deleteCartItem(cartItem).subscribe(
      res => {
        this.isDeleted=true;
        this.getCartByUser(this.user.userId);
      },
      err => console.log(err)
    );
  }

  ngOnInit(): void {
  }

}
