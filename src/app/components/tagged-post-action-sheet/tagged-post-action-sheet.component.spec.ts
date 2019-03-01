import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaggedPostActionSheetComponent } from './tagged-post-action-sheet.component';

describe('TaggedPostActionSheetComponent', () => {
  let component: TaggedPostActionSheetComponent;
  let fixture: ComponentFixture<TaggedPostActionSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaggedPostActionSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaggedPostActionSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
