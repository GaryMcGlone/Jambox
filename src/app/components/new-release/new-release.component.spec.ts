import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewReleaseComponent } from './new-release.component';

describe('NewReleaseComponent', () => {
  let component: NewReleaseComponent;
  let fixture: ComponentFixture<NewReleaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewReleaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewReleaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
