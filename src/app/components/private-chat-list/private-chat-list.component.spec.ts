import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateChatListComponent } from './private-chat-list.component';

describe('PrivateChatListComponent', () => {
  let component: PrivateChatListComponent;
  let fixture: ComponentFixture<PrivateChatListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrivateChatListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateChatListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
