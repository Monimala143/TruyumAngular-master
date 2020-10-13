import { TestBed } from '@angular/core/testing';

import { UserDetailsApiService } from './UserDetailsapi.service';

describe('UserApiService', () => {
  let service: UserDetailsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserDetailsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
