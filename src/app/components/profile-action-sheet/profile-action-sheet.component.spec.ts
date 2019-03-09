import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileActionSheetComponent } from './profile-action-sheet.component';

describe('ProfileActionSheetComponent', () => {
  let component: ProfileActionSheetComponent;
  let fixture: ComponentFixture<ProfileActionSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileActionSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileActionSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
