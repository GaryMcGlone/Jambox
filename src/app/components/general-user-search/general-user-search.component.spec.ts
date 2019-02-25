import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralUserSearchComponent } from './general-user-search.component';

describe('GeneralUserSearchComponent', () => {
  let component: GeneralUserSearchComponent;
  let fixture: ComponentFixture<GeneralUserSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralUserSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralUserSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
