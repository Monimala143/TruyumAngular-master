import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterEvent, RouterLinkActive } from '@angular/router';
import { MenuItem } from 'src/app/foodItem';
import { DatePipe } from '@angular/common';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/site/auth.service';
import { User } from 'src/app/site/user';
import { FoodItemService } from '../food-item.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoggedUserInfo } from 'src/app/site/user-info';


@Component({
  selector: 'app-food-item-edit',
  templateUrl: './food-item-edit.component.html',
  styleUrls: ['./food-item-edit.component.css']
})
export class FoodItemEditComponent implements OnInit {

  foodItemList: Map<number,MenuItem>;
  foodItem: MenuItem;
  dateString: string;
  inStock: string;
  user: LoggedUserInfo;

  constructor(private param: ActivatedRoute, public datepipe: DatePipe, private route: Router, private authService: AuthService, private foodItemService: FoodItemService) {
    this.foodItemList = new Map<number,MenuItem>();
    let itemId: any = param.snapshot.paramMap.get('itemId');
    this.user = this.authService.loggedUser;
    this.getItemById(itemId as number);
  }

  ngOnInit(): void {
    // if (this.user == undefined)
    //   this.route.navigateByUrl('/sign-out');
  }

  getItemById(itemId: number) {
    this.foodItemService.generateUrl(this.user);
    this.foodItemService.getItemById(itemId).subscribe(
      res => {
        this.foodItem = res;
        this.update();
      },
      err => console.log(err)
    );
    
  }

  update(){
    this.dateString = this.datepipe.transform(this.foodItem.launchDate, 'dd/MM/yyyy');
    if (this.foodItem.isActive)
      this.inStock = 'true';
    else
      this.inStock = 'false';
  }

  saveChanges(form: NgForm): void {
    alert('form submitted successfully');
    this.foodItem.launchDate = new Date(this.reverse(this.dateString));
    this.foodItem.isActive = this.inStock == 'true' ? true : false;
    this.editItem(this.foodItem);
  }

  editItem(item: MenuItem) {
    this.foodItemService.generateUrl(this.user);
    this.foodItemService.editItem(item).subscribe(
      response => this.route.navigateByUrl('/menu-item-list'),
      error => console.error(error)
    );
  }

  reverse(str: string): string {
    return str.split("/").reverse().join('-');
  }

}
