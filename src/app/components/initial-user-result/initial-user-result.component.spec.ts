import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InitialUserResultComponent } from './initial-user-result.component';

describe('InitialUserResultComponent', () => {
  let component: InitialUserResultComponent;
  let fixture: ComponentFixture<InitialUserResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InitialUserResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InitialUserResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
