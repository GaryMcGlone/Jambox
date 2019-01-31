import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateChatsPage } from './private-chats.page';

describe('PrivateChatsPage', () => {
  let component: PrivateChatsPage;
  let fixture: ComponentFixture<PrivateChatsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrivateChatsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateChatsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
