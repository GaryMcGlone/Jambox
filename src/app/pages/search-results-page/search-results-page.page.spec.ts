import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchResultsPagePage } from './search-results-page.page';

describe('SearchResultsPagePage', () => {
  let component: SearchResultsPagePage;
  let fixture: ComponentFixture<SearchResultsPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchResultsPagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchResultsPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
