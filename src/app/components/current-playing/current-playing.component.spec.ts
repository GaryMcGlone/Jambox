import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentPlayingComponent } from './current-playing.component';

describe('CurrentPlayingComponent', () => {
  let component: CurrentPlayingComponent;
  let fixture: ComponentFixture<CurrentPlayingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentPlayingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentPlayingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
