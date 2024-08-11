import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { ActivityDashboardComponent } from './activity-dashboard.component';
import { ActivitiesService } from '@dcd/activities/data-access';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ActivityDashboardComponent', () => {
  let component: ActivityDashboardComponent;
  let fixture: ComponentFixture<ActivityDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActivityDashboardComponent],
      imports: [RouterTestingModule],
      providers: [
        {
          provide: ActivitiesService,
          useValue: {
            getCuratedActivities: jest.fn()
          }
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(ActivityDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
