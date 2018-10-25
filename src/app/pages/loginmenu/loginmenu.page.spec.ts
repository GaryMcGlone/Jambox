import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginmenuPage } from './loginmenu.page';

describe('LoginmenuPage', () => {
  let component: LoginmenuPage;
  let fixture: ComponentFixture<LoginmenuPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginmenuPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginmenuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
