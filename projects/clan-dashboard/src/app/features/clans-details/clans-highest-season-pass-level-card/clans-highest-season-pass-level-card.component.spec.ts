import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClansHighestSeasonPassLevelCardComponent } from './clans-highest-season-pass-level-card.component';

describe('ClansHighestSeasonPassLevelCardComponent', () => {
  let component: ClansHighestSeasonPassLevelCardComponent;
  let fixture: ComponentFixture<ClansHighestSeasonPassLevelCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClansHighestSeasonPassLevelCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClansHighestSeasonPassLevelCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
