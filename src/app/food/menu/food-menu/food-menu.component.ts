import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { FoodItemListApiService } from 'src/app/foodItemListApi.service';
import { CartItem } from 'src/app/shopping/cartItem';
import { MyCartService } from 'src/app/shopping/cart/cart.service';
import { AuthService } from 'src/app/site/auth.service';
import { User } from 'src/app/site/user';
import { LoggedUserInfo } from 'src/app/site/user-info';
import { UserService } from 'src/app/site/user.service';
import { MenuItem } from '../../../foodItem';
import { FoodItemService } from '../../food-item.service';

@Component({
  selector: 'app-food-menu',
  templateUrl: './food-menu.component.html',
  styleUrls: ['./food-menu.component.css']
})
export class FoodMenuComponent implements OnInit {

  menuItemList: Array<MenuItem>;
  user: LoggedUserInfo;

  constructor(private authService: AuthService, private route: Router, private http: HttpClient, private foodService: FoodItemService, private cartService: MyCartService) {
    this.menuItemList = new Array<MenuItem>();
    this.user = authService.loggedUser;
    this.getFoodItems();
  }

  getFoodItems() {
    this.menuItemList = new Array<MenuItem>();
    let menues: MenuItem[] = [];
    this.foodService.generateUrl(this.user);
    this.foodService.get().subscribe(
      m => {
        menues = m;
        menues.forEach(f => {
          this.menuItemList.push(f);
        });
      },
      err => console.log(err)
    );
  }

  getMenuItem($event): void {
    this.menuItemList = new Array<MenuItem>();
    if (($event as string).length != 0) {
      let menues: MenuItem[] = [];
      this.foodService.generateUrl(this.user);
      this.foodService.searchItem($event as string).subscribe(
        m => {
          menues = m;
          menues.forEach(f => {
            f.launchDate = this.foodService.toDate(f.launchDate);
            this.menuItemList.push(f);
          });
        },
        err => console.log(err)
      );
    }
    else {
      this.getFoodItems();
    }
  }

  addToCart($event): void {
    this.cartService.generateHeaders(this.user);
    this.cartService.addToCart($event, this.user.userId).subscribe(
      res => res,
      err => console.log(err)
    );
  }

  ngOnInit(): void {
    // if (this.user == undefined)
    //   this.route.navigateByUrl('/menu-item-list');

  }

}
