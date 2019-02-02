import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupChatsPage } from './group-chats.page';

describe('GroupChatsPage', () => {
  let component: GroupChatsPage;
  let fixture: ComponentFixture<GroupChatsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupChatsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupChatsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
