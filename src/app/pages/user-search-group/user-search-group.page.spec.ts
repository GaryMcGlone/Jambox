import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSearchGroupPage } from './user-search-group.page';

describe('UserSearchGroupPage', () => {
  let component: UserSearchGroupPage;
  let fixture: ComponentFixture<UserSearchGroupPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserSearchGroupPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSearchGroupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
