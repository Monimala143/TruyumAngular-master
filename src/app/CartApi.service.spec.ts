import { TestBed } from '@angular/core/testing';

import { MyCartApiService } from './MyCartApi.service';

describe('CartApiService', () => {
  let service: MyCartApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyCartApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
