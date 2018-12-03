import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedPostComponent } from './selected-post.component';

describe('SelectedPostComponent', () => {
  let component: SelectedPostComponent;
  let fixture: ComponentFixture<SelectedPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectedPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
