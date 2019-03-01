import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaggedPostComponent } from './tagged-post.component';

describe('TaggedPostComponent', () => {
  let component: TaggedPostComponent;
  let fixture: ComponentFixture<TaggedPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaggedPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaggedPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
