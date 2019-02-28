import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileModalPostComponent } from './profile-modal-post.component';

describe('ProfileModalPostComponent', () => {
  let component: ProfileModalPostComponent;
  let fixture: ComponentFixture<ProfileModalPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileModalPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileModalPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
