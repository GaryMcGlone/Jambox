import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileLikedPostListComponent } from './profile-liked-post-list.component';

describe('ProfileLikedPostListComponent', () => {
  let component: ProfileLikedPostListComponent;
  let fixture: ComponentFixture<ProfileLikedPostListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileLikedPostListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileLikedPostListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
