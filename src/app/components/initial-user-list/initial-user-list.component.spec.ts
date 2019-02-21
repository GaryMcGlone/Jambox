import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InitialUserListComponent } from './initial-user-list.component';

describe('InitialUserListComponent', () => {
  let component: InitialUserListComponent;
  let fixture: ComponentFixture<InitialUserListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InitialUserListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InitialUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
