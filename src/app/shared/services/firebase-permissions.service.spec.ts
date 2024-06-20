import { TestBed } from '@angular/core/testing';

import { FirebasePermissionsService } from './firebase-permissions.service';

describe('FirebasePermissionsService', () => {
  let service: FirebasePermissionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirebasePermissionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
