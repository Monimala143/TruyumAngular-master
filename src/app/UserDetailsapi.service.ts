import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsApiService {

  url: string = 'http://localhost:5000/api/users/';

  constructor() { }
}
