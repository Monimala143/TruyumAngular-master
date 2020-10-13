import { TestBed } from '@angular/core/testing';

import { FoodItemListApiService } from './foodItemListApi.service';

describe('FoodItemApiService', () => {
  let service: FoodItemListApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FoodItemListApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
