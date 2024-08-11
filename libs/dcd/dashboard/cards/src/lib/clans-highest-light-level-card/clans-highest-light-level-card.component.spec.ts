import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClansHighestLightLevelCardComponent } from './clans-highest-light-level-card.component';
import { ClansDetailsActivitiesService, ClansDetailsService } from '@dcd/dashboard/data-access';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';

describe('ClansHighestLightLevelCardComponent', () => {
  let component: ClansHighestLightLevelCardComponent;
  let fixture: ComponentFixture<ClansHighestLightLevelCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClansHighestLightLevelCardComponent],
      providers: [
        {
          provide: ClansDetailsService,
          useValue: { highestPowerBonusMembers$: of(null) }
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(ClansHighestLightLevelCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
