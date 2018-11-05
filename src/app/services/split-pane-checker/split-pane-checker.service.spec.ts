import { TestBed, inject } from '@angular/core/testing';

import { SplitPaneCheckerService } from './split-pane-checker.service';

describe('SplitPaneCheckerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SplitPaneCheckerService]
    });
  });

  it('should be created', inject([SplitPaneCheckerService], (service: SplitPaneCheckerService) => {
    expect(service).toBeTruthy();
  }));
});
