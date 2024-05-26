import { TestBed } from '@angular/core/testing';

import { AjoutService } from '../services/ajout.service';

describe('AjoutService', () => {
  let service: AjoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AjoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
