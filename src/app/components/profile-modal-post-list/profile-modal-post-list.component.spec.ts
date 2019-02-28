import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileModalPostListComponent } from './profile-modal-post-list.component';

describe('ProfileModalPostListComponent', () => {
  let component: ProfileModalPostListComponent;
  let fixture: ComponentFixture<ProfileModalPostListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileModalPostListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileModalPostListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
