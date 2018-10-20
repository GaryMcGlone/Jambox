import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotifySearchResultComponent } from './spotify-search-result.component';

describe('SpotifySearchResultComponent', () => {
  let component: SpotifySearchResultComponent;
  let fixture: ComponentFixture<SpotifySearchResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpotifySearchResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpotifySearchResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
