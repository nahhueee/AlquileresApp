import { TestBed } from '@angular/core/testing';

import { DetaAlquilerService } from './deta-alquiler.service';

describe('DetaAlquilerService', () => {
  let service: DetaAlquilerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetaAlquilerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
