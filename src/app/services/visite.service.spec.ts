import { TestBed } from '@angular/core/testing';

import { VisiteService } from './visite.service';

describe('VisiteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VisiteService = TestBed.get(VisiteService);
    expect(service).toBeTruthy();
  });
});
