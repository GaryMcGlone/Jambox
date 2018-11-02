import { TestBed, inject } from '@angular/core/testing';

import { NewReleasesService } from './new-releases.service';

describe('NewReleasesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NewReleasesService]
    });
  });

  it('should be created', inject([NewReleasesService], (service: NewReleasesService) => {
    expect(service).toBeTruthy();
  }));
});
