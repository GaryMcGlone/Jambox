import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaggedPostsPage } from './tagged-posts.page';

describe('TaggedPostsPage', () => {
  let component: TaggedPostsPage;
  let fixture: ComponentFixture<TaggedPostsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaggedPostsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaggedPostsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
