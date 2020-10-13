import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MenuItem } from '../foodItem';
import { FoodItemListApiService } from '../foodItemListApi.service';
import { CartItem } from '../shopping/cartItem';
import { MyCartService } from '../shopping/cart/cart.service';
import { AuthService } from '../site/auth.service';
import { LoggedUserInfo } from '../site/user-info';

@Injectable({
  providedIn: 'root'
})
export class FoodItemService {

  adminUrl: string = 'http://localhost:5000/api/admin/';
  anonymousUrl: string = 'http://localhost:5000/api/anonymoususer/';
  customerUrl: string = 'http://localhost:5000/api/customer/';
  url: string;
  token: string;
  head: HttpHeaders;

  constructor(private http: HttpClient, private api: FoodItemListApiService, private authService: AuthService) {

  }

  generateUrl(user: LoggedUserInfo) {
    if (user == undefined)
      this.url = this.anonymousUrl;
    else if (this.authService.getUserType() == "Admin")
      this.url = this.adminUrl;
    else if (this.authService.getUserType() == "Customer")
      this.url = this.customerUrl;
    
      this.token = this.authService.getToken();
      if(user != undefined){
        this.head = new HttpHeaders({
          "Authorization": "bearer " + this.token
        });
      }
  }

  public get() {
      return this.http.get<MenuItem[]>(this.url, { headers: this.head });
  }

  getItemById(itemId: number) {
    return this.http.get<MenuItem>(this.url + itemId, {headers: this.head});
  }

  public searchItem(name: string) {
    return this.http.get<MenuItem[]>(this.url + 'search/' + name, { headers: this.head });
  }

  public editItem(item: MenuItem) {
    return this.http.put(this.url, item, {headers: this.head});
  }

  toDate(launchDate: Date): Date {
    let date: string = launchDate.toString();
    return new Date(date.substring(0, 10));
  }
}
