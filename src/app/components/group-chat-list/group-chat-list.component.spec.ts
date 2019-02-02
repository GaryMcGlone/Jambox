import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupChatListComponent } from './group-chat-list.component';

describe('GroupChatListComponent', () => {
  let component: GroupChatListComponent;
  let fixture: ComponentFixture<GroupChatListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupChatListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupChatListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
