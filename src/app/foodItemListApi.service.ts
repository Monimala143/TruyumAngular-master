import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FoodItemListApiService {

  url: string = 'http://localhost:5000/api/fooditems/';

  constructor() { }
}
