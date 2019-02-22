import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralUserSearchResultComponent } from './general-user-search-result.component';

describe('GeneralUserSearchResultComponent', () => {
  let component: GeneralUserSearchResultComponent;
  let fixture: ComponentFixture<GeneralUserSearchResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralUserSearchResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralUserSearchResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
