import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileModalActionSheetComponent } from './profile-modal-action-sheet.component';

describe('ProfileModalActionSheetComponent', () => {
  let component: ProfileModalActionSheetComponent;
  let fixture: ComponentFixture<ProfileModalActionSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileModalActionSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileModalActionSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
