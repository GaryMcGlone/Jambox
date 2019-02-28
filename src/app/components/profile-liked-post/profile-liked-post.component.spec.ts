import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileLikedPostComponent } from './profile-liked-post.component';

describe('ProfileLikedPostComponent', () => {
  let component: ProfileLikedPostComponent;
  let fixture: ComponentFixture<ProfileLikedPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileLikedPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileLikedPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
