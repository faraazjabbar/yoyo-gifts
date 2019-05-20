import { TestBed } from '@angular/core/testing';

import { AdminGiftService } from './admin-gift.service';

describe('AdminGiftService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminGiftService = TestBed.get(AdminGiftService);
    expect(service).toBeTruthy();
  });
});
