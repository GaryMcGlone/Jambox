import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InitialUserSearchPage } from './initial-user-search.page';

describe('InitialUserSearchPage', () => {
  let component: InitialUserSearchPage;
  let fixture: ComponentFixture<InitialUserSearchPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InitialUserSearchPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InitialUserSearchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
