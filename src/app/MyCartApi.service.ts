import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MyCartApiService {

  url: string = 'http://localhost:5000/api/cart/';
  
  constructor() { }
}
