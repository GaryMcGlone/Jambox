import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSongModalPage } from './create-song-modal.page';

describe('CreateSongModalPage', () => {
  let component: CreateSongModalPage;
  let fixture: ComponentFixture<CreateSongModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateSongModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSongModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
