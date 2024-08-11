import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClansHighestSeasonPassLevelCardComponent } from './clans-highest-season-pass-level-card.component';
import { ClansDetailsService } from '@dcd/dashboard/data-access';
import { of } from 'rxjs';

describe('ClansHighestSeasonPassLevelCardComponent', () => {
  let component: ClansHighestSeasonPassLevelCardComponent;
  let fixture: ComponentFixture<ClansHighestSeasonPassLevelCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClansHighestSeasonPassLevelCardComponent],
      providers: [
        {
          provide: ClansDetailsService,
          useValue: {
            highestSeasonPassMembers$: of(null)
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ClansHighestSeasonPassLevelCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
