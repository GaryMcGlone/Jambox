import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaggedPostsListComponent } from './tagged-posts-list.component';

describe('TaggedPostsListComponent', () => {
  let component: TaggedPostsListComponent;
  let fixture: ComponentFixture<TaggedPostsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaggedPostsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaggedPostsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
