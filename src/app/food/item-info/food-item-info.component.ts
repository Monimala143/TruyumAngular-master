import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MenuItem } from 'src/app/foodItem';
import { AuthService } from 'src/app/site/auth.service';
import { User } from 'src/app/site/user';
import { LoggedUserInfo } from 'src/app/site/user-info';

@Component({
  selector: 'app-food-item-info',
  templateUrl: './food-item-info.component.html',
  styleUrls: ['./food-item-info.component.css']
})
export class FoodItemComponent implements OnInit {

  @Input() item: MenuItem;
  @Input() user: LoggedUserInfo;
  @Output() onAdding: EventEmitter<number> = new EventEmitter<number>();
  isItemAdded: boolean;
  isAdmin: boolean;
  constructor(private authService: AuthService) {
    this.user = authService.loggedUser;
    if(this.user==undefined || !this.user.isAdmin)
      this.isAdmin = false;
    else
    this.isAdmin = true;
  }

  ngOnInit(): void {
  }

  addToCart(itemId: number):void{
    this.isItemAdded = true;
    this.onAdding.emit(itemId);
  }
}
